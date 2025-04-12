import { API_BASE_URL } from "@/config/api";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function Recommended({ article_id }: { article_id: string }) {
    const [ArticleArray, setArticleArray] = useState<string[]>([]);
    const [RecommendedJSX, setRecommendedJSX] = useState<JSX.Element[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                if (!user || !user.id || !article_id) {
                    console.warn("User or article information not available");
                    return;
                }

                const formData = new FormData();
                formData.append("user_id", user.id);
                formData.append("article_id", article_id);

                const response = await fetch(
                    `${API_BASE_URL}/api/recommendation`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!response.ok) {
                    throw new Error("Recommendation failed");
                }

                const data = await response.json();
                setArticleArray(data.data);
            } catch (error) {
                console.error("Recommendation error:", error);
            }
        };

        fetchRecommendations();
    }, [article_id, user]);

    async function get_recommended_articles(articleIds: string[]) {
        const { data: RecommendedarticleData, error: RecommendedarticleError } = await supabase
            .from("articles")
            .select("*")
            .in("article_id", articleIds);

        if (RecommendedarticleError) {
            console.error("Error fetching recommended articles:", RecommendedarticleError);
            return [];
        }

        return RecommendedarticleData || [];
    }

    useEffect(() => {
        if (ArticleArray.length > 0) {
            get_recommended_articles(ArticleArray).then((articles) => {
                const RecommendedJSX = articles.map((element) => (
                    <div key={element.article_id} className="article-card">
                        <h3>{element.article_name}</h3>
                        {/* <p>{element.art}</p> */}
                        <a
                            href={`/article/${element.article_id}`}
                            className="text-semibold underline text-black"
                        >
                            {element.article_id}
                        </a>
                    </div>
                ));
                setRecommendedJSX(RecommendedJSX);
            });
        }
    }, [ArticleArray]);

    return (
        <div className="recommended-articles">
            {RecommendedJSX}
        </div>
    );
}