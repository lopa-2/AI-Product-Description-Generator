import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'
import { generateDescription, saveDescription } from '../api'

const tones = ['Professional', 'Friendly', 'Bold']

function Generator() {
  const [productName, setProductName] = useState('')
  const [brandName, setBrandName] = useState('')
  const [weight, setWeight] = useState('')
  const [price, setPrice] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [tone, setTone] = useState('Professional')
  const [keywords, setKeywords] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const { isDark } = useTheme()

  // Brand colors, matching Home.jsx
  const green = '#1F3A28'
  const gold = '#C9A227'

  const handleGenerate = async () => {
    if (!productName) return
    setLoading(true)
    setResult('')
    setError('')
    setSaved(false)

    try {
      const data = await generateDescription({
        productName,
        brandName: brandName || undefined,
        ingredients: ingredients || keywords || productName,
        weight: weight || '',
        features: keywords || '',
        tone: tone.toLowerCase(),
        price: price || undefined,
      })
      setResult(data.description)
    } catch (err) {
      setError('⚠️ Failed to generate. Check your API key or try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!result) return
    try {
      await saveDescription({
        productName,
        brandName: brandName || undefined,
        tone: tone.toLowerCase(),
        description: result,
      })
      setSaved(true)
    } catch (err) {
      setError('⚠️ Failed to save description.')
    }
  }

  const inputClass = `w-full border rounded-lg px-4 py-2 text-sm outline-none transition-colors duration-300 ${
    isDark
      ? 'bg-[#16281C] border-[#2A4A34] text-white placeholder-white/40 focus:border-[#C9A227]'
      : 'bg-white border-gray-300 text-gray-900 focus:border-[#1F3A28]'
  }`
  const labelClass = `block font-semibold text-sm mb-2 ${isDark ? 'text-[#C9A227]' : 'text-[#1F3A28]'}`
  const cardClass = `border rounded-xl p-8 transition-colors duration-300 ${
    isDark ? 'bg-[#16281C] border-[#2A4A34]' : 'bg-white border-gray-200'
  }`

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0E1A12] text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />

      <div className={`min-h-screen px-6 pt-28 pb-12 transition-colors duration-300 ${isDark ? 'bg-[#12291C]' : 'bg-[#F3F6F0]'}`}>
        <div className="max-w-2xl mx-auto">

          <h1 className={`text-3xl font-bold text-center mb-2 ${isDark ? 'text-[#C9A227]' : 'text-[#1F3A28]'}`}>
            Description Generator
          </h1>
          <p className={`text-sm text-center mb-10 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
            Enter your product details and get an Amazon-optimised listing instantly
          </p>

          {/* Form Card */}
          <div className={cardClass}>
            <div className="mb-5">
              <label className={labelClass}>Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Raw Himalayan Honey"
                className={inputClass}
              />
            </div>

            <div className="mb-5">
              <label className={labelClass}>Brand Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Himalayan Roots"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelClass}>Weight/Size</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 500g"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. ₹499"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mb-5">
              <label className={labelClass}>
                Ingredients <span className={`font-normal ${isDark ? 'text-white/40' : 'text-gray-400'}`}>(optional)</span>
              </label>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g. raw honey, wild forest turmeric"
                className={inputClass}
              />
            </div>

            <div className="mb-5">
              <label className={labelClass}>Tone</label>
              <div className="flex gap-3">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    style={tone === t ? { backgroundColor: green, color: gold, borderColor: green } : undefined}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      tone === t
                        ? ''
                        : isDark
                          ? 'bg-[#16281C] text-white/60 border-[#2A4A34] hover:border-[#C9A227]'
                          : 'bg-white text-gray-500 border-gray-300 hover:border-[#1F3A28]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className={labelClass}>
                Keywords <span className={`font-normal ${isDark ? 'text-white/40' : 'text-gray-400'}`}>(optional)</span>
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. organic, raw, cold-pressed"
                className={inputClass}
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={handleGenerate}
              disabled={loading || !productName}
              style={loading || !productName ? undefined : { backgroundColor: gold, color: green }}
              className={`w-full font-bold py-3 rounded-lg text-sm transition-all ${
                loading || !productName ? 'opacity-60 cursor-not-allowed bg-gray-300 text-gray-600' : 'hover:opacity-90'
              }`}
            >
              {loading ? 'Generating...' : 'Generate Description ✨'}
            </button>
          </div>

          {/* Result */}
          {(loading || result) && (
            <div className={`${cardClass} mt-6`}>
              <h3 className={labelClass} style={{ marginBottom: '0.75rem' }}>Generated Description</h3>
              {loading ? (
                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-400'}`}>⏳ Writing your listing...</p>
              ) : (
                <>
                  <textarea
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    rows={6}
                    className={`w-full text-sm leading-relaxed rounded-lg p-3 border outline-none resize-none transition-colors duration-300 ${
                      isDark ? 'bg-[#0E1A12] border-[#2A4A34] text-white/80' : 'bg-[#F3F6F0] border-gray-200 text-gray-600'
                    }`}
                  />

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => navigator.clipboard.writeText(result)}
                      style={{ backgroundColor: gold, color: green }}
                      className="font-bold px-5 py-2 rounded-lg text-sm hover:opacity-90"
                    >
                      Copy to Clipboard
                    </button>
                    <button
                      onClick={handleGenerate}
                      style={{ borderColor: isDark ? gold : green, color: isDark ? gold : green }}
                      className="px-5 py-2 rounded-lg text-sm font-bold border transition-all hover:opacity-80"
                    >
                      Regenerate 🔄
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saved}
                      className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                        saved
                          ? 'bg-green-600 text-white cursor-not-allowed'
                          : isDark
                            ? 'bg-[#2A4A34] text-white hover:bg-[#365d43]'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {saved ? 'Saved ✅' : 'Save'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Generator