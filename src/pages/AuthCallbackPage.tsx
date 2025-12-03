import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/ui/card';
import { Loader2, Mail } from 'lucide-react';
import { cookieManager } from '../utils/tokenManager';
import { authService } from '../services/authService';

export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuthState } = useAuth();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isProcessed, setIsProcessed] = React.useState(false);

  useEffect(() => {
    if (isProcessed) return;
    
    const processCallback = async () => {
      setIsProcessing(true);
      
      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');
      const email = searchParams.get('email');
      const error = searchParams.get('error');

      // Debug logging
      console.log('AuthCallback - Tokens received:', {
        accessToken: accessToken ? `${accessToken.substring(0, 20)}...` : 'null',
        refreshToken: refreshToken ? `${refreshToken.substring(0, 20)}...` : 'null',
        email
      });

      // Handle OAuth errors
      if (error) {
        toast.error(`Google authentication failed: ${error}`);
        navigate('/login', { replace: true });
        return;
      }

      // Handle missing tokens
      if (!accessToken || !refreshToken || !email) {
        toast.error('Authentication tokens not received');
        navigate('/login', { replace: true });
        return;
      }

      try {
        // Set authentication state with tokens and email
        setAuthState(accessToken, refreshToken, email);
        
        toast.success('Google sign-in successful!');
        setIsProcessed(true);
        
        // Navigate to inbox after a short delay to ensure state is updated
        setTimeout(() => {
          navigate('/inbox', { replace: true });
        }, 100);
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Failed to complete authentication');
        navigate('/login', { replace: true });
      } finally {
        setIsProcessing(false);
      }
    };

    processCallback();
  }, [searchParams, setAuthState, navigate, isProcessed]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex items-center justify-center mb-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Completing Google Sign-in...
          </h1>
          <p className="text-gray-600">
            Please wait while we complete your authentication with Google.
          </p>
        </div>
      </Card>
    </div>
  );
};