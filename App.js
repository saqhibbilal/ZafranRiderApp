import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./app/screens/Homescreen";
import WalletScreen from "./app/screens/Walletscreen";
import ChatScreen from "./app/screens/Chatscreen";
import ProfileScreen from "./app/screens/Profile/Profilescreen";
import AccountSettings from "./app/screens/Profile/AccountSettings"; // Import the AccountSettings screen
import Bottomnav from "./app/screens/Bottomnav"; // Import your Bottomnav component

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Account Settings screen
const AccountStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
    {/* You can add more screens for the account settings flow here */}
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      {/* Tab Navigator */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { display: "none" }, // Hide the default bottom tab navigator styling
        }}
        tabBar={(props) => <Bottomnav {...props} />} // Pass navigation props to Bottomnav
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        {/* Nested Account Stack Navigator under a Tab.Screen */}
        <Tab.Screen name="AccountSettings" component={AccountSettings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
