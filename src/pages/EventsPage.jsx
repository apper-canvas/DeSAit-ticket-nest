import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Filter, ChevronRight, Heart } from 'lucide-react'

// Mock data
const CITIES = [
  { id: 1, name: "New York" },
  { id: 2, name: "Los Angeles" },
  { id: 3, name: "Chicago" },
  { id: 4, name: "Houston" },
  { id: 5, name: "Phoenix" }
]

const EVENT_TYPES = [
  "Music", "Comedy", "Theatre", "Conference", "Exhibition", 
  "Workshop", "Food & Drink", "Charity", "Festival", "Sport"
]

const EVENT_DATES = [
  "Today", "Tomorrow", "This Weekend", "This Week", "Next Week", "This Month"
]

const EVENTS = [
  {
    id: 1,
    title: "Summer Music Festival",
    type: "Music",
    date: "Aug 15-17, 2023",
    venue: "Central Park",
    price: "$49",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Comedy Night Live",
    type: "Comedy",
    date: "Aug 20, 2023",
    venue: "Laugh Factory",
    price: "$25",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Broadway Musical: Hamilton",
    type: "Theatre",
    date: "Aug 25-30, 2023",
    venue: "Broadway Theater",
    price: "$75",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Tech Conference 2023",
    type: "Conference",
    date: "Sep 5-7, 2023",
    venue: "Convention Center",
    price: "$299",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Food & Wine Festival",
    type: "Food & Drink",
    date: "Sep 12, 2023",
    venue: "City Square",
    price: "$35",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "Art Exhibition: Modern Masters",
    type: "Exhibition",
    date: "Sep 15-30, 2023",
    venue: "Metropolitan Museum",
    price: "$20",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    title: "Jazz in the Park",
    type: "Music",
    date: "Sep 19, 2023",
    venue: "Hyde Park",
    price: "Free",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    title: "Charity Run for Cancer Research",
    type: "Charity",
    date: "Sep 24, 2023",
    venue: "Riverside Park",
    price: "$15",
    image: "https://images.unsplash.com/photo-1533922614286-a22a99fd7b01?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
]

const FEATURED_EVENTS = [
  {
    id: 101,
    title: "Global Music Awards Live Concert",
    type: "Music",
    date: "Oct 15, 2023",
    venue: "Madison Square Garden",
    description: "Experience the most anticipated music event of the year featuring performances from top artists across the globe. A night celebrating musical excellence and innovation.",
    price: "$89 - $350",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 102,
    title: "International Food Festival",
    type: "Food & Drink",
    date: "Oct 20-22, 2023",
    venue: "Waterfront Plaza",
    description: "Explore cuisines from around the world with over 50 food vendors, cooking demonstrations from celebrity chefs, and wine tastings from premium vineyards.",
    price: "$45",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  }
]

function EventsPage() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0])
  const [selectedType, setSelectedType] = useState("All Types")
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
      
      {/* Events Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-secondary to-primary overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Events</h1>
            <p className="text-white/80 max-w-xl">
              Discover exciting concerts, festivals, workshops, and more happening in your city. Book tickets and create unforgettable memories.
            </p>
          </div>
        </div>
      </div>
      
      {/* Featured Events */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FEATURED_EVENTS.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-xl overflow-hidden shadow-lg h-64 md:h-80 group"
            >
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-900 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="badge bg-primary/90 text-white">{event.type}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-white/80 mb-3 line-clamp-2">{event.description}</p>
                <div className="flex flex-wrap gap-4 text-white/90 text-sm mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.venue}
                  </div>
                </div>
                <button className="btn btn-primary">Book Now</button>
              </div>
            </motion.div>
          ))}
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
                {EVENT_DATES.map(date => (
                  <option key={date}>{date}</option>
                ))}
              </select>
            </div>
            
            <div className="px-4 py-2 bg-surface-100 dark:bg-surface-700 rounded-full">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
              >
                <option>All Types</option>
                {EVENT_TYPES.map(type => (
                  <option key={type}>{type}</option>
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
              <div>
                <h3 className="font-medium mb-3">Event Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {EVENT_TYPES.map(type => (
                    <button
                      key={type}
                      className={`px-3 py-1 text-sm rounded-full border ${
                        selectedType === type
                          ? 'bg-primary text-white border-primary'
                          : 'border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium mb-3">Date Range</h3>
                <div className="flex flex-wrap gap-2">
                  {EVENT_DATES.map(date => (
                    <button
                      key={date}
                      className={`px-3 py-1 text-sm rounded-full border ${
                        selectedDate === date
                          ? 'bg-primary text-white border-primary'
                          : 'border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary'
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button className="btn btn-primary text-sm">Apply Filters</button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Events Listing */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Events in {selectedCity.name}</h2>
          <div className="flex items-center space-x-2 text-sm">
            <span>Sort by:</span>
            <select className="bg-transparent border-none focus:ring-0 font-medium text-primary cursor-pointer">
              <option>Date</option>
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVENTS.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-sm group"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="badge bg-primary/90 text-white">{event.type}</span>
                </div>
                <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{event.title}</h3>
                <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.venue}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Starting {event.price}</span>
                  <button className="btn btn-primary btn-sm">Book Now</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Load More */}
        <div className="mt-10 text-center">
          <button className="btn btn-outline btn-lg">
            Load More Events
          </button>
        </div>
        
        {/* Event Categories */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Browse by Category</h2>
            <a href="#" className="text-primary dark:text-primary-light flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {EVENT_TYPES.slice(0, 10).map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer"
              >
                <img 
                  src={`https://source.unsplash.com/random/300x300?${type.toLowerCase()}`}
                  alt={type}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 to-surface-900/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-lg">{type}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsPage