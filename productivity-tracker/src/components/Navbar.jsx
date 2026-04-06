import { NavLink } from 'react-router-dom'

export default function Navbar({ stats }) {
  const navClass = ({ isActive }) =>
    `relative px-5 py-2 text-xs font-bold uppercase tracking-widest font-mono transition-all duration-200 rounded-lg border ${
      isActive
        ? 'bg-amber-400 text-[#0d0d14] border-amber-400 shadow-[0_0_16px_rgba(245,197,24,0.35)]'
        : 'text-[#555] border-[#1e1e30] hover:text-amber-400 hover:border-amber-400'
    }`

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a10]/95 backdrop-blur border-b border-[#1e1e30]">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-amber-400 flex items-center justify-center">
            <span className="text-[#0d0d14] text-sm font-black">T</span>
          </div>
          <span className="font-mono font-bold tracking-[0.2em] text-sm text-amber-400 uppercase">
            TaskOS
          </span>
        </div>

        {/* Nav Links */}
        <div className="flex gap-2">
          <NavLink to="/" end className={navClass}>
            Dashboard
          </NavLink>
          <NavLink to="/focus" className={navClass}>
            <span className="flex items-center gap-2">
              Focus
              {stats.pending > 0 && (
                <span className="bg-[#ff4d4d] text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {stats.pending > 9 ? '9+' : stats.pending}
                </span>
              )}
            </span>
          </NavLink>
        </div>

        {/* Progress Pill */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
          <div className="w-24 h-1.5 bg-[#1e1e30] rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-700"
              style={{ width: `${stats.pct}%` }}
            />
          </div>
          <span className="text-[#555]">{stats.pct}%</span>
        </div>

      </div>
    </nav>
  )
}
