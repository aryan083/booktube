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
export const fetchArticles = async (userId?: string) => {
  try {
    console.log('Fetching articles from Supabase...');
    
    // Create a query that can be filtered by user_id if provided
    let query = supabase
      .from('articles')
      .select('*');
      
    // Apply user_id filter if provided
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    // Execute the query with ordering
    const { data, error } = await query.order('created_at', { ascending: false });

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

/**
 * Creates a new article in Supabase
 * @param articleData Article data to be stored
 * @returns Promise with the created article data and any error
 */
// export const createArticle = async (articleData: Omit<ArticleData, 'id' | 'created_at'>) => {
//   try {
//     const { data, error } = await supabase
//       .from('articles')
//       .insert([articleData])
//       .select();

//     if (error) {
//       console.error('Error creating article:', error);
//       throw error;
//     }

//     return { data: data[0] as ArticleData, error: null };
//   } catch (error) {
//     console.error('Error in createArticle:', error);
//     return { data: null, error };
//   }
// };
