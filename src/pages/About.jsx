import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const INK = '#1B1420'
const PAPER = '#F6F1E8'
const BERRY = '#7A3B4E'
const MUTED = '#6B6058'

const whyItMatters = [
  {
    title: 'Inform buyers',
    desc: "Show shoppers exactly what a product is and why it's worth buying.",
    icon: (
      <path d="M12 4l1.8 5.4L19 11l-5.2 1.6L12 18l-1.8-5.4L5 11l5.2-1.6L12 4z" stroke={BERRY} strokeWidth="1.4" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Improve visibility',
    desc: 'SEO-friendly copy helps products surface in search and marketplace listings.',
    icon: (
      <>
        <circle cx="11" cy="11" r="6" stroke={BERRY} strokeWidth="1.4" />
        <line x1="16" y1="16" x2="20" y2="20" stroke={BERRY} strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Build confidence',
    desc: 'Detailed, accurate descriptions signal care and reduce buyer hesitation.',
    icon: (
      <path d="M12 21s-7-4-7-10V6l7-3 7 3v5c0 6-7 10-7 10z" stroke={BERRY} strokeWidth="1.4" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Boost conversions',
    desc: 'Highlighting real benefits nudges browsers to actually buy.',
    icon: (
      <path d="M4 14l4-4 3 3 6-6" stroke={BERRY} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
]

const steps = [
  {
    n: '01',
    title: 'Enter your product details',
    desc: 'Product name, brand, weight, price, and a few keywords — that\u2019s all it needs.',
  },
  {
    n: '02',
    title: 'Pick a tone',
    desc: 'Professional, Friendly, or Bold — choose the voice that fits the listing.',
  },
  {
    n: '03',
    title: 'Generate, refine, save',
    desc: 'Get a ready-to-list description in seconds. Edit it inline, regenerate, copy it, or save it to come back to later.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: PAPER, color: INK }}>
      <Navbar />

      {/* Intro */}
      <section style={{ backgroundColor: INK, color: PAPER }}>
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: BERRY }}>
            About DescribeIt
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Product details in. Ready-to-list descriptions out.
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(246,241,232,0.72)' }}>
            DescribeIt turns a handful of product details — name, brand, weight, price,
            a few keywords — into a publish-ready e-commerce description. Pick a tone,
            generate, and edit the result inline before you copy it into your listing.
            No writing team required.
          </p>
        </div>
      </section>

      {/* Why it matters */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-2" style={{ color: INK }}>
          Why product descriptions matter
        </h2>
        <p className="text-center mb-14 max-w-lg mx-auto" style={{ color: MUTED }}>
          A good description does more than fill space on a listing page.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {whyItMatters.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: '#EFE7DC' }}
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                  {item.icon}
                </svg>
              </div>
              <h3 className="font-display font-semibold mb-1" style={{ color: INK }}>
                {item.title}
              </h3>
              <p className="text-sm max-w-[180px]" style={{ color: MUTED }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20" style={{ backgroundColor: '#EFE7DC' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-14" style={{ color: INK }}>
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <div key={step.n} className="relative">
                <span className="font-display text-5xl font-semibold" style={{ color: BERRY, opacity: 0.35 }}>
                  {step.n}
                </span>
                <h3 className="font-display text-xl font-semibold mt-2 mb-2" style={{ color: INK }}>
                  {step.title}
                </h3>
                <p className="text-sm" style={{ color: MUTED }}>{step.desc}</p>

                {i < steps.length - 1 && (
                  <svg
                    className="hidden md:block absolute top-6 -right-5 w-10 h-4"
                    viewBox="0 0 40 16"
                  >
                    <line x1="0" y1="8" x2="40" y2="8" stroke={INK} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider strip */}
      <section className="py-16 flex justify-center">
        <svg viewBox="0 0 240 60" className="w-64 opacity-70">
          <line x1="0" y1="30" x2="240" y2="30" stroke={INK} strokeWidth="1" />
          {[30, 80, 130, 180, 210].map((x, i) => (
            <path
              key={i}
              d={`M ${x} 30 q 12 -10 22 0 q -10 10 -22 0`}
              fill="none"
              stroke={BERRY}
              strokeWidth="1"
            />
          ))}
        </svg>
      </section>

      <Footer />
    </div>
  )
}