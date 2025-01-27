//import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React,{ useEffect,useState } from 'react';
import { Appearance } from 'react-native';

//import 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

//import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme()
  const theme = colorScheme === "dark" ? Colors.dark :Colors.light;
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{headerStyle:{backgroundColor : theme.headerbackground}
         , headerTintColor :theme.text, headerShadowVisible:false}}>
        <Stack.Screen name="index" options={{ headerShown: false,title:'Home' }} /> 
        <Stack.Screen name="Report tab" options={{ headerShown: true,title:'Report',headerTitle:'Report issue' }} /> 
        <Stack.Screen name="contact" options={{ headerShown: true,title:'contact',headerTitle:'contact' }} /> 
         { <Stack.Screen name="(coffe )" options={{ headerShown: false }} /> } 
         {/* <Stack.Screen name="index" options={{title:"HOME",headerShown:false}}/>
        <Stack.Screen name="Login" options={{title:"login"}}/>  */}
        <Stack.Screen name="+not-found"  options={{headerShown:false}}/>
      </Stack>
      <StatusBar style="auto" />
      </>
  );
}
