import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRIORITY_META, CATEGORY_META } from '../utils/constants'
import TaskCard from '../components/TaskCard'

export default function FocusMode({ focusTask, tasks, toggleTask, deleteTask }) {
  const [mode, setMode] = useState('top') // 'top' | 'random'
  const [randomTask, setRandomTask] = useState(null)
  const [celebrating, setCelebrating] = useState(false)

  const pendingTasks = tasks.filter(t => !t.done)

  function pickRandom() {
    if (!pendingTasks.length) return
    const r = pendingTasks[Math.floor(Math.random() * pendingTasks.length)]
    setRandomTask(r)
    setMode('random')
  }

  function handleToggle(id) {
    toggleTask(id)
    if (mode === 'top' && focusTask?.id === id) {
      setCelebrating(true)
      setTimeout(() => setCelebrating(false), 2000)
    }
    if (mode === 'random' && randomTask?.id === id) {
      setRandomTask(null)
    }
  }

  const activeTask = mode === 'top' ? focusTask : randomTask
  const pm = activeTask ? PRIORITY_META[activeTask.priority] : null
  const cm = activeTask ? CATEGORY_META[activeTask.category] : null

  // All pending, sorted by priority
  const orderMap = { critical: 0, high: 1, medium: 2, low: 3 }
  const sortedPending = [...pendingTasks].sort(
    (a, b) => orderMap[a.priority] - orderMap[b.priority]
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-[#e8e6df]">
          Focus Mode
        </h1>
        <p className="text-sm text-[#444460] font-mono mt-1">
          One task at a time. Kill distractions.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => { setMode('top'); setRandomTask(null) }}
          className={`btn-ghost ${mode === 'top' ? 'active' : ''}`}
        >
          🎯 Top Priority
        </button>
        <button
          onClick={pickRandom}
          className={`btn-ghost ${mode === 'random' ? 'active' : ''}`}
        >
          🎲 Pick Random
        </button>
        {mode === 'random' && (
          <button onClick={pickRandom} className="btn-ghost text-amber-400 border-amber-400/40">
            ↺ Re-roll
          </button>
        )}
      </div>

      {/* Focus Card */}
      {celebrating ? (
        <div className="card rounded-2xl p-10 text-center border-[#4caf50]/40 border-2 mb-8">
          <div className="text-5xl mb-4">🎉</div>
          <p className="text-xl font-black text-[#4caf50]">Task Crushed!</p>
          <p className="text-sm text-[#444460] font-mono mt-2">
            Next priority loading…
          </p>
        </div>
      ) : activeTask ? (
        <div
          className="card rounded-2xl p-8 mb-8 focus-pulse relative overflow-hidden"
          style={{
            borderColor: `${pm.color}44`,
            borderWidth: '2px',
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${pm.color}0a 0%, transparent 70%)`,
            }}
          />

          {/* Priority label */}
          <div className="relative flex items-center gap-3 mb-6">
            <span
              className="badge"
              style={{ color: pm.color, borderColor: `${pm.color}44`, background: pm.bg }}
            >
              {pm.label} Priority
            </span>
            <span
              className="badge"
              style={{ color: cm.color, borderColor: `${cm.color}44`, background: `${cm.color}14` }}
            >
              {cm.icon} {cm.label}
            </span>
            {mode === 'random' && (
              <span className="badge" style={{ color: '#888', borderColor: '#333' }}>
                🎲 Random
              </span>
            )}
          </div>

          {/* Task Title */}
          <h2
            className="relative text-3xl font-black leading-tight mb-3"
            style={{ color: pm.color }}
          >
            {activeTask.title}
          </h2>

          {activeTask.notes && (
            <p className="relative text-sm text-[#666680] leading-relaxed mb-6">
              {activeTask.notes}
            </p>
          )}

          {/* Actions */}
          <div className="relative flex gap-3">
            <button
              onClick={() => handleToggle(activeTask.id)}
              className="btn-primary flex-1"
              style={{ background: pm.color }}
            >
              ✓ Mark Complete
            </button>
            <button
              onClick={() => deleteTask(activeTask.id)}
              className="btn-ghost text-[#ff4d4d]/60 hover:text-[#ff4d4d] hover:border-[#ff4d4d]/40"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="card rounded-2xl p-10 text-center mb-8">
          {pendingTasks.length === 0 ? (
            <>
              <div className="text-5xl mb-4">🏆</div>
              <p className="text-xl font-black text-amber-400">All done!</p>
              <p className="text-sm text-[#444460] font-mono mt-2">You've cleared every task.</p>
              <Link to="/" className="btn-primary inline-block mt-6">
                Add More Tasks
              </Link>
            </>
          ) : (
            <>
              <div className="text-5xl mb-4">🎲</div>
              <p className="text-sm text-[#444460] font-mono">Hit "Pick Random" to get a task</p>
            </>
          )}
        </div>
      )}

      {/* Priority Queue — remaining tasks */}
      {sortedPending.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#333350]">
              Priority Queue — {sortedPending.length}
            </span>
            <div className="flex-1 h-px bg-[#1e1e30]" />
          </div>
          <div className="flex flex-col gap-2">
            {sortedPending.map((task, i) => (
              <div key={task.id} className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-[#333350] w-5 text-right flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <TaskCard task={task} onToggle={handleToggle} onDelete={deleteTask} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
