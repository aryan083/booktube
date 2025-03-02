import React, { createContext, useContext, useEffect, useState } from "react";
import { User, AuthError } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

/**
 * Interface defining the structure of authentication context
 * @interface AuthContextType
 * @property {User | null} user - Current authenticated user or null
 * @property {boolean} loading - Loading state of authentication
 * @property {Function} signUp - Function to register new users
 * @property {Function} signIn - Function to authenticate existing users
 * @property {Function} signOut - Function to log out users
 */
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    metadata: { display_name: string }
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom error class for authentication errors
 * @class AuthenticationError
 * @extends Error
 */
class AuthenticationError extends Error {
  constructor(message: string, public originalError?: AuthError) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

/**
 * Authentication Provider component that manages auth state and operations
 * @component AuthProvider
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[Auth] Initializing authentication state...');
    
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[Auth] Session check completed', session ? 'User found' : 'No active session');
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch(error => {
      console.error('[Auth] Error checking session:', error);
      setLoading(false);
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('[Auth] Auth state changed:', _event);
      setUser(session?.user ?? null);
    });

    return () => {
      console.log('[Auth] Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Handles user registration
   * @async
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {Object} metadata - Additional user metadata
   * @throws {AuthenticationError} If registration fails
   */
  const signUp = async (
    email: string,
    password: string,
    metadata: { display_name: string }
  ) => {
    try {
      console.log('[Auth] Attempting to sign up user:', email);
      
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/signin`,
        },
      });

      if (error) {
        console.error('[Auth] Sign up error:', error);
        throw new AuthenticationError(
          `Registration failed: ${error.message}`,
          error
        );
      }

      console.log('[Auth] Sign up successful, verification email sent');

      // Sign out immediately after registration to ensure email verification
      if (data.user) {
        console.log('[Auth] Signing out after registration for email verification');
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('[Auth] Unexpected error during sign up:', error);
      throw error instanceof AuthenticationError 
        ? error 
        : new AuthenticationError('An unexpected error occurred during registration');
    }
  };

  /**
   * Handles user sign in
   * @async
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @throws {AuthenticationError} If sign in fails
   */
  const signIn = async (email: string, password: string) => {
    try {
      console.log('[Auth] Attempting to sign in user:', email);

      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('[Auth] Sign in error:', error);
        throw new AuthenticationError(
          `Sign in failed: ${error.message}`,
          error
        );
      }

      if (user && !user.email_confirmed_at) {
        console.warn('[Auth] Unverified email attempt to sign in:', email);
        await signOut();
        throw new AuthenticationError('Please verify your email before signing in.');
      }

      console.log('[Auth] Sign in successful');
    } catch (error) {
      console.error('[Auth] Unexpected error during sign in:', error);
      throw error instanceof AuthenticationError 
        ? error 
        : new AuthenticationError('An unexpected error occurred during sign in');
    }
  };

  /**
   * Handles user sign out
   * @async
   * @throws {AuthenticationError} If sign out fails
   */
  const signOut = async () => {
    try {
      console.log('[Auth] Attempting to sign out user');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('[Auth] Sign out error:', error);
        throw new AuthenticationError(
          `Sign out failed: ${error.message}`,
          error
        );
      }

      console.log('[Auth] Sign out successful');
    } catch (error) {
      console.error('[Auth] Unexpected error during sign out:', error);
      throw error instanceof AuthenticationError 
        ? error 
        : new AuthenticationError('An unexpected error occurred during sign out');
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to access authentication context
 * @returns {AuthContextType} Authentication context value
 * @throws {Error} If used outside of AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
