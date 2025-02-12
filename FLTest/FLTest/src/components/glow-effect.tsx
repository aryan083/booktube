"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 py-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4" style={{ color: '#FFF' }} />}
        title="Do things the right way"
        description="Running out of copy so I'll write anything."
        cardStyle={{
          backgroundColor: '#FF1744', // Bright Red from gradient
          border: '0px solid gray',
          color: '#FFF',
        }}
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4" style={{ color: '#FFF' }} />}
        title="The best AI code editor ever."
        description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
        cardStyle={{
          backgroundColor: '#1DE9B6', // Bright Teal from gradient
          border: '0px solid gray',
          color: '#000',
        }}
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4" style={{ color: '#FFF' }} />}
        title="You should buy Aceternity UI Pro"
        description="It's the best money you'll ever spend"
        cardStyle={{
          backgroundColor: '#2979FF', // Bright Blue from gradient
          border: '0px solid gray',
          color: '#FFF',
        }}
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4" style={{ color: '#000' }} />}
        title="This card is also built by Cursor"
        description="I'm not even kidding. Ask my mom if you don't believe me."
        cardStyle={{
          backgroundColor: '#FFEA00', // Bright Yellow from gradient
          border: '0px solid gray',
          color: '#000',
        }}
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4" style={{ color: '#FFF' }} />}
        title="Coming soon on Aceternity UI"
        description="I'm writing the code as I record this, no shit."
        cardStyle={{
          backgroundColor: '#AA00FF', // Bright Purple from gradient
          border: '0px solid gray',
          color: '#FFF',
        }}
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
}

const GridItem = ({ area, icon, title, description, cardStyle }: GridItemProps) => {
  // Function to darken the background color
  const darkenColor = (color: string, factor: number = 0.1): string => {
    let hex = color.replace('#', '');
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
      return hex.length === 1 ? '0' + hex : hex;
    };

    return '#' + toHex(r) + toHex(g) + toHex(b);
  };

  const outerCardStyle = {
    ...cardStyle,
    backgroundColor: darkenColor(cardStyle.backgroundColor as string, 0.75),
  };

  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3" style={outerCardStyle}>
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6" style={cardStyle}>
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
