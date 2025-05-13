import { supabase } from "@/lib/supabase";
import { ArticleData } from "@/services/articleService";

/**
 * Fetches recommended articles for a user, returning them in the same shape as fetchArticles.
 * @param user_id The user's ID
 * @returns {Promise<{ data: ArticleData[] | null, error: string | null }>}
 */
export const fetchRecommendedArticles = async (
  user_id: string
): Promise<{ data: ArticleData[] | null; error: string | null }> => {
  console.log("✨ [fetchRecommendedArticles] Start fetching recommended articles for user:", user_id);
  try {
    // Fetch recommended_json (array of article_id strings) from users table
    console.log("🔵 [fetchRecommendedArticles] Fetching recommended_json from users table...");
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("recommended_json")
      .eq("user_id", user_id)
      .single(); // Ensure .single() is chained!
    console.log("🔵 [fetchRecommendedArticles] Supabase users fetch result:", userData);
    console.log("🔍 [fetchRecommendedArticles] typeof userData:", typeof userData, Array.isArray(userData) ? 'array' : 'object');
    console.log("🔍 [fetchRecommendedArticles] Raw userData value:", userData);

    // Fallback: if userData is an array, use first element
    let articleIds: string[] = [];
    if (Array.isArray(userData)) {
      articleIds = userData[0]?.recommended_json ?? [];
      console.log("🟠 [fetchRecommendedArticles] Fallback: userData is array, using first element's recommended_json:", articleIds);
    } else {
      articleIds = userData?.recommended_json ?? [];
    }

    if (userError) {
      console.error("❌ [fetchRecommendedArticles] Error fetching recommended articles:", userError);
      return { data: null, error: userError.message };
    }

    if (!Array.isArray(articleIds) || articleIds.length === 0) {
      console.warn("⚠️ [fetchRecommendedArticles] No recommended articles found in the database");
      return { data: [], error: null };
    }

    // Fetch full details for all recommended articles in a single query
    console.log("🟡 [fetchRecommendedArticles] Fetching articles from articles table for IDs (using 'article_id'):", articleIds);
    let { data: articlesData, error: articlesError } = await supabase
      .from("articles")
      .select("*")
      .in("article_id", articleIds);
    console.log("🟡 [fetchRecommendedArticles] Supabase articles fetch result (article_id):", articlesData);

    // If no articles found, try fallback to 'id'
    if ((!articlesData || articlesData.length === 0) && !articlesError) {
      console.warn("🟠 [fetchRecommendedArticles] No articles found with 'article_id', trying 'id' column");
      const fallback = await supabase
        .from("articles")
        .select("*")
        .in("id", articleIds);
      if (fallback.data && fallback.data.length > 0) {
        articlesData = fallback.data;
        articlesError = fallback.error;
        console.log("🟢 [fetchRecommendedArticles] Supabase articles fetch result (id):", articlesData);
      } else {
        console.warn("⚠️ [fetchRecommendedArticles] No articles found for the provided IDs using either column");
        return { data: [], error: null };
      }
    }

    if (articlesError) {
      console.error(
        "❌ [fetchRecommendedArticles] Error fetching article details for recommended articles:",
        articlesError
      );
      return { data: null, error: articlesError.message };
    }

    // Transform to ArticleData shape
    console.log("💎 [fetchRecommendedArticles] Transforming articles to ArticleData shape...");
    const recommendedArticles: ArticleData[] = (articlesData ?? []).map((article: any) => ({
      article_name: article.article_name || "Untitled",
      tags: article.tags || null,
      content_text: article.content_text || null,
      created_at: article.created_at || new Date().toISOString(),
      id: article.article_id, // Use the actual article_id from database
      article_id: article.article_id || '',
      image_path: article.content_img,
      is_completed: article.is_completed || false,
    }));

    // Log processed articles
    console.log("🌟 [fetchRecommendedArticles] Processed Recommended Articles:", recommendedArticles);

    return { data: recommendedArticles, error: null };
  } catch (error: any) {
    console.error("🔥 [fetchRecommendedArticles] Unexpected error in fetchRecommendedArticles:", error);
    return { data: null, error: error.message || "Unknown error" };
  }
};

