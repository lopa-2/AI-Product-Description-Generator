import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'

const API_URL = `${import.meta.env.VITE_API_URL}/api/descriptions`

function authHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

const CARD = '#111114'
const BORDER = 'rgba(255,255,255,0.10)'
const BORDER_ACTIVE = 'rgba(255,255,255,0.35)'
const MUTED = 'rgba(255,255,255,0.55)'
const FAINT = 'rgba(255,255,255,0.28)'

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

  const pageBg = isDark ? 'bg-black' : 'bg-[#F4F1EA]'
  const heading = isDark ? 'text-white' : 'text-[#111114]'
  const subtext = isDark ? 'text-white/50' : 'text-gray-500'

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      <div className={`min-h-screen px-6 pt-28 pb-16 transition-colors duration-300 ${pageBg}`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className={`text-3xl font-bold ${heading}`}>My Saved Listings</h1>
              <p className={`text-sm mt-1 ${subtext}`}>{listings.length} descriptions saved</p>
            </div>
            <a
              href="/generator"
              className="font-bold px-5 py-2.5 rounded-full text-sm border transition-colors"
              style={{ borderColor: isDark ? BORDER : '#111114', color: isDark ? '#fff' : '#111114' }}
            >
              + Generate New
            </a>
          </div>

          {loading && <p className={subtext}>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && listings.length === 0 && (
            <p className={subtext}>No descriptions saved yet. Generate one to get started!</p>
          )}

          {!loading && !error && listings.length > 0 && (
            <div className="grid grid-cols-3 gap-6">
              {/* LEFT LIST */}
              <div className="col-span-1 flex flex-col gap-3">
                {listings.map((item, i) => {
                  const isActive = selected?.id === item.id
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="cursor-pointer rounded-2xl p-5 border transition-all"
                      style={{
                        backgroundColor: CARD,
                        borderColor: isActive ? BORDER_ACTIVE : BORDER,
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl font-bold" style={{ color: FAINT }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className="text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full border"
                          style={{ borderColor: BORDER, color: MUTED }}
                        >
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-1" style={{ color: MUTED }}>
                        {item.tone}
                      </p>
                      <p className="font-semibold text-sm text-white">{item.productName}</p>
                    </div>
                  )
                })}
              </div>

              {/* RIGHT DETAIL */}
              {selected && (
                <div className="col-span-2 rounded-2xl p-8 border" style={{ backgroundColor: CARD, borderColor: BORDER }}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl font-bold" style={{ color: FAINT }}>
                      {String(listings.findIndex((l) => l.id === selected.id) + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="text-[10px] font-semibold tracking-wide px-3 py-1.5 rounded-full border"
                      style={{ borderColor: BORDER, color: MUTED }}
                    >
                      {formatDate(selected.createdAt)}
                    </span>
                  </div>

                  <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-2" style={{ color: MUTED }}>
                    {selected.tone}
                  </p>
                  <h2 className="text-2xl font-bold mb-1 text-white">{selected.productName}</h2>
                  {(selected.brandName || selected.price) && (
                    <p className="text-xs mb-5" style={{ color: MUTED }}>
                      {selected.brandName && <span>{selected.brandName}</span>}
                      {selected.brandName && selected.price && <span> · </span>}
                      {selected.price && <span>{selected.price}</span>}
                    </p>
                  )}

                  {!isEditing ? (
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      {selected.description}
                    </p>
                  ) : (
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={6}
                      className="w-full text-sm rounded-xl p-3 border mt-2 bg-black/40 text-white/85"
                      style={{ borderColor: BORDER }}
                    />
                  )}

                  <div className="flex gap-3 mt-6">
                    {!isEditing ? (
                      <>
                        <button
                          onClick={() => navigator.clipboard.writeText(selected.description)}
                          className="bg-white text-black font-bold px-4 py-2 rounded-full text-sm hover:opacity-85"
                        >
                          Copy
                        </button>
                        <button
                          onClick={startEditing}
                          className="px-4 py-2 rounded-full text-sm border text-white hover:bg-white/5"
                          style={{ borderColor: BORDER }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${selected.productName}"? This can't be undone.`)) {
                              handleDelete(selected.id)
                            }
                          }}
                          className="px-4 py-2 rounded-full text-sm border border-red-500/40 text-red-400 hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleUpdate}
                          disabled={saving}
                          className="bg-white text-black font-bold px-4 py-2 rounded-full text-sm hover:opacity-85 disabled:opacity-50"
                        >
                          {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="px-4 py-2 rounded-full text-sm border text-white hover:bg-white/5"
                          style={{ borderColor: BORDER }}
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