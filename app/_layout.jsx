import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Colors } from '@/constants/Colors'; // Import your theme constants

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Get the color scheme (light/dark)
  const colorScheme = Appearance.getColorScheme();
  
  // Default to light theme if colorScheme is undefined
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const level3 = theme.colors?.level3 || '#f0f0f0'; // Default value in case level3 is undefined

  console.log("Current theme:", theme); 

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Return nothing while fonts are loading
  }

  return (
    // Wrap the app with PaperProvider to provide the theme and other features of react-native-paper
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.headerbackground },  // Make sure to use theme.colors.headerbackground here
          headerTintColor: theme.colors.text,  // Use theme.colors.text for header text color
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
        <Stack.Screen name="Report tab" options={{ headerShown: true, title: 'Report', headerTitle: 'Report issue' }} />
        <Stack.Screen name="contact" options={{ headerShown: true, title: 'Contact', headerTitle: 'Contact' }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
