// ─── Priority Config ────────────────────────────────────────────────────────

export const PRIORITIES = ['critical', 'high', 'medium', 'low']

export const PRIORITY_META = {
  critical: { label: 'Critical', color: '#ff4d4d', bg: 'rgba(255,77,77,0.12)', order: 0 },
  high:     { label: 'High',     color: '#ff9500', bg: 'rgba(255,149,0,0.12)',  order: 1 },
  medium:   { label: 'Medium',   color: '#f5c518', bg: 'rgba(245,197,24,0.12)', order: 2 },
  low:      { label: 'Low',      color: '#4caf50', bg: 'rgba(76,175,80,0.12)',  order: 3 },
}

// ─── Category Config ────────────────────────────────────────────────────────

export const CATEGORIES = ['work', 'personal', 'learning', 'health', 'creative']

export const CATEGORY_META = {
  work:     { label: 'Work',     icon: '💼', color: '#6eb5ff' },
  personal: { label: 'Personal', icon: '🏡', color: '#c084fc' },
  learning: { label: 'Learning', icon: '📚', color: '#34d399' },
  health:   { label: 'Health',   icon: '💪', color: '#f87171' },
  creative: { label: 'Creative', icon: '🎨', color: '#fb923c' },
}

// ─── Sort Options ───────────────────────────────────────────────────────────

export const SORT_OPTIONS = [
  { value: 'newest',   label: 'Newest First' },
  { value: 'oldest',   label: 'Oldest First' },
  { value: 'priority', label: 'By Priority' },
  { value: 'alpha',    label: 'A → Z' },
]

// ─── localStorage Key ───────────────────────────────────────────────────────

export const STORAGE_KEY = 'taskos_tasks'
