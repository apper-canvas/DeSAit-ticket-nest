import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, MonitorSmartphone } from 'lucide-react'

// Mock data for theater layout
const LAYOUT = {
  rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  seatsPerRow: 12,
  unavailableSeats: ['A2', 'A3', 'B5', 'B6', 'B7', 'C9', 'D4', 'E7', 'E8', 'F10', 'F11', 'G2', 'H5']
}

const SeatSelection = ({ numberOfTickets, onSeatSelection }) => {
  const [selectedSeats, setSelectedSeats] = useState([])

  const handleSeatClick = (seatId) => {
    // Check if seat is unavailable
    if (LAYOUT.unavailableSeats.includes(seatId)) {
      return
    }

    // If seat is already selected, remove it
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId))
      return
    }

    // If we've already selected the max number of tickets, remove the first seat
    if (selectedSeats.length >= numberOfTickets) {
      const newSelection = [...selectedSeats.slice(1), seatId]
      setSelectedSeats(newSelection)
      onSeatSelection(newSelection)
      return
    }

    // Add the new seat
    const newSelection = [...selectedSeats, seatId]
    setSelectedSeats(newSelection)
    onSeatSelection(newSelection)
  }

  const getSeatStatus = (seatId) => {
    if (LAYOUT.unavailableSeats.includes(seatId)) {
      return 'unavailable'
    }
    if (selectedSeats.includes(seatId)) {
      return 'selected'
    }
    return 'available'
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">Select Your Seats</h3>
        
        {/* Screen */}
        <div className="relative mb-8">
          <div className="h-3 bg-surface-300 dark:bg-surface-500 rounded-t-full mx-auto w-4/5 mb-1"></div>
          <div className="h-10 bg-surface-200 dark:bg-surface-700 rounded-sm mx-auto w-4/5 flex items-center justify-center text-sm text-surface-600 dark:text-surface-300">
            <MonitorSmartphone className="h-4 w-4 mr-2" />
            SCREEN
          </div>
        </div>
        
        {/* Seat Map */}
        <div className="flex flex-col items-center mb-6">
          {LAYOUT.rows.map(row => (
            <div key={row} className="flex mb-2 items-center">
              <div className="w-6 text-center font-medium text-surface-500 dark:text-surface-400">{row}</div>
              <div className="flex space-x-1">
                {Array.from({ length: LAYOUT.seatsPerRow }).map((_, index) => {
                  const seatNumber = index + 1
                  const seatId = `${row}${seatNumber}`
                  const status = getSeatStatus(seatId)
                  
                  return (
                    <motion.button
                      key={seatId}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={status === 'unavailable'}
                      className={`w-7 h-7 rounded-t-lg text-xs flex items-center justify-center transition-colors ${
                        status === 'selected' 
                          ? 'bg-primary text-white' 
                          : status === 'unavailable' 
                            ? 'bg-surface-300 dark:bg-surface-600 text-surface-400 dark:text-surface-500 cursor-not-allowed' 
                            : 'bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300'
                      }`}
                    >
                      {seatNumber}
                    </motion.button>
                  )
                })}
              </div>
              <div className="w-6 text-center font-medium text-surface-500 dark:text-surface-400">{row}</div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center space-x-6 mb-4">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-t-md bg-surface-200 dark:bg-surface-700 mr-2"></div>
            <span className="text-sm text-surface-600 dark:text-surface-400">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-t-md bg-primary mr-2"></div>
            <span className="text-sm text-surface-600 dark:text-surface-400">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-t-md bg-surface-300 dark:bg-surface-600 mr-2"></div>
            <span className="text-sm text-surface-600 dark:text-surface-400">Unavailable</span>
          </div>
        </div>
      </div>

      {/* Selection summary */}
      <div className="bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-3">
          <Users className="h-5 w-5 text-primary mr-2" />
          <h3 className="font-medium">Your selection</h3>
        </div>
        
        {selectedSeats.length > 0 ? (
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedSeats.map(seat => (
                <span key={seat} className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm">
                  Seat {seat}
                </span>
              ))}
            </div>
            <div className="text-sm text-surface-600 dark:text-surface-400">
              {selectedSeats.length === numberOfTickets 
                ? "All seats selected!" 
                : `Select ${numberOfTickets - selectedSeats.length} more seat${numberOfTickets - selectedSeats.length !== 1 ? 's' : ''}`
              }
            </div>
          </div>
        ) : (
          <div className="text-sm text-surface-600 dark:text-surface-400">
            Please select {numberOfTickets} seat{numberOfTickets !== 1 ? 's' : ''} from the seating chart above
          </div>
        )}
      </div>
    </div>
  )
}

export default SeatSelection