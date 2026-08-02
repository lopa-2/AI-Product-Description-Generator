function Footer() {
  return (
    <footer className="bg-green-900 text-green-200 px-6 py-10 mt-10">
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
        <div>
          <h3 className="text-yellow-400 font-bold text-lg mb-3">HimShakti</h3>
          <p className="text-sm">AI-powered product listing tool for Himalayan food brands.</p>
        </div>
        <div>
          <h3 className="text-yellow-400 font-bold text-lg mb-3">Pages</h3>
          <ul className="text-sm flex flex-col gap-2">
            <li>Home</li>
            <li>About</li>
            <li>Dashboard</li>
            <li>Login</li>
          </ul>
        </div>
        <div>
          <h3 className="text-yellow-400 font-bold text-lg mb-3">Contact</h3>
          <p className="text-sm">hello@himshakti.in</p>
          <p className="text-sm">Uttarakhand, India</p>
        </div>
      </div>
      <p className="text-center text-xs text-green-600 mt-8">
        © 2024 HimShakti · Built by Intern AI-02
      </p>
    </footer>
  )
}

export default Footer