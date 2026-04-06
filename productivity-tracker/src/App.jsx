import { Routes, Route } from 'react-router-dom'
import { useTasks } from './hooks/useTasks'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import FocusMode from './pages/FocusMode'

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted, stats, focusTask } = useTasks()

  // Shared props passed down to both pages
  const sharedProps = { tasks, toggleTask, deleteTask }

  return (
    <div className="min-h-screen grid-bg">
      <Navbar stats={stats} />

      <main className="max-w-4xl mx-auto px-6 py-10">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                {...sharedProps}
                addTask={addTask}
                clearCompleted={clearCompleted}
                stats={stats}
              />
            }
          />
          <Route
            path="/focus"
            element={
              <FocusMode
                {...sharedProps}
                focusTask={focusTask}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}
