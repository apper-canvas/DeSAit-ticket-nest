import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, MapPin, Users, Ticket, Check, CreditCard } from 'lucide-react'
import SeatSelection from '../components/SeatSelection'
import PaymentForm from '../components/PaymentForm'

const BookingPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentInfo, setPaymentInfo] = useState(null)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingError, setBookingError] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Ticket price calculation (mock)
  const TICKET_PRICE = 12.99
  const BOOKING_FEE = 1.50
  const TAX_RATE = 0.08
  
  useEffect(() => {
    // If no booking data was passed, redirect back to home
    if (!location.state) {
      navigate('/')
      return
    }
    
    setBookingData(location.state)
  }, [location, navigate])
  
  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats)
  }
  
  const handlePaymentSubmit = (paymentData) => {
    setPaymentInfo(paymentData)
    processBooking(paymentData)
  }
  
  const processBooking = (paymentData) => {
    // Show processing state
    setIsProcessing(true)
    setBookingError(null)
    
    // Simulate payment processing
    setTimeout(() => {
      // Mock successful payment
      setIsProcessing(false)
      setBookingComplete(true)
    }, 2000)
  }
  
  const getSubtotal = () => bookingData?.tickets * TICKET_PRICE
  const getBookingFees = () => bookingData?.tickets * BOOKING_FEE
  const getTaxes = () => (getSubtotal() + getBookingFees()) * TAX_RATE
  const getTotal = () => getSubtotal() + getBookingFees() + getTaxes()
  
  const formatPrice = (price) => `$${price.toFixed(2)}`
  
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      navigate('/')
    }
  }
  
  if (!bookingData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading booking information...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={goBack}
            className="mr-3 p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold">Complete Your Booking</h1>
        </div>
        
        {/* Booking Summary */}
        <div className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-soft dark:shadow-none border border-surface-200 dark:border-surface-700 mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4">
                <div className="aspect-[2/3] rounded-lg overflow-hidden">
                  <img 
                    src={bookingData.movie.image} 
                    alt={bookingData.movie.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-3">{bookingData.movie.title}</h2>
                
                <div className="space-y-3 text-surface-700 dark:text-surface-300">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{bookingData.theater.name}</div>
                      <div className="text-sm">{bookingData.theater.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{bookingData.date.day}, {bookingData.date.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{bookingData.showtime.time}</span>
                      <span className="ml-2 px-2 py-0.5 bg-surface-100 dark:bg-surface-700 rounded-full text-xs">
                        {bookingData.showtime.format}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{bookingData.tickets} Ticket{bookingData.tickets !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Steps */}
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <div className={`flex items-center justify-center h-10 w-10 rounded-full ${
              currentStep >= 1 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
            }`}>
              <Ticket className="h-5 w-5" />
            </div>
            <div className={`h-1 w-16 ${
              currentStep >= 2 ? 'bg-primary' : 'bg-surface-200 dark:bg-surface-700'
            }`}></div>
            <div className={`flex items-center justify-center h-10 w-10 rounded-full ${
              currentStep >= 2 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
            }`}>
              <CreditCard className="h-5 w-5" />
            </div>
            <div className={`h-1 w-16 ${
              currentStep >= 3 ? 'bg-primary' : 'bg-surface-200 dark:bg-surface-700'
            }`}></div>
            <div className={`flex items-center justify-center h-10 w-10 rounded-full ${
              currentStep >= 3 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
            }`}>
              <Check className="h-5 w-5" />
            </div>
          </div>
          <div className="flex justify-center mt-2 text-sm text-surface-600 dark:text-surface-400">
            <div className="w-32 text-center">Select Seats</div>
            <div className="w-32 text-center">Payment</div>
            <div className="w-32 text-center">Confirmation</div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-soft dark:shadow-none border border-surface-200 dark:border-surface-700">
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="seat-selection"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <SeatSelection 
                        numberOfTickets={bookingData.tickets} 
                        onSeatSelection={handleSeatSelection} 
                      />
                      
                      <div className="flex justify-between mt-6">
                        <button
                          onClick={goBack}
                          className="px-6 py-2 border border-surface-300 dark:border-surface-600 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                        >
                          Back
                        </button>
                        
                        <button
                          onClick={() => setCurrentStep(2)}
                          disabled={selectedSeats.length < bookingData.tickets}
                          className={`px-6 py-2 rounded-lg transition-colors ${
                            selectedSeats.length < bookingData.tickets
                              ? 'bg-surface-300 text-surface-600 cursor-not-allowed'
                              : 'bg-primary hover:bg-primary-dark text-white'
                          }`}
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </motion.div>
                  )}
                  
                  {currentStep === 2 && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <PaymentForm onPaymentSubmit={handlePaymentSubmit} />
                      
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="mt-4 px-6 py-2 border border-surface-300 dark:border-surface-600 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                      >
                        Back to Seat Selection
                      </button>
                    </motion.div>
                  )}
                  
                  {currentStep === 3 || bookingComplete ? (
                    <motion.div
                      key="confirmation"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                        <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Booking Successful!</h3>
                      <p className="text-surface-600 dark:text-surface-400 mb-6">
                        Your tickets have been booked successfully. Check your email for confirmation.
                      </p>
                      
                      <div className="max-w-sm mx-auto p-4 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-900 mb-6 text-left">
                        <div className="flex justify-between mb-2">
                          <span className="text-surface-600 dark:text-surface-400">Movie:</span>
                          <span className="font-medium">{bookingData.movie.title}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-surface-600 dark:text-surface-400">Theater:</span>
                          <span className="font-medium">{bookingData.theater.name}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-surface-600 dark:text-surface-400">Date:</span>
                          <span className="font-medium">{bookingData.date.day}, {bookingData.date.date}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-surface-600 dark:text-surface-400">Time:</span>
                          <span className="font-medium">{bookingData.showtime.time} ({bookingData.showtime.format})</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-surface-600 dark:text-surface-400">Seats:</span>
                          <span className="font-medium">{selectedSeats.join(', ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-surface-600 dark:text-surface-400">Payment:</span>
                          <span className="font-medium">XXXX XXXX XXXX {paymentInfo?.last4}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center space-x-4">
                        <button 
                          onClick={() => navigate('/')}
                          className="px-6 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors"
                        >
                          Return Home
                        </button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                
                {/* Processing Overlay */}
                {isProcessing && (
                  <div className="fixed inset-0 bg-surface-900/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-surface-800 rounded-xl p-8 max-w-sm w-full text-center">
                      <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"></div>
                      <h3 className="text-xl font-bold mb-2">Processing Your Payment</h3>
                      <p className="text-surface-600 dark:text-surface-400">
                        Please wait while we process your payment...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-soft dark:shadow-none border border-surface-200 dark:border-surface-700 sticky top-24">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-400">
                      {bookingData.tickets} x Ticket{bookingData.tickets !== 1 ? 's' : ''}
                    </span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-400">Booking Fees</span>
                    <span>{formatPrice(getBookingFees())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-400">Taxes</span>
                    <span>{formatPrice(getTaxes())}</span>
                  </div>
                  
                  <div className="pt-3 border-t border-surface-200 dark:border-surface-700 flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                </div>
                
                {selectedSeats.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Selected Seats</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seat => (
                        <span key={seat} className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm">
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-sm text-surface-500 dark:text-surface-400">
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