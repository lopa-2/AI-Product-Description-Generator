import { useState, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

function Card({ name, weight, description, tag }) {
  const [isOpen, setIsOpen] = useState(false);
  const uid = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* Small Card */}
      <motion.div
        layoutId={isOpen ? undefined : `card-${uid}`}
        onClick={() => setIsOpen(true)}
        whileHover={{
          y: -12,
          scale: 1.04,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 20,
        }}
        className="group relative w-[280px] h-[340px] cursor-pointer"
      >
        {/* Neon Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500 via-sky-400 to-purple-500 p-[3px] shadow-[0_0_35px_rgba(236,72,153,0.35)]">
          <div className="relative h-full w-full rounded-[22px] bg-[#171717] overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 rounded-[22px] bg-gradient-to-r from-pink-500/20 via-sky-400/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

            <div className="relative z-10 flex flex-col justify-between h-full p-7 text-white">
              <div className="text-3xl">🏔️</div>

              <div>
                <span className="inline-block mb-4 rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
                  {tag}
                </span>

                <h2 className="text-3xl font-semibold mb-2">{name}</h2>

                <p className="text-gray-400 text-sm mb-3">{weight}</p>

                <p className="text-gray-500 text-sm leading-6 line-clamp-3">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Popup */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
                />

                {/* Popup */}
                <div className="fixed inset-0 z-50 flex items-center justify-center p-5 pointer-events-none">
                  <motion.div
                    layoutId={`card-${uid}`}
                    transition={{
                      type: "spring",
                      bounce: 0.08,
                      duration: 0.4,
                    }}
                    className="pointer-events-auto relative w-full max-w-md rounded-3xl bg-[#171717] border border-gray-700 p-8 text-white shadow-[0_0_50px_rgba(0,0,0,0.6)]"
                  >
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>

                    <div className="mb-6 flex h-40 items-center justify-center rounded-2xl bg-[#222] text-7xl">
                      🏔️
                    </div>

                    <span className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1 text-xs font-semibold">
                      {tag}
                    </span>

                    <h2 className="mt-5 text-3xl font-bold">{name}</h2>

                    <p className="mt-2 text-gray-400">{weight}</p>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.15 },
                      }}
                      exit={{ opacity: 0 }}
                      className="mt-6 text-gray-300 leading-7"
                    >
                      {description}
                    </motion.p>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export default Card;