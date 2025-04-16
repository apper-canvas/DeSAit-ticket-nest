import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-8 relative">
          <div className="text-9xl font-bold text-primary/10 dark:text-primary/20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">Page Not Found</div>
          </div>
        </div>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/"
            className="btn btn-primary w-full sm:w-auto"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="btn btn-outline w-full sm:w-auto dark:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound