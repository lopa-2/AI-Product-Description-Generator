import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#09090B] border-t border-white/10">
      {/* Background Glow */}
      <div className="absolute -top-20 left-10 h-60 w-60 rounded-full bg-pink-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <div className="grid gap-12 md:grid-cols-3">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-sky-400 to-purple-500 bg-clip-text text-transparent">
              DescribeIt
            </h2>

            <p className="mt-4 text-gray-400 leading-7 max-w-sm">
              AI-powered product description generator that helps businesses
              create engaging, accurate, and ready-to-publish product listings
              in seconds.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Navigation
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-gray-400 hover:text-sky-400 transition-colors"
              >
                About
              </Link>

              <Link
                to="/dashboard"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Dashboard
              </Link>

              <Link
                to="/login"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Contact
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-pink-400" />
                <a
                  href="mailto:hello@describeit.ai"
                  className="hover:text-white transition"
                >
                  hello@describeit.ai
                </a>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} className="text-sky-400" />
                India
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Bottom */}
        <div className="flex justify-center items-center text-sm text-gray-500">
          <p>© 2026 DescribeIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;