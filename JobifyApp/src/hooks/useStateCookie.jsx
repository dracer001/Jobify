import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

/**
 * Custom hook to persist state in cookies.
 * @param {string} key - The key for the cookie.
 * @param {any} defaultValue - The default value for the state.
 * @param {number|null} [expiresInDays=null] - Expiry time for the cookie (in days), or `null` for a session cookie.
 */
const useStateCookie = (key, defaultValue, expiresInDays = null) => {
    // Initialize the state from cookies or use default value
    const [state, setState] = useState(() => {
      const savedState = Cookies.get(key);
  
      // Check if savedState exists and is valid JSON
      if (savedState) {
        try {
          return JSON.parse(savedState); // Try to parse the cookie value
        } catch (e) {
          console.error(`Error parsing cookie for ${key}:`, e);
          return defaultValue; // Return default value if the cookie is invalid
        }
      }
  
      return defaultValue; // Return default value if the cookie is not set
    });
  
    // Update the cookie whenever the state changes
    useEffect(() => {
      if (expiresInDays === null) {
        // If expiresInDays is null, create a session cookie (no expiration date)
        Cookies.set(key, JSON.stringify(state));
      } else {
        // Otherwise, create a cookie with the specified expiration time
        Cookies.set(key, JSON.stringify(state), { expires: expiresInDays });
      }
    }, [state, key, expiresInDays]);
  
    return [state, setState];
  };

export default useStateCookie;
