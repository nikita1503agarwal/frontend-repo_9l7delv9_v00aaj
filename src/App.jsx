import { useEffect, useState, useMemo } from 'react'
import Hero from './components/Hero'
import EpisodeCard from './components/EpisodeCard'
import VideoModal from './components/VideoModal'

function App() {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [playing, setPlaying] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/episodes/raw`)
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        setEpisodes(data)
      } catch (e) {
        // If no data yet, try to seed demo content then reload
        try {
          await fetch(`${baseUrl}/seed`, { method: 'POST' })
          const res2 = await fetch(`${baseUrl}/episodes/raw`)
          const data2 = await res2.json()
          setEpisodes(data2)
        } catch (err) {
          console.error(err)
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [baseUrl])

  const filtered = useMemo(() => {
    if (!query) return episodes
    const q = query.toLowerCase()
    return episodes.filter(e => (
      e.title?.toLowerCase().includes(q) ||
      e.synopsis?.toLowerCase().includes(q) ||
      (e.tags || []).some(t => t.toLowerCase().includes(q)) ||
      String(e.number).includes(q)
    ))
  }, [episodes, query])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-white font-extrabold text-xl">One Piece Hub</a>
          <nav className="hidden md:flex items-center gap-6 text-blue-200/80">
            <a href="#featured" className="hover:text-white">Featured</a>
            <a href="#episodes" className="hover:text-white">Episodes</a>
            <a href="/test" className="hover:text-white">Status</a>
          </nav>
        </div>
      </header>

      <Hero onSearch={setQuery} />

      <main className="relative z-10">
        <section id="featured" className="max-w-7xl mx-auto px-6 mt-6 md:mt-10">
          <h2 className="text-white text-2xl font-bold mb-4">Featured</h2>
          {loading ? (
            <div className="text-blue-200">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.slice(0, 8).map(item => (
                <EpisodeCard key={item.id || item._id || item.number} item={item} onPlay={setPlaying} />)
              )}
            </div>
          )}
        </section>

        <section id="episodes" className="max-w-7xl mx-auto px-6 mt-12 mb-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-2xl font-bold">All Episodes</h2>
            <span className="text-blue-200/70 text-sm">{filtered.length} results</span>
          </div>
          {loading ? (
            <div className="text-blue-200">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filtered.map(item => (
                <EpisodeCard key={item.id || item._id || item.number} item={item} onPlay={setPlaying} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-white/10 py-10 text-center text-blue-200/70">
        Built for fans. This is a demo app, not affiliated with Toei Animation.
      </footer>

      <VideoModal open={!!playing} onClose={() => setPlaying(null)} item={playing} />
    </div>
  )
}

export default App
