import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MoviesPage from './pages/MoviesPage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import BookingPage from './pages/BookingPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="/movies/:movieId/booking" element={<BookingPage />} />
      </Routes>
    </Router>
  )
}

export default App