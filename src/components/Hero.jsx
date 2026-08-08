import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HERO_VIDEO_URL = "/videos/hero-bg.mp4";

function Hero() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#020617]/90" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-28 text-center">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
          <span className="text-white">Describe it.</span>
          <br />
          <span className="bg-gradient-to-r from-pink-400 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Don't write it.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-gray-300">
          Transform a product name into a
          <span className="font-semibold text-cyan-400">
            {" "}
            publish-ready description
          </span>{" "}
          in seconds. Faster writing, better listings, and zero writer's block.
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row">
          <Link
            to="/generator"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-cyan-500 to-violet-500 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30"
          >
            Try Generator
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Bottom Tagline */}
        <p className="mt-10 text-sm tracking-[0.3em] uppercase text-gray-500">
          No prompts · Instant · AI powered
        </p>
      </div>
    </div>
  );
}

export default Hero;