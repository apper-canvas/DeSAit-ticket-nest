import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, 
  Clock, 
  Calendar, 
  CreditCard, 
  Info,
  Check,
  X,
  User,
  Mail,
  Phone
} from 'lucide-react'

// Mock data for theaters and seats
const THEATERS = {
  standard: {
    name: "Standard Theater",
    rows: 8,
    seatsPerRow: 10,
    rowLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    unavailableSeats: ['A3', 'A4', 'B5', 'C7', 'C8', 'D2', 'D3', 'E5', 'F8', 'G1', 'G2', 'G3'],
    seatTypes: {
      standard: { price: 12.99, color: 'bg-blue-500' },
      premium: { price: 16.99, color: 'bg-purple-500', rows: ['D', 'E'] }
    }
  },
  imax: {
    name: "IMAX Theater",
    rows: 10,
    seatsPerRow: 12,
    rowLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    unavailableSeats: ['A6', 'A7', 'B8', 'C10', 'D4', 'D5', 'E7', 'E8', 'F2', 'F3', 'G9', 'H5', 'I10', 'I11', 'J2'],
    seatTypes: {
      standard: { price: 18.99, color: 'bg-blue-500' },
      premium: { price: 22.99, color: 'bg-purple-500', rows: ['E', 'F', 'G'] }
    }
  }
}

// Payment methods
const PAYMENT_METHODS = [
  { id: 'credit-card', name: 'Credit Card', icon: CreditCard },
  { id: 'paypal', name: 'PayPal', icon: CreditCard },
  { id: 'apple-pay', name: 'Apple Pay', icon: CreditCard },
  { id: 'google-pay', name: 'Google Pay', icon: CreditCard }
]

// Function to get movie data
const getMovieData = (movieId) => {
  // In a real app, this would be an API call
  return {
    id: parseInt(movieId),
    title: "Interstellar Odyssey",
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.8,
    duration: "2h 35m",
    certificate: "PG-13"
  }
}

function BookingPage() {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get movie and showtime from location state, or fallback to defaults
  const passedShowtime = location.state?.showtime
  const passedMovie = location.state?.movie
  
  const [movie, setMovie] = useState(passedMovie || null)
  const [loading, setLoading] = useState(!passedMovie)
  const [showtime, setShowtime] = useState(passedShowtime || { time: "4:30 PM", format: "IMAX", price: "$18.99" })
  const [selectedSeats, setSelectedSeats] = useState([])
  const [bookingStep, setBookingStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [theaterLayout, setTheaterLayout] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingNumber, setBookingNumber] = useState('')
  
  // Load movie data if not passed in location state
  useEffect(() => {
    if (!passedMovie) {
      setLoading(true)
      
      // Simulate API loading delay
      setTimeout(() => {
        const fetchedMovie = getMovieData(movieId)
        setMovie(fetchedMovie)
        setLoading(false)
      }, 500)
    }
    
    // Set theater layout based on format
    if (showtime.format === "IMAX") {
      setTheaterLayout(THEATERS.imax)
    } else {
      setTheaterLayout(THEATERS.standard)
    }
  }, [movieId, passedMovie, showtime.format])
  
  // Calculate subtotal
  const calculateSubtotal = () => {
    if (!theaterLayout) return 0
    
    return selectedSeats.reduce((total, seat) => {
      const rowLetter = seat.charAt(0)
      const isPremium = theaterLayout.seatTypes.premium.rows.includes(rowLetter)
      return total + (isPremium ? theaterLayout.seatTypes.premium.price : theaterLayout.seatTypes.standard.price)
    }, 0)
  }
  
  // Calculate taxes (10%)
  const calculateTaxes = () => {
    return calculateSubtotal() * 0.1
  }
  
  // Calculate booking fee
  const calculateBookingFee = () => {
    return selectedSeats.length * 1.5
  }
  
  // Calculate total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTaxes() + calculateBookingFee()
  }
  
  // Handle seat selection
  const toggleSeatSelection = (seat) => {
    if (theaterLayout.unavailableSeats.includes(seat)) {
      return // Cannot select unavailable seats
    }
    
    setSelectedSeats(prev => {
      if (prev.includes(seat)) {
        return prev.filter(s => s !== seat)
      } else {
        return [...prev, seat]
      }
    })
  }
  
  // Check if a seat is selected
  const isSeatSelected = (seat) => {
    return selectedSeats.includes(seat)
  }
  
  // Check seat type (standard or premium)
  const getSeatType = (rowLetter) => {
    if (!theaterLayout) return 'standard'
    return theaterLayout.seatTypes.premium.rows.includes(rowLetter) ? 'premium' : 'standard'
  }
  
  // Handle form change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      })
    }
  }
  
  // Validate contact form
  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  // Handle continuation to next step
  const handleContinue = () => {
    if (bookingStep === 1) {
      if (selectedSeats.length === 0) {
        alert('Please select at least one seat')
        return
      }
      setBookingStep(2)
    } else if (bookingStep === 2) {
      if (validateForm()) {
        setBookingStep(3)
      }
    } else if (bookingStep === 3) {
      // Complete booking
      setBookingComplete(true)
      setBookingNumber(`TKT${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`)
    }
  }
  
  // Handle back button
  const handleBack = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1)
    } else {
      navigate(-1)
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading booking details...</p>
        </div>
      </div>
    )
  }
  
  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-surface-50 dark:bg-surface-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white dark:bg-surface-800 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-primary text-white p-6 text-center">
              <div className="rounded-full bg-white w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
              <p>Your booking has been completed successfully</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Booking Number</div>
                <div className="text-xl font-bold">{bookingNumber}</div>
              </div>
              
              <div className="border-t border-b border-surface-200 dark:border-surface-700 py-4 my-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Movie</div>
                  <div className="font-medium">{movie.title}</div>
                </div>
                <div>
                  <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Date</div>
                  <div className="font-medium">Today</div>
                </div>
                <div>
                  <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Time</div>
                  <div className="font-medium">{showtime.time}</div>
                </div>
                <div>
                  <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Format</div>
                  <div className="font-medium">{showtime.format}</div>
                </div>
                <div>
                  <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Seats</div>
                  <div className="font-medium">{selectedSeats.join(', ')}</div>
                </div>
                <div>
                  <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Total Amount</div>
                  <div className="font-medium">${calculateTotal().toFixed(2)}</div>
                </div>
              </div>
              
              <div className="bg-surface-100 dark:bg-surface-700 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm">Your e-tickets have been sent to {formData.email}. Please show your ticket at the counter or use the self check-in kiosk at the theater.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <button className="btn btn-primary">
                  Download E-Tickets
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => navigate('/movies')}
                >
                  Return to Movies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      {/* Header */}
      <div className="bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={handleBack}
              className="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white flex items-center"
            >
              <ChevronLeft size={20} className="mr-1" />
              Back
            </button>
            <div className="text-center">
              <h1 className="font-bold">Book Tickets</h1>
              <p className="text-sm text-surface-500 dark:text-surface-400">{movie.title}</p>
            </div>
            <div className="w-20"></div> {/* Empty div for spacing */}
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${bookingStep >= 1 ? 'text-primary' : 'text-surface-400'}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${bookingStep >= 1 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700'}`}>
                1
              </div>
              <span className="ml-2 font-medium hidden sm:block">Select Seats</span>
            </div>
            <div className={`flex-1 h-1 mx-2 sm:mx-4 ${bookingStep >= 2 ? 'bg-primary' : 'bg-surface-200 dark:bg-surface-700'}`}></div>
            <div className={`flex items-center ${bookingStep >= 2 ? 'text-primary' : 'text-surface-400'}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${bookingStep >= 2 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700'}`}>
                2
              </div>
              <span className="ml-2 font-medium hidden sm:block">Your Details</span>
            </div>
            <div className={`flex-1 h-1 mx-2 sm:mx-4 ${bookingStep >= 3 ? 'bg-primary' : 'bg-surface-200 dark:bg-surface-700'}`}></div>
            <div className={`flex items-center ${bookingStep >= 3 ? 'text-primary' : 'text-surface-400'}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${bookingStep >= 3 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700'}`}>
                3
              </div>
              <span className="ml-2 font-medium hidden sm:block">Payment</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Column */}
          <div className="lg:col-span-2">
            {/* Step 1: Seat Selection */}
            {bookingStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-surface-800 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Select Your Seats</h2>
                  
                  {/* Showtime Information */}
                  <div className="flex items-center mb-6 text-sm text-surface-600 dark:text-surface-400">
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Today</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{showtime.time}</span>
                    </div>
                    <div>
                      <span className="px-2 py-0.5 bg-surface-100 dark:bg-surface-700 rounded text-xs">
                        {showtime.format}
                      </span>
                    </div>
                  </div>
                  
                  {/* Seat Legend */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-surface-200 dark:bg-surface-700 rounded mr-2"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-primary rounded mr-2"></div>
                      <span className="text-sm">Selected</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-surface-400 dark:bg-surface-600 rounded mr-2"></div>
                      <span className="text-sm">Unavailable</span>
                    </div>
                    {theaterLayout && (
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
                        <span className="text-sm">Premium (${theaterLayout.seatTypes.premium.price.toFixed(2)})</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Screen Indicator */}
                  <div className="mb-8">
                    <div className="h-2 bg-primary/80 rounded-t-lg mb-1"></div>
                    <div className="text-center text-sm text-surface-500 dark:text-surface-400">SCREEN</div>
                  </div>
                  
                  {/* Seating Layout */}
                  {theaterLayout && (
                    <div className="flex justify-center mb-8">
                      <div className="inline-block">
                        {theaterLayout.rowLabels.map((row, rowIndex) => (
                          <div key={row} className="flex justify-center mb-2">
                            <div className="w-6 flex items-center justify-center text-sm text-surface-500">
                              {row}
                            </div>
                            {[...Array(theaterLayout.seatsPerRow)].map((_, seatIndex) => {
                              const seatNumber = seatIndex + 1
                              const seatId = `${row}${seatNumber}`
                              const isUnavailable = theaterLayout.unavailableSeats.includes(seatId)
                              const isSelected = isSeatSelected(seatId)
                              const seatType = getSeatType(row)
                              
                              return (
                                <button
                                  key={seatId}
                                  className={`w-8 h-8 m-1 rounded flex items-center justify-center text-xs ${
                                    isUnavailable 
                                      ? 'bg-surface-400 dark:bg-surface-600 cursor-not-allowed' 
                                      : isSelected
                                        ? 'bg-primary text-white'
                                        : seatType === 'premium'
                                          ? 'bg-purple-500 hover:bg-purple-600 text-white'
                                          : 'bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600'
                                  }`}
                                  onClick={() => toggleSeatSelection(seatId)}
                                  disabled={isUnavailable}
                                >
                                  {seatNumber}
                                </button>
                              )
                            })}
                            <div className="w-6 flex items-center justify-center text-sm text-surface-500">
                              {row}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Selected Seats Display */}
                  <div className="bg-surface-50 dark:bg-surface-700 p-4 rounded-lg mb-6">
                    <h3 className="font-medium mb-2">Selected Seats ({selectedSeats.length})</h3>
                    {selectedSeats.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedSeats.map(seat => (
                          <span key={seat} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {seat}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-surface-500 dark:text-surface-400">No seats selected yet</p>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={handleContinue}
                      disabled={selectedSeats.length === 0}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Contact Details */}
            {bookingStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-surface-800 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Your Contact Details</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-surface-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className={`w-full pl-10 rounded-lg border ${
                            formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-surface-300 dark:border-surface-600'
                          }`}
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-surface-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={`w-full pl-10 rounded-lg border ${
                            formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-surface-300 dark:border-surface-600'
                          }`}
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="phone">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-surface-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className={`w-full pl-10 rounded-lg border ${
                            formErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-surface-300 dark:border-surface-600'
                          }`}
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="notifications"
                      className="rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor="notifications" className="ml-2 text-sm">
                      Send me notifications about showtimes and special offers
                    </label>
                  </div>
                  
                  <div className="bg-surface-50 dark:bg-surface-700 p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="mb-1">Your booking confirmation and e-tickets will be sent to your email address.</p>
                        <p>We may contact you regarding changes to your booking or in case of emergencies.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      className="btn btn-outline"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleContinue}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Payment */}
            {bookingStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-surface-800 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {PAYMENT_METHODS.map(method => (
                      <div
                        key={method.id}
                        className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center justify-center ${
                          paymentMethod === method.id
                            ? 'border-primary bg-primary/5 dark:bg-primary/10'
                            : 'border-surface-200 dark:border-surface-700'
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <method.icon className={`h-6 w-6 mb-2 ${
                          paymentMethod === method.id ? 'text-primary' : 'text-surface-400'
                        }`} />
                        <span className="text-sm font-medium">{method.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Payment Form */}
                  <div className="mb-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="card-number">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="card-number"
                          className="w-full rounded-lg border-surface-300 dark:border-surface-600"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="expiry-date">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiry-date"
                            className="w-full rounded-lg border-surface-300 dark:border-surface-600"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="cvv">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            className="w-full rounded-lg border-surface-300 dark:border-surface-600"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="card-name">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          id="card-name"
                          className="w-full rounded-lg border-surface-300 dark:border-surface-600"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="save-card"
                      className="rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor="save-card" className="ml-2 text-sm">
                      Save this card for future payments
                    </label>
                  </div>
                  
                  <div className="bg-surface-50 dark:bg-surface-700 p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p>Your payment information is secure and encrypted. We do not store your full card details.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      className="btn btn-outline"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleContinue}
                    >
                      Complete Payment
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-surface-800 rounded-xl shadow-sm overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                {/* Movie Information */}
                <div className="flex gap-3 mb-6">
                  <div className="w-16 h-24 rounded overflow-hidden shrink-0">
                    <img 
                      src={movie.image} 
                      alt={movie.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{movie.title}</h3>
                    <div className="flex items-center text-sm text-surface-600 dark:text-surface-400 mb-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{movie.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Today, {showtime.time}</span>
                    </div>
                  </div>
                </div>
                
                {/* Tickets */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Tickets</h3>
                  <div className="space-y-2">
                    {theaterLayout && selectedSeats.length > 0 && (
                      <>
                        {/* Group seats by type for display */}
                        {(() => {
                          const standardSeats = selectedSeats.filter(seat => 
                            !theaterLayout.seatTypes.premium.rows.includes(seat.charAt(0))
                          )
                          
                          const premiumSeats = selectedSeats.filter(seat => 
                            theaterLayout.seatTypes.premium.rows.includes(seat.charAt(0))
                          )
                          
                          return (
                            <>
                              {standardSeats.length > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span>Standard ({standardSeats.length})</span>
                                  <span>${(standardSeats.length * theaterLayout.seatTypes.standard.price).toFixed(2)}</span>
                                </div>
                              )}
                              
                              {premiumSeats.length > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span>Premium ({premiumSeats.length})</span>
                                  <span>${(premiumSeats.length * theaterLayout.seatTypes.premium.price).toFixed(2)}</span>
                                </div>
                              )}
                            </>
                          )
                        })()}
                      </>
                    )}
                    
                    {selectedSeats.length === 0 && (
                      <div className="text-sm text-surface-500 dark:text-surface-400">
                        No seats selected
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Seat Details */}
                {selectedSeats.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Seat Details</h3>
                    <div className="bg-surface-50 dark:bg-surface-700 p-3 rounded text-sm">
                      {selectedSeats.join(', ')}
                    </div>
                  </div>
                )}
                
                {/* Price Breakdown */}
                {selectedSeats.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Price Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes (10%)</span>
                        <span>${calculateTaxes().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Booking Fee</span>
                        <span>${calculateBookingFee().toFixed(2)}</span>
                      </div>
                      <div className="border-t border-surface-200 dark:border-surface-700 pt-2 mt-2 font-medium flex justify-between">
                        <span>Total</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Terms and Conditions */}
                <div className="text-xs text-surface-500 dark:text-surface-400">
                  By completing this booking, you agree to our <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Refund Policy</a>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage