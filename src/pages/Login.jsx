import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (err) {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />

      <div className={`min-h-screen px-6 py-16 flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-amber-50'}`}>
        <div className={`w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border shadow-xl transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>

          {/* Illustration pane */}
          <div className={`hidden md:flex relative flex-col items-center justify-center p-10 overflow-hidden ${isDark ? 'bg-gradient-to-br from-green-950 to-gray-900' : 'bg-gradient-to-br from-green-900 to-green-800'}`}>
            {/* floating sparkles */}
            <svg className="absolute top-8 left-8 opacity-70" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" fill="#facc15" />
            </svg>
            <svg className="absolute bottom-24 right-10 opacity-60" width="10" height="10" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" fill="#facc15" />
            </svg>
            <svg className="absolute top-24 right-16 opacity-50" width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" fill="#facc15" />
            </svg>

            <div className="text-yellow-400 text-xs font-semibold tracking-wide flex items-center gap-2 mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" fill="#facc15" />
              </svg>
              DESCRIBE IT. DON'T WRITE IT.
            </div>

            {/* quill + notepad sticker */}
            <svg width="180" height="180" viewBox="0 0 220 220" fill="none">
              <ellipse cx="110" cy="190" rx="70" ry="10" fill="rgba(0,0,0,0.2)" />
              <rect x="45" y="90" width="130" height="90" rx="10" fill="#fffcee" />
              <rect x="45" y="90" width="130" height="90" rx="10" stroke="#facc15" strokeWidth="2" />
              <line x1="60" y1="112" x2="140" y2="112" stroke="#14532d" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              <line x1="60" y1="128" x2="160" y2="128" stroke="#14532d" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
              <line x1="60" y1="144" x2="120" y2="144" stroke="#14532d" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
              <g transform="rotate(-25 150 70)">
                <path d="M150 30 C165 45 165 75 150 95 C135 75 135 45 150 30Z" fill="#facc15" />
                <rect x="147" y="90" width="6" height="45" rx="3" fill="#14532d" />
              </g>
              <path d="M175 55 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" fill="#ffffff" opacity="0.9" />
            </svg>

            <h2 className="text-white text-xl font-bold mt-6 text-center">Welcome back</h2>
            <p className="text-gray-300 text-sm text-center mt-2 max-w-[240px]">
              Pick up right where you left off with your HimShakti dashboard.
            </p>
          </div>

          {/* Form pane */}
          <div className="p-10">

            <h1 className={`text-3xl font-bold text-center mb-2 ${isDark ? 'text-yellow-400' : 'text-green-900'}`}>
              Login
            </h1>
            <p className={`text-sm text-center mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Access your HimShakti dashboard
            </p>

            <form onSubmit={handleSubmit}>

              <div className="mb-5">
                <label className={`block font-semibold text-sm mb-2 ${isDark ? 'text-yellow-300' : 'text-green-900'}`}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={`w-full border rounded-lg px-4 py-2 text-sm outline-none transition-colors duration-300 ${
                    isDark
                      ? 'bg-gray-700 border-gray-500 text-white placeholder-gray-400 focus:border-yellow-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-green-700'
                  }`}
                />
              </div>

              <div className="mb-6">
                <label className={`block font-semibold text-sm mb-2 ${isDark ? 'text-yellow-300' : 'text-green-900'}`}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full border rounded-lg px-4 py-2 text-sm outline-none transition-colors duration-300 ${
                    isDark
                      ? 'bg-gray-700 border-gray-500 text-white placeholder-gray-400 focus:border-yellow-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-green-700'
                  }`}
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-yellow-400 text-green-900 font-bold py-3 rounded-lg text-sm hover:bg-yellow-300 transition-all ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

            </form>

            {/* OAuth Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className={`flex-1 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>OR</span>
              <div className={`flex-1 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
            </div>

            {/* OAuth Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`}
                className={`w-full flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm font-semibold transition-all ${
                  isDark ? 'border-gray-500 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                  <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                </svg>
                Continue with Google
              </button>
              <button
                onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/github`}
                className={`w-full flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm font-semibold transition-all ${
                  isDark ? 'border-gray-500 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isDark ? '#ffffff' : '#1f2937'}>
                  <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 0-.285-.01-1.04-.016-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823 2.222 0 1.604-.014 2.896-.014 3.29 0 .32.192.694.8.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            <p className="text-center text-sm mt-4">
              <a href="/forgot-password" className={`hover:underline ${isDark ? 'text-yellow-400' : 'text-green-800'}`}>
                Forgot password?
              </a>
            </p>

            <p className={`text-center text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
              Don&#39;t have an account?{' '}
              <a href="/signup" className={`font-semibold hover:underline ${isDark ? 'text-yellow-400' : 'text-green-900'}`}>
                Sign up
              </a>
            </p>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Login