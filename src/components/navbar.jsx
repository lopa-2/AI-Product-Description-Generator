import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-green-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-yellow-400 font-bold text-xl">HimShakti</h1>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/about" className="hover:text-yellow-400">About</Link>
        <Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
        <Link to="/login" className="hover:text-yellow-400">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar