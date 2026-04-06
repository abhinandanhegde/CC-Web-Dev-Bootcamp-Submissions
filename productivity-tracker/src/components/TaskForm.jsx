import { useState } from 'react'
import { PRIORITIES, CATEGORIES, PRIORITY_META, CATEGORY_META } from '../utils/constants'

const EMPTY = { title: '', priority: 'medium', category: 'work', notes: '' }

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY)
  const [open, setOpen] = useState(false)
  const [shake, setShake] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setShake(true)
      setTimeout(() => setShake(false), 400)
      return
    }
    onAdd(form)
    setForm(EMPTY)
    setOpen(false)
  }

  return (
    <div className="mb-6">
      {/* Toggle Button */}
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full card border-dashed border-[#2a2a3e] rounded-xl p-4 text-[#444460] hover:text-amber-400 hover:border-amber-400 transition-all duration-200 flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-widest"
        >
          <span className="text-lg leading-none">+</span> Add New Task
        </button>
      ) : (
        <div className="card rounded-xl p-5 animate-[slideUp_0.25s_ease_forwards] border-amber-400/30">
          {/* Form Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-400 font-bold">
              New Task
            </span>
            <button
              onClick={() => { setOpen(false); setForm(EMPTY) }}
              className="text-[#444460] hover:text-[#888] text-lg leading-none"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Title */}
            <input
              className={`input-base ${shake ? 'animate-[shake_0.4s_ease]' : ''}`}
              name="title"
              placeholder="Task title…"
              value={form.title}
              onChange={handleChange}
              autoFocus
            />

            {/* Priority + Category row */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#444460] mb-1.5">
                  Priority
                </label>
                <select
                  className="input-base"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  {PRIORITIES.map(p => (
                    <option key={p} value={p}>{PRIORITY_META[p].label}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#444460] mb-1.5">
                  Category
                </label>
                <select
                  className="input-base"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>
                      {CATEGORY_META[c].icon} {CATEGORY_META[c].label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <textarea
              className="input-base resize-none h-20 text-sm"
              name="notes"
              placeholder="Notes (optional)…"
              value={form.notes}
              onChange={handleChange}
            />

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button type="submit" className="btn-primary flex-1">
                Add Task
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => { setOpen(false); setForm(EMPTY) }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
