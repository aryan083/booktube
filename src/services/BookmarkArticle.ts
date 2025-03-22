
import { supabase } from '@/lib/supabase';

interface BookmarkedArticle {
  article_id: string;
  title: string;
}

/**
 * Toggles the bookmark status of an article for a user
 * @param user_id The ID of the user
 * @param article_id The ID of the article to bookmark/unbookmark
 * @param article_name The title of the article
 * @returns Promise with the updated bookmarked articles and any error
 */
export const toggleArticleBookmark = async (
  user_id: string,
  article_id: string,
  article_name: string
) => {
  try {
    console.log('Toggling article bookmark status...', { user_id, article_id, article_name });

    // First check if user exists and get their bookmarked articles
    let { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('bookmarked_articles')
      .eq('user_id', user_id)
      .maybeSingle();

    // If user doesn't exist, create a new user record
    if (!userData) {
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{ user_id, bookmarked_articles: [] }])
        .select()
        .single();

      if (createError) {
        console.error('Error creating new user record:', createError);
        return { data: null, error: createError.message };
      }

      userData = newUser;
    } else if (fetchError) {
      console.error('Error fetching user\'s bookmarked articles:', fetchError);
      return { data: null, error: fetchError.message };
    }

    if (fetchError) {
      console.error('Error fetching user\'s bookmarked articles:', fetchError);
      return { data: null, error: fetchError.message };
    }

    // Initialize bookmarked articles array
    let bookmarkedArticles: BookmarkedArticle[] = userData?.bookmarked_articles || [];

    // Check if article is already bookmarked
    const articleIndex = bookmarkedArticles.findIndex(article => article.article_id === article_id);
    
    if (articleIndex > -1) {
      // Remove the article if it's already bookmarked
      bookmarkedArticles = bookmarkedArticles.filter(article => article.article_id !== article_id);
    } else {
      // Add the article if it's not bookmarked
      bookmarkedArticles.push({
        article_id,
        title: article_name
      });
    }

    // Update the user's bookmarked articles
    const { data, error: updateError } = await supabase
      .from('users')
      .update({ bookmarked_articles: bookmarkedArticles })
      .eq('user_id', user_id)
      .select();

    if (updateError) {
      console.error('Error updating bookmarked articles:', updateError);
      return { data: null, error: updateError.message };
    }

    console.log('Successfully updated bookmarked articles:', data[0]);
    return { 
      data: bookmarkedArticles, 
      error: null,
      isBookmarked: articleIndex === -1 // Return whether the article was bookmarked or unbookmarked
    };

  } catch (error) {
    console.error('Unexpected error while updating bookmarks:', error);
    return { data: null, error: 'Failed to update article bookmark status' };
  }
};