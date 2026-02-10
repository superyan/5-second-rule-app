import { useStore } from '../stores/useStore';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default function WeeklyChart() {
  const { weeklyStats } = useStore();

  const maxActions = Math.max(...weeklyStats.map(s => s.total), 1);

  return (
    <div className="px-4 py-4">
      <h3 className="text-lg font-semibold text-white mb-4">最近7天</h3>

      <div className="space-y-3">
        {weeklyStats.map((stat) => {
          const dateLabel = format(new Date(stat.date), 'MM/dd', { locale: zhCN });

          return (
            <div key={stat.date} className="flex items-center gap-4">
              {/* 日期标签 */}
              <div className="w-16 text-sm text-gray-400 flex-shrink-0">
                {dateLabel}
              </div>

              {/* 进度条 */}
              <div className="flex-1 h-12 bg-gray-700 rounded-lg overflow-hidden flex">
                {/* 完成部分 */}
                {stat.completed > 0 && (
                  <div
                    className="bg-gradient-to-r from-success to-emerald-600 transition-all duration-500"
                    style={{
                      width: maxActions > 0 ? `${(stat.completed / maxActions) * 100}%` : '0%',
                    }}
                  />
                )}

                {/* 未完成部分 */}
                {stat.total - stat.completed > 0 && (
                  <div
                    className="bg-gradient-to-r from-gray-500 to-gray-600 transition-all duration-500"
                    style={{
                      width: maxActions > 0 ? `${((stat.total - stat.completed) / maxActions) * 100}%` : '0%',
                    }}
                  />
                )}
              </div>

              {/* 数值 */}
              <div className="w-16 text-sm text-gray-400 text-right flex-shrink-0">
                <div className="text-white font-medium">{stat.total}</div>
                <div className="text-xs text-gray-500">
                  {Math.round(stat.successRate)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 图例 */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-success to-emerald-600"></div>
          <span className="text-xs text-gray-400">完成</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-gray-500 to-gray-600"></div>
          <span className="text-xs text-gray-400">跳过</span>
        </div>
      </div>
    </div>
  );
}
