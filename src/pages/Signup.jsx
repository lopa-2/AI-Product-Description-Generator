import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'

function Signup() {
  const [name, setName] = useState('')
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed')
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
          <div className={`hidden md:flex relative flex-col items-center justify-center p-10 overflow-hidden ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-950' : 'bg-gradient-to-br from-gray-800 to-gray-900'}`}>
            {/* floating sparkles */}
            <svg className="absolute top-8 right-10 opacity-70" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" fill="#facc15" />
            </svg>
            <svg className="absolute bottom-28 left-8 opacity-60" width="10" height="10" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" fill="#facc15" />
            </svg>
            <svg className="absolute top-28 left-14 opacity-50" width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" fill="#facc15" />
            </svg>

            <div className="text-yellow-400 text-xs font-semibold tracking-wide flex items-center gap-2 mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" fill="#facc15" />
              </svg>
              DESCRIBE IT. DON'T WRITE IT.
            </div>

            {/* checklist / new-account sticker */}
            <svg width="180" height="180" viewBox="0 0 220 220" fill="none">
              <ellipse cx="110" cy="190" rx="70" ry="10" fill="rgba(0,0,0,0.25)" />
              <rect x="50" y="80" width="120" height="100" rx="10" fill="#fffcee" />
              <rect x="50" y="80" width="120" height="100" rx="10" stroke="#facc15" strokeWidth="2" />
              <rect x="82" y="72" width="56" height="16" rx="6" fill="#facc15" />

              <circle cx="70" cy="106" r="6" fill="none" stroke="#292524" strokeWidth="2.5" opacity="0.55" />
              <path d="M67 106l2 2 4-4" stroke="#292524" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
              <line x1="86" y1="106" x2="150" y2="106" stroke="#292524" strokeWidth="3" strokeLinecap="round" opacity="0.4" />

              <circle cx="70" cy="128" r="6" fill="none" stroke="#292524" strokeWidth="2.5" opacity="0.55" />
              <path d="M67 128l2 2 4-4" stroke="#292524" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
              <line x1="86" y1="128" x2="140" y2="128" stroke="#292524" strokeWidth="3" strokeLinecap="round" opacity="0.3" />

              <circle cx="70" cy="150" r="6" fill="none" stroke="#facc15" strokeWidth="2.5" />
              <line x1="86" y1="150" x2="130" y2="150" stroke="#292524" strokeWidth="3" strokeLinecap="round" opacity="0.2" />

              <path d="M175 60 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" fill="#ffffff" opacity="0.9" />
            </svg>

            <h2 className="text-white text-xl font-bold mt-6 text-center">Join DescribeIt</h2>
            <p className="text-gray-300 text-sm text-center mt-2 max-w-[240px]">
              Create an account and start turning product details into ready-to-publish copy.
            </p>
          </div>

          {/* Form pane */}
          <div className="p-10">

            <h1 className={`text-3xl font-bold text-center mb-2 ${isDark ? 'text-yellow-400' : 'text-gray-900'}`}>
              Sign Up
            </h1>
            <p className={`text-sm text-center mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Create your DescribeIt account
            </p>

            <form onSubmit={handleSubmit}>

              <div className="mb-5">
                <label className={`block font-semibold text-sm mb-2 ${isDark ? 'text-yellow-300' : 'text-gray-900'}`}>
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className={`w-full border rounded-lg px-4 py-2 text-sm outline-none transition-colors duration-300 ${
                    isDark
                      ? 'bg-gray-700 border-gray-500 text-white placeholder-gray-400 focus:border-yellow-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500'
                  }`}
                />
              </div>

              <div className="mb-5">
                <label className={`block font-semibold text-sm mb-2 ${isDark ? 'text-yellow-300' : 'text-gray-900'}`}>
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
                      : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500'
                  }`}
                />
              </div>

              <div className="mb-6">
                <label className={`block font-semibold text-sm mb-2 ${isDark ? 'text-yellow-300' : 'text-gray-900'}`}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                  className={`w-full border rounded-lg px-4 py-2 text-sm outline-none transition-colors duration-300 ${
                    isDark
                      ? 'bg-gray-700 border-gray-500 text-white placeholder-gray-400 focus:border-yellow-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500'
                  }`}
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg text-sm hover:bg-yellow-300 transition-all ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>

            </form>

            <p className={`text-center text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
              Already have an account?{' '}
              <a href="/login" className={`font-semibold hover:underline ${isDark ? 'text-yellow-400' : 'text-gray-900'}`}>
                Login
              </a>
            </p>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Signup