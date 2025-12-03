import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/auth/LoginForm';
import { GoogleAuthButton } from '../components/auth/GoogleAuthButton';
import { Card } from '../components/ui/card';
import { Mail } from 'lucide-react';
import { getErrorMessage } from '../utils/errorHandler';
import type { LoginCredentials } from '../types/auth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/inbox';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLogin = async (data: LoginCredentials) => {
    try {
      await login(data);
      toast.success('Login successful!');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to AIEmail</h1>
          <p className="text-gray-600 mt-2">Sign in to access your mailbox</p>
        </div>

        {/* Login Form Component */}
        <LoginForm 
          onSubmit={handleLogin}
          isLoading={isLoading}
        />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Google Sign-In Button */}
        <GoogleAuthButton disabled={isLoading} />

        {/* Link to Registration Page */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
