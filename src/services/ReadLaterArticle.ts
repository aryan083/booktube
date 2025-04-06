import { supabase } from '@/lib/supabase';

interface ReadLaterArticle {
  article_id: string;
  title: string;
}

/**
 * Toggles the read later status of an article for a user
 * @param user_id The ID of the user
 * @param article_id The ID of the article to add/remove from read later
 * @param article_name The title of the article
 * @returns Promise with the updated read later articles and any error
 */
export const toggleReadLater = async (
  user_id: string,
  article_id: string,
  article_name: string
) => {
  try {
    console.log('Toggling article read later status...', { user_id, article_id, article_name });

    // First check if user exists and get their watch_later articles
    let { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('watch_later')
      .eq('user_id', user_id)
      .maybeSingle();

    // If user doesn't exist, create a new user record
    if (!userData) {
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{ user_id, watch_later: [] }])
        .select()
        .single();

      if (createError) {
        console.error('Error creating new user record:', createError);
        return { data: null, error: createError.message };
      }

      userData = newUser;
    } else if (fetchError) {
      console.error('Error fetching user\'s watch later articles:', fetchError);
      return { data: null, error: fetchError.message };
    }

    // Initialize watch_later array
    let watchLaterArticles: ReadLaterArticle[] = userData?.watch_later || [];

    // Check if article is already in watch later
    const articleIndex = watchLaterArticles.findIndex(article => article.article_id === article_id);
    
    if (articleIndex > -1) {
      // Remove the article if it's already in watch later
      watchLaterArticles = watchLaterArticles.filter(article => article.article_id !== article_id);
    } else {
      // Add the article if it's not in watch later
      watchLaterArticles.push({
        article_id,
        title: article_name
      });
    }

    // Update the user's watch later articles
    const { data, error: updateError } = await supabase
      .from('users')
      .update({ watch_later: watchLaterArticles })
      .eq('user_id', user_id)
      .select();

    if (updateError) {
      console.error('Error updating watch later articles:', updateError);
      return { data: null, error: updateError.message };
    }

    console.log('Successfully updated watch later articles:', data[0]);
    return { 
      data: watchLaterArticles, 
      error: null,
      isInWatchLater: articleIndex === -1 // Return whether the article was added or removed
    };

  } catch (error) {
    console.error('Unexpected error while updating watch later:', error);
    return { data: null, error: 'Failed to update article read later status' };
  }
};
