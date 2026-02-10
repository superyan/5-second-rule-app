import Dexie, { Table } from 'dexie';

export interface Action {
  id?: number;
  intention: string;      // 想要做什么
  completed: boolean;     // 是否完成
  actualAction?: string; // 实际做了什么
  timestamp: number;      // 时间戳
  date: string;           // 日期 (YYYY-MM-DD)
}

export class ActionDatabase extends Dexie {
  actions!: Table<Action>;

  constructor() {
    super('FiveSecondRuleDB');
    this.version(1).stores({
      actions: '++id, completed, date, timestamp',
    });
  }
}

export const db = new ActionDatabase();

// 获取今天的所有行动记录
export async function getTodayActions(): Promise<Action[]> {
  const today = new Date().toISOString().split('T')[0];
  return await db.actions
    .where('date')
    .equals(today)
    .reverse()
    .sortBy('timestamp');
}

// 添加行动记录
export async function addAction(action: Omit<Action, 'id'>): Promise<void> {
  await db.actions.add(action);
}

// 获取指定日期范围的统计数据
export async function getStats(startDate: string, endDate: string) {
  const actions = await db.actions
    .where('date')
    .between(startDate, endDate, true, true)
    .toArray();

  const total = actions.length;
  const completed = actions.filter(a => a.completed).length;
  const successRate = total > 0 ? (completed / total) * 100 : 0;

  return { total, completed, successRate };
}

// 获取最近7天的每日统计
export async function getLast7DaysStats() {
  const stats = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayStats = await getStats(dateStr, dateStr);
    stats.push({
      date: dateStr,
      ...dayStats,
    });
  }
  return stats;
}
