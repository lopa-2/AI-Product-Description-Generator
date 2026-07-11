import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem('token')

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav
      className={`px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-300 ${
        isDark
          ? 'bg-gray-900 text-white'
          : 'bg-green-900 text-white'
      }`}
    >
      {/* Logo */}
      <h1 className="text-yellow-400 font-bold text-2xl">
        HimShakti
      </h1>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
        <Link to="/" className="hover:text-yellow-400 transition">
          Home
        </Link>

        <Link to="/about" className="hover:text-yellow-400 transition">
          About
        </Link>

        <Link to="/dashboard" className="hover:text-yellow-400 transition">
          Dashboard
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="hover:text-yellow-400 transition"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:text-yellow-400 transition">
            Login
          </Link>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`px-3 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-300 ${
            isDark
              ? 'bg-yellow-400 text-gray-900 border-yellow-400'
              : 'bg-gray-800 text-yellow-400 border-gray-600'
          }`}
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar