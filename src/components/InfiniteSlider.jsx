import { useState } from 'react'

/**
 * InfiniteSlider
 * Seamlessly auto-scrolls its children in a loop (marquee-style).
 * Works by rendering the children twice back-to-back and animating
 * translateX from 0 to -50%, so the loop point is invisible.
 *
 * Props:
 *  - gap: px gap between items (default 24)
 *  - reverse: scroll right-to-left instead of left-to-right (default false)
 *  - speed: seconds for one full loop, lower = faster (default 30)
 *  - pauseOnHover: pause the animation while hovered (default true)
 *  - className: extra classes for the outer wrapper
 */
export function InfiniteSlider({
  children,
  gap = 24,
  reverse = false,
  speed = 30,
  pauseOnHover = true,
  className = '',
}) {
  const [paused, setPaused] = useState(false)

  return (
    <div className={`overflow-hidden w-full ${className}`}>
      <div
        className="flex w-max"
        style={{
          gap: `${gap}px`,
          animation: `infinite-slider-scroll ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
          animationPlayState: paused ? 'paused' : 'running',
        }}
        onMouseEnter={() => pauseOnHover && setPaused(true)}
        onMouseLeave={() => pauseOnHover && setPaused(false)}
      >
        {children}
        {children}
      </div>

      <style>{`
        @keyframes infinite-slider-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}