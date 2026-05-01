export default function ThemeToggle({ theme, setTheme }) {
  const themes = ['dark', 'light', 'accent']
  return (
    <div className="theme-toggle">
      {themes.map(t => (
        <button
          key={t}
          className={`theme-btn ${theme === t ? 'active' : ''}`}
          onClick={() => setTheme(t)}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
