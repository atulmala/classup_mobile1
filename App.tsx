import React from 'react';
import { Platform } from 'react-native';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, createTheme,lightColors } from '@rneui/themed';
import { View } from 'react-native';
import LoginScreen from './src/screens/Login/LoginScreen';
import { AuthProvider } from './AuthProvider';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://dev1.classupclient.com/graphql',
  cache: new InMemoryCache()
});

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    })},
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <AuthProvider>
            <View style={{ flex: 1 }}>
              <LoginScreen />
            </View>
          </AuthProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
