import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Film, Calendar, Theater, Award } from 'lucide-react'

// Import mock data from Home.jsx
const MOVIES = [
  {
    id: 1,
    title: "Interstellar Odyssey",
    genre: "Sci-Fi/Adventure",
    rating: 4.8,
    language: "English",
    certificate: "PG-13",
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "The Lost Kingdom",
    genre: "Fantasy/Action",
    rating: 4.5,
    language: "English",
    certificate: "PG-13",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Midnight Mystery",
    genre: "Thriller/Mystery",
    rating: 4.3,
    language: "English",
    certificate: "R",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Eternal Sunshine",
    genre: "Romance/Drama",
    rating: 4.7,
    language: "English",
    certificate: "PG-13",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Urban Legends",
    genre: "Horror/Thriller",
    rating: 4.1,
    language: "English",
    certificate: "R",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
]

const EVENTS = [
  {
    id: 1,
    title: "Summer Music Festival",
    type: "Music",
    date: "Aug 15-17, 2023",
    venue: "Central Park",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Comedy Night Live",
    type: "Comedy",
    date: "Aug 20, 2023",
    venue: "Laugh Factory",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Broadway Musical: Hamilton",
    type: "Theater",
    date: "Aug 25-30, 2023",
    venue: "Broadway Theater",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Tech Conference 2023",
    type: "Conference",
    date: "Sep 5-7, 2023",
    venue: "Convention Center",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
]

// Add more data types
const PLAYS = [
  {
    id: 1,
    title: "Romeo and Juliet",
    type: "Drama",
    venue: "Shakespeare Theatre",
    date: "Sep 10-15, 2023",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "The Phantom of the Opera",
    type: "Musical",
    venue: "Grand Opera House",
    date: "Sep 20-30, 2023",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
]

const SPORTS = [
  {
    id: 1,
    title: "NBA Finals",
    type: "Basketball",
    venue: "Madison Square Garden",
    date: "Oct 5, 2023",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "NFL Championship",
    type: "Football",
    venue: "MetLife Stadium",
    date: "Oct 15, 2023",
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
]

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchResults, setSearchResults] = useState([])
  const searchInputRef = useRef(null)
  const modalRef = useRef(null)

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus()
      }, 100)
    }
  }, [isOpen])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    
    let results = []
    
    // Search in appropriate categories based on filter
    if (activeCategory === 'all' || activeCategory === 'movies') {
      const movieResults = MOVIES.filter(movie => 
        movie.title.toLowerCase().includes(query) || 
        movie.genre.toLowerCase().includes(query)
      ).map(movie => ({ ...movie, category: 'movies' }))
      
      results = [...results, ...movieResults]
    }
    
    if (activeCategory === 'all' || activeCategory === 'events') {
      const eventResults = EVENTS.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.type.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query)
      ).map(event => ({ ...event, category: 'events' }))
      
      results = [...results, ...eventResults]
    }
    
    if (activeCategory === 'all' || activeCategory === 'plays') {
      const playResults = PLAYS.filter(play => 
        play.title.toLowerCase().includes(query) || 
        play.type.toLowerCase().includes(query) ||
        play.venue.toLowerCase().includes(query)
      ).map(play => ({ ...play, category: 'plays' }))
      
      results = [...results, ...playResults]
    }
    
    if (activeCategory === 'all' || activeCategory === 'sports') {
      const sportResults = SPORTS.filter(sport => 
        sport.title.toLowerCase().includes(query) || 
        sport.type.toLowerCase().includes(query) ||
        sport.venue.toLowerCase().includes(query)
      ).map(sport => ({ ...sport, category: 'sports' }))
      
      results = [...results, ...sportResults]
    }
    
    setSearchResults(results)
  }, [searchQuery, activeCategory])
  
  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
      setSearchResults([])
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-surface-900/50 backdrop-blur-sm p-4 pt-16 md:pt-24 overflow-y-auto">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-surface-800 rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden"
      >
        {/* Header with search input */}
        <div className="p-4 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for movies, events, plays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-100 dark:bg-surface-700 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
              />
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            >
              <X className="h-5 w-5 text-surface-600 dark:text-surface-300" />
            </button>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="px-4 py-2 border-b border-surface-200 dark:border-surface-700 flex overflow-x-auto hide-scrollbar gap-2">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveCategory('movies')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeCategory === 'movies' 
                ? 'bg-primary text-white' 
                : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            <Film className="h-3.5 w-3.5" />
            Movies
          </button>
          <button 
            onClick={() => setActiveCategory('events')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeCategory === 'events' 
                ? 'bg-primary text-white' 
                : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            Events
          </button>
          <button 
            onClick={() => setActiveCategory('plays')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeCategory === 'plays' 
                ? 'bg-primary text-white' 
                : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            <Theater className="h-3.5 w-3.5" />
            Plays
          </button>
          <button 
            onClick={() => setActiveCategory('sports')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeCategory === 'sports' 
                ? 'bg-primary text-white' 
                : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            Sports
          </button>
        </div>
        
        {/* Search results */}
        <div className="flex-1 overflow-y-auto p-4">
          {searchQuery && searchResults.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-surface-300 mb-4" />
              <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-1">No results found</h3>
              <p className="text-surface-500 dark:text-surface-400">
                Try adjusting your search or filter to find what you're looking for
              </p>
            </div>
          ) : !searchQuery ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-surface-300 mb-4" />
              <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-1">Search for content</h3>
              <p className="text-surface-500 dark:text-surface-400">
                Type to start searching for movies, events, and more
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {searchResults.map((result) => (
                <div 
                  key={`${result.category}-${result.id}`}
                  className="flex gap-3 p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                    <img 
                      src={result.image} 
                      alt={result.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-surface-900 dark:text-white truncate">{result.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-surface-200 dark:bg-surface-700 rounded-full text-surface-700 dark:text-surface-300 capitalize">
                        {result.category}
                      </span>
                      <span className="text-xs text-surface-500 dark:text-surface-400">
                        {result.genre || result.type}
                      </span>
                    </div>
                    {(result.venue || result.certificate) && (
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 truncate">
                        {result.venue || `Certificate: ${result.certificate}`}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer with action buttons */}
        <div className="p-4 border-t border-surface-200 dark:border-surface-700">
          <div className="flex justify-between items-center">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            
            {searchResults.length > 0 && (
              <p className="text-sm text-surface-500 dark:text-surface-400">
                {searchResults.length} results found
              </p>
            )}
            
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SearchModal