import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { View, TextInput, Button, Text } from 'react-native';
import { useMutation, gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

// import SplashScreen from './SplashScreen';
import SplashScreen from 'react-native-splash-screen'

if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

const client = new ApolloClient({
  uri: 'https://dev1.classupclient.com/graphql',
  cache: new InMemoryCache()
});

const LOGIN_MUTATION = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);

  const handleLogin = () => {
    login({ variables: { username, password } });
  };

  return (
    <View>
      <TextInput
        placeholder="Username or Email"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {data && data.tokenAuth.token && <Text>Login successful!</Text>}
    </View>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process (e.g., fetching initial data, checking authentication, etc.)
    setTimeout(() => {
      setLoading(false); // Set loading to false after a delay (e.g., 2 seconds)
    }, 2000); // Adjust delay as needed
  }, []);

  return (
    <ApolloProvider client={client}>
      {loading ? (
        // <SplashScreen />
        <LoginScreen />
      ) : (
        <View style={{ flex: 1 }}>
          <LoginScreen />
        </View>
      )}
    </ApolloProvider>
  );
};

export default App;
