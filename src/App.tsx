import { Assets as NavigationAssets } from '@react-navigation/elements';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useColorScheme } from 'react-native';
import { Navigation } from './navigation';
import { ThemeProvider } from '../src/context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';




SplashScreen.preventAutoHideAsync();

const prefix = createURL('/');

export function App() {
    console.log('Store:', store);
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
 <Provider store={store}>

  <ThemeProvider>
    <Navigation
      theme={theme}
      linking={{ enabled: 'auto', prefixes: [prefix] }}
      onReady={() => SplashScreen.hideAsync()}
    />
  </ThemeProvider>
</Provider>
  );
}
