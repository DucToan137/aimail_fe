import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/dashboard/ProtectedRoute';
import { InboxPage } from './pages/InboxPage';
import { LoginPage } from './pages/LoginPage';
import { GoogleCallbackPage } from './pages/GoogleCallbackPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';
import { LandingPage } from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Navigate to="/login" replace />} />
          <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/mailbox/:mailboxId"
            element={
              <ProtectedRoute>
                <InboxPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mailbox/:mailboxId/:emailId"
            element={
              <ProtectedRoute>
                <InboxPage />
              </ProtectedRoute>
            }
          />
          
          <Route path="/inbox" element={<Navigate to="/mailbox/INBOX" replace />} />
          
          {/* Landing Page (Root) */}
          <Route path="/" element={<LandingPage />} />

          {/* Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
