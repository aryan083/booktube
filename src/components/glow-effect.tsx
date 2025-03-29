"use client";
import VariableProximity from "./VariableProximity";

import { Box, Lock, Moon, Search, Settings, Sparkles, Sun } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Blendy, createBlendy } from "blendy";
import { useEffect, useId, useRef, useState } from "react";
import { downloadPDF } from "@/services/downloadPDF";
import { fetchUserCourses } from "@/services/courseService";
import {
  extractColorsFromImage,
  ColorPalette,
  generateThemePalette,
  ColorMode,
} from "@/utils/materialColorUtils";
import { createPortal } from "react-dom";
import { fetchArticles, ArticleData } from "@/services/articleService";
import { toggleArticleCompletion } from "@/services/CompleteArticle";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

export function GlowingEffectDemo() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Arrays to store separated data
  const [processedArticles, setProcessedArticles] = useState<{
    names: string[];
    images: string[];
    ids: string[];
  }>({
    names: [],
    images: [],
    ids: [],
  });

  // Process articles into separate arrays using spread operator
  const processArticleArrays = (articles: ArticleData[]) => {
    // Use spread operator to create new arrays
    const names = [...articles.map((article) => article.article_name)];
    const ids = [
      ...articles.map(
        (article) =>
          article.id || article.article_name.toLowerCase().replace(/\s+/g, "-")
      ),
    ];
    // Get image paths from article_id since that's where they're stored
    const images = [...articles.map((article) => article.image_path)];

    setProcessedArticles({ names, images, ids });
    console.log("Processed article arrays:", { names, images, ids });
  };

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await fetchArticles();
        const { data: courses, error: coursesError } = await fetchUserCourses();
        if (coursesError) {
          setError(coursesError);
          return;
        }
        if (error) {
          setError(error);
        } else if (data) {
          setArticles(data);
          processArticleArrays(data);
        }
      } catch (err) {
        setError("Failed to load articles");
        console.error("Error loading articles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  // Default icons to use when mapping articles to grid items
  const icons = [
    <Box className="h-4 w-4" key="box" style={{ color: "#000" }} />,
    <Settings className="h-4 w-4" key="settings" style={{ color: "#FFF" }} />,
    <Lock className="h-4 w-4" key="lock" style={{ color: "#000" }} />,
    <Sparkles className="h-4 w-4" key="sparkles" style={{ color: "#FFF" }} />,
    <Search className="h-4 w-4" key="search" style={{ color: "#000" }} />,
  ];

  // Grid area assignments
  const gridAreas = [
    "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
  ];

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="py-8 text-center animate-pulse">
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.05s_infinite] mx-1">
          b
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.1s_infinite] mx-1">
          o
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.15s_infinite] mx-1">
          o
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.2s_infinite] mx-1">
          k
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.25s_infinite] mx-1">
          t
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.3s_infinite] mx-1">
          u
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.35s_infinite] mx-1">
          b
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.4s_infinite] mx-1">
          i
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.45s_infinite] mx-1">
          n
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.5s_infinite] mx-1">
          g
        </span>
      </div>
    );
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">Error: {error}</div>;
  }

  // Take only the first 5 articles for display
  const displayCount = Math.min(5, processedArticles.ids.length);

  return (
    <ul className="grid grid-cols-2 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-3 xl:max-h-[34rem] xl:grid-rows-2 pt-2 pb-1 overflow-y-auto scrollbar-hide">
      {[...Array(displayCount)].map((_, index) => {
        const id = processedArticles.ids[index];
        const title = processedArticles.names[index];
        const imageUrl =
          processedArticles.images[index] ||
          "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&auto=format&fit=crop&q=60";

        return (
          <GridItem
            key={id}
            area={gridAreas[index]}
            icon={icons[index % icons.length]}
            title={title}
            description="Click to explore this topic in detail"
            cardStyle={{
              backgroundColor: "none",
              border: "0.2px solid zinc",
              color: "white",
            }}
            backgroundImage={imageUrl}
            article_id={id}
            onComplete={() => {
              const articleId = processedArticles.ids[index];
              console.log("Article ID to mark as complete:", articleId);
              toggleArticleCompletion(articleId);
            }}
          />
        );
      })}
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  cardStyle: React.CSSProperties;
  backgroundImage?: string;
  article_id: string;
}

const GridItem = ({
  area,
  icon,
  title,
  description,
  cardStyle,
  backgroundImage,
  article_id,
}: GridItemProps) => {
  // Function to darken the background color
  const darkenColor = (color: string, factor: number = 0.1): string => {
    let hex = color.replace("#", "");
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = Math.max(0, Math.floor(r * (1 - factor)));
    g = Math.max(0, Math.floor(g * (1 - factor)));
    b = Math.max(0, Math.floor(b * (1 - factor)));

    const toHex = (c: number): string => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return "#" + toHex(r) + toHex(g) + toHex(b);
  };

  const containerRef = useRef(null);

  const outerCardStyle = {
    ...cardStyle,
    backgroundColor: darkenColor(cardStyle.backgroundColor as string, 0.9999),
  };
  const blendy = useRef<Blendy | null>(null);
  const [showModal, setShowModal] = useState(false);

  const rawId = useId();
  // Create a valid ID by removing colons and other invalid characters
  const id = rawId.replace(/:/g, "_");

  useEffect(() => {
    blendy.current = createBlendy({ animation: "dynamic" });

    // Cleanup function
    return () => {
      if (showModal) {
        blendy.current?.untoggle(id, () => {
          setShowModal(false);
        });
      }
    };
  }, []); // Empty dependency array since we only want to run this once

  const handleModalClose = () => {
    blendy.current?.untoggle(id, () => {
      setShowModal(false);
    });
  };

  const navigate = useNavigate();

  return (
    <li className={`min-h-[16rem] list-none ${area}`}>
      {showModal &&
        createPortal(
          <Modal
            {...{
              area,
              icon,
              title,
              description,
              cardStyle,
              backgroundImage,
              id,
              article_id,
              onClose: handleModalClose,
            }}
          />,
          document.body
        )}

      <div
        className="relative h-full rounded-2xl border  "
        data-blendy-from={id}
        style={outerCardStyle}
        onClick={() => navigate(`/article/${article_id}`)}
      >
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          children={undefined}
        />
        <div
          className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl  "
          style={{
            ...cardStyle,
            backgroundImage: backgroundImage
              ? `linear-gradient(to bottom, rgb(0, 0, 0,0) 0%, rgba(0, 0, 0) 90%, rgba(0, 0, 0) 100%), url(${backgroundImage})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: backgroundImage
              ? "grayscale(100%) hover:grayscale(0)"
              : "none", // Make image black and white with hover effect
            padding: "17px",
            fontWeight: "500",
          }}
        >
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg  border-gray-600 p-2 ">
              {/* {icon} */}
            </div>
            <div className="">
              <h3 className=" text-xl -tracking-4  text-balance">
                <div
                  ref={containerRef}
                  className=" hover:cursor-pointer"
                  // style={{ position: "relative", zIndex: "10" }}
                >
                  <VariableProximity
                    label={title}
                    className={"variable-proximity-demo"}
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 750, 'opsz' 40"
                    containerRef={containerRef}
                    radius={75}
                    falloff="gaussian"
                  />
                </div>
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem] "
              >
                {/* {description} */}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

// Define proper interface for Modal props
interface ModalProps {
  id: string;
  article_id: string;
  onClose: React.MouseEventHandler<HTMLElement>;
}

// Import ExtractedColors interface from materialColorUtils.ts
import { ExtractedColors, getTextColor } from "@/utils/materialColorUtils";
import { supabase } from "@/lib/supabase";
// import { toggleArticleBookmark } from "@/services/BookmarkArticle";

// Fix Modal component definition to use proper props
function Modal({
  id,
  article_id,
  onClose,
  area,
  icon,
  title,
  description,
  cardStyle,
  backgroundImage,
}: ModalProps & Omit<GridItemProps, "area"> & { area: string }) {
  const [colorMode, setColorMode] = useState<ColorMode>("light");
  const [themePalette, setThemePalette] = useState<ColorPalette | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [extractedColors, setExtractedColors] = useState<ExtractedColors>({
    primary: "#ffffff",
    secondary: "#ffffff",
    textColor: "#000000",
    accentColor: "#ffffff",
  });

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  const [content, setContent] = useState<string>("");
  const [contentLoading, setContentLoading] = useState(false);
  const [contentError, setContentError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticleContent = async () => {
      try {
        setContentLoading(true);
        const { data, error } = await supabase
          .from("articles")
          .select("content_text")
          .eq("article_id", article_id)
          .single();

        if (error) throw error;
        setContent(data?.content_text || "");
      } catch (err) {
        setContentError("Failed to load article content");
        console.error("Content fetch error:", err);
      } finally {
        setContentLoading(false);
      }
    };

    if (article_id) {
      fetchArticleContent();
    }
  }, [article_id]);

  useEffect(() => {
    // Check if the article is completed and bookmarked
    const checkArticleStatus = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("is_completed")
          .eq("article_id", article_id)
          .single();

        if (data) {
          setIsCompleted(data.is_completed);
        }

        // Check bookmark status
        const user = await supabase.auth.getUser();
        const user_id = user?.data?.user?.id;
        if (user_id) {
          const { data: userData } = await supabase
            .from("users")
            .select("bookmarked_articles")
            .eq("user_id", user_id)
            .maybeSingle();

          if (userData?.bookmarked_articles) {
            const isArticleBookmarked = userData.bookmarked_articles.some(
              (article: { article_id: string }) =>
                article.article_id === article_id
            );
            setIsBookmarked(isArticleBookmarked);
          }
        }
      } catch (error) {
        console.error("Error checking article status:", error);
      }
    };

    checkArticleStatus();

    // First stage: Show white screen
    const initialDelay = setTimeout(() => {
      // Second stage: Extract colors
      if (backgroundImage) {
        extractColorsFromImage(backgroundImage).then((colors) => {
          setExtractedColors(colors);
          import("@/utils/materialColorUtils").then(({ extractColors }) => {
            extractColors(backgroundImage)
              .then((colorHexes) => {
                const palette = generateThemePalette(colorHexes);
                setThemePalette(palette);
                setIsLoading(false);
                // Third stage: Animate content
                setTimeout(() => setShowContent(true), 50);
              })
              .catch((error) => {
                console.error("Error generating theme palette:", error);
                setIsLoading(false);
                setTimeout(() => setShowContent(true), 50);
              });
          });
        });
      } else {
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 50);
      }
    }, 500); // Initial white screen delay

    return () => {
      clearTimeout(initialDelay);
    };
  }, [id, backgroundImage]);

  // Get the appropriate colors based on the current color mode
  const getThemeColors = () => {
    if (themePalette) {
      return colorMode === "light" ? themePalette.light : themePalette.dark;
    }
    return null;
  };

  const themeColors = getThemeColors();

  // Compute styles based on extracted colors or theme palette
  const modalStyle = {
    backgroundColor: themeColors?.background || extractedColors.primary,
    color: themeColors
      ? getTextColor(themeColors.background)
      : extractedColors.textColor,
  };

  const headerStyle = {
    backgroundColor: themeColors?.background || extractedColors.primary,
    color: themeColors
      ? getTextColor(themeColors.secondary)
      : extractedColors.secondary,
  };

  const buttonStyle = {
    backgroundColor: themeColors?.tertiary || extractedColors.accentColor,
    color: themeColors
      ? getTextColor(themeColors.tertiary)
      : getTextColor(extractedColors.accentColor),
  };

  const textStyle = {
    color: modalStyle.color === "#ffffff" ? "#e0e0e0" : "#303030",
  };

  return (
    <div
      className="modal "
      data-blendy-to={id}
      style={{
        ...modalStyle,
        position: "fixed",
        top: 0,
        left: 0,
        // width: "100vw",
        // height: "100vh",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <div className="h-[100vh]">
        {!isLoading && (
          <div
            className={`transition-opacity allmodalcontent h-[100vh] duration-200 transform  ${
              showContent
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{
              ...modalStyle,
              margin: 0,
              // display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="modal__header" style={headerStyle}>
              <h2 className="modal__title flex items-center gap-2 text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={modalStyle.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <span style={{ color: modalStyle.color }}>BookTube</span>
              </h2>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-2 rounded-full flex items-center gap-2 justify-center group border hover:bg-opacity-80"
                  onClick={() => {
                    const modalContent = document.querySelector(
                      `[data-blendy-to="${id}"]`
                    );
                    if (modalContent) {
                      downloadPDF(modalContent as HTMLElement, title);
                    }
                  }}
                  aria-label="Download article as PDF"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderColor:
                      colorMode === "light"
                        ? "rgba(0, 0, 0, 0.1)"
                        : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={modalStyle.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
                <button
                  className={`px-3 py-2 rounded-full flex items-center gap-2 justify-center group border ${
                    isCompleted ? "cursor-default" : "hover:bg-opacity-80"
                  }`}
                  onClick={async () => {
                    if (!isCompleted) {
                      setIsCompleted(true);
                      const result = await toggleArticleCompletion(article_id);
                      if (result.error) {
                        setIsCompleted(false);
                        console.error(
                          "Failed to update completion status:",
                          result.error
                        );
                      }
                    }
                  }}
                  disabled={isCompleted}
                  aria-label={
                    isCompleted ? "Article completed" : "Mark as completed"
                  }
                  style={{
                    backgroundColor: isCompleted
                      ? themeColors?.secondary || extractedColors.secondary
                      : "rgba(255, 255, 255, 0.2)",
                    borderColor: isCompleted
                      ? themeColors?.secondary || extractedColors.secondary
                      : colorMode === "light"
                      ? "rgba(0, 0, 0, 0.1)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: isCompleted
                      ? themeColors
                        ? getTextColor(themeColors.background)
                        : extractedColors.primary
                      : modalStyle.color,
                    transitionProperty: "opacity, transform",
                    transitionDuration: "200ms",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={
                      isCompleted
                        ? modalStyle.backgroundColor
                        : modalStyle.color
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:scale-110"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span
                    style={{
                      color: isCompleted
                        ? modalStyle.backgroundColor
                        : modalStyle.color,
                      backgroundColor: isCompleted
                        ? themeColors?.secondary || extractedColors.secondary
                        : "transparent",
                    }}
                    className="text-sm  g px-1 rounded"
                  >
                    {isCompleted ? "Completed" : "Mark as completed"}
                  </span>
                </button>
                <button
                  className="p-2 rounded-full hover:bg-opacity-80 transition-all duration-200 flex items-center justify-center"
                  onClick={async () => {
                    setIsBookmarked(!isBookmarked);

                    const user = await supabase.auth.getUser();
                    const user_id = user?.data?.user?.id;

                    if (user_id) {
                      const result = await toggleArticleBookmark(
                        user_id,
                        article_id,
                        title
                      );
                      if (!result.error) {
                        setIsBookmarked(!isBookmarked);
                        // Trigger a re-fetch of bookmarked articles
                        const { data: userData } = await supabase
                          .from("users")
                          .select("bookmarked_articles")
                          .eq("user_id", user_id)
                          .maybeSingle();

                        if (userData?.bookmarked_articles) {
                          setNavMainItems((prev) => {
                            const newItems = [...prev];
                            const bookmarkIndex = newItems.findIndex(
                              (item) => item.title === "Bookmarked Articles"
                            );
                            if (bookmarkIndex !== -1) {
                              newItems[bookmarkIndex].items =
                                userData.bookmarked_articles.map(
                                  (article: {
                                    title: string;
                                    article_id: string;
                                  }) => ({
                                    title: article.title,
                                    url: `/article/${article.article_id}`,
                                  })
                                );
                            }
                            return newItems;
                          });
                        }
                        console.log(
                          "Bookmark status updated successfully:",
                          result
                        );
                      }
                    }
                  }}
                  aria-label="Bookmark this article"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={isBookmarked ? modalStyle.color : "none"}
                    stroke={modalStyle.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>

                <button
                  className="p-2 rounded-full hover:bg-opacity-80 transition-colors duration-200 flex items-center justify-center"
                  onClick={toggleColorMode}
                  aria-label={
                    colorMode === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  {colorMode === "dark" ? (
                    <Sun
                      className="h-4 w-4"
                      style={{ color: modalStyle.color }}
                    />
                  ) : (
                    <Moon
                      className="h-4 w-4"
                      style={{ color: modalStyle.color }}
                    />
                  )}
                </button>
                {/* Close button */}
                <button
                  className="p-2 rounded-full hover:bg-opacity-80 transition-colors duration-100 flex items-center justify-center"
                  onClick={onClose}
                  aria-label="Close modal"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={modalStyle.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
            <div className="modal__content">
              <article className="max-w-5xl mx-auto" style={textStyle}>
                <div
                  className="relative rounded-xl overflow-hidden mb-6"
                  style={{
                    backgroundImage: backgroundImage
                      ? `url(${backgroundImage})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "300px",
                  }}
                />
                <div className="space-y-6 px-4">
                  <div className="flex items-center gap-3">
                    {/* <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor:
                          themeColors?.secondary || extractedColors.secondary,
                        color: themeColors
                          ? getTextColor(themeColors.secondary)
                          : extractedColors.textColor,
                      }}
                    >
                      {icon}
                    </div> */}
                    <h1 className="text-5xl font-bold">{title}</h1>
                  </div>
                  <div
                    className="prose prose-lg"
                    style={{ color: "inherit", maxWidth: "100%" }}
                  >
                    <p style={{ color: "inherit" }}>{description}</p>
                  </div>
                  <div className="flex gap-4">
                    <div
                      className="px-4 py-2 rounded-lg text-sm"
                      style={buttonStyle}
                    >
                      View Details
                    </div>
                    <div
                      className="px-4 py-2 rounded-lg text-sm border"
                      style={{
                        borderColor: modalStyle.color,
                        color: modalStyle.color,
                      }}
                    >
                      Share
                    </div>
                  </div>
                  <div className="prose dark:prose-invert">
                    {contentLoading && (
                      <div className="text-center py-4">Loading content...</div>
                    )}
                    {contentError && (
                      <div className="text-red-500 py-4">{contentError}</div>
                    )}
                    {content && (
                      <div
                        className=""
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(content),
                        }}
                      />
                    )}
                  </div>
                  {themePalette && (
                    <div
                      className="mt-6 pt-6 border-t border-opacity-20"
                      style={{ borderColor: modalStyle.color }}
                    >
                      <h3 className="text-lg font-semibold mb-3">
                        Material You Theme
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {Object.entries(themeColors || {}).map(
                          ([key, color]) => (
                            <div
                              key={key}
                              className="flex flex-col items-center"
                            >
                              <div
                                className="w-10 h-10 rounded-full mb-1"
                                style={{ backgroundColor: color }}
                              />
                              <span className="text-xs capitalize">{key}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
