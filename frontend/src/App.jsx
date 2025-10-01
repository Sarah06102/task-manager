import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Router from './components/Router'
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const hideNavbarOn = ['/dashboard'];
  return (
    <>
      {/* Navigation bar */}
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}

      {/* Router component for navigation */}
      <Router />
    </>
  )
}

export default App
