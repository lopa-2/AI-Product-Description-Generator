import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="bg-amber-50 min-h-screen px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-green-900 mb-4">Description Generator</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Enter your product details, choose a tone, and get an
          Amazon-optimized listing in seconds. The AI generator
          will be available here soon.
        </p>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard