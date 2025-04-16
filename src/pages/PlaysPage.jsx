import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Filter, ChevronRight, Clock, Star, MessageCircle } from 'lucide-react'

// Mock data
const CITIES = [
  { id: 1, name: "New York" },
  { id: 2, name: "Los Angeles" },
  { id: 3, name: "Chicago" },
  { id: 4, name: "Houston" },
  { id: 5, name: "Phoenix" }
]

const GENRES = [
  "Drama", "Comedy", "Musical", "Tragedy", "Historical", 
  "Romance", "Mystery", "Satire", "Experimental", "Adaptation"
]

const LANGUAGES = ["English", "Spanish", "French", "German", "Italian"]

const PLAYS = [
  {
    id: 1,
    title: "The Phantom of the Opera",
    genre: "Musical",
    language: "English",
    duration: "2h 30m",
    rating: 4.8,
    venue: "Broadway Theatre",
    date: "Multiple dates",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "A Midsummer Night's Dream",
    genre: "Comedy",
    language: "English",
    duration: "2h 15m",
    rating: 4.6,
    venue: "Shakespeare Theatre",
    date: "Weekends",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Hamilton",
    genre: "Musical",
    language: "English",
    duration: "2h 45m",
    rating: 4.9,
    venue: "Richard Rodgers Theatre",
    date: "Daily",
    image: "https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "The Glass Menagerie",
    genre: "Drama",
    language: "English",
    duration: "2h 10m",
    rating: 4.5,
    venue: "Circle in the Square",
    date: "Weekdays",
    image: "https://images.unsplash.com/photo-1470019693664-1d202d2c0907?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Death of a Salesman",
    genre: "Tragedy",
    language: "English",
    duration: "2h 25m",
    rating: 4.7,
    venue: "Ethel Barrymore Theatre",
    date: "Tue-Sun",
    image: "https://images.unsplash.com/photo-1460723237783-e82e968a8269?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "Les Misérables",
    genre: "Musical",
    language: "English",
    duration: "2h 50m",
    rating: 4.8,
    venue: "Imperial Theatre",
    date: "Daily",
    image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    title: "The Importance of Being Earnest",
    genre: "Comedy",
    language: "English",
    duration: "2h 5m",
    rating: 4.4,
    venue: "American Airlines Theatre",
    date: "Wed-Sun",
    image: "https://images.unsplash.com/photo-1517173820973-f5170b644695?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    title: "Macbeth",
    genre: "Tragedy",
    language: "English",
    duration: "2h 20m",
    rating: 4.6,
    venue: "Lyceum Theatre",
    date: "Fri-Wed",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
]

const REVIEWS = [
  {
    id: 1,
    name: "Emma Thompson",
    rating: 5,
    date: "August 12, 2023",
    review: "Absolutely mesmerizing performance! The actors truly brought the characters to life, and the stage design was incredible. Would highly recommend to anyone who appreciates theater.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 2,
    name: "Michael Roberts",
    rating: 4,
    date: "August 8, 2023",
    review: "A stunning adaptation with brilliant performances, though the second act felt a bit slow in parts. Still, a wonderful evening at the theater that I won't soon forget.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 3,
    name: "Sophia Chen",
    rating: 5,
    date: "August 1, 2023",
    review: "The best theatrical experience I've had this year! The music, choreography, and performances were absolutely flawless. I'll definitely be seeing it again.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
  }
]

function PlaysPage() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0])
  const [selectedGenre, setSelectedGenre] = useState("All Genres")
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages")
  const [selectedDate, setSelectedDate] = useState("All Dates")
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
      
      {/* Plays Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-purple-600 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Plays & Theatre</h1>
            <p className="text-white/80 max-w-xl">
              Experience the magic of live theatre with our handpicked selection of the best plays, musicals, and performances in your city.
            </p>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white dark:bg-surface-800 shadow-sm sticky top-16 z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <div 
              className="flex items-center space-x-2 px-4 py-2 bg-surface-100 dark:bg-surface-700 rounded-full cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 text-surface-500 dark:text-surface-400" />
              <span className="text-sm font-medium">Filters</span>
            </div>
            
            <div className="flex items-center space-x-2 px-4 py-2 bg-surface-100 dark:bg-surface-700 rounded-full">
              <Calendar className="h-4 w-4 text-surface-500 dark:text-surface-400" />
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
              >
                <option>All Dates</option>
                <option>Today</option>
                <option>Tomorrow</option>
                <option>This Weekend</option>
                <option>This Week</option>
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
                  <h3 className="font-medium mb-3">Genre</h3>
                  <div className="flex flex-wrap gap-2">
                    {GENRES.map(genre => (
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
                  <h3 className="font-medium mb-3">Language</h3>
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
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 text-sm rounded-full border border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary">
                      $0 - $25
                    </button>
                    <button className="px-3 py-1 text-sm rounded-full border border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary">
                      $25 - $50
                    </button>
                    <button className="px-3 py-1 text-sm rounded-full border border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary">
                      $50 - $100
                    </button>
                    <button className="px-3 py-1 text-sm rounded-full border border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary">
                      $100+
                    </button>
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
      
      {/* Featured Play */}
      <div className="bg-surface-50 dark:bg-surface-900 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Featured Play</h2>
          <div className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="col-span-2 h-full">
                <img 
                  src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Romeo and Juliet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-3 p-6 md:p-8">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="badge bg-primary text-white">Featured</span>
                  <span className="badge bg-surface-200 dark:bg-surface-700">Tragedy</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Romeo and Juliet</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">4.9/5</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-surface-500 dark:text-surface-400 mr-1" />
                    <span>2h 15m</span>
                  </div>
                  <span>English</span>
                </div>
                <p className="text-surface-700 dark:text-surface-300 mb-6">
                  Experience Shakespeare's timeless tale of star-crossed lovers in this modern adaptation. Directed by the acclaimed Emma Thomson, this production brings fresh energy and perspective to one of the most beloved plays of all time.
                </p>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Cast</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-sm rounded-full bg-surface-100 dark:bg-surface-700">Richard Madden</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-surface-100 dark:bg-surface-700">Lily James</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-surface-100 dark:bg-surface-700">Derek Jacobi</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-surface-100 dark:bg-surface-700">Meera Syal</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <div className="text-sm mb-1">From</div>
                    <div className="text-2xl font-bold text-primary">$45</div>
                  </div>
                  <button className="btn btn-primary">Book Tickets</button>
                  <button className="btn btn-outline">More Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Plays Listing */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Plays in {selectedCity.name}</h2>
          <div className="flex items-center space-x-2 text-sm">
            <span>Sort by:</span>
            <select className="bg-transparent border-none focus:ring-0 font-medium text-primary cursor-pointer">
              <option>Popularity</option>
              <option>Rating</option>
              <option>Date</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLAYS.map((play, index) => (
            <motion.div
              key={play.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-sm group"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img 
                  src={play.image} 
                  alt={play.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="badge bg-primary/90 text-white">{play.genre}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{play.title}</h3>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{play.rating}/5</span>
                  </div>
                  <div className="flex items-center text-surface-500 dark:text-surface-400 text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {play.duration}
                  </div>
                </div>
                <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {play.venue}
                </div>
                <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  {play.date}
                </div>
                <button className="w-full btn btn-primary">Book Now</button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Load More */}
        <div className="mt-10 text-center">
          <button className="btn btn-outline btn-lg">
            Load More Plays
          </button>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Reviews</h2>
            <a href="#" className="text-primary dark:text-primary-light flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-sm p-6"
              >
                <div className="flex items-start mb-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-surface-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-surface-500 dark:text-surface-400 text-xs ml-2">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-surface-700 dark:text-surface-300 text-sm line-clamp-5">
                  {review.review}
                </p>
                <a href="#" className="flex items-center mt-4 text-primary text-sm font-medium">
                  <MessageCircle className="h-4 w-4 mr-1" /> Reply
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaysPage