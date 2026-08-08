import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Dashboard", to: "/dashboard" },
];

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");

  const [hovered, setHovered] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{
        y: showNavbar ? 0 : -120,
        opacity: showNavbar ? 1 : 0,
      }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl"
    >
      <div
        className={`rounded-full border backdrop-blur-2xl shadow-2xl px-5 py-2.5 flex items-center justify-between gap-4 transition-all duration-300 ${
          isDark
            ? "bg-white/10 border-white/10"
            : "bg-white/90 border-black/5"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Sparkles
            size={18}
            className={isDark ? "text-cyan-400" : "text-black"}
          />

          <span
            className={`font-bold text-lg tracking-tight ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            DescribeIt
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden sm:flex items-center gap-1">
          {LINKS.map((link) => {
            const isActive = location.pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                onMouseEnter={() => setHovered(link.to)}
                onMouseLeave={() => setHovered(null)}
                className={`relative px-3 py-2 rounded-full text-sm transition-colors ${
                  isDark
                    ? isActive
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                    : isActive
                    ? "text-black"
                    : "text-black/60 hover:text-black"
                }`}
              >
                {(hovered === link.to ||
                  (isActive && hovered === null)) && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full ${
                      isDark ? "bg-white/10" : "bg-black/5"
                    }`}
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      duration: 0.4,
                    }}
                  />
                )}

                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              onMouseEnter={() => setHovered("logout")}
              onMouseLeave={() => setHovered(null)}
              className={`relative px-3 py-2 rounded-full text-sm ${
                isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-black/60 hover:text-black"
              }`}
            >
              {hovered === "logout" && (
                <motion.span
                  layoutId="nav-pill"
                  className={`absolute inset-0 rounded-full ${
                    isDark ? "bg-white/10" : "bg-black/5"
                  }`}
                />
              )}

              <span className="relative z-10">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              onMouseEnter={() => setHovered("/login")}
              onMouseLeave={() => setHovered(null)}
              className={`relative px-3 py-2 rounded-full text-sm ${
                isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-black/60 hover:text-black"
              }`}
            >
              {hovered === "/login" && (
                <motion.span
                  layoutId="nav-pill"
                  className={`absolute inset-0 rounded-full ${
                    isDark ? "bg-white/10" : "bg-black/5"
                  }`}
                />
              )}

              <span className="relative z-10">Login</span>
            </Link>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`relative w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
            isDark ? "bg-white/10" : "bg-black/10"
          }`}
        >
          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            className={`w-4 h-4 rounded-full flex items-center justify-center ${
              isDark ? "bg-white" : "bg-black"
            }`}
            style={{
              marginLeft: isDark ? "1.5rem" : "0rem",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? "moon" : "sun"}
                initial={{
                  opacity: 0,
                  rotate: -90,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                  scale: 0.5,
                }}
              >
                {isDark ? (
                  <Moon size={10} className="text-black" />
                ) : (
                  <Sun size={10} className="text-white" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </button>
      </div>
    </motion.nav>
  );
}

export default Navbar;