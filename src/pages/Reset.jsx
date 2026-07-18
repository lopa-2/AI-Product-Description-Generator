import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [newPassword, setNewPassword] = useState('')
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
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to reset password')
        setLoading(false)
        return
      }

      setMessage('Password reset successful! Redirecting to login...')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
        <Navbar />
        <div className={`min-h-screen px-6 py-16 flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-amber-50'}`}>
          <p className="text-red-500">Invalid or missing reset link. Please request a new one from the Forgot Password page.</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />

      <div className={`min-h-screen px-6 py-16 flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-amber-50'}`}>
        <div className={`border rounded-xl p-10 w-full max-w-md transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>

          <h1 className={`text-3xl font-bold text-center mb-2 ${isDark ? 'text-yellow-400' : 'text-green-900'}`}>
            Reset Password
          </h1>
          <p className={`text-sm text-center mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Enter your new password below
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className={`block font-semibold text-sm mb-2 ${isDark ? 'text-yellow-300' : 'text-green-900'}`}>
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                minLength={6}
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
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ResetPassword