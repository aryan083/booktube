"use client";

import { Box, Lock, Moon, Search, Settings, Sparkles, Sun } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Blendy, createBlendy } from "blendy";
import { useEffect, useId, useRef, useState } from "react";
import {
  extractColorsFromImage,
  ColorPalette,
  generateThemePalette,
  ColorMode,
} from "@/utils/materialColorUtils";
import { createPortal } from "react-dom";

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 py-2 overflow-y-auto scrollbar-hide">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4" style={{ color: "#000" }} />}
        title="Neural Networks Fundamentals"
        description="Learn the core concepts of neural networks, including neurons, layers, and basic architectures."
        cardStyle={{
          backgroundColor: "none",
          border: "0.2px solid zinc",
          color: "#000",
        }}
        backgroundImage="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60"
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4" style={{ color: "#FFF" }} />}
        title="Deep Learning Architecture Design"
        description="Master the principles of designing and optimizing deep neural network architectures for various applications."
        cardStyle={{
          backgroundColor: "none",
          border: "0.2px solid zinc",
          color: "#FFF",
        }}
        backgroundImage="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60"
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4" style={{ color: "#000" }} />}
        title="Computer Vision Applications"
        description="Explore image processing, object detection, and visual recognition using deep learning techniques."
        cardStyle={{
          backgroundColor: "none",
          border: "0.2px solid zinc",
          color: "#FFF",
        }}
        backgroundImage="https://images.unsplash.com/photo-1527430253228-e93688616381?w=800&auto=format&fit=crop&q=60"
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4" style={{ color: "#FFF" }} />}
        title="Natural Language Processing"
        description="Discover text analysis, language understanding, and generation using advanced NLP models."
        cardStyle={{
          backgroundColor: "none",
          border: "0.2px solid zinc",
          color: "#FFF",
        }}
        backgroundImage="https://images.unsplash.com/photo-1527430253228-e93688616381?w=800&auto=format&fit=crop&q=60"
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4" style={{ color: "#000" }} />}
        title="Reinforcement Learning Basics"
        description="Learn about agents, environments, and reward systems in reinforcement learning applications."
        cardStyle={{
          backgroundColor: "none",
          border: "0.2px solid zinc",
          color: "#000",
        }}
        backgroundImage="https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&auto=format&fit=crop&q=60"
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  cardStyle: React.CSSProperties;
  backgroundImage?: string; // Optional background image URL
}

const GridItem = ({
  area,
  icon,
  title,
  description,
  cardStyle,
  backgroundImage,
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

  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
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
              onClose: handleModalClose,
            }}
          />,
          document.body
        )}

      <div
        className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3"
        data-blendy-from={id}
        style={outerCardStyle}
        onClick={() => {
          setShowModal(true);
          blendy.current?.toggle(id);
        }}
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
          className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6"
          style={{
            ...cardStyle,
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: backgroundImage ? "grayscale(00%)" : "none", // Make image black and white
          }}
        >
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              {icon}
            </div>
            <div className="">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance">
                {title}
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
  onClose: React.MouseEventHandler<HTMLElement>;
}

// Import ExtractedColors interface from materialColorUtils.ts
import { ExtractedColors, getTextColor } from "@/utils/materialColorUtils";

// Fix Modal component definition to use proper props
function Modal({
  id,
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
  const [extractedColors, setExtractedColors] = useState<ExtractedColors>({
    primary: "#ffffff",
    secondary: "#ffffff",
    textColor: "#000000",
    accentColor: "#ffffff",
  });

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  useEffect(() => {
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
        setTimeout(() => setShowContent(true), 100);
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
      className="modal  z-flex items-center justify-center"
      data-blendy-to={id}
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="min-h-[80vh] w-full relative">
        {!isLoading && (
          <div
            className={`transition-all allmodalcontent duration-100 transform ${
              showContent
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={modalStyle}
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
                {/* Theme toggle button */}
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
                    <div
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
                    </div>
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
