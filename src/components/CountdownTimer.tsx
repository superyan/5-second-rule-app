import { useStore } from '../stores/useStore';
import { Play, X } from 'lucide-react';

export default function CountdownTimer() {
  const { isCountingDown, countdownValue, startCountdown, cancelCountdown } = useStore();

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      {/* 倒计时数字 */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* 背景圆环 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20"></div>

        {/* 动态圆环 */}
        <div
          className={`absolute inset-2 rounded-full bg-gradient-to-br ${
            isCountingDown
              ? 'from-primary to-secondary animate-pulse-slow'
              : 'from-gray-700 to-gray-800'
          } flex items-center justify-center`}
        >
          {/* 倒计时数字 */}
          <div
            className={`text-8xl font-bold text-white ${
              isCountingDown && countdownValue > 0
                ? 'animate-countdown'
                : ''
            }`}
          >
            {isCountingDown
              ? countdownValue > 0
                ? countdownValue
                : '🚀'
              : '5'}
          </div>
        </div>

        {/* 装饰圆点 */}
        {isCountingDown && (
          <>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
          </>
        )}
      </div>

      {/* 状态文字 */}
      <div className="text-center space-y-2">
        <p className="text-2xl font-semibold text-white">
          {isCountingDown
            ? countdownValue > 0
              ? `倒数 ${countdownValue}`
              : '行动！'
            : '准备开始'}
        </p>
        <p className="text-gray-400 text-sm">
          5-4-3-2-1，立即行动！
        </p>
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-4">
        {!isCountingDown ? (
          <button
            onClick={startCountdown}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
          >
            <Play size={20} />
            开始倒计时
          </button>
        ) : (
          <button
            onClick={cancelCountdown}
            className="flex items-center gap-2 px-8 py-3 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 transition-colors"
          >
            <X size={20} />
            取消
          </button>
        )}
      </div>
    </div>
  );
}
