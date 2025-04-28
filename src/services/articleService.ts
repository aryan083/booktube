import { supabase } from '@/lib/supabase';

/**
 * Interface for article data
 */
export interface ArticleData {
  article_name: string;
  tags: string[] | null;
  content_text: string | null;
  created_at: string;
  id: string;
  article_id: string;
  image_path: string;
  is_completed: boolean;
}

/**
 * Fetches all articles from Supabase
 * @returns Promise with articles data and any error
 */
/**
 * Fetches articles from the Supabase database, optionally filtering by user ID.
 * 
 * If a user ID is provided, the query will filter articles that belong to that user.
 * The articles are ordered by their creation date in descending order.
 * 
 * @param {string} [userId] - The optional ID of the user to filter articles by.
 * @returns {Promise<{ data: ArticleData[] | null, error: string | null }>} 
 *          A promise that resolves to an object containing the articles data and any error message.
 */
export const fetchArticles = async (userId: string) => {
  try {
    console.log('Fetching articles from Supabase...');
    
    // Create a query that can be filtered by user_id if provided
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
      .limit(20);

    // Log raw response for debugging
    console.log('Raw Supabase Response:', { 
      data, 
      error, 
      dataType: typeof data, 
      dataLength: data?.length 
    });

    // Detailed error handling
    if (error) {
      console.error('Supabase Fetch Error:', error);
      return { data: null, error: error.message };
    }

    // Validate data
    if (!data || data.length === 0) {
      console.warn('No articles found in the database');
      return { data: [], error: null };
    }

    // Type-safe data transformation
    const articles: ArticleData[] = data.map(article => {
      return {
        article_name: article.article_name || 'Untitled',
        tags: article.tags || null,
        content_text: article.content_text || null,
        created_at: article.created_at || new Date().toISOString(),
        id: article.article_id, // Use the actual article_id from database
        article_id: article.article_id || '',
        image_path: article.content_img,
        is_completed: article.is_completed || false
      };
    });

    // Log processed articles
    console.log('Processed Articles:', articles);

    return { data: articles, error: null };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { data: null, error: 'Failed to fetch articles' };
  }
};


