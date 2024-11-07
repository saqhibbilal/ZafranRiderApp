// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


 

import Login from './app/screens/Login';
import Homescreen from './app/screens/Homescreen';
import Walletscreen from './app/screens/Walletscreen';
import Chatscreen from './app/screens/Chatscreen';
import Profilescreen from './app/screens/Profilescreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Wallet" component={Walletscreen} />
        <Stack.Screen name="Chat" component={Chatscreen} />
        <Stack.Screen name="Profile" component={Profilescreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
