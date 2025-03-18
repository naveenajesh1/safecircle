import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof (typeof Colors)['light']['colors'] // ✅ Ensures valid keys from "colors"
) {
  const theme = useColorScheme() ?? 'light';
  const color = props[theme] ?? Colors[theme].colors[colorName];

  console.log(`useThemeColor: ${theme} mode, colorName=${colorName}, resolvedColor=${color}`);

  return typeof color === 'string' ? color : '#000000'; // Default to black if undefined
}
