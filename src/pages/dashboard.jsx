import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'

const API_URL = 'http://localhost:5000/api/descriptions'

function authHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

function Dashboard() {
  const [listings, setListings] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const [saving, setSaving] = useState(false)
  const { isDark } = useTheme()

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL, { headers: authHeaders() })
      if (!res.ok) throw new Error('Failed to load listings')
      const data = await res.json()
      setListings(data)
      if (data.length > 0) setSelected(data[0])
    } catch (err) {
      setError('Could not load your saved listings. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (item) => {
    setSelected(item)
    setIsEditing(false)
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      if (!res.ok) throw new Error('Delete failed')
      const updated = listings.filter((item) => item.id !== id)
      setListings(updated)
      setSelected(updated.length > 0 ? updated[0] : null)
      setIsEditing(false)
    } catch (err) {
      setError('Failed to delete listing.')
    }
  }

  const startEditing = () => {
    setEditText(selected.description)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setEditText('')
  }

  const handleUpdate = async () => {
    setSaving(true)
    try {
      const res = await fetch(`${API_URL}/${selected.id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ description: editText }),
      })
      if (!res.ok) throw new Error('Update failed')
      const updatedItem = await res.json()

      setListings(listings.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
      setSelected(updatedItem)
      setIsEditing(false)
    } catch (err) {
      setError('Failed to update description.')
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (isoString) => {
    if (!isoString) return ''
    return new Date(isoString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      <div className={`min-h-screen px-6 py-12 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-amber-50'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-yellow-400' : 'text-green-900'}`}>
                My Saved Listings
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {listings.length} descriptions saved
              </p>
            </div>
            <a
              href="/generator"
              className="bg-yellow-400 text-green-900 font-bold px-5 py-2 rounded-lg text-sm hover:bg-yellow-300"
            >
              + Generate New
            </a>
          </div>

          {loading && <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && listings.length === 0 && (
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              No descriptions saved yet. Generate one to get started!
            </p>
          )}

          {!loading && !error && listings.length > 0 && (
            <div className="grid grid-cols-3 gap-6">
              {/* LEFT LIST */}
              <div className="col-span-1 flex flex-col gap-3">
                {listings.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all ${
                      selected?.id === item.id
                        ? isDark
                          ? 'bg-gray-700 border-yellow-400 border-2'
                          : 'bg-green-50 border-green-800 border-2'
                        : isDark
                          ? 'bg-gray-800 border-gray-600'
                          : 'bg-white border-gray-200'
                    }`}
                  >
                    <p className={`font-semibold text-sm ${isDark ? 'text-yellow-300' : 'text-green-900'}`}>
                      {item.productName}
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                      {item.tone} · {formatDate(item.createdAt)}
                    </p>
                  </div>
                ))}
              </div>

              {/* RIGHT DETAIL */}
              {selected && (
                <div className={`col-span-2 border rounded-xl p-6 transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
                  <div
                    className={`rounded-lg p-8 mb-5 flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-green-50'}`}
                    style={{ minHeight: '120px' }}
                  >
                    <span className={`text-xs font-semibold uppercase tracking-wide ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      Product Image
                    </span>
                  </div>
                  <span className="bg-green-900 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                    {selected.tone}
                  </span>
                  <h2 className={`text-xl font-bold mt-3 mb-2 ${isDark ? 'text-yellow-400' : 'text-green-900'}`}>
                    {selected.productName}
                  </h2>

                  {!isEditing ? (
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selected.description}
                    </p>
                  ) : (
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={6}
                      className={`w-full text-sm rounded-lg p-3 border mt-2 ${
                        isDark
                          ? 'bg-gray-900 border-gray-600 text-gray-200'
                          : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    />
                  )}

                  <div className="flex gap-3 mt-5">
                    {!isEditing ? (
                      <>
                        <button
                          onClick={() => navigator.clipboard.writeText(selected.description)}
                          className="bg-yellow-400 text-green-900 font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-300"
                        >
                          Copy
                        </button>
                        <button
                          onClick={startEditing}
                          className="border border-green-700 text-green-800 px-4 py-2 rounded-lg text-sm hover:bg-green-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(selected.id)}
                          className="border border-red-400 text-red-500 px-4 py-2 rounded-lg text-sm hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleUpdate}
                          disabled={saving}
                          className="bg-yellow-400 text-green-900 font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-300 disabled:opacity-50"
                        >
                          {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="border border-gray-400 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard