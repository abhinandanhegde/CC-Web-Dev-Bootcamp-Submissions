import { useState, useEffect } from 'react'
import { STORAGE_KEY } from '../utils/constants'

// ─── Seed Data ───────────────────────────────────────────────────────────────

const SEED_TASKS = [
  {
    id: 'seed-1',
    title: 'Complete Week 2 assignment',
    priority: 'critical',
    category: 'learning',
    notes: 'Productivity tracker with React Router + hooks',
    done: false,
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'seed-2',
    title: 'Read 20 pages of a book',
    priority: 'medium',
    category: 'personal',
    notes: '',
    done: false,
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'seed-3',
    title: 'Morning workout session',
    priority: 'high',
    category: 'health',
    notes: '30 min cardio + stretching',
    done: true,
    createdAt: Date.now() - 3600000 * 5,
  },
  {
    id: 'seed-4',
    title: 'Design portfolio landing page',
    priority: 'high',
    category: 'creative',
    notes: 'Use Figma first, then implement',
    done: false,
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: 'seed-5',
    title: 'Send project update email',
    priority: 'low',
    category: 'work',
    notes: '',
    done: true,
    createdAt: Date.now() - 3600000,
  },
]

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useTasks() {
  // Load from localStorage on mount; fall back to seed data
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e)
    }
    return SEED_TASKS
  })

  // Persist to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e)
    }
  }, [tasks])

  // ── CRUD ──────────────────────────────────────────────────────────────────

  function addTask({ title, priority, category, notes }) {
    const newTask = {
      id: Math.random().toString(36).slice(2, 10),
      title: title.trim(),
      priority,
      category,
      notes: notes?.trim() || '',
      done: false,
      createdAt: Date.now(),
    }
    setTasks(prev => [newTask, ...prev])
    return newTask
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function clearCompleted() {
    setTasks(prev => prev.filter(t => !t.done))
  }

  // ── Derived Stats ─────────────────────────────────────────────────────────

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.done).length,
    pending: tasks.filter(t => !t.done).length,
    pct: tasks.length === 0 ? 0 : Math.round((tasks.filter(t => t.done).length / tasks.length) * 100),
  }

  // ── Focus Task (highest-priority incomplete task) ─────────────────────────

  const focusTask = (() => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 }
    const pending = tasks.filter(t => !t.done)
    if (!pending.length) return null
    return [...pending].sort((a, b) => order[a.priority] - order[b.priority])[0]
  })()

  return { tasks, addTask, toggleTask, deleteTask, clearCompleted, stats, focusTask }
}
