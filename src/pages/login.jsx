import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Login() {
  return (
    <div>
      <Navbar />
      <div className="bg-amber-50 min-h-screen px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-green-900 mb-4">Login</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Access the HimShakti dashboard to manage your product
          listings and saved descriptions.
        </p>
      </div>
      <Footer />
    </div>
  )
}

export default Login