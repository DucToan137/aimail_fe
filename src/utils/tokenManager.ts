const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const LOGOUT_EVENT_KEY = 'auth_logout_event';
const AUTH_STATE_KEY = 'auth_state';

const ACCESS_TOKEN_EXPIRY_DAYS = 1;
const REFRESH_TOKEN_EXPIRY_DAYS = 30;

interface CookieOptions {
  expires?: number; 
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  const {
    expires = 1,
    path = '/',
    secure = window.location.protocol === 'https:',
    sameSite = 'Lax',
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
  if (expires) {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + expires * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${expiryDate.toUTCString()}`;
  }
  
  cookieString += `; path=${path}`;
  
  if (secure) {
    cookieString += '; secure';
  }
  
  cookieString += `; SameSite=${sameSite}`;
  
  document.cookie = cookieString;
}

function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');
  
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  
  return null;
}

function deleteCookie(name: string, path: string = '/'): void {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
}

export const cookieManager = {
  setAccessToken(token: string): void {
    try {
      setCookie(ACCESS_TOKEN_KEY, token, {
        expires: ACCESS_TOKEN_EXPIRY_DAYS,
        secure: false,
        sameSite: 'Lax',
      });
      console.log('Access token set successfully:', `${token.substring(0, 20)}...`);
      
      const verifyToken = this.getAccessToken();
      if (!verifyToken) {
        console.error('Failed to set access token - token not found after setting');
      } else {
        console.log('Access token verified in cookies');
      }
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  },

  getAccessToken(): string | null {
    const token = getCookie(ACCESS_TOKEN_KEY);
    console.log('Getting access token:', token ? `${token.substring(0, 20)}...` : 'null');
    
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          console.log('Token payload:', payload);
          console.log('Token exp:', payload.exp ? new Date(payload.exp * 1000) : 'No exp');
          console.log('Token iss:', payload.iss);
          console.log('Token aud:', payload.aud);
        }
      } catch (e) {
        console.log('Failed to decode token:', e);
      }
    }
    
    return token;
  },

  clearAccessToken(): void {
    deleteCookie(ACCESS_TOKEN_KEY);
  },

  setRefreshToken(token: string): void {
    try {
      setCookie(REFRESH_TOKEN_KEY, token, {
        expires: REFRESH_TOKEN_EXPIRY_DAYS,
        secure: false,
        sameSite: 'Lax',
      });
      console.log('Refresh token set successfully:', `${token.substring(0, 20)}...`);
      
      const verifyToken = this.getRefreshToken();
      if (!verifyToken) {
        console.error('Failed to set refresh token - token not found after setting');
      } else {
        console.log('Refresh token verified in cookies');
      }
    } catch (error) {
      console.error('Error setting refresh token:', error);
    }
  },

  getRefreshToken(): string | null {
    return getCookie(REFRESH_TOKEN_KEY);
  },

  clearRefreshToken(): void {
    deleteCookie(REFRESH_TOKEN_KEY);
  },

  setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  },

  clearAllTokens(): void {
    this.clearAccessToken();
    this.clearRefreshToken();
  },

  hasRefreshToken(): boolean {
    return !!this.getRefreshToken();
  },

  hasAccessToken(): boolean {
    return !!this.getAccessToken();
  },

  /**
   * Trigger logout event for multi-tab sync
   * Sets a timestamp in localStorage that other tabs will detect
   */
  triggerLogoutEvent(): void {
    try {
      // Set logout event with current timestamp
      const logoutEvent = {
        timestamp: Date.now(),
        action: 'logout'
      };
      localStorage.setItem(LOGOUT_EVENT_KEY, JSON.stringify(logoutEvent));
      
      // Clear immediately after setting to allow re-triggering
      setTimeout(() => {
        localStorage.removeItem(LOGOUT_EVENT_KEY);
      }, 100);
      
      // Also set auth state to logged out
      localStorage.setItem(AUTH_STATE_KEY, 'logged_out');
    } catch (error) {
      console.error('Error triggering logout event:', error);
    }
  },

  /**
   * Listen for logout events from other tabs
   * Returns cleanup function
   */
  onLogoutEvent(callback: () => void): () => void {
    const handleStorageChange = (event: StorageEvent) => {
      // Check if logout event was triggered
      if (event.key === LOGOUT_EVENT_KEY && event.newValue) {
        try {
          const logoutEvent = JSON.parse(event.newValue);
          if (logoutEvent.action === 'logout') {
            console.log('Multi-tab logout detected');
            callback();
          }
        } catch (error) {
          console.error('Error parsing logout event:', error);
        }
      }
      
      // Also check auth state changes
      if (event.key === AUTH_STATE_KEY && event.newValue === 'logged_out') {
        console.log('Auth state change detected: logged out');
        callback();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  },

  /**
   * Set auth state to logged in
   */
  setAuthState(state: 'logged_in' | 'logged_out'): void {
    try {
      localStorage.setItem(AUTH_STATE_KEY, state);
    } catch (error) {
      console.error('Error setting auth state:', error);
    }
  },

  /**
   * Get current auth state
   */
  getAuthState(): 'logged_in' | 'logged_out' | null {
    try {
      const state = localStorage.getItem(AUTH_STATE_KEY);
      return state as 'logged_in' | 'logged_out' | null;
    } catch (error) {
      console.error('Error getting auth state:', error);
      return null;
    }
  },
};
