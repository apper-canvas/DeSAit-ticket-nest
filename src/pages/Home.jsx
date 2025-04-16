import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Filter, ChevronRight, Star } from 'lucide-react'
import MainFeature from '../components/MainFeature'

// Mock data for the application
const CITIES = [
  { id: 1, name: "New York" },
  { id: 2, name: "Los Angeles" },
  { id: 3, name: "Chicago" },
  { id: 4, name: "Houston" },
  { id: 5, name: "Phoenix" }
]

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

const FEATURED_MOVIE = {
  id: 101,
  title: "Cosmic Voyage: Beyond the Stars",
  description: "An epic journey through space and time as humanity embarks on its greatest adventure yet. When Earth faces an extinction-level threat, a team of astronauts must travel through a wormhole to find a new home for mankind.",
  genre: "Sci-Fi/Adventure",
  rating: 4.9,
  duration: "2h 45m",
  releaseDate: "August 15, 2023",
  director: "Christopher Anderson",
  cast: ["Emma Stone", "Michael B. Jordan", "Ryan Gosling", "Zoe Saldana"],
  certificate: "PG-13",
  languages: ["English", "Spanish", "French"],
  image: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
}

function Home() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0])
  const [activeTab, setActiveTab] = useState('movies')
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="min-h-screen">
      {/* City Selection */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <select 
              value={selectedCity.id}
              onChange={(e) => setSelectedCity(CITIES.find(city => city.id === parseInt(e.target.value)))}
              className="bg-transparent font-medium text-surface-800 dark:text-white border-none focus:ring-0 cursor-pointer"
            >
              {CITIES.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Hero Section with Featured Movie */}
      <section className="relative">
        <div className="relative h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900 to-transparent z-10"></div>
          <img 
            src={FEATURED_MOVIE.image} 
            alt={FEATURED_MOVIE.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-3 py-1 bg-primary/80 text-white text-sm font-medium rounded-full mb-4">
                Featured Movie
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 text-shadow-lg">
                {FEATURED_MOVIE.title}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="flex items-center text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-white">{FEATURED_MOVIE.rating}/5</span>
                </span>
                <span className="text-white">{FEATURED_MOVIE.duration}</span>
                <span className="text-white">{FEATURED_MOVIE.certificate}</span>
              </div>
              <p className="text-white/80 mb-6 line-clamp-2 md:line-clamp-3">
                {FEATURED_MOVIE.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="btn btn-primary">
                  Book Tickets
                </button>
                <button className="btn btn-outline text-white border-white/30 hover:bg-white/10">
                  Watch Trailer
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-surface-200 dark:border-surface-700 mb-6">
          <button
            className={`px-4 py-2 font-medium text-lg relative ${
              activeTab === 'movies' 
                ? 'text-primary dark:text-primary-light' 
                : 'text-surface-600 dark:text-surface-400'
            }`}
            onClick={() => setActiveTab('movies')}
          >
            Movies
            {activeTab === 'movies' && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
              />
            )}
          </button>
          <button
            className={`px-4 py-2 font-medium text-lg relative ${
              activeTab === 'events' 
                ? 'text-primary dark:text-primary-light' 
                : 'text-surface-600 dark:text-surface-400'
            }`}
            onClick={() => setActiveTab('events')}
          >
            Events
            {activeTab === 'events' && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
              />
            )}
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center space-x-2 px-4 py-2 bg-surface-100 dark:bg-surface-800 rounded-full">
            <Calendar className="h-4 w-4 text-surface-500 dark:text-surface-400" />
            <span className="text-sm font-medium">Today</span>
          </div>
          
          <div className="flex items-center space-x-2 px-4 py-2 bg-surface-100 dark:bg-surface-800 rounded-full">
            <Filter className="h-4 w-4 text-surface-500 dark:text-surface-400" />
            <span className="text-sm font-medium">Filters</span>
          </div>
          
          {activeTab === 'movies' && (
            <>
              <div className="px-4 py-2 bg-surface-100 dark:bg-surface-800 rounded-full">
                <span className="text-sm font-medium">English</span>
              </div>
              <div className="px-4 py-2 bg-surface-100 dark:bg-surface-800 rounded-full">
                <span className="text-sm font-medium">All Genres</span>
              </div>
            </>
          )}
          
          {activeTab === 'events' && (
            <>
              <div className="px-4 py-2 bg-surface-100 dark:bg-surface-800 rounded-full">
                <span className="text-sm font-medium">This Weekend</span>
              </div>
              <div className="px-4 py-2 bg-surface-100 dark:bg-surface-800 rounded-full">
                <span className="text-sm font-medium">All Categories</span>
              </div>
            </>
          )}
        </div>
        
        {/* Content based on active tab */}
        {activeTab === 'movies' ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Movies in {selectedCity.name}</h2>
              <a href="#" className="text-primary dark:text-primary-light flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {MOVIES.map(movie => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: movie.id * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl mb-3 aspect-[2/3]">
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <button className="w-full btn btn-primary text-sm">Book Now</button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-surface-900 dark:text-white mb-1 line-clamp-1">{movie.title}</h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400 mb-1">{movie.genre}</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{movie.rating}/5</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Events in {selectedCity.name}</h2>
              <a href="#" className="text-primary dark:text-primary-light flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EVENTS.map(event => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: event.id * 0.1 }}
                  className="card group"
                >
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="badge bg-primary/90 text-white">{event.type}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                    <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.venue}
                    </div>
                    <button className="w-full btn btn-primary">Book Now</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
        
        {/* Main Feature Component */}
        <div className="mt-16">
          <MainFeature />
        </div>
      </div>
    </div>
  )
}

export default Home