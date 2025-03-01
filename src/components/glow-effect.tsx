"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Blendy, createBlendy } from "blendy";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 py-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4" style={{ color: "#FFF" }} />}
        title="Do things the right way"
        description="Running out of copy so I'll write anything."
        cardStyle={{
          backgroundColor: "#FF1744",
          border: "0.2px solid zinc",
          color: "#FFF",
        }}
        backgroundImage="https://images.unsplash.com/photo-1733044271325-3017e877218b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8Q0R3dXdYSkFiRXd8fGVufDB8fHx8fA%3D%3D"
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4" style={{ color: "#FFF" }} />}
        title="The best AI code editor ever."
        description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
        cardStyle={{
          backgroundColor: "#1DE9B6",
          border: "0.2px solid zinc",
          color: "#000",
        }}
        backgroundImage="https://images.unsplash.com/photo-1676552676584-3ee0aef1bd39?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4" style={{ color: "#FFF" }} />}
        title="You should buy Aceternity UI Pro"
        description="It's the best money you'll ever spend"
        cardStyle={{
          backgroundColor: "#2979FF",
          border: "0.2px solid zinc",
          color: "#FFF",
        }}
        backgroundImage="https://images.unsplash.com/photo-1739372425262-1642d83a10c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D"
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4" style={{ color: "#000" }} />}
        title="This card is also built by Cursor"
        description="I'm not even kidding. Ask my mom if you don't believe me."
        cardStyle={{
          backgroundColor: "#FFEA00",
          border: "0.2px solid zinc",
          color: "#000",
        }}
        backgroundImage="https://images.unsplash.com/photo-1735919828689-6f300b3b194d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D"
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4" style={{ color: "#FFF" }} />}
        title="Coming soon on Aceternity UI"
        description="I'm writing the code as I record this, no shit."
        cardStyle={{
          backgroundColor: "#AA00FF",
          border: "0.2px solid zinc",
          color: "#FFF",
        }}
        backgroundImage="https://images.unsplash.com/photo-1692607038343-8b811ec1fc55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM4fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D"
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
  }, []);

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
              onClose: () => {
                blendy.current?.untoggle(id, () => {
                  setShowModal(false);
                });
              },
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
          console.log("Hello there ", id);
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
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem] "
              >
                {description}
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

// Color extraction utility functions
interface ExtractedColors {
  primary: string;
  secondary: string;
  textColor: string;
  accentColor: string;
}

const getContrastYIQ = (hexcolor: string): number => {
  // Convert hex to RGB
  hexcolor = hexcolor.replace("#", "");
  if (hexcolor.length === 3) {
    hexcolor =
      hexcolor[0] +
      hexcolor[0] +
      hexcolor[1] +
      hexcolor[1] +
      hexcolor[2] +
      hexcolor[2];
  }

  const r = parseInt(hexcolor.substring(0, 2), 16);
  const g = parseInt(hexcolor.substring(2, 4), 16);
  const b = parseInt(hexcolor.substring(4, 6), 16);

  // Calculate YIQ ratio (brightness)
  return (r * 299 + g * 587 + b * 114) / 1000;
};

const getTextColor = (bgColor: string): string => {
  // Determine if text should be light or dark based on background color
  return getContrastYIQ(bgColor) >= 128 ? "#000000" : "#ffffff";
};

const extractColorsFromImage = (imageUrl: string): Promise<ExtractedColors> => {
  return new Promise((resolve) => {
    // Default colors in case extraction fails
    const defaultColors: ExtractedColors = {
      primary: "#2979FF",
      secondary: "#1A237E",
      textColor: "#ffffff",
      accentColor: "#FF9800",
    };

    if (!imageUrl) {
      resolve(defaultColors);
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(defaultColors);
          return;
        }

        // Scale down for performance
        const scaleFactor = Math.min(1, 100 / Math.max(img.width, img.height));
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ).data;
        const colorCounts: Record<string, number> = {};

        // Sample pixels to find dominant colors
        for (let i = 0; i < imageData.length; i += 16) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];

          // Skip transparent pixels
          if (imageData[i + 3] < 128) continue;

          // Convert to hex and count occurrences
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1)}`;
          colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        }

        // Sort colors by frequency
        const sortedColors = Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])
          .map((entry) => entry[0]);

        if (sortedColors.length > 0) {
          const primary = sortedColors[0];
          // Find a contrasting secondary color
          const secondary =
            sortedColors.find((color) => {
              const contrast = Math.abs(
                getContrastYIQ(color) - getContrastYIQ(primary)
              );
              return contrast > 50;
            }) || sortedColors[Math.min(1, sortedColors.length - 1)];

          // Find an accent color that stands out
          const accentColor =
            sortedColors.find((color) => {
              const contrast = Math.abs(
                getContrastYIQ(color) - getContrastYIQ(primary)
              );
              return contrast > 100;
            }) || sortedColors[Math.min(2, sortedColors.length - 1)];

          const textColor = getTextColor(primary);

          resolve({
            primary,
            secondary,
            textColor,
            accentColor,
          });
        } else {
          resolve(defaultColors);
        }
      } catch (error) {
        console.error("Error extracting colors:", error);
        resolve(defaultColors);
      }
    };

    img.onerror = () => {
      console.error("Error loading image for color extraction");
      resolve(defaultColors);
    };

    img.src = imageUrl;
  });
};

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
  const [extractedColors, setExtractedColors] = useState<ExtractedColors>({
    primary: (cardStyle.backgroundColor as string) || "#2979FF",
    secondary: cardStyle.backgroundColor as string,
    textColor: (cardStyle.color as string) || "#ffffff",
    accentColor: "#FF9800",
  });

  useEffect(() => {
    console.log("Modal mounted with ID:", id);

    // Extract colors from background image if available
    if (backgroundImage) {
      extractColorsFromImage(backgroundImage).then((colors) => {
        setExtractedColors(colors);
      });
    }

    return () => {
      console.log("Modal unmounting with ID:", id);
    };
  }, [id, backgroundImage]);

  // Compute styles based on extracted colors
  const modalStyle = {
    backgroundColor: extractedColors.primary,
    color: extractedColors.textColor,
  };

  const headerStyle = {
    backgroundColor: extractedColors.primary,
    color: extractedColors.textColor,
  };

  const buttonStyle = {
    backgroundColor: extractedColors.accentColor,
    color: getTextColor(extractedColors.accentColor),
  };

  const textStyle = {
    color: extractedColors.textColor === "#ffffff" ? "#e0e0e0" : "#303030",
  };

  return (
    <div className="modal" data-blendy-to={id} style={modalStyle}>
      <div>
        <div className="modal__header" style={headerStyle}>
          <h2 className="modal__title flex items-center gap-2 text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            BookTube
          </h2>
          <button
            className="p-2 rounded-full hover:bg-opacity-80 transition-colors duration-200 flex items-center justify-center"
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
              stroke={extractedColors.textColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
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
                    backgroundColor: extractedColors.secondary,
                    color: extractedColors.textColor,
                  }}
                >
                  {icon}
                </div>
                <h1 className="text-3xl font-bold">{title}</h1>
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
                    borderColor: extractedColors.textColor,
                    color: extractedColors.textColor,
                  }}
                >
                  Share
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
