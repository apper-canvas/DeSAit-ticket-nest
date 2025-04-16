import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Filter, ChevronRight, Star, Clock, Tag } from 'lucide-react'

// Mock data
const CITIES = [
  { id: 1, name: "New York" },
  { id: 2, name: "Los Angeles" },
  { id: 3, name: "Chicago" },
  { id: 4, name: "Houston" },
  { id: 5, name: "Phoenix" }
]

const LANGUAGES = ["English", "Spanish", "French", "Hindi", "Korean"]
const GENRES = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Fantasy"]
const FORMATS = ["2D", "3D", "IMAX", "4DX", "Dolby Atmos"]

const MOVIES = [
  {
    id: 1,
    title: "Interstellar Odyssey",
    genre: "Sci-Fi/Adventure",
    rating: 4.8,
    language: "English",
    certificate: "PG-13",
    duration: "2h 35m",
    formats: ["2D", "IMAX"],
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "The Lost Kingdom",
    genre: "Fantasy/Action",
    rating: 4.5,
    language: "English",
    certificate: "PG-13",
    duration: "2h 10m",
    formats: ["2D", "3D"],
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Midnight Mystery",
    genre: "Thriller/Mystery",
    rating: 4.3,
    language: "English",
    certificate: "R",
    duration: "1h 55m",
    formats: ["2D"],
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Eternal Sunshine",
    genre: "Romance/Drama",
    rating: 4.7,
    language: "English",
    certificate: "PG-13",
    duration: "2h 5m",
    formats: ["2D"],
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Urban Legends",
    genre: "Horror/Thriller",
    rating: 4.1,
    language: "English",
    certificate: "R",
    duration: "1h 50m",
    formats: ["2D", "4DX"],
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "Crimson Tide",
    genre: "Action/Drama",
    rating: 4.4,
    language: "English",
    certificate: "PG-13",
    duration: "2h 15m",
    formats: ["2D", "IMAX"],
    image: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    title: "Whispers in the Dark",
    genre: "Horror/Mystery",
    rating: 4.2,
    language: "English",
    certificate: "R",
    duration: "1h 48m",
    formats: ["2D"],
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    title: "Chasing Dreams",
    genre: "Drama/Sports",
    rating: 4.6,
    language: "English",
    certificate: "PG",
    duration: "2h 20m",
    formats: ["2D", "Dolby Atmos"],
    image: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
]

function MoviesPage() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0])
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages")
  const [selectedGenre, setSelectedGenre] = useState("All Genres")
  const [selectedFormat, setSelectedFormat] = useState("All Formats")
  const [selectedDate, setSelectedDate] = useState("Today")
  const [showFilters, setShowFilters] = useState(false)
  
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
      
      {/* Movies Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Movies</h1>
            <p className="text-white/80 max-w-xl">
              Discover the latest blockbusters, indie gems, and everything in between. Book your tickets now for an unforgettable cinema experience.
            </p>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white dark:bg-surface-800 shadow-sm sticky top-16 z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 px-4 py-2 bg-surface-100 dark:bg-surface-700 rounded-full">
              <Calendar className="h-4 w-4 text-surface-500 dark:text-surface-400" />
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
              >
                <option>Today</option>
                <option>Tomorrow</option>
                <option>This Weekend</option>
                <option>Next Week</option>
              </select>
            </div>
            
            <div 
              className="flex items-center space-x-2 px-4 py-2 bg-surface-100 dark:bg-surface-700 rounded-full cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 text-surface-500 dark:text-surface-400" />
              <span className="text-sm font-medium">Filters</span>
            </div>
            
            <div className="px-4 py-2 bg-surface-100 dark:bg-surface-700 rounded-full">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
              >
                <option>All Languages</option>
                {LANGUAGES.map(language => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </div>
            
            <div className="px-4 py-2 bg-surface-100 dark:bg-surface-700 rounded-full">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
              >
                <option>All Genres</option>
                {GENRES.map(genre => (
                  <option key={genre}>{genre}</option>
                ))}
              </select>
            </div>
            
            <div className="px-4 py-2 bg-surface-100 dark:bg-surface-700 rounded-full">
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
              >
                <option>All Formats</option>
                {FORMATS.map(format => (
                  <option key={format}>{format}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 border-t border-surface-200 dark:border-surface-700 pt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {GENRES.slice(0, 8).map(genre => (
                      <button
                        key={genre}
                        className={`px-3 py-1 text-sm rounded-full border ${
                          selectedGenre === genre
                            ? 'bg-primary text-white border-primary'
                            : 'border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map(language => (
                      <button
                        key={language}
                        className={`px-3 py-1 text-sm rounded-full border ${
                          selectedLanguage === language
                            ? 'bg-primary text-white border-primary'
                            : 'border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary'
                        }`}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Format</h3>
                  <div className="flex flex-wrap gap-2">
                    {FORMATS.map(format => (
                      <button
                        key={format}
                        className={`px-3 py-1 text-sm rounded-full border ${
                          selectedFormat === format
                            ? 'bg-primary text-white border-primary'
                            : 'border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary'
                        }`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button className="btn btn-primary text-sm">Apply Filters</button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Movies Listing */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Movies in {selectedCity.name}</h2>
          <div className="flex items-center space-x-2 text-sm">
            <span>Sort by:</span>
            <select className="bg-transparent border-none focus:ring-0 font-medium text-primary cursor-pointer">
              <option>Popularity</option>
              <option>Rating</option>
              <option>Release Date</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {MOVIES.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
                {/* Formats */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {movie.formats.map(format => (
                    <span key={format} className="bg-primary/90 text-white text-xs py-1 px-2 rounded">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-1 line-clamp-1">{movie.title}</h3>
              <p className="text-sm text-surface-600 dark:text-surface-400 mb-1">{movie.genre}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{movie.rating}/5</span>
                </div>
                <div className="flex items-center text-surface-500 dark:text-surface-400 text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {movie.duration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Load More */}
        <div className="mt-10 text-center">
          <button className="btn btn-outline btn-lg">
            Load More Movies
          </button>
        </div>
        
        {/* Coming Soon Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <a href="#" className="text-primary dark:text-primary-light flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOVIES.slice(0, 3).map((movie, index) => (
              <motion.div
                key={`coming-${movie.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface-50 dark:bg-surface-800 rounded-xl overflow-hidden shadow-sm group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={movie.image} 
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge bg-secondary/90 text-white">Coming Soon</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded">
                      {movie.genre}
                    </span>
                    <span className="text-xs bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded">
                      {movie.certificate}
                    </span>
                    <span className="text-xs bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {movie.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-surface-500 dark:text-surface-400 mr-1" />
                      <span className="text-sm">Releasing Oct 20</span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">{movie.rating}</span>
                    </div>
                  </div>
                  <button className="w-full btn btn-secondary">
                    Set Reminder
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviesPage