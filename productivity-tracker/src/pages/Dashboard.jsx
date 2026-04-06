import { useState, useMemo } from 'react'
import { PRIORITY_META } from '../utils/constants'
import StatsBar from '../components/StatsBar'
import TaskForm from '../components/TaskForm'
import FilterBar from '../components/FilterBar'
import TaskCard from '../components/TaskCard'

export default function Dashboard({ tasks, addTask, toggleTask, deleteTask, clearCompleted, stats }) {
  const [filterCat, setFilterCat]       = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy]             = useState('newest')

  // Apply filters + sort
  const visible = useMemo(() => {
    let list = [...tasks]

    // Category filter
    if (filterCat !== 'all') list = list.filter(t => t.category === filterCat)

    // Status filter
    if (filterStatus === 'pending') list = list.filter(t => !t.done)
    if (filterStatus === 'done')    list = list.filter(t => t.done)

    // Sort
    const orderMap = { critical: 0, high: 1, medium: 2, low: 3 }
    if (sortBy === 'newest')   list.sort((a, b) => b.createdAt - a.createdAt)
    if (sortBy === 'oldest')   list.sort((a, b) => a.createdAt - b.createdAt)
    if (sortBy === 'priority') list.sort((a, b) => orderMap[a.priority] - orderMap[b.priority])
    if (sortBy === 'alpha')    list.sort((a, b) => a.title.localeCompare(b.title))

    return list
  }, [tasks, filterCat, filterStatus, sortBy])

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-[#e8e6df]">
          Mission Control
        </h1>
        <p className="text-sm text-[#444460] font-mono mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats */}
      <StatsBar stats={stats} tasks={tasks} />

      {/* Add Task Form */}
      <TaskForm onAdd={addTask} />

      {/* Filters */}
      <FilterBar
        filterCat={filterCat}       setFilterCat={setFilterCat}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        sortBy={sortBy}             setSortBy={setSortBy}
        onClearCompleted={clearCompleted}
        hasDone={tasks.some(t => t.done)}
      />

      {/* Divider label */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#333350]">
          Tasks — {visible.length}
        </span>
        <div className="flex-1 h-px bg-[#1e1e30]" />
      </div>

      {/* Task List */}
      {visible.length === 0 ? (
        <div className="text-center py-16 text-[#333350] font-mono text-sm">
          <div className="text-4xl mb-4">⬜</div>
          <p>No tasks match this filter.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {visible.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}
    </div>
  )
}
