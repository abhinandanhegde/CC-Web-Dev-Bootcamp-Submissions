import { useState } from 'react'
import { PRIORITY_META, CATEGORY_META } from '../utils/constants'

export default function TaskCard({ task, onToggle, onDelete }) {
  const [confirming, setConfirming] = useState(false)
  const pm = PRIORITY_META[task.priority]
  const cm = CATEGORY_META[task.category]

  const timeAgo = (() => {
    const diff = Date.now() - task.createdAt
    const m = Math.floor(diff / 60000)
    const h = Math.floor(diff / 3600000)
    const d = Math.floor(diff / 86400000)
    if (d > 0) return `${d}d ago`
    if (h > 0) return `${h}h ago`
    if (m > 0) return `${m}m ago`
    return 'just now'
  })()

  function handleDelete() {
    if (!confirming) { setConfirming(true); return }
    onDelete(task.id)
  }

  return (
    <div
      className={`card rounded-xl p-4 transition-all duration-300 group task-enter ${
        task.done
          ? 'opacity-50 bg-[#0d0d14]'
          : 'hover:border-[#2a2a3e] hover:bg-[#13131f]'
      }`}
      style={
        !task.done
          ? { borderLeftColor: pm.color, borderLeftWidth: '3px' }
          : {}
      }
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
            task.done
              ? 'border-[#4caf50] bg-[#4caf50]'
              : 'border-[#2a2a3e] hover:border-amber-400'
          }`}
          title={task.done ? 'Mark pending' : 'Mark done'}
        >
          {task.done && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="#0d0d14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm leading-snug ${task.done ? 'line-through text-[#444460]' : 'text-[#e8e6df]'}`}>
            {task.title}
          </p>
          {task.notes && (
            <p className="text-xs text-[#444460] mt-1 leading-relaxed line-clamp-2">
              {task.notes}
            </p>
          )}

          {/* Tags row */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {/* Priority badge */}
            <span
              className="badge text-[9px]"
              style={{ color: pm.color, borderColor: `${pm.color}44`, background: pm.bg }}
            >
              {pm.label}
            </span>

            {/* Category badge */}
            <span
              className="badge text-[9px]"
              style={{ color: cm.color, borderColor: `${cm.color}44`, background: `${cm.color}14` }}
            >
              {cm.icon} {cm.label}
            </span>

            {/* Time */}
            <span className="text-[9px] font-mono text-[#333350] ml-auto">
              {timeAgo}
            </span>
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={handleDelete}
          onBlur={() => setConfirming(false)}
          className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all duration-200 opacity-0 group-hover:opacity-100 ${
            confirming
              ? 'bg-[#ff4d4d] text-white opacity-100'
              : 'text-[#333350] hover:text-[#ff4d4d] hover:bg-[#ff4d4d1a]'
          }`}
          title={confirming ? 'Click again to confirm' : 'Delete task'}
        >
          {confirming ? '!' : '×'}
        </button>
      </div>
    </div>
  )
}
