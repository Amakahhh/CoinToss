import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Wallet from './pages/Wallet';
import Betting from './pages/Betting';
import Overview from './pages/Overview';
import History from './pages/History';
import FAQ from './pages/FAQ';
import Profile from './pages/Profile';
import useStore from './store/useStore';

function App() {
  const { initializeAuth, initializeWebSocket, loadCurrentPool, isAuthenticated } = useStore();

  // Initialize authentication and WebSocket on app start
  useEffect(() => {
    // Initialize authentication first
    initializeAuth();
  }, [initializeAuth]);

  // Load pool data and initialize WebSocket only after authentication is checked
  useEffect(() => {
    // Only proceed if user is authenticated AND we have a valid token
    if (isAuthenticated && localStorage.getItem('accessToken')) {
      console.log('User is authenticated, loading pool data and initializing WebSocket');
      
      // Load current pool data only if user is authenticated
      loadCurrentPool().catch((error) => {
        console.warn('Failed to load pool data:', error);
      });
      
      // Initialize WebSocket for real-time updates only if user is authenticated
      initializeWebSocket().catch((error) => {
        console.warn('Failed to initialize WebSocket:', error);
      });
    } else {
      console.log('User not authenticated, skipping pool data and WebSocket initialization');
    }
  }, [isAuthenticated, loadCurrentPool, initializeWebSocket]);

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/betting" element={<Betting />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/history" element={<History />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

