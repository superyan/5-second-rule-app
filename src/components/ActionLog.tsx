import { useStore } from '../stores/useStore';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function ActionLog() {
  const { todayActions } = useStore();

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp), 'HH:mm', { locale: zhCN });
  };

  if (todayActions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <Clock size={48} className="mb-4 opacity-50" />
        <p className="text-lg">今天还没有行动记录</p>
        <p className="text-sm mt-2">开始第一个5秒挑战吧！</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 px-4 py-4">
      <h3 className="text-lg font-semibold text-white mb-4">今日行动</h3>

      {todayActions.map((action) => (
        <div
          key={action.id}
          className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
        >
          {/* 状态图标 */}
          <div className="flex-shrink-0 mt-0.5">
            {action.completed ? (
              <CheckCircle2 className="text-success" size={20} />
            ) : (
              <XCircle className="text-gray-500" size={20} />
            )}
          </div>

          {/* 内容 */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium break-words">
              {action.intention}
            </p>
            {action.actualAction && action.actualAction !== action.intention && (
              <p className="text-sm text-gray-400 mt-1">
                实际: {action.actualAction}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              {formatTime(action.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
