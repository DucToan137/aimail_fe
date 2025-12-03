import { apiClient } from '../api/apiClient';
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  RefreshTokenResponse,
  User,
} from '../types/auth';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', credentials, { skipAuth: true });
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', credentials, { skipAuth: true });
  }

  /**
   * Get Google OAuth authorization URL
   * Redirects user to Google for authentication
   */
  getGoogleAuthUrl(state?: string): string {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
    const url = new URL(`${baseURL}/auth/google/authorize`);
    if (state) {
      url.searchParams.append('state', state);
    }
    return url.toString();
  }

  /**
   * Handle Google OAuth callback
   * This would be called from the callback page with the authorization code
   */
  async handleGoogleCallback(code: string, state?: string): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>(
    '/auth/google/callback',
    { code, state },
    { skipAuth: true }
  );
}

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    return apiClient.post<RefreshTokenResponse>('/auth/refresh', { refreshToken }, { skipAuth: true });
  }

  async logout(refreshToken: string): Promise<void> {
    return apiClient.post<void>('/auth/logout', { refreshToken }, { skipAuth: true });
  }

  getUserFromToken(token: string, email?: string): User {
    try {
      // Decode JWT token (simple decode without verification - verification happens on backend)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      const payload = JSON.parse(jsonPayload);
      
      // Prioritize email parameter, then payload email fields
      const userEmail = email || payload.email || payload.sub || 'unknown@example.com';
      
      // Determine provider based on email parameter or token payload
      const provider = email ? 'google' : (payload.provider as 'email' | 'google') || 'email';
      
      return {
        id: payload.sub || payload.userId || 'unknown',
        email: userEmail,
        name: userEmail.split('@')[0],
        provider,
      };
    } catch (error) {
      console.error('Failed to decode token:', error);
      throw new Error('Invalid token');
    }
  }
}

export const authService = new AuthService();
