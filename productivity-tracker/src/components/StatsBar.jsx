import { PRIORITY_META } from '../utils/constants'

function StatCard({ value, label, accent, children }) {
  return (
    <div
      className="flex-1 min-w-[110px] card p-4 rounded-xl"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      <div className="text-2xl font-black font-mono" style={{ color: accent }}>
        {value}
      </div>
      <div className="text-[10px] text-[#444460] uppercase tracking-widest mt-1 font-mono">
        {label}
      </div>
      {children}
    </div>
  )
}

export default function StatsBar({ stats, tasks }) {
  const critical = tasks.filter(t => t.priority === 'critical' && !t.done).length
  const streakDays = (() => {
    // Simple: count unique days with a completed task (last 7 days)
    const now = Date.now()
    const days = new Set(
      tasks
        .filter(t => t.done)
        .map(t => {
          const d = new Date(t.createdAt)
          return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
        })
    )
    return days.size
  })()

  return (
    <div className="flex gap-3 flex-wrap mb-8">
      <StatCard value={stats.total}   label="Total Tasks"     accent="#6eb5ff" />
      <StatCard value={stats.done}    label="Completed"       accent="#4caf50" />
      <StatCard value={stats.pending} label="Remaining"       accent="#f5c518" />
      <StatCard value={`${stats.pct}%`} label="Progress"     accent="#c084fc">
        <div className="mt-2 h-1 bg-[#1e1e30] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${stats.pct}%`, background: '#c084fc' }}
          />
        </div>
      </StatCard>
      {critical > 0 && (
        <StatCard value={critical} label="Critical Left" accent={PRIORITY_META.critical.color} />
      )}
    </div>
  )
}
