import { supabase } from '@/lib/supabase';

/**
 * Toggles the completion status of an article to true
 * @param article_id The ID of the article to mark as completed
 * @returns Promise with the updated article data and any error
 */
export const toggleArticleCompletion = async (article_id: string) => {
  try {
    console.log('Toggling article completion status...', article_id);

    const { data, error } = await supabase
      .from('articles')
      .update({ is_completed: true })
      .eq('article_id', article_id)
      .select();

    if (error) {
      console.error('Error updating article completion status:', error);
      return { data: null, error: error.message };
    }

    if (!data || data.length === 0) {
      console.warn('No article found with the provided ID');
      return { data: null, error: 'Article not found' };
    }

    console.log('Successfully updated article completion status:', data[0]);
    return { data: data[0], error: null };

  } catch (error) {
    console.error('Unexpected error while updating article:', error);
    return { data: null, error: 'Failed to update article completion status' };
  }
};