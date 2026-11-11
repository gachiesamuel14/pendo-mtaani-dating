'use client'

import { useState, useEffect } from 'react'
import { Heart, X, MapPin, Filter, MessageCircle, Shield } from 'lucide-react'

const MOCK_PROFILES = [
  {
    id: 1,
    name: 'Amina',
    age: 26,
    county: 'Nairobi',
    bio: 'Coffee lover, techie, and weekend hiker. Looking for genuine connection.',
    interests: ['Travel', 'Music', 'Tech'],
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    distance: '2.4 km',
  },
  {
    id: 2,
    name: 'Brian',
    age: 29,
    county: 'Kiambu',
    bio: 'Entrepreneur. Love football, good food, and deep conversations.',
    interests: ['Business', 'Sports', 'Food'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    distance: '5.1 km',
  },
  {
    id: 3,
    name: 'Faith',
    age: 24,
    county: 'Nairobi',
    bio: 'Student mode on. Church on Sundays, sheng vibes daily. Let’s link up!',
    interests: ['Music', 'Faith', 'Fashion'],
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    distance: '1.8 km',
  },
  {
    id: 4,
    name: 'Kevin',
    age: 31,
    county: 'Mombasa',
    bio: 'Coastal life. Swimming, sunset drives, and building something meaningful.',
    interests: ['Beach', 'Travel', 'Music'],
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    distance: '420 km',
  },
]

export default function Home() {
  const [profiles] = useState(MOCK_PROFILES)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [location, setLocation] = useState(null)
  const [locationError, setLocationError] = useState('')
  const [matched, setMatched] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({ county: '', minAge: 18, maxAge: 50 })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
        },
        () => setLocationError('Location permission needed for nearby matches')
      )
    }
  }, [])

  const handleSwipe = (liked) => {
    if (liked && Math.random() > 0.6) {
      setMatched(profiles[currentIndex])
    }
    setCurrentIndex((i) => i + 1)
  }

  const filtered = profiles.filter((p) => {
    if (filters.county && p.county !== filters.county) return false
    if (p.age < filters.minAge || p.age > filters.maxAge) return false
    return true
  })

  return (
    <div className="max-w-md mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600">Pendo Mtaani</h1>
        <div className="flex gap-3">
          <button onClick={() => setShowFilters(!showFilters)} className="p-2 rounded-full bg-white shadow">
            <Filter size={20} />
          </button>
          <button className="p-2 rounded-full bg-white shadow">
            <Shield size={20} />
          </button>
        </div>
      </header>

      {location ? (
        <p className="text-sm text-green-600 mb-4 flex items-center gap-1">
          <MapPin size={16} /> Location enabled • Nearby matches active
        </p>
      ) : (
        <p className="text-sm text-amber-600 mb-4">{locationError || 'Requesting location...'}</p>
      )}

      {showFilters && (
        <div className="bg-white rounded-xl p-4 mb-4 shadow">
          <h3 className="font-semibold mb-2">Filters</h3>
          <select className="w-full border rounded p-2 mb-2" value={filters.county} onChange={(e) => setFilters({ ...filters, county: e.target.value })}>
            <option value="">All Counties</option>
            <option>Nairobi</option>
            <option>Mombasa</option>
            <option>Kisumu</option>
            <option>Kiambu</option>
            <option>Nakuru</option>
          </select>
          <div className="flex gap-2">
            <input type="number" placeholder="Min Age" className="border rounded p-2 w-1/2" value={filters.minAge} onChange={(e) => setFilters({ ...filters, minAge: Number(e.target.value) })} />
            <input type="number" placeholder="Max Age" className="border rounded p-2 w-1/2" value={filters.maxAge} onChange={(e) => setFilters({ ...filters, maxAge: Number(e.target.value) })} />
          </div>
        </div>
      )}

      {matched && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 text-center max-w-xs">
            <h2 className="text-2xl font-bold text-pink-600 mb-2">It's a Match! 💕</h2>
            <p>You and {matched.name} liked each other.</p>
            <button onClick={() => setMatched(null)} className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full">Start Chat</button>
          </div>
        </div>
      )}

      {currentIndex < filtered.length ? (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img src={filtered[currentIndex].photo} alt={filtered[currentIndex].name} className="w-full h-96 object-cover" />
          <div className="p-5">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold">{filtered[currentIndex].name}, {filtered[currentIndex].age}</h2>
              <span className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={14} /> {filtered[currentIndex].distance}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{filtered[currentIndex].county}</p>
            <p className="mt-3 text-gray-700">{filtered[currentIndex].bio}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {filtered[currentIndex].interests.map((i) => (
                <span key={i} className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full">{i}</span>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-8 pb-6">
            <button onClick={() => handleSwipe(false)} className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-lg hover:scale-110 transition">
              <X size={32} className="text-gray-500" />
            </button>
            <button onClick={() => handleSwipe(true)} className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center shadow-lg hover:scale-110 transition">
              <Heart size={32} className="text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl shadow">
          <p className="text-xl">No more profiles nearby</p>
          <p className="text-gray-500 mt-2">Try adjusting filters or expand distance</p>
          <button onClick={() => setCurrentIndex(0)} className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full">Refresh</button>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 max-w-md mx-auto">
        <button className="flex flex-col items-center text-pink-600"><Heart size={24} /><span className="text-xs">Discover</span></button>
        <button className="flex flex-col items-center text-gray-400"><MessageCircle size={24} /><span className="text-xs">Matches</span></button>
        <button className="flex flex-col items-center text-gray-400"><MapPin size={24} /><span className="text-xs">Nearby</span></button>
      </nav>
    </div>
  )
}
