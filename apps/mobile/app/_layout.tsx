import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  RethinkSans_400Regular,
  RethinkSans_400Regular_Italic,
  RethinkSans_500Medium,
  RethinkSans_500Medium_Italic,
  RethinkSans_600SemiBold,
  RethinkSans_600SemiBold_Italic,
  RethinkSans_700Bold,
  RethinkSans_700Bold_Italic,
  RethinkSans_800ExtraBold,
  RethinkSans_800ExtraBold_Italic,
} from '@expo-google-fonts/rethink-sans';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import '../src/styles/global.css';

// Mantiene la splash screen visible hasta que las fuentes terminen de cargar
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    RethinkSans_400Regular,
    RethinkSans_400Regular_Italic,
    RethinkSans_500Medium,
    RethinkSans_500Medium_Italic,
    RethinkSans_600SemiBold,
    RethinkSans_600SemiBold_Italic,
    RethinkSans_700Bold,
    RethinkSans_700Bold_Italic,
    RethinkSans_800ExtraBold,
    RethinkSans_800ExtraBold_Italic,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0a0a0c' },
        }}
      />
    </>
  );
}
