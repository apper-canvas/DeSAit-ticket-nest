import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Calendar, Lock, User } from 'lucide-react'

const PaymentForm = ({ onPaymentSubmit }) => {
  const [cardNumber, setCardNumber] = useState('')
  const [cardholderName, setCardholderName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [errors, setErrors] = useState({})
  
  const formatCardNumber = (value) => {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '')
    // Add a space every 4 digits
    const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ')
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.substring(0, 19)
  }
  
  const formatExpiryDate = (value) => {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '')
    // Format as MM/YY
    if (digitsOnly.length > 2) {
      return `${digitsOnly.substring(0, 2)}/${digitsOnly.substring(2, 4)}`
    }
    return digitsOnly
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    const newErrors = {}
    
    if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Valid card number is required'
    }
    
    if (!cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required'
    }
    
    if (!expiryDate.trim() || expiryDate.length !== 5) {
      newErrors.expiryDate = 'Valid expiry date is required (MM/YY)'
    } else {
      const [month, year] = expiryDate.split('/')
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear() % 100 // Get last 2 digits
      const currentMonth = currentDate.getMonth() + 1
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Month must be between 01-12'
      } else if (
        (parseInt(year) < currentYear) || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = 'Card has expired'
      }
    }
    
    if (!cvv.trim() || cvv.length < 3) {
      newErrors.cvv = 'Valid CVV is required'
    }
    
    setErrors(newErrors)
    
    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      onPaymentSubmit({
        cardNumber: cardNumber.replace(/\s/g, ''),
        cardholderName,
        expiryDate,
        last4: cardNumber.slice(-4)
      })
    }
  }
  
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Payment Details</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          {/* Cardholder Name */}
          <div>
            <label htmlFor="cardholder-name" className="block text-sm font-medium mb-1">
              Cardholder Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                <User className="h-5 w-5" />
              </div>
              <input
                id="cardholder-name"
                type="text"
                placeholder="John Smith"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.cardholderName 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-surface-300 dark:border-surface-600 focus:ring-primary focus:border-primary'
                } rounded-lg bg-white dark:bg-surface-900`}
              />
            </div>
            {errors.cardholderName && (
              <p className="mt-1 text-sm text-red-500">{errors.cardholderName}</p>
            )}
          </div>
          
          {/* Card Number */}
          <div>
            <label htmlFor="card-number" className="block text-sm font-medium mb-1">
              Card Number
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <input
                id="card-number"
                type="text"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.cardNumber 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-surface-300 dark:border-surface-600 focus:ring-primary focus:border-primary'
                } rounded-lg bg-white dark:bg-surface-900`}
                maxLength={19}
              />
            </div>
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
            )}
          </div>
          
          {/* Expiry Date & CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry-date" className="block text-sm font-medium mb-1">
                Expiry Date
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <input
                  id="expiry-date"
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  className={`w-full pl-10 pr-4 py-2 border ${
                    errors.expiryDate 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-surface-300 dark:border-surface-600 focus:ring-primary focus:border-primary'
                  } rounded-lg bg-white dark:bg-surface-900`}
                  maxLength={5}
                />
              </div>
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                CVV
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    setCvv(value.substring(0, 4))
                  }}
                  className={`w-full pl-10 pr-4 py-2 border ${
                    errors.cvv 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-surface-300 dark:border-surface-600 focus:ring-primary focus:border-primary'
                  } rounded-lg bg-white dark:bg-surface-900`}
                  maxLength={4}
                />
              </div>
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
              )}
            </div>
          </div>
          
          {/* Payment button is handled by parent component */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 mt-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
          >
            Complete Payment
          </motion.button>
        </div>
      </form>
      
      <div className="text-center text-xs text-surface-500 dark:text-surface-400 flex items-center justify-center">
        <Lock className="h-3 w-3 mr-1" />
        All payment information is securely processed
      </div>
    </div>
  )
}

export default PaymentForm