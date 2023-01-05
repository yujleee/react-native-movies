import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@emotion/react';
import { StyleSheet, useColorScheme } from 'react-native';
import Root from './navigation/Root';
import { darkTheme, lightTheme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';

// reqact-query 이용을 위한 정의
const queryClient = new QueryClient();

export default function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
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
