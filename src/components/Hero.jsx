import { Play, Search } from 'lucide-react'

function Hero({ onSearch }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.25),transparent_40%)]" />
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              One Piece Hub
            </h1>
            <p className="mt-4 text-blue-100/90 text-lg">
              Stream episodes, browse arcs, and dive into the Grand Line. A Netflix-like experience tailored for One Piece fans.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#featured" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-lg transition">
                <Play size={18} /> Start Watching
              </a>
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200" size={18} />
                <input
                  type="text"
                  placeholder="Search characters, arcs, episodes..."
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 rounded-lg pl-9 pr-3 py-3 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                />
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <video className="w-full h-full object-cover" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1520975922215-2305b8d0b7b6?q=80&w=1200&auto=format&fit=crop">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white text-sm">
              Fan-made demo. Not affiliated with Toei Animation.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
