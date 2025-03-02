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
}

/**
 * Fetches all articles from Supabase
 * @returns Promise with articles data and any error
 */
export const fetchArticles = async () => {
  try {
    console.log('Fetching articles from Supabase...');
    
    // Enhanced query with error handling and logging
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

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
        id: article.article_name.toLowerCase().replace(/\s+/g, '-'),
        article_id: article.article_id || '',
        image_path: article.content_img   // Use the actual image_path from the database
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
