import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Filter, ChevronRight, Clock, Users, Trophy } from 'lucide-react'

// Mock data
const CITIES = [
  { id: 1, name: "New York" },
  { id: 2, name: "Los Angeles" },
  { id: 3, name: "Chicago" },
  { id: 4, name: "Houston" },
  { id: 5, name: "Phoenix" }
]

const SPORTS_TYPES = [
  "Basketball", "Football", "Baseball", "Soccer", "Hockey",
  "Tennis", "Golf", "Cricket", "Rugby", "Boxing", "MMA"
]

const TEAMS = [
  "New York Yankees", "LA Lakers", "Chicago Bulls", "Boston Red Sox",
  "Golden State Warriors", "Miami Heat", "Dallas Cowboys", "New England Patriots"
]

const VENUES = [
  "Madison Square Garden", "Staples Center", "Wembley Stadium",
  "Yankee Stadium", "Dodger Stadium", "MetLife Stadium", "AT&T Stadium"
]

const SPORTS_EVENTS = [
  {
    id: 1,
    title: "Lakers vs. Warriors",
    type: "Basketball",
    date: "Aug 15, 2023 • 7:30 PM",
    venue: "Staples Center",
    teams: "LA Lakers vs. Golden State Warriors",
    price: "$75 - $350",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Yankees vs. Red Sox",
    type: "Baseball",
    date: "Aug 18, 2023 • 1:05 PM",
    venue: "Yankee Stadium",
    teams: "New York Yankees vs. Boston Red Sox",
    price: "$45 - $200",
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "US Open Quarterfinals",
    type: "Tennis",
    date: "Aug 25, 2023 • Various Times",
    venue: "Arthur Ashe Stadium",
    teams: "Various Players",
    price: "$120 - $500",
    image: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "NFL: Cowboys vs. Patriots",
    type: "Football",
    date: "Sep 7, 2023 • 4:25 PM",
    venue: "AT&T Stadium",
    teams: "Dallas Cowboys vs. New England Patriots",
    price: "$95 - $450",
    image: "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "UFC 290: Title Fight",
    type: "MMA",
    date: "Sep 12, 2023 • 10:00 PM",
    venue: "T-Mobile Arena",
    teams: "Champion vs. #1 Contender",
    price: "$75 - $800",
    image: "https://images.unsplash.com/photo-1569902985068-28698e702426?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "World Cup Qualifier",
    type: "Soccer",
    date: "Sep 15, 2023 • 8:00 PM",
    venue: "MetLife Stadium",
    teams: "USA vs. Mexico",
    price: "$65 - $250",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    title: "Bulls vs. Heat",
    type: "Basketball",
    date: "Sep 19, 2023 • 7:00 PM",
    venue: "United Center",
    teams: "Chicago Bulls vs. Miami Heat",
    price: "$55 - $300",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    title: "PGA Tour Championship",
    type: "Golf",
    date: "Sep 24-27, 2023 • All Day",
    venue: "East Lake Golf Club",
    teams: "Top 30 PGA Players",
    price: "$45 - $200",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
]

function SportsPage() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0])
  const [selectedType, setSelectedType] = useState("All Sports")
  const [selectedTeam, setSelectedTeam] = useState("All Teams")
  const [selectedVenue, setSelectedVenue] = useState("All Venues")
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
      
      {/* Sports Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Sports</h1>
            <p className="text-white/80 max-w-xl">
              Get tickets for the biggest games, matches, and tournaments. Experience the thrill of live sports with the best seats in the house.
            </p>
          </div>
        </div>
      </div>
      
      {/* Sports Types */}
      <div className="bg-white dark:bg-surface-800 py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto pb-2 hide-scrollbar gap-2">
            {SPORTS_TYPES.map(sport => (
              <button
                key={sport}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                  selectedType === sport
                    ? 'bg-primary text-white'
                    : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
                onClick={() => setSelectedType(sport)}
              >
                {sport}
              </button>
            ))}
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
                <option>This Month</option>
              </select>
            </div>
            
            <div className="px-4 py-2 bg-surface-100 dark:bg-surface-700 rounded-full">
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
              >
                <option>All Teams</option>
                {TEAMS.map(team => (
                  <option key={team}>{team}</option>
                ))}
              </select>
            </div>
            
            <div className="px-4 py-2 bg-surface-100 dark:bg-surface-700 rounded-full">
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
              >
                <option>All Venues</option>
                {VENUES.map(venue => (
                  <option key={venue}>{venue}</option>
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
                  <h3 className="font-medium mb-3">Sports</h3>
                  <div className="flex flex-wrap gap-2">
                    {SPORTS_TYPES.slice(0, 8).map(sport => (
                      <button
                        key={sport}
                        className={`px-3 py-1 text-sm rounded-full border ${
                          selectedType === sport
                            ? 'bg-primary text-white border-primary'
                            : 'border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary'
                        }`}
                      >
                        {sport}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Teams</h3>
                  <div className="flex flex-wrap gap-2">
                    {TEAMS.slice(0, 6).map(team => (
                      <button
                        key={team}
                        className={`px-3 py-1 text-sm rounded-full border ${
                          selectedTeam === team
                            ? 'bg-primary text-white border-primary'
                            : 'border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary'
                        }`}
                      >
                        {team}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 text-sm rounded-full border border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary">
                      $0 - $50
                    </button>
                    <button className="px-3 py-1 text-sm rounded-full border border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary">
                      $50 - $100
                    </button>
                    <button className="px-3 py-1 text-sm rounded-full border border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary">
                      $100 - $200
                    </button>
                    <button className="px-3 py-1 text-sm rounded-full border border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary">
                      $200+
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
      
      {/* Featured Event */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Event</h2>
        <div className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="NBA Finals"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-transparent lg:hidden"></div>
              <div className="absolute top-4 left-4">
                <span className="badge bg-blue-600 text-white">Featured</span>
              </div>
              <div className="absolute bottom-4 left-4 lg:hidden">
                <h3 className="text-2xl font-bold text-white mb-1">NBA Finals 2023</h3>
                <p className="text-white/90">Game 7 - Championship Decider</p>
              </div>
            </div>
            <div className="p-6">
              <div className="hidden lg:block">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="badge bg-blue-600 text-white">Featured</span>
                  <span className="badge bg-surface-200 dark:bg-surface-700">Basketball</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">NBA Finals 2023</h3>
                <p className="text-lg font-medium text-surface-600 dark:text-surface-300 mb-4">
                  Game 7 - Championship Decider
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-surface-500 dark:text-surface-400 mr-2" />
                  <span>June 18, 2023 • 8:00 PM</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-surface-500 dark:text-surface-400 mr-2" />
                  <span>~3h</span>
                </div>
              </div>
              
              <div className="bg-surface-50 dark:bg-surface-700/50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <img 
                      src="https://via.placeholder.com/80?text=Team+A" 
                      alt="Team A"
                      className="h-16 w-16 object-contain mb-2"
                    />
                    <span className="font-semibold">Lakers</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xl font-bold mb-1">VS</div>
                    <span className="text-sm bg-surface-200 dark:bg-surface-600 px-2 py-1 rounded">
                      Championship
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <img 
                      src="https://via.placeholder.com/80?text=Team+B" 
                      alt="Team B"
                      className="h-16 w-16 object-contain mb-2"
                    />
                    <span className="font-semibold">Celtics</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Venue</h4>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-surface-500 dark:text-surface-400 mr-2" />
                  <span>TD Garden, Boston, MA</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div>
                  <div className="text-sm mb-1">Tickets from</div>
                  <div className="text-2xl font-bold text-primary">$250</div>
                </div>
                <div className="flex gap-3">
                  <button className="btn btn-primary">Get Tickets</button>
                  <button className="btn btn-outline">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Stats
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sports Events Listing */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Sports Events in {selectedCity.name}</h2>
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
          {SPORTS_EVENTS.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-sm group"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="badge bg-blue-600 text-white">{event.type}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{event.title}</h3>
                <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.venue}
                </div>
                <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm mb-4">
                  <Users className="h-4 w-4 mr-2" />
                  {event.teams}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{event.price}</span>
                  <button className="btn btn-primary btn-sm">Get Tickets</button>
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
        
        {/* Popular Teams */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular Teams</h2>
            <a href="#" className="text-primary dark:text-primary-light flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {TEAMS.map((team, index) => (
              <motion.div
                key={team}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center bg-white dark:bg-surface-800 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="h-16 w-16 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center mb-3">
                  <img 
                    src={`https://via.placeholder.com/64?text=${team.charAt(0)}`} 
                    alt={team}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-center line-clamp-2">{team}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SportsPage