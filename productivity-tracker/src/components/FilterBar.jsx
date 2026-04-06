import { CATEGORIES, CATEGORY_META, SORT_OPTIONS } from '../utils/constants'

export default function FilterBar({
  filterCat, setFilterCat,
  filterStatus, setFilterStatus,
  sortBy, setSortBy,
  onClearCompleted,
  hasDone,
}) {
  return (
    <div className="flex flex-col gap-3 mb-6">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCat('all')}
          className={`btn-ghost text-[10px] py-1.5 px-3 ${filterCat === 'all' ? 'active' : ''}`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCat(filterCat === cat ? 'all' : cat)}
            className={`btn-ghost text-[10px] py-1.5 px-3 flex items-center gap-1.5 ${filterCat === cat ? 'active' : ''}`}
          >
            <span>{CATEGORY_META[cat].icon}</span>
            {CATEGORY_META[cat].label}
          </button>
        ))}
      </div>

      {/* Status + Sort row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Status toggle */}
        <div className="flex gap-1 p-1 bg-[#0d0d14] rounded-lg border border-[#1e1e30]">
          {['all', 'pending', 'done'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-md transition-all duration-150 ${
                filterStatus === s
                  ? 'bg-[#1e1e30] text-amber-400'
                  : 'text-[#444460] hover:text-[#888]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#444460]">Sort:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="input-base py-1.5 text-xs w-36"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Clear completed */}
        {hasDone && (
          <button
            onClick={onClearCompleted}
            className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d4d]/60 hover:text-[#ff4d4d] transition-colors"
          >
            Clear Done
          </button>
        )}
      </div>
    </div>
  )
}
