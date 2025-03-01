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
        backgroundImage="https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
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
        backgroundImage="https://images.unsplash.com/photo-1550537687-c91072c4792d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
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
        backgroundImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
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
        backgroundImage="https://images.unsplash.com/photo-1550537687-c91072c4792d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
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
        backgroundImage="https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
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
  useEffect(() => {
    console.log("Modal mounted with ID:", id);
    return () => {
      console.log("Modal unmounting with ID:", id);
    };
  }, [id]);

  return (
    <div
      className="modal"
      data-blendy-to={id}
      style={{
        backgroundColor: cardStyle.backgroundColor,
      }}
    >
      <div>
        <div className="modal__header">
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
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-600 hover:text-gray-900"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="modal__content">
          <article className="text-black max-w-5xl mx-auto">
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
                <div className="p-2 rounded-lg" style={cardStyle}>
                  {icon}
                </div>
                <h1 className="text-3xl font-bold">{title}</h1>
              </div>
              <div className="prose prose-lg">
                <p className="text-gray-700">{description}</p>
              </div>
              <div className="flex gap-4">
                <div className="px-4 py-2 rounded-lg text-sm" style={cardStyle}>
                  View Details
                </div>
                <div className="px-4 py-2 rounded-lg text-sm border border-current">
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
