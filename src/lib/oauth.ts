import { supabase } from './supabase';

/**
 * Initiates OAuth sign-in with the specified provider using Supabase.
 * @param {('google' | 'github')} provider - The OAuth provider to use.
 * @param {string} [redirectTo] - Optional URL to redirect to after successful authentication.
 * @returns {Promise<void>} Resolves when the OAuth flow is initiated.
 */
export async function signInWithOAuth(provider: 'google' | 'github', redirectTo?: string): Promise<void> {
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectTo || window.location.origin + '/auth/callback',
      scopes: provider === 'google' ? 'email profile' : 'user:email'
    }
  });
}
