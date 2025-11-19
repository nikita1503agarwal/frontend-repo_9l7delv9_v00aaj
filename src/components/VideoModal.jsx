import { X } from 'lucide-react'

function VideoModal({ open, onClose, item }) {
  if (!open || !item) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-0 p-6 grid place-items-center">
        <div className="w-full max-w-4xl bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div>
              <h3 className="text-white font-semibold">Episode {item.number}: {item.title}</h3>
              {item.duration_minutes && (
                <p className="text-blue-200/70 text-sm">{item.duration_minutes} minutes</p>
              )}
            </div>
            <button onClick={onClose} className="p-2 text-white/80 hover:text-white">
              <X />
            </button>
          </div>
          <div className="aspect-video bg-black">
            {item.stream_url ? (
              <video src={item.stream_url} controls className="w-full h-full" poster={item.poster_url || item.thumbnail_url} />
            ) : (
              <div className="w-full h-full grid place-content-center text-white/70">No stream available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoModal
