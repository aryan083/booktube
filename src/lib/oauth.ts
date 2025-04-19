import { supabase } from './supabase';

/**
 * Initiates OAuth sign-in with the specified provider using Supabase.
 * @param {('google' | 'github')} provider - The OAuth provider to use.
 * @returns {Promise<void>} Resolves when the OAuth flow is initiated.
 */
export async function signInWithOAuth(provider: 'google' | 'github'): Promise<void> {
  await supabase.auth.signInWithOAuth({ provider });
}
