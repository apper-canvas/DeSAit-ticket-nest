import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Star, 
  Clock, 
  Calendar, 
  ChevronLeft, 
  Heart, 
  Share2, 
  Play, 
  MapPin,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Info
} from 'lucide-react'

// Mock movie data - in a real app, you would fetch this from an API
const MOVIES = [
  {
    id: 1,
    title: "Interstellar Odyssey",
    genre: "Sci-Fi/Adventure",
    rating: 4.8,
    language: "English",
    certificate: "PG-13",
    duration: "2h 35m",
    formats: ["2D", "IMAX"],
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    bannerImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    synopsis: "Embark on an epic journey beyond our galaxy as a team of explorers search for a new habitable planet. When they discover a wormhole in space, they venture through it, traveling across dimensions and time itself. What they find will challenge everything they know about the universe.",
    director: "Christopher Smith",
    writers: ["Jonathan Miller", "Emma Thompson"],
    cast: [
      { name: "David Parker", role: "Captain John Mitchell", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
      { name: "Sarah Johnson", role: "Dr. Elena Shaw", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
      { name: "Michael Chen", role: "Dr. Robert Kim", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
      { name: "Emma Wilson", role: "Dr. Samantha Cooper", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" }
    ],
    reviews: [
      { id: 1, user: "MovieFan123", rating: 5, comment: "Absolutely mind-blowing! The visuals are stunning and the story is deeply emotional. One of the best sci-fi films I've ever seen.", date: "2023-09-15", likes: 42, verified: true },
      { id: 2, user: "CinemaLover", rating: 4, comment: "Great concept and execution. The third act drags a bit, but overall an amazing experience, especially in IMAX.", date: "2023-09-10", likes: 28, verified: true },
      { id: 3, user: "SciFiEnthusiast", rating: 5, comment: "The blend of hard science and human emotion is perfect. The score complements every scene beautifully.", date: "2023-09-05", likes: 36, verified: false }
    ],
    showtimes: [
      { time: "10:30 AM", format: "2D", price: "$12.99" },
      { time: "1:45 PM", format: "2D", price: "$12.99" },
      { time: "4:30 PM", format: "IMAX", price: "$18.99" },
      { time: "7:15 PM", format: "2D", price: "$14.99" },
      { time: "9:45 PM", format: "IMAX", price: "$18.99" }
    ],
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E"
  },
  {
    id: 2,
    title: "The Lost Kingdom",
    genre: "Fantasy/Action",
    rating: 4.5,
    language: "English",
    certificate: "PG-13",
    duration: "2h 10m",
    formats: ["2D", "3D"],
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    bannerImage: "https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    synopsis: "In a world where magic and technology coexist, an ancient kingdom emerges from the mists of legend. A reluctant hero must embrace their destiny to prevent a power-hungry tyrant from unleashing an ancient evil that threatens to consume the world.",
    director: "Victoria Lang",
    writers: ["Robert Jones", "Sophia Chen"],
    cast: [
      { name: "James Wilson", role: "Prince Erian", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
      { name: "Olivia Martinez", role: "Captain Maya", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
      { name: "Daniel Taylor", role: "Lord Drakkon", image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
      { name: "Isabella Kim", role: "Sorceress Elara", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" }
    ],
    reviews: [
      { id: 1, user: "FantasyFilmBuff", rating: 5, comment: "Epic in every sense! The world-building is immaculate and the battle scenes are breathtaking.", date: "2023-09-12", likes: 37, verified: true },
      { id: 2, user: "ActionMovieFan", rating: 4, comment: "Great action sequences and special effects. The story is a bit predictable but still thoroughly enjoyable.", date: "2023-09-08", likes: 21, verified: true },
      { id: 3, user: "MovieCritic101", rating: 3, comment: "Visually stunning but the character development leaves something to be desired. Still worth watching for the spectacle alone.", date: "2023-09-01", likes: 15, verified: false }
    ],
    showtimes: [
      { time: "11:00 AM", format: "2D", price: "$12.99" },
      { time: "2:15 PM", format: "3D", price: "$16.99" },
      { time: "5:00 PM", format: "2D", price: "$12.99" },
      { time: "7:45 PM", format: "3D", price: "$16.99" },
      { time: "10:15 PM", format: "2D", price: "$14.99" }
    ],
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E"
  },
  {
    id: 3,
    title: "Midnight Mystery",
    genre: "Thriller/Mystery",
    rating: 4.3,
    language: "English",
    certificate: "R",
    duration: "1h 55m",
    formats: ["2D"],
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    bannerImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    synopsis: "When a renowned detective is called to investigate a murder at an exclusive mansion during a midnight gathering, what starts as a straightforward case quickly unravels into a complex web of lies, betrayal, and hidden motives. Everyone is a suspect, and time is running out.",
    director: "Marcus Reid",
    writers: ["Olivia Bennett", "Thomas Wright"],
    cast: [
      { name: "Richard Moore", role: "Detective Jack Stone", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
      { name: "Eleanor Davis", role: "Veronica Blake", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
      { name: "Thomas Grant", role: "Edward Montgomery", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
      { name: "Sophie Miller", role: "Elizabeth Pierce", image: "https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" }
    ],
    reviews: [
      { id: 1, user: "MysteryLover", rating: 5, comment: "Brilliant plot twists that I never saw coming! Kept me on the edge of my seat the entire time.", date: "2023-09-14", likes: 45, verified: true },
      { id: 2, user: "ThrillerFan42", rating: 4, comment: "Great atmosphere and tension throughout. The ending was unexpected and satisfying.", date: "2023-09-07", likes: 32, verified: true },
      { id: 3, user: "FilmNoir", rating: 4, comment: "A modern take on classic mystery tropes. Well acted and directed with superb lighting and camera work.", date: "2023-09-02", likes: 29, verified: false }
    ],
    showtimes: [
      { time: "12:15 PM", format: "2D", price: "$12.99" },
      { time: "3:30 PM", format: "2D", price: "$12.99" },
      { time: "6:45 PM", format: "2D", price: "$14.99" },
      { time: "9:30 PM", format: "2D", price: "$14.99" }
    ],
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E"
  },
]

// Function to find movie by ID
const findMovieById = (id) => {
  const numericId = parseInt(id)
  return MOVIES.find(movie => movie.id === numericId) || MOVIES[0]
}

function MovieDetailsPage() {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showTrailer, setShowTrailer] = useState(false)
  const [selectedDate, setSelectedDate] = useState('Today')
  const [favorites, setFavorites] = useState([])
  const [selectedShowtime, setSelectedShowtime] = useState(null)
  const [expandedReview, setExpandedReview] = useState(null)

  // Load movie data and favorites from localStorage
  useEffect(() => {
    setLoading(true)
    
    // Simulate API loading delay
    setTimeout(() => {
      const movieData = findMovieById(movieId)
      setMovie(movieData)
      setLoading(false)
    }, 500)
    
    // Load favorites
    const savedFavorites = localStorage.getItem('movieFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [movieId])
  
  // Toggle favorite status
  const toggleFavorite = () => {
    if (!movie) return
    
    setFavorites(prevFavorites => {
      let newFavorites
      if (prevFavorites.includes(movie.id)) {
        newFavorites = prevFavorites.filter(id => id !== movie.id)
      } else {
        newFavorites = [...prevFavorites, movie.id]
      }
      // Save to localStorage
      localStorage.setItem('movieFavorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }
  
  // Handle booking
  const handleBooking = (showtime) => {
    setSelectedShowtime(showtime)
    navigate(`/movies/${movieId}/booking`, { state: { showtime, movie } })
  }
  
  // Share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: `Check out ${movie.title} - ${movie.synopsis.substring(0, 100)}...`,
        url: window.location.href
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading movie details...</p>
        </div>
      </div>
    )
  }
  
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            The movie you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/movies" className="btn btn-primary">
            Back to Movies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Movie Banner */}
      <div className="relative">
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => navigate(-1)}
            className="bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-2 rounded-full"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        {/* Favorite and Share Buttons */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button 
            onClick={toggleFavorite}
            className="bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-2 rounded-full"
            aria-label={favorites.includes(movie.id) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={24} 
              className={favorites.includes(movie.id) ? "fill-red-500 text-red-500" : ""} 
            />
          </button>
          <button 
            onClick={handleShare}
            className="bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-2 rounded-full"
            aria-label="Share this movie"
          >
            <Share2 size={24} />
          </button>
        </div>
        
        {/* Banner Image with Gradient Overlay */}
        <div className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={movie.bannerImage} 
              alt={movie.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/70 to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-4 h-full flex items-end pb-16 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
              {/* Movie Poster */}
              <div className="w-40 md:w-64 shrink-0 rounded-lg overflow-hidden shadow-lg transform translate-y-8 md:translate-y-16">
                <img 
                  src={movie.image} 
                  alt={movie.title} 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Movie Details */}
              <div className="text-white flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {movie.formats.map(format => (
                    <span key={format} className="bg-primary/90 text-white text-xs py-1 px-2 rounded">
                      {format}
                    </span>
                  ))}
                  <span className="bg-surface-800/80 text-white text-xs py-1 px-2 rounded">
                    {movie.certificate}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 text-white/80 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{movie.rating}/5</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {movie.duration}
                  </div>
                  <div>{movie.genre}</div>
                  <div>{movie.language}</div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button 
                    className="btn btn-primary"
                    onClick={() => document.getElementById('showtimes').scrollIntoView({behavior: 'smooth'})}
                  >
                    Get Tickets
                  </button>
                  <button 
                    className="btn btn-outline text-white border-white"
                    onClick={() => setShowTrailer(true)}
                  >
                    <Play className="h-4 w-4 mr-2" /> Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Movie Content */}
        <div className="container mx-auto px-4 py-16 mt-8 md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Movie Information */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Cast & Crew</h2>
                <div className="mb-4">
                  <p className="text-surface-700 dark:text-surface-300">
                    <span className="font-medium text-surface-900 dark:text-white">Director:</span> {movie.director}
                  </p>
                  <p className="text-surface-700 dark:text-surface-300">
                    <span className="font-medium text-surface-900 dark:text-white">Writers:</span> {movie.writers.join(', ')}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {movie.cast.map((person, index) => (
                    <div key={index} className="text-center">
                      <div className="rounded-full overflow-hidden w-20 h-20 mx-auto mb-2">
                        <img 
                          src={person.image} 
                          alt={person.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-medium text-surface-900 dark:text-white text-sm">{person.name}</h4>
                      <p className="text-xs text-surface-600 dark:text-surface-400">{person.role}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
                <div className="space-y-4">
                  {movie.reviews.map((review) => (
                    <div 
                      key={review.id} 
                      className="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{review.user}</span>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-0.5 rounded-full">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-surface-300'} mr-0.5`} 
                              />
                            ))}
                            <span className="text-sm text-surface-500 dark:text-surface-400 ml-1">
                              {review.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="flex items-center text-surface-500 dark:text-surface-400 hover:text-primary">
                            <ThumbsUp size={16} className="mr-1" /> 
                            <span className="text-sm">{review.likes}</span>
                          </button>
                        </div>
                      </div>
                      <p className={`text-surface-700 dark:text-surface-300 text-sm ${
                        expandedReview === review.id ? '' : 'line-clamp-3'
                      }`}>
                        {review.comment}
                      </p>
                      {review.comment.length > 200 && (
                        <button 
                          className="text-primary text-sm mt-1"
                          onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                        >
                          {expandedReview === review.id ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button className="btn btn-outline mt-4 w-full">
                  Read All Reviews
                </button>
              </div>
            </div>
            
            {/* Right Column - Showtimes and Other Information */}
            <div className="lg:col-span-1 order-1 lg:order-2" id="showtimes">
              <div className="bg-surface-50 dark:bg-surface-800 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Showtimes</h2>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-surface-500 dark:text-surface-400 mr-2" />
                    <select className="bg-transparent border-none focus:ring-0 font-medium text-primary cursor-pointer p-0">
                      <option>Cineplex Downtown</option>
                      <option>Regal Mall Cinema</option>
                      <option>AMC Metropolis</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-surface-500 dark:text-surface-400 mr-2" />
                    <select
                      className="bg-transparent border-none focus:ring-0 font-medium text-primary cursor-pointer p-0"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      <option>Today</option>
                      <option>Tomorrow</option>
                      <option>Wed, Oct 12</option>
                      <option>Thu, Oct 13</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {movie.showtimes.map((showtime, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{showtime.time}</span>
                        <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                          <span className="mr-2">{showtime.format}</span>
                          <span>{showtime.price}</span>
                        </div>
                      </div>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleBooking(showtime)}
                      >
                        Book
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-sm text-surface-600 dark:text-surface-400 flex items-start">
                  <Info className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                  <p>Ticket prices may vary based on seat selection and additional services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              className="absolute -top-10 right-0 text-white hover:text-primary"
              onClick={() => setShowTrailer(false)}
            >
              Close
            </button>
            <div className="aspect-video">
              <iframe
                src={movie.trailerUrl}
                title={`${movie.title} Trailer`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetailsPage