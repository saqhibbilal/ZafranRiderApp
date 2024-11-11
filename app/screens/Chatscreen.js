import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TopBar from "./TopBar";

const Chatscreen = ({ navigation }) => {
  const openSidebar = () => {
    // Code to open sidebar
  };

  const openNotifications = () => {
    // Code to open notifications
  };

  return (
    <View style={styles.container}>
      <TopBar
        onMenuPress={openSidebar}
        onNotificationPress={openNotifications}
      />
      <View style={styles.content}>
        <Text style={styles.text}>Chat Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20 },
});

export default Chatscreen;
