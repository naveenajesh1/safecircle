// Define tint colors for light and dark themes
const tintColorLight = 'teal'; // Closest to #0a7ea4
const tintColorDark = 'white'; // White for dark mode contrast

// Export the Colors object containing theme definitions
export const Colors = {
  light: {
    colors: {
      primary: 'dodgerblue', // Primary theme color (bright blue)
      accent: 'orange', // Accent color used for highlights
      background: 'white', // Background color for light mode
      surface: 'lightgray', // Surface color for UI elements
      text: 'black', // Default text color for readability
      onSurface: 'black', // Text color on surfaces (buttons, cards, etc.)
      error: 'red', // Color used for errors and warnings
      headerBackground: 'white', // Background color for headers
      tint: 'deepskyblue', // Used for icons and selection highlights
      icon: 'gray', // Default color for icons
      tabIconDefault: 'silver', // Default color for inactive tab icons
      tabIconSelected: 'deepskyblue', // Highlight color for active tab icons
      level3: 'gainsboro', // Light gray used for subtle UI elements
    },
    roundness: 4, // Border radius for rounded elements
    spacing: 8, // Standard spacing unit for margins/padding
  },
  dark: {
    colors: {
      primary: 'mediumseagreen', // Greenish-blue for dark mode primary color
      accent: 'darkorange', // Orange accent color for contrast
      background: 'black', // Background color for dark mode
      surface: 'dimgray', // Dark gray surface color for UI elements
      text: 'white', // White text for readability
      onSurface: 'white', // White text on surface elements
      error: 'red', // Error color remains red for visibility
      headerBackground: 'dimgray', // Darker background for headers
      tint: 'white', // Tint color for icons in dark mode
      icon: 'white', // White icons for visibility
      tabIconDefault: 'darkgray', // Default color for inactive tab icons
      tabIconSelected: 'white', // Active tab icons are highlighted in white
      level3: 'darkslategray', // Darker gray for subtle UI elements
    },
    roundness: 4, // Border radius for rounded elements
    spacing: 8, // Standard spacing unit
  },
};
