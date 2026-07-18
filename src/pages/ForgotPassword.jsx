import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { isDark } = useTheme()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      setMessage('If that email exists, a reset link has been sent. Check your inbox.')
      setLoading(false)
    } catch (err) {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />

      <div className={`min-h-screen px-6 py-16 flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-amber-50'}`}>
        <div className={`border rounded-xl p-10 w-full max-w-md transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>

          <h1 className={`text-3xl font-bold text-center mb-2 ${isDark ? 'text-yellow-400' : 'text-green-900'}`}>
            Forgot Password
          </h1>
          <p className={`text-sm text-center mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Enter your email and we'll send you a reset link
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
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

            {message && (
              <p className="text-green-600 text-sm mb-4">{message}</p>
            )}
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-yellow-400 text-green-900 font-bold py-3 rounded-lg text-sm hover:bg-yellow-300 transition-all ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <p className={`text-center text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
            Remembered your password?{' '}
            <a href="/login" className={`font-semibold hover:underline ${isDark ? 'text-yellow-400' : 'text-green-900'}`}>
              Login
            </a>
          </p>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ForgotPassword