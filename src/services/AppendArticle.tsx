import { supabase } from "../lib/supabase";

interface AppendArticleParams {
  article_name: string;
  tags?: any;
  content?: string;
  topic_id?: string;
}

export const appendArticle = async ({
  article_name,
  tags = null,
  content = null,
  topic_id = null,
}: AppendArticleParams) => {
  try {
    // Validate article_name is not empty or just whitespace
    if (!article_name || !article_name.trim()) {
      return { data: null, error: new Error("Article name cannot be empty") };
    }
    // Check if an article with the same name already exists
    const { data: existingArticle } = await supabase
      .from("articles")
      .select()
      .eq("article_name", article_name)
      .single();

    if (existingArticle) {
      return { data: existingArticle, error: null };
    }

    // Insert the article into the articles table if it doesn't exist
    const { data, error } = await supabase
      .from("articles")
      .insert([
        {
          article_name,
          tags,
          content,
          topic_id,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error appending article:", error);
    return { data: null, error };
  }
};
