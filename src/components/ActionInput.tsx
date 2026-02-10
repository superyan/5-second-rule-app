import { useStore } from '../stores/useStore';
import { Check, SkipForward } from 'lucide-react';

export default function ActionInput() {
  const { currentIntention, setIntention, completeAction, skipAction } = useStore();

  return (
    <div className="px-6 py-4 bg-gray-800/50 backdrop-blur-sm">
      <div className="space-y-4">
        <div>
          <label htmlFor="intention" className="block text-sm font-medium text-gray-300 mb-2">
            我想要做...
          </label>
          <textarea
            id="intention"
            value={currentIntention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="例如：去跑步10分钟 / 读1页书 / 给朋友打个电话"
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none resize-none transition-all"
            rows={2}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => completeAction()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-success to-emerald-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-success/25"
          >
            <Check size={18} />
            我完成了！
          </button>

          <button
            onClick={() => skipAction()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors"
          >
            <SkipForward size={18} />
            跳过
          </button>
        </div>
      </div>
    </div>
  );
}
