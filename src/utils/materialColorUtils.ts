import ColorThief from 'colorthief';

export type ColorMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  surface: string;
  error: string;
}

export interface ColorPalette {
  light: ThemeColors;
  dark: ThemeColors;
  source: string;
  colorHex: string[];
}

export interface ExtractedColors {
  primary: string;
  secondary: string;
  textColor: string;
  accentColor: string;
}

// Convert RGB to hex
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

// Convert hex to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Convert RGB to HSL
export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

// Convert hex to HSL
export const hexToHsl = (hex: string): [number, number, number] | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
};

// Adjust color luminance (make lighter or darker)
export const adjustLuminance = (hex: string, amount: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  // Adjust luminance
  let l = hsl[2] + amount;
  l = Math.max(0, Math.min(100, l));
  
  return hslToHex(hsl[0], hsl[1], l);
};

// Convert HSL to hex
export const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  
  return `#${f(0)}${f(8)}${f(4)}`;
};

// Get contrasting text color (black or white) based on background
export const getContrastColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000000';
  
  // Calculate perceived brightness using the formula: 
  // (0.299*R + 0.587*G + 0.114*B)
  const brightness = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  
  return brightness > 0.5 ? '#000000' : '#ffffff';
};

// Calculate YIQ contrast ratio (alternative method)
export const getContrastYIQ = (hexcolor: string): number => {
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

// Get text color based on YIQ contrast
export const getTextColor = (bgColor: string): string => {
  // Determine if text should be light or dark based on background color
  return getContrastYIQ(bgColor) >= 128 ? "#000000" : "#ffffff";
};

// Function to darken a color
export const darkenColor = (color: string, factor: number = 0.1): string => {
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

// Extract dominant colors from an image using ColorThief
export const extractColors = async (imageUrl: string): Promise<string[]> => {
  try {
    const colorThief = new ColorThief();
    
    // Create a temporary image element
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    return new Promise((resolve, reject) => {
      img.onload = () => {
        try {
          // Get the dominant color and a palette of colors
          const dominantColor = colorThief.getColor(img);
          const palette = colorThief.getPalette(img, 6);
          
          // Convert the RGB values to hex
          const dominantHex = rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);
          const colorHexes = palette.map(color => rgbToHex(color[0], color[1], color[2]));
          
          // Include the dominant color as the first color in the palette
          resolve([dominantHex, ...colorHexes]);
        } catch (error) {
          console.error('Error extracting colors:', error);
          reject(error);
        }
      };
      
      img.onerror = (err) => {
        console.error('Error loading image:', err);
        reject(err);
      };
      
      img.src = imageUrl;
    });
  } catch (error) {
    console.error('Error in color extraction:', error);
    return [];
  }
};

// Extract colors from image using canvas (alternative method)
export const extractColorsFromImage = (imageUrl: string): Promise<ExtractedColors> => {
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

// Generate a theme palette from extracted colors
export const generateThemePalette = (colors: string[]): ColorPalette => {
  if (!colors.length) {
    // Fallback colors if extraction fails
    return {
      light: {
        primary: '#6750A4',
        secondary: '#958DA5',
        tertiary: '#B58392',
        background: '#FFFBFE',
        surface: '#FDF8FD',
        error: '#B3261E'
      },
      dark: {
        primary: '#D0BCFF',
        secondary: '#CCC2DC',
        tertiary: '#EFB8C8',
        background: '#1C1B1F',
        surface: '#2B2930',
        error: '#F2B8B5'
      },
      source: colors[0] || '#6750A4',
      colorHex: colors
    };
  }
  
  // Extract the main colors
  const sourceColor = colors[0];
  const secondaryColor = colors[1] || adjustLuminance(sourceColor, 10);
  const tertiaryColor = colors[2] || adjustLuminance(sourceColor, -10);
  
  const lightPalette: ThemeColors = {
    primary: sourceColor,
    secondary: secondaryColor,
    tertiary: tertiaryColor,
    background: adjustLuminance(sourceColor, 45),
    surface: adjustLuminance(sourceColor, 40),
    error: '#B3261E' // Standard error color
  };
  
  const darkPalette: ThemeColors = {
    primary: adjustLuminance(sourceColor, 20),
    secondary: adjustLuminance(secondaryColor, 20),
    tertiary: adjustLuminance(tertiaryColor, 20),
    background: adjustLuminance(sourceColor, -45),
    surface: adjustLuminance(sourceColor, -40),
    error: '#F2B8B5' // Standard dark error color
  };
  
  return {
    light: lightPalette,
    dark: darkPalette,
    source: sourceColor,
    colorHex: colors
  };
  };