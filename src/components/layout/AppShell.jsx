import { BarChart3, LogOut, Vote } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { logoutUser } from '../../services/authService.js'
import { useAuth } from '../../hooks/useAuth.jsx'

function AppShell({ children, title, subtitle }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    try {
      setIsLoggingOut(true)
      await logoutUser()
      navigate('/', { replace: true })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 lg:px-12">
      <header className="glass-card mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4 fade-up">
        <Link to="/vote" className="flex items-center gap-2 text-slate-800">
          <span className="rounded-xl bg-teal-500/90 p-2 text-white shadow-md shadow-teal-900/20">
            <Vote className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              CloudBallot
            </p>
            <p className="text-xs text-slate-500">Secure Online Voting</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 rounded-xl bg-white/60 p-1">
          <NavLink
            to="/vote"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive ? 'bg-teal-500 text-white shadow-md' : 'text-slate-600 hover:bg-white'
              }`
            }
          >
            Vote
          </NavLink>
          <NavLink
            to="/results"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive ? 'bg-teal-500 text-white shadow-md' : 'text-slate-600 hover:bg-white'
              }`
            }
          >
            <span className="inline-flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Results
            </span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden text-right sm:block">
            <p className="text-xs text-slate-500">Signed in as</p>
            <p className="max-w-52 truncate text-sm font-semibold text-slate-700">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="secondary-btn"
          >
            <LogOut className="h-4 w-4" />
            {isLoggingOut ? 'Signing out...' : 'Logout'}
          </button>
        </div>
      </header>

      <main className="mx-auto mt-6 w-full max-w-5xl">
        <section className="glass-card rounded-3xl px-6 py-8 sm:px-8 fade-up">
          <div className="mb-8">
            <h1 className="text-2xl text-slate-800 sm:text-3xl">{title}</h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">{subtitle}</p>
          </div>
          {children}
        </section>
      </main>
    </div>
  )
}

export default AppShell
