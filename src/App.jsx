import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Moon, Sun, Menu, X, Search, User, Ticket } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white dark:bg-surface-800 shadow-sm backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TicketNest
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Movies</a>
              <a href="#" className="text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Events</a>
              <a href="#" className="text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Plays</a>
              <a href="#" className="text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Sports</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                <Search className="h-5 w-5 text-surface-600 dark:text-surface-300" />
              </button>
              
              <button className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                <User className="h-5 w-5 text-surface-600 dark:text-surface-300" />
              </button>
              
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={darkMode ? 'dark' : 'light'}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <Moon className="h-5 w-5 text-surface-600" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
          
          <button 
            className="md:hidden p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-surface-600 dark:text-surface-300" />
            ) : (
              <Menu className="h-6 w-6 text-surface-600 dark:text-surface-300" />
            )}
          </button>
        </div>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
                <a href="#" className="py-2 text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Movies</a>
                <a href="#" className="py-2 text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Events</a>
                <a href="#" className="py-2 text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Plays</a>
                <a href="#" className="py-2 text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Sports</a>
                
                <div className="flex items-center space-x-4 py-2">
                  <button className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                    <Search className="h-5 w-5 text-surface-600 dark:text-surface-300" />
                  </button>
                  
                  <button className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                    <User className="h-5 w-5 text-surface-600 dark:text-surface-300" />
                  </button>
                  
                  <button 
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <Moon className="h-5 w-5 text-surface-600" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="bg-surface-800 dark:bg-surface-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-light">TicketNest</h3>
              <p className="text-surface-300 text-sm">
                Book tickets for movies, events, plays, concerts, and more. Experience hassle-free booking with the best seat selection.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2 text-surface-300 text-sm">
                <li><a href="#" className="hover:text-primary-light transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
              <ul className="space-y-2 text-surface-300 text-sm">
                <li><a href="#" className="hover:text-primary-light transition-colors">Movies</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Plays</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Sports</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="h-10 w-10 rounded-full bg-surface-700 flex items-center justify-center hover:bg-primary transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-surface-700 flex items-center justify-center hover:bg-primary transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-surface-700 flex items-center justify-center hover:bg-primary transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-surface-700 text-center text-surface-400 text-sm">
            <p>© {new Date().getFullYear()} TicketNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App