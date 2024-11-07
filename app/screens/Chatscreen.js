// ChatScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopBar from './TopBar';
import BottomNav from './Bottomnav';

const Chatscreen = ({ navigation }) => {
  const openSidebar = () => {
    // Code to open sidebar
  };

  const openNotifications = () => {
    // Code to open notifications
  };

  return (
    <View style={styles.container}>
      <TopBar onMenuPress={openSidebar} onNotificationPress={openNotifications} />
      <View style={styles.content}>
        <Text style={styles.text}>Chat Screen</Text>
      </View>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});

export default Chatscreen;
