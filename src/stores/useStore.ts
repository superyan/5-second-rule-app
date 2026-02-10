import { create } from 'zustand';
import { getTodayActions, addAction, getLast7DaysStats, Action } from '../db/db';

interface StoreState {
  // 当前状态
  currentIntention: string;
  isCountingDown: boolean;
  countdownValue: number;

  // 数据
  todayActions: Action[];
  weeklyStats: any[];

  // Actions
  setIntention: (intention: string) => void;
  startCountdown: () => void;
  cancelCountdown: () => void;
  completeAction: (actualAction?: string) => void;
  skipAction: () => void;
  loadData: () => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  // 初始状态
  currentIntention: '',
  isCountingDown: false,
  countdownValue: 5,
  todayActions: [],
  weeklyStats: [],

  setIntention: (intention: string) => {
    set({ currentIntention: intention });
  },

  startCountdown: () => {
    const { currentIntention } = get();
    if (!currentIntention.trim()) {
      alert('请先输入你想要做的事情！');
      return;
    }

    set({ isCountingDown: true, countdownValue: 5 });

    // 开始倒计时
    let count = 5;
    const interval = setInterval(() => {
      count--;
      if (count < 0) {
        clearInterval(interval);
        // 倒计时结束，记录完成
        const intention = get().currentIntention;
        const now = new Date();
        addAction({
          intention,
          completed: true,
          actualAction: intention,
          timestamp: now.getTime(),
          date: now.toISOString().split('T')[0],
        });

        set({
          isCountingDown: false,
          countdownValue: 5,
          currentIntention: '',
        });

        get().loadData();
      } else {
        set({ countdownValue: count });
      }
    }, 1000);
  },

  cancelCountdown: () => {
    set({ isCountingDown: false, countdownValue: 5 });
  },

  completeAction: async (actualAction?: string) => {
    const { currentIntention } = get();
    if (!currentIntention.trim()) {
      alert('请先输入你想要做的事情！');
      return;
    }

    const now = new Date();
    await addAction({
      intention: currentIntention,
      completed: true,
      actualAction: actualAction || currentIntention,
      timestamp: now.getTime(),
      date: now.toISOString().split('T')[0],
    });

    set({
      currentIntention: '',
      isCountingDown: false,
      countdownValue: 5,
    });

    get().loadData();
  },

  skipAction: async () => {
    const { currentIntention } = get();
    if (!currentIntention.trim()) {
      alert('请先输入你想要做的事情！');
      return;
    }

    const now = new Date();
    await addAction({
      intention: currentIntention,
      completed: false,
      timestamp: now.getTime(),
      date: now.toISOString().split('T')[0],
    });

    set({
      currentIntention: '',
      isCountingDown: false,
      countdownValue: 5,
    });

    get().loadData();
  },

  loadData: async () => {
    const todayActions = await getTodayActions();
    const weeklyStats = await getLast7DaysStats();
    set({ todayActions, weeklyStats });
  },
}));
