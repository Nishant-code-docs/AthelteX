import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import LandingPage from '../features/landing/LandingPage';
import AuthPage from '../features/auth/AuthPage';
import ProfileSetup from '../features/profile-setup/ProfileSetup';
import AthleteDashboard from '../features/athlete/AthleteDashboard';
import AthleteProfile from '../features/athlete/AthleteProfile';
import CoachDashboard from '../features/coach/CoachDashboard';
import MatchingPage from '../features/matching/MatchingPage';
import DiscoverPage from '../features/discover/DiscoverPage';
import './App.css';

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
}

// Role-based Dashboard Switcher
function DashboardRouter() {
  const { user } = useAuth();
  if (user?.role === 'coach') {
    return <CoachDashboard />;
  }
  return <AthleteDashboard />;
}

export default function App() {
  const location = useLocation();
  const hideFooter = location.pathname === '/auth';

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<AthleteProfile />} />
          <Route path="/profile/:id" element={<AthleteProfile />} />
          <Route path="/ai-analysis" element={<AthleteProfile defaultTab="ai-analysis" />} />
          <Route path="/analysis" element={<AthleteProfile defaultTab="ai-analysis" />} />

          {/* Authenticated Routes */}
          <Route
            path="/setup"
            element={
              <ProtectedRoute>
                <ProfileSetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discover"
            element={
              <ProtectedRoute>
                <DiscoverPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/matching"
            element={
              <ProtectedRoute>
                <MatchingPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
