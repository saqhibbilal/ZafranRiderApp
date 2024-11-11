import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Easing } from "react-native"; // Import Easing
import { SpaceBetweenVerticallyIcon } from "@radix-ui/react-icons";

const Bottomnav = ({ state, descriptors, navigation }) => {
  if (!state || !state.routes || typeof state.index === "undefined") {
    return null; // Return null if state is not available
  }

  const currentRoute = state.routes[state.index]?.name; // Get current route from state
  const [activeTab, setActiveTab] = useState(state.index); // State to track active tab
  const backgroundPosition = new Animated.Value(activeTab * 100); // Animated value for background position
  const colorAnim = new Animated.Value(0); // Animated value for color change
  const textPosition = new Animated.Value(30); // Animated value for text position (vertical slide from below)

  // Create an array of Animated values for each tab's scale animation
  const animationValues = ["Home", "Wallet", "Chat", "Profile"].reduce(
    (acc, route, index) => {
      acc[index] = new Animated.Value(1); // Initialize scale animation to 1 for all tabs
      return acc;
    },
    {}
  );

  // Icon mapping based on route name
  const iconMapping = {
    Home: "home",
    Wallet: "wallet",
    Chat: "chatbubbles",
    Profile: "person",
  };

  useEffect(() => {
    // Background slide animation
    Animated.timing(backgroundPosition, {
      toValue: activeTab * 100, // Update background position based on active tab index
      duration: 1000, // Duration of the background sliding effect
      easing: Easing.ease, // Smoother easing function
      useNativeDriver: false, // Ensure background moves with JS thread
    }).start();

    // Color change animation with delay
    Animated.timing(colorAnim, {
      toValue: activeTab, // Animate to the active tab index
      duration: 500, // Duration for the color change
      delay: 300, // Delay before the color change starts
      easing: Easing.ease, // Smoother easing for color change
      useNativeDriver: false, // Keep color change with JS thread
    }).start();

    // Text animation: Slide in from bottom for active tab
    Animated.timing(textPosition, {
      toValue: activeTab === 0 ? 0 : 0, // Move up for active tab, stay below for inactive
      duration: 100, // Duration for the text animation
      easing: Easing.ease, // Smooth easing for the upward motion
      useNativeDriver: false, // Keep text position animation on JS thread
    }).start();
  }, [activeTab]);

  const handlePress = (routeName, index) => {
    setActiveTab(index); // Set the active tab index
    navigation.navigate(routeName); // Navigate to the respective screen

    // Bounce animation only for the clicked tab
    Animated.spring(animationValues[index], {
      toValue: 5, // Increase size on press
      friction: 2, // Smoother bounce
      tension: 100,
      useNativeDriver: true,
    }).start();

    // Reset scale of all other tabs
    Object.keys(animationValues).forEach((key) => {
      if (parseInt(key) !== index) {
        Animated.spring(animationValues[key], {
          toValue: 1, // Reset scale to normal for other tabs
          friction: 4,
          tension: 50,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  // Interpolate the color change based on the animated value
  const interpolatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["black", "black"], // Make sure both are black for active text
  });

  return (
    <View style={styles.bottomNav}>
      <View style={styles.bottomNavWrapper}>
        {/* Active background bar */}
        <Animated.View
          style={[
            styles.activeBackground,
            { transform: [{ translateX: backgroundPosition }] },
          ]}
        />
        {["Home", "Wallet", "Chat", "Profile"].map((routeName, index) => {
          const isActive = currentRoute === routeName; // Check if the current tab is active

          return (
            <TouchableOpacity
              key={routeName}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => handlePress(routeName, index)} // Handle tab press
            >
              <Animated.View
                style={[
                  styles.iconContainer,
                  { transform: [{ scale: animationValues[index] }] }, // Apply scale animation to each tab
                ]}
              >
                <Icon
                  name={
                    isActive
                      ? iconMapping[routeName]
                      : `${iconMapping[routeName]}-outline`
                  }
                  size={24}
                  color={isActive ? "black" : "black"} // Active and inactive icon color both black
                />
                {isActive && (
                  <Animated.Text
                    style={[
                      styles.navText,
                      isActive && styles.activeNavText,
                      {
                        color: "black", // Active text color
                        transform: [{ translateY: textPosition }], // Apply vertical sliding animation
                      },
                    ]}
                  >
                    {routeName}
                  </Animated.Text>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    padding: 15,
    alignItems: "center",
  },
  bottomNavWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 50,
    alignItems: "center",
    width: "100%",
    borderTopLeftRadius: 20, // Rounding the top left corner
    borderTopRightRadius: 20, // Rounding the top right corner
    backgroundColor: "#fff", // Ensure the background color is white to show the rounded effect
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeNavItem: {
    borderRadius: 50,
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    color: "black", // Default text color
  },
  activeNavText: {
    color: "black", // Active text color
  },
});

export default Bottomnav;
