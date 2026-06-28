import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'
import { generateDescription, saveDescription } from '../api'

const products = [
  'Raw Himalayan Honey',
  'Organic Ghee',
  'Wild Forest Turmeric',
  'Himalayan Pink Salt',
]

const tones = ['Professional', 'Friendly', 'Bold']

function Generator() {
  const [product, setProduct] = useState('')
  const [tone, setTone] = useState('Professional')
  const [keywords, setKeywords] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const { isDark } = useTheme()

  const handleGenerate = async () => {
    if (!product) return
    setLoading(true)
    setResult('')
    setError('')
    setSaved(false)

    try {
      const data = await generateDescription({
        productName: product,
        ingredients: keywords || product,
        weight: '',
        features: keywords || '',
        tone: tone.toLowerCase(),
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
        productName: product,
        tone: tone.toLowerCase(),
        description: result,
      })
      setSaved(true)
    } catch (err) {
      setError('⚠️ Failed to save description.')
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />

      <div className={`min-h-screen px-6 py-12 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-amber-50'}`}>
        <div className="max-w-2xl mx-auto">

          <h1 className={`text-3xl font-bold text-center mb-2 ${isDark ? 'text-yellow-400' : 'text-green-900'}`}>
            Description Generator
          </h1>
          <p className={`text-sm text-center mb-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Enter your product details and get an Amazon-optimised listing instantly
          </p>

          {/* Form Card */}
          <div className={`border rounded-xl p-8 transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>

            {/* Product */}
            <div className="mb-5">
              <label className={`block font-semibold text-sm mb-2 ${isDark ? 'text-yellow-300' : 'text-green-900'}`}>
                Product
              </label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className={`w-full border rounded-lg px-4 py-2 text-sm outline-none transition-colors duration-300 ${
                  isDark
                    ? 'bg-gray-700 border-gray-500 text-white focus:border-yellow-400'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-green-700'
                }`}
              >
                <option value="">Select a product...</option>
                {products.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Tone */}
            <div className="mb-5">
              <label className={`block font-semibold text-sm mb-2 ${isDark ? 'text-yellow-300' : 'text-green-900'}`}>
                Tone
              </label>
              <div className="flex gap-3">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      tone === t
                        ? 'bg-green-900 text-yellow-400 border-green-900'
                        : isDark
                          ? 'bg-gray-700 text-gray-300 border-gray-500 hover:border-yellow-400'
                          : 'bg-white text-gray-500 border-gray-300 hover:border-green-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div className="mb-8">
              <label className={`block font-semibold text-sm mb-2 ${isDark ? 'text-yellow-300' : 'text-green-900'}`}>
                Keywords <span className={`font-normal ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>(optional)</span>
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. organic, raw, cold-pressed"
                className={`w-full border rounded-lg px-4 py-2 text-sm outline-none transition-colors duration-300 ${
                  isDark
                    ? 'bg-gray-700 border-gray-500 text-white placeholder-gray-400 focus:border-yellow-400'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-green-700'
                }`}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || !product}
              className={`w-full bg-yellow-400 text-green-900 font-bold py-3 rounded-lg text-sm hover:bg-yellow-300 transition-all ${
                loading || !product ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Generating...' : 'Generate Description ✨'}
            </button>

          </div>

          {/* Result */}
          {(loading || result) && (
            <div className={`border rounded-xl p-6 mt-6 transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
              <h3 className={`font-semibold text-base mb-3 ${isDark ? 'text-yellow-400' : 'text-green-900'}`}>
                Generated Description
              </h3>
              {loading ? (
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>⏳ Writing your listing...</p>
              ) : (
                <>
                  {/* Editable result */}
                  <textarea
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    rows={6}
                    className={`w-full text-sm leading-relaxed rounded-lg p-3 border outline-none resize-none transition-colors duration-300 ${
                      isDark
                        ? 'bg-gray-700 border-gray-500 text-gray-300'
                        : 'bg-amber-50 border-gray-200 text-gray-600'
                    }`}
                  />

                  <div className="flex gap-3 mt-4">
                    {/* Copy */}
                    <button
                      onClick={() => navigator.clipboard.writeText(result)}
                      className="bg-yellow-400 text-green-900 font-bold px-5 py-2 rounded-lg text-sm hover:bg-yellow-300"
                    >
                      Copy to Clipboard
                    </button>

                    {/* Regenerate */}
                    <button
                      onClick={handleGenerate}
                      className={`px-5 py-2 rounded-lg text-sm font-bold border transition-all ${
                        isDark
                          ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-900'
                          : 'border-green-900 text-green-900 hover:bg-green-900 hover:text-white'
                      }`}
                    >
                      Regenerate 🔄
                    </button>

                    {/* Save */}
                    <button
                      onClick={handleSave}
                      disabled={saved}
                      className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                        saved
                          ? 'bg-green-600 text-white cursor-not-allowed'
                          : isDark
                            ? 'bg-gray-600 text-white hover:bg-gray-500'
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