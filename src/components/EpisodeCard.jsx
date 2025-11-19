import { Play } from 'lucide-react'

function EpisodeCard({ item, onPlay }) {
  return (
    <div className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl overflow-hidden transition-colors">
      <div className="aspect-video relative overflow-hidden">
        <img src={item.thumbnail_url || item.poster_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
        <button onClick={() => onPlay?.(item)} className="absolute inset-0 m-auto h-12 w-12 grid place-content-center bg-blue-600/90 hover:bg-blue-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <Play size={20} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold truncate">Episode {item.number}: {item.title}</h3>
          {item.duration_minutes && (
            <span className="text-xs text-blue-200/70">{item.duration_minutes}m</span>
          )}
        </div>
        {item.synopsis && (
          <p className="mt-2 text-sm text-blue-200/80 line-clamp-2">{item.synopsis}</p>
        )}
        <div className="mt-3 flex gap-2 flex-wrap">
          {item.tags?.slice(0,3).map((t) => (
            <span key={t} className="text-xs text-blue-200/80 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EpisodeCard
