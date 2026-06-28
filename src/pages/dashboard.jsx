import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'

const savedListings = [
  { id: 1, product: 'Raw Himalayan Honey', tone: 'Professional', date: '20 Jun 2026', description: 'Cold-extracted from high-altitude Himalayan flowers, this pure raw honey retains all natural enzymes and antioxidants.' },
  { id: 2, product: 'Organic Ghee', tone: 'Friendly', date: '19 Jun 2026', description: 'Made lovingly from A2 cow milk using traditional churning methods. Pure, golden, and absolutely delicious!' },
  { id: 3, product: 'Wild Forest Turmeric', tone: 'Bold', date: '18 Jun 2026', description: 'Unmatched potency. Wild-harvested high-curcumin turmeric with zero additives. Nature at its most powerful.' },
  { id: 4, product: 'Himalayan Pink Salt', tone: 'Professional', date: '17 Jun 2026', description: 'Hand-mined from ancient Himalayan deposits, this mineral-rich pink salt contains 84+ trace minerals.' },
]

function Dashboard() {
  const [selected, setSelected] = useState(savedListings[0])
  const { isDark } = useTheme()

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
                {savedListings.length} descriptions saved
              </p>
            </div>
            <a
              href="/generator"
              className="bg-yellow-400 text-green-900 font-bold px-5 py-2 rounded-lg text-sm hover:bg-yellow-300"
            >
              + Generate New
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* LEFT LIST */}
            <div className="col-span-1 flex flex-col gap-3">
              {savedListings.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`cursor-pointer rounded-xl p-4 border transition-all ${
                    selected.id === item.id
                      ? isDark
                        ? 'bg-gray-700 border-yellow-400 border-2'
                        : 'bg-green-50 border-green-800 border-2'
                      : isDark
                        ? 'bg-gray-800 border-gray-600'
                        : 'bg-white border-gray-200'
                  }`}
                >
                  <p className={`font-semibold text-sm ${isDark ? 'text-yellow-300' : 'text-green-900'}`}>
                    {item.product}
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                    {item.tone} · {item.date}
                  </p>
                </div>
              ))}
            </div>

            {/* RIGHT DETAIL */}
            <div className={`col-span-2 border rounded-xl p-6 transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
              <div className={`rounded-lg p-8 text-center text-5xl mb-5 ${isDark ? 'bg-gray-700' : 'bg-green-50'}`}>
                🏔️
              </div>
              <span className="bg-green-900 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                {selected.tone}
              </span>
              <h2 className={`text-xl font-bold mt-3 mb-2 ${isDark ? 'text-yellow-400' : 'text-green-900'}`}>
                {selected.product}
              </h2>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {selected.description}
              </p>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => navigator.clipboard.writeText(selected.description)}
                  className="bg-yellow-400 text-green-900 font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-300"
                >
                  Copy
                </button>
                <button className="border border-red-400 text-red-500 px-4 py-2 rounded-lg text-sm hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard