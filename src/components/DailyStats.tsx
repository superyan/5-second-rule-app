import { useStore } from '../stores/useStore';
import { Target, CheckCircle, TrendingUp } from 'lucide-react';

export default function DailyStats() {
  const { todayActions } = useStore();

  const total = todayActions.length;
  const completed = todayActions.filter(a => a.completed).length;
  const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label: '总尝试',
      value: total,
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: '完成',
      value: completed,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: '成功率',
      value: `${successRate}%`,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 px-4 py-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`${stat.bgColor} rounded-xl p-4 flex flex-col items-center`}
          >
            <Icon className={`${stat.color} mb-2`} size={20} />
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
