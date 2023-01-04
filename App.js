import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@emotion/react';
import { StyleSheet, useColorScheme } from 'react-native';
import Root from './navigation/Root';
import { darkTheme, lightTheme } from './theme';

export default function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
