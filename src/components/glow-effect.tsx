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
function Modal({ id, onClose }: ModalProps) {
  useEffect(() => {
    console.log("Modal mounted with ID:", id);
    return () => {
      console.log("Modal unmounting with ID:", id);
    };
  }, [id]);

  return (
    <div className="modal" data-blendy-to={id}>
      <div>
        <div className="modal__header">
          <h2 className="modal__title">BookTube</h2>
          <button className="modal__close" onClick={onClose}></button>
        </div>
        <div className="modal__content">
          <article className="text-black max-w-5xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-6 tracking-tight">
              Blendy: Revolutionizing Web Animations
            </h1>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  🚀 Transform Your Web Experience
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  In the fast-paced world of modern web development, standing
                  out is more crucial than ever. Blendy emerges as a
                  game-changing solution, offering developers unprecedented
                  control over element transitions with minimal effort.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  ⚡ Lightning-Fast Implementation
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  Gone are the days of complex animation code and browser
                  compatibility issues. With Blendy, you can implement stunning
                  transitions in minutes, not hours. Our framework-agnostic
                  approach means you can integrate Blendy seamlessly into any
                  project, regardless of your tech stack.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  💡 Features That Matter
                </h2>
                <ul className="list-disc list-inside space-y-2 text-lg mb-4 ml-4">
                  <li>Framework-agnostic architecture</li>
                  <li>Butter-smooth transitions</li>
                  <li>Minimal code footprint</li>
                  <li>Extensive customization options</li>
                  <li>Built-in performance optimization</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  🎯 Perfect For Every Project
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  Whether you're building a cutting-edge web application, an
                  interactive portfolio, or a corporate dashboard, Blendy adapts
                  to your needs. Our flexible API allows for endless
                  possibilities in animation design and implementation.
                </p>
              </section>

              <blockquote className="border-l-4 border-gray-900 pl-4 my-6">
                <p className="text-xl italic font-medium">
                  "Blendy has transformed how we think about web animations.
                  It's not just a tool; it's a revolution in user experience
                  design."
                </p>
              </blockquote>

              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  🚀 Get Started Today
                </h2>
                <p className="text-lg leading-relaxed">
                  Join thousands of developers who have already discovered the
                  power of Blendy. Transform your web applications into dynamic,
                  engaging experiences that users love. The future of web
                  animations is here – and it's more accessible than ever.
                </p>
              </section>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
