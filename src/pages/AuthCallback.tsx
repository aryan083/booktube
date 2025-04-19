import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

/**
 * AuthCallback component that handles OAuth redirects and session management.
 * This component is rendered after the OAuth provider redirects back to the application.
 * It processes the auth tokens in the URL, establishes the session, and redirects to the home page.
 * 
 * @returns {JSX.Element} A loading component while processing the authentication
 */
export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(true);
  const navigate = useNavigate();
  const { user, handleAuthRedirect } = useAuth();

  useEffect(() => {
    // This function handles the OAuth callback process
    const processAuthCallback = async () => {
      try {
        setProcessing(true);
        
        // If we already have a user, redirect to home
        if (user) {
          console.log('[Auth] User already authenticated, redirecting to home');
          toast.success('Welcome back!');
          navigate('/home', { replace: true });
          return;
        }

        // Check if we have hash parameters in the URL (from OAuth redirect)
        if (window.location.hash) {
          console.log('[Auth] Processing hash parameters from OAuth redirect');
          
          // Use our custom handler from AuthContext
          await handleAuthRedirect('/home');
          toast.success('Successfully signed in!');
        } else {
          // Try to get the session directly
          const { data, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            throw sessionError;
          }
          
          if (data?.session) {
            console.log('[Auth] Session found, redirecting to home');
            toast.success('Successfully signed in!');
            navigate('/home', { replace: true });
          } else {
            console.error('[Auth] No session or hash parameters found');
            setError('Authentication failed. Please try again.');
            setTimeout(() => navigate('/signin', { replace: true }), 2000);
          }
        }
      } catch (err) {
        console.error('[Auth] Error processing OAuth callback:', err);
        const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
        setError(errorMessage);
        toast.error(errorMessage);
        setTimeout(() => navigate('/signin', { replace: true }), 2000);
      } finally {
        setProcessing(false);
      }
    };

    // Process the OAuth redirect
    processAuthCallback();
  }, [navigate, user, handleAuthRedirect]);

  // Show a loading state while processing the redirect
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <div className="text-center">
        {error ? (
          <div className="text-red-500 mb-4">{error}</div>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4 mx-auto"></div>
            <h2 className="text-xl font-semibold text-white mb-2">Completing sign in...</h2>
            <p className="text-gray-400">Please wait while we set up your session.</p>
            {!processing && (
              <button 
                onClick={() => navigate('/home')} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Continue to Home
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
