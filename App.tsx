import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, createTheme, lightColors } from '@rneui/themed';
import LoginScreen from './src/screens/Login/LoginScreen';
import MainMenuScreen from './src/screens/MainMenu/MainMenuScreen'; // Import the new MainMenuScreen component
import { AuthProvider } from './AuthProvider';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: 'https://dev1.classupclient.com/graphql',
  cache: new InMemoryCache(),
});

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
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
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Main Menu' component={MainMenuScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </AuthProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
