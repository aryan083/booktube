
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

// Extract dominant colors from an image
export const extractColors = async (imageUrl: string): Promise<string[]> => {
  try {
    const colorThief = ColorThief;
    
    // Create a temporary image element
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    return new Promise((resolve, reject) => {
      img.onload = async () => {
        try {
          // Get the dominant color and a palette of colors
          const dominantColor = await Promise.resolve(colorThief.getColor(img));
          const palette = await Promise.resolve(colorThief.getPalette(img, 6));
          
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

// Convert color palette to CSS variables
export const applyThemeColors = (palette: ColorPalette, mode: ColorMode = 'light'): void => {
  const colors = mode === 'light' ? palette.light : palette.dark;
  const root = document.documentElement;
  
  // For each color in the theme, convert to HSL and update CSS variables
  Object.entries(colors).forEach(([key, value]) => {
    const hsl = hexToHsl(value);
    if (hsl) {
      // Update the corresponding CSS variable
      if (key === 'primary') {
        root.style.setProperty('--primary', `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`);
        // Set the foreground (text) color based on contrast
        const foreground = getContrastColor(value);
        const foregroundHsl = hexToHsl(foreground);
        if (foregroundHsl) {
          root.style.setProperty('--primary-foreground', `${foregroundHsl[0]} ${foregroundHsl[1]}% ${foregroundHsl[2]}%`);
        }
      } else if (key === 'secondary') {
        root.style.setProperty('--secondary', `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`);
        const foreground = getContrastColor(value);
        const foregroundHsl = hexToHsl(foreground);
        if (foregroundHsl) {
          root.style.setProperty('--secondary-foreground', `${foregroundHsl[0]} ${foregroundHsl[1]}% ${foregroundHsl[2]}%`);
        }
      } else if (key === 'tertiary') {
        root.style.setProperty('--tertiary', `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`);
        const foreground = getContrastColor(value);
        const foregroundHsl = hexToHsl(foreground);
        if (foregroundHsl) {
          root.style.setProperty('--tertiary-foreground', `${foregroundHsl[0]} ${foregroundHsl[1]}% ${foregroundHsl[2]}%`);
        }
      } else if (key === 'background') {
        root.style.setProperty('--background', `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`);
        const foreground = getContrastColor(value);
        const foregroundHsl = hexToHsl(foreground);
        if (foregroundHsl) {
          root.style.setProperty('--foreground', `${foregroundHsl[0]} ${foregroundHsl[1]}% ${foregroundHsl[2]}%`);
        }
      } else if (key === 'surface') {
        root.style.setProperty('--card', `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`);
        root.style.setProperty('--popover', `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`);
        const foreground = getContrastColor(value);
        const foregroundHsl = hexToHsl(foreground);
        if (foregroundHsl) {
          root.style.setProperty('--card-foreground', `${foregroundHsl[0]} ${foregroundHsl[1]}% ${foregroundHsl[2]}%`);
          root.style.setProperty('--popover-foreground', `${foregroundHsl[0]} ${foregroundHsl[1]}% ${foregroundHsl[2]}%`);
        }
      } else if (key === 'error') {
        root.style.setProperty('--destructive', `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`);
        const foreground = getContrastColor(value);
        const foregroundHsl = hexToHsl(foreground);
        if (foregroundHsl) {
          root.style.setProperty('--destructive-foreground', `${foregroundHsl[0]} ${foregroundHsl[1]}% ${foregroundHsl[2]}%`);
        }
      }
    }
  });
  
  // Also update border and input based on background
  const bgHsl = hexToHsl(colors.background);
  if (bgHsl) {
    // Make border slightly different from background
    root.style.setProperty('--border', `${bgHsl[0]} ${bgHsl[1]}% ${mode === 'light' ? bgHsl[2] - 10 : bgHsl[2] + 10}%`);
    root.style.setProperty('--input', `${bgHsl[0]} ${bgHsl[1]}% ${mode === 'light' ? bgHsl[2] - 10 : bgHsl[2] + 10}%`);
    
    // Ring color based on primary
    const primaryHsl = hexToHsl(colors.primary);
    if (primaryHsl) {
      root.style.setProperty('--ring', `${primaryHsl[0]} ${primaryHsl[1]}% ${primaryHsl[2]}%`);
    }
  }
};

// Demo images for the app
export const demoImages = [
  '/public/lovable-uploads/788aaf00-c261-4d43-a9c0-81b22ef66683.png',
  '/public/lovable-uploads/16b6c3b9-f425-4dba-ac6d-9f4a3d5a543e.png'
];