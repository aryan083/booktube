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
