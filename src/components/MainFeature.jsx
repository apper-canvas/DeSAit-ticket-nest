import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, ChevronDown, Check, X } from 'lucide-react'

// Mock data for theaters and showtimes
const THEATERS = [
  {
    id: 1,
    name: "Cineplex Odeon",
    location: "Downtown",
    distance: "2.5 miles away",
    rating: 4.5,
    facilities: ["Dolby Atmos", "IMAX", "Recliner Seats"]
  },
  {
    id: 2,
    name: "AMC Theaters",
    location: "Midtown Mall",
    distance: "3.8 miles away",
    rating: 4.3,
    facilities: ["IMAX", "Food Service", "Parking"]
  },
  {
    id: 3,
    name: "Regal Cinemas",
    location: "Westside",
    distance: "5.2 miles away",
    rating: 4.2,
    facilities: ["Dolby Atmos", "Parking", "Lounge"]
  }
]

const SHOWTIMES = [
  { id: 1, time: "10:30 AM", format: "2D" },
  { id: 2, time: "1:15 PM", format: "3D" },
  { id: 3, time: "4:00 PM", format: "2D" },
  { id: 4, time: "6:45 PM", format: "IMAX" },
  { id: 5, time: "9:30 PM", format: "2D" }
]

const DATES = [
  { id: 1, day: "Today", date: "Aug 15", isToday: true },
  { id: 2, day: "Tomorrow", date: "Aug 16", isToday: false },
  { id: 3, day: "Wed", date: "Aug 17", isToday: false },
  { id: 4, day: "Thu", date: "Aug 18", isToday: false },
  { id: 5, day: "Fri", date: "Aug 19", isToday: false },
  { id: 6, day: "Sat", date: "Aug 20", isToday: false },
  { id: 7, day: "Sun", date: "Aug 21", isToday: false }
]

function MainFeature() {
  const [selectedDate, setSelectedDate] = useState(DATES[0])
  const [selectedTheater, setSelectedTheater] = useState(null)
  const [selectedShowtime, setSelectedShowtime] = useState(null)
  const [numberOfTickets, setNumberOfTickets] = useState(2)
  const [isTheaterDropdownOpen, setIsTheaterDropdownOpen] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingError, setBookingError] = useState(null)
  
  // Reset booking state when theater changes
  useEffect(() => {
    setSelectedShowtime(null)
  }, [selectedTheater])
  
  // Handle booking submission
  const handleBookTickets = () => {
    if (!selectedTheater || !selectedShowtime) {
      setBookingError("Please select a theater and showtime to continue.")
      return
    }
    
    // Simulate booking process
    setBookingError(null)
    
    // Show success message after a brief delay
    setTimeout(() => {
      setBookingComplete(true)
    }, 1000)
  }
  
  // Reset booking form
  const resetBooking = () => {
    setSelectedTheater(null)
    setSelectedShowtime(null)
    setNumberOfTickets(2)
    setBookingComplete(false)
    setBookingError(null)
  }
  
  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl overflow-hidden shadow-soft dark:shadow-none border border-surface-200 dark:border-surface-700">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Book Movie Tickets
        </h2>
        
        <AnimatePresence mode="wait">
          {bookingComplete ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Booking Successful!</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-6">
                Your tickets have been booked successfully. Check your email for confirmation.
              </p>
              
              <div className="max-w-sm mx-auto p-4 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-900 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-surface-600 dark:text-surface-400">Movie:</span>
                  <span className="font-medium">Cosmic Voyage: Beyond the Stars</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-surface-600 dark:text-surface-400">Theater:</span>
                  <span className="font-medium">{selectedTheater?.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-surface-600 dark:text-surface-400">Date:</span>
                  <span className="font-medium">{selectedDate.day}, {selectedDate.date}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-surface-600 dark:text-surface-400">Time:</span>
                  <span className="font-medium">{selectedShowtime?.time} ({selectedShowtime?.format})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-400">Tickets:</span>
                  <span className="font-medium">{numberOfTickets}</span>
                </div>
              </div>
              
              <button 
                onClick={resetBooking}
                className="btn btn-primary"
              >
                Book Another Ticket
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Date Selection */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold">Select Date</h3>
                </div>
                
                <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
                  {DATES.map(date => (
                    <button
                      key={date.id}
                      onClick={() => setSelectedDate(date)}
                      className={`flex-shrink-0 flex flex-col items-center justify-center px-4 py-3 rounded-lg transition-all ${
                        selectedDate.id === date.id
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                      }`}
                    >
                      <span className="text-xs font-medium mb-1">{date.day}</span>
                      <span className="text-sm font-bold">{date.date}</span>
                      {date.isToday && (
                        <span className={`text-xs mt-1 ${
                          selectedDate.id === date.id ? 'text-white/80' : 'text-primary'
                        }`}>
                          Today
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Theater Selection */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold">Select Theater</h3>
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setIsTheaterDropdownOpen(!isTheaterDropdownOpen)}
                    className="w-full flex items-center justify-between p-4 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <span className={selectedTheater ? 'font-medium' : 'text-surface-500'}>
                      {selectedTheater ? selectedTheater.name : 'Select a theater'}
                    </span>
                    <ChevronDown className={`h-5 w-5 text-surface-500 transition-transform ${isTheaterDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isTheaterDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 mt-1 w-full bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg shadow-lg overflow-hidden"
                      >
                        {THEATERS.map(theater => (
                          <div
                            key={theater.id}
                            onClick={() => {
                              setSelectedTheater(theater)
                              setIsTheaterDropdownOpen(false)
                            }}
                            className="p-4 hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer border-b border-surface-200 dark:border-surface-700 last:border-0"
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-medium">{theater.name}</h4>
                              <div className="flex items-center text-sm">
                                <span className="text-yellow-500">★</span>
                                <span className="ml-1">{theater.rating}</span>
                              </div>
                            </div>
                            <div className="text-sm text-surface-600 dark:text-surface-400 mb-2">
                              {theater.location} • {theater.distance}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {theater.facilities.map((facility, index) => (
                                <span 
                                  key={index}
                                  className="text-xs px-2 py-1 bg-surface-100 dark:bg-surface-700 rounded-full"
                                >
                                  {facility}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Showtime Selection */}
              {selectedTheater && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <div className="flex items-center mb-3">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-semibold">Select Showtime</h3>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {SHOWTIMES.map(showtime => (
                      <button
                        key={showtime.id}
                        onClick={() => setSelectedShowtime(showtime)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                          selectedShowtime?.id === showtime.id
                            ? 'border-primary bg-primary/5 dark:bg-primary/10'
                            : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                        }`}
                      >
                        <span className={`text-sm font-bold ${
                          selectedShowtime?.id === showtime.id ? 'text-primary' : ''
                        }`}>
                          {showtime.time}
                        </span>
                        <span className="text-xs text-surface-500 mt-1">{showtime.format}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Number of Tickets */}
              {selectedShowtime && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="flex items-center mb-3">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-semibold">Number of Tickets</h3>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => setNumberOfTickets(Math.max(1, numberOfTickets - 1))}
                      className="h-10 w-10 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center text-lg font-bold"
                      disabled={numberOfTickets <= 1}
                    >
                      -
                    </button>
                    <span className="mx-6 text-xl font-bold w-8 text-center">{numberOfTickets}</span>
                    <button
                      onClick={() => setNumberOfTickets(Math.min(10, numberOfTickets + 1))}
                      className="h-10 w-10 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center text-lg font-bold"
                      disabled={numberOfTickets >= 10}
                    >
                      +
                    </button>
                  </div>
                </motion.div>
              )}
              
              {/* Error Message */}
              <AnimatePresence>
                {bookingError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 flex items-start"
                  >
                    <X className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{bookingError}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Book Button */}
              <button
                onClick={handleBookTickets}
                className="w-full btn btn-primary py-3 text-lg font-medium"
              >
                Book Tickets
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MainFeature