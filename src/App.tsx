import { useEffect } from 'react';
import CountdownTimer from './components/CountdownTimer';
import ActionInput from './components/ActionInput';
import DailyStats from './components/DailyStats';
import ActionLog from './components/ActionLog';
import WeeklyChart from './components/WeeklyChart';
import { useStore } from './stores/useStore';
import { Zap, BarChart3, History } from 'lucide-react';

type Tab = 'timer' | 'stats' | 'history';

function App() {
  const { loadData } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('timer');

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* 头部 */}
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="text-primary" size={24} />
              <h1 className="text-xl font-bold">5秒法则</h1>
            </div>
            <div className="text-xs text-gray-400">
              立即行动，克服拖延
            </div>
          </div>
        </div>
      </header>

      {/* 标签页导航 */}
      <nav className="max-w-md mx-auto px-4 py-2 bg-gray-800/50">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('timer')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'timer'
                ? 'bg-primary text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            <Zap size={16} />
            计时器
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'stats'
                ? 'bg-primary text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            <BarChart3 size={16} />
            统计
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'history'
                ? 'bg-primary text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            <History size={16} />
            历史
          </button>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="max-w-md mx-auto pb-20">
        {activeTab === 'timer' && (
          <>
            <CountdownTimer />
            <ActionInput />
            <DailyStats />
          </>
        )}

        {activeTab === 'stats' && (
          <>
            <DailyStats />
            <WeeklyChart />
          </>
        )}

        {activeTab === 'history' && (
          <ActionLog />
        )}
      </main>

      {/* 底部提示 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700">
        <div className="max-w-md mx-auto px-4 py-3 text-center">
          <p className="text-xs text-gray-400">
            基于 Mel Robbins 的《5秒法则》
          </p>
        </div>
      </footer>
    </div>
  );
}

// 添加 useState import
import { useState } from 'react';

export default App;
