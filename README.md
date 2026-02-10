# 5秒法则 App (5 Second Rule)

《5秒法则》配套应用 - 帮助用户实践Mel Robbins的5秒行动法则。

## 核心功能

- 5秒倒计时器 (5-4-3-2-1 → 行动！)
- 行动前输入"我要做什么"
- 行动后记录"我做了什么"
- 每日统计：成功/失败次数
- 可视化数据展示

## 技术栈

- **前端**: React + Vite
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **持久化**: IndexedDB (使用 Dexie.js)
- **图表**: Chart.js 或 Recharts
- **移动端**: Capacitor (可打包成iOS/Android)

## 项目结构

```
5-second-rule-app/
├── src/
│   ├── components/
│   │   ├── CountdownTimer.tsx      # 倒计时组件
│   │   ├── ActionInput.tsx         # 行动输入
│   │   ├── ActionLog.tsx            # 行动记录列表
│   │   ├── DailyStats.tsx           # 每日统计
│   │   └── WeeklyChart.tsx          # 周统计图表
│   ├── stores/
│   │   └── useStore.ts              # 状态管理
│   ├── db/
│   │   └── db.ts                    # IndexedDB配置
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── package.json
```

## 开发计划

### Phase 1: MVP (1-2天)
- [ ] 项目初始化
- [ ] 倒计时器组件
- [ ] 行动输入/记录
- [ ] 本地数据存储

### Phase 2: 数据可视化
- [ ] 每日统计
- [ ] 周/月图表
- [ ] 成功率趋势

### Phase 3: 移动端优化
- [ ] PWA支持
- [ ] Capacitor打包
- [ ] 推送提醒

### Phase 4: 商业化
- [ ] 付费解锁高级功能
- [ ] 内购/订阅
- [ ] 数据导出

## 快速开始

```bash
npm install
npm run dev
```

## 打包

```bash
npm run build

# iOS
npm run build:ios

# Android
npm run build:android
```

## 许可

MIT License
