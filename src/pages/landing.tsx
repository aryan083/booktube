import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, SetStateAction } from "react";

// Utility to convert hex color to rgba with opacity
type HexColor = string;
function hexToRgba(hex: HexColor, alpha: number) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Brain,
  Sparkles,
  MessageSquare,
  GraduationCap,
  BookCopy,
  LayoutGrid,
} from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import RotatingText from "@/components/RotatingText/RotatingText";
import FeaturesTabs from "@/components/FeaturesTabs";

export default function LandingPage() {
  // Create a ref for the container holding the RotatingText
  const containerRef = useRef(null);
  // Track the active text index
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const rotatingTexts = [
    "Addictive",
    "Personalized",
    "Cool",
    "Fun",
    "Stick"
  ];

  // Color palette for each rotating word
  const rotatingColors = [
    "#7dd3fc", // blue-300
    "#fbbf24", // yellow-400
    "#34d399", // green-400
    "#f472b6", // pink-400
    "#f87171", // red-400
  ];
  // State to track the current width
  const [containerWidth, setContainerWidth] = useState(0);

  // Custom handler to sync with text rotation
  const handleTextChange = (index: SetStateAction<number>) => {
    setActiveTextIndex(index);
  };

  // Effect to update the width based on current text
  useEffect(() => {
    // Create a temporary div to measure text width
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.fontSize = '8rem'; // Match your text-8xl
    tempDiv.style.fontWeight = 'bold';
    tempDiv.className = 'px-2 sm:px-2 md:px-3  overflow-hidden text-black py-0.5 sm:py-1 md:py-2 rounded-lg';
    tempDiv.textContent = rotatingTexts[activeTextIndex];
    document.body.appendChild(tempDiv);
    
    // Measure the width
    const width = tempDiv.getBoundingClientRect().width;
    setContainerWidth(width*0.78);
    
    document.body.removeChild(tempDiv);
  }, [activeTextIndex]);

  return (
    <>
      <motion.div
        initial={{ backgroundColor: 'rgba(0,0,0,1)' }}
        animate={{ backgroundColor: `${hexToRgba(rotatingColors[activeTextIndex], 0.12)}` }}
        transition={{ duration: 0.5 }}
        className="min-h-screen w-full"
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />
      <nav className="fixed top-0 left-0 w-full bg-transparent bg-opacity-0 backdrop-blur-3xl p-4 z-10" style={{ zIndex: 10 }}>
        <div className="container mx-auto grid grid-cols-3 items-center w-full">
          {/* Logo left */}
          <div className="flex items-center">
            <Link to="/">
              <span className="text-xl font-semibold tracking-tight text-white">
                BookTube
              </span>
            </Link>
          </div>

          {/* Nav links center */}
          <div className="flex justify-center">
            <div className="flex space-x-8">
              <a href="#features" className="text-white hover:text-cyan-300 transition-colors">Features</a>
              <a href="#testimonials" className="text-white hover:text-cyan-300 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-white hover:text-cyan-300 transition-colors">Pricing</a>
              <a href="#team" className="text-white hover:text-cyan-300 transition-colors">Team</a>
            </div>
          </div>

          {/* Auth buttons right */}
          <div className="flex justify-end items-center space-x-4">
            <Link to="/SignIn">
  <Button className="bg-transparent text-white shadow-none border-none px-4 py-2 transition-colors hover:text-cyan-300" style={{ background: 'transparent' }}>Login</Button>
</Link>
            <Link to="/SignUp">
  <motion.button
    className="px-4  rounded-3xl text-white font-semibold shadow-md border-none focus:outline-none focus:ring-offset-2 focus:ring-cyan-300 transition-colors"
    style={{ background: rotatingColors[activeTextIndex], color: '#000' }}
    animate={{ backgroundColor: rotatingColors[activeTextIndex] }}
    transition={{ duration: 0.4 }}
  >
    Create Account
  </motion.button>
</Link>
          </div>
        </div>
      </nav>

      <section
        className="flex items-center justify-center"
        style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '64px' }}
      >
        <div className="container mx-auto flex flex-col items-center justify-center">
          <p className="text-8xl font-bold text-white text-center">
            Learning but,
          </p>
          <div className="flex justify-center items-center text-8xl font-bold text-white">
            <span className="flex flex-row items-center">
              Make it&nbsp;
              {/* Animated container with width based on current text */}
              {/* Animated container with width and background color based on current text */}
              <motion.div
                ref={containerRef}
                className="relative overflow-hidden rounded-xl"
                initial={{ width: 0, backgroundColor: rotatingColors[activeTextIndex] }}
                animate={{ width: containerWidth, backgroundColor: rotatingColors[activeTextIndex] }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 30,
                  duration: 0.5
                }}
              >
                <RotatingText
                  texts={rotatingTexts}
                  mainClassName="text-black overflow-hidden py-0.5 sm:py-1 md:py-1 justify-center"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                  onNext={(index) => handleTextChange(index)}
                />
              </motion.div>
            </span>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="flex items-center justify-center"
        style={{ minHeight: 'calc(100vh)' }}
      >
        <div className="container mx-auto flex flex-col items-center justify-center">
          {/* FeaturesTabs tabbed flowchart */}
          <FeaturesTabs />
        </div>
      </section>
    </>
  );
}