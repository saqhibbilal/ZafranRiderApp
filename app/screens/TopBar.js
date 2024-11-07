// TopBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TopBar = ({ onMenuPress, onNotificationPress }) => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={onMenuPress}>
        <Icon name="menu-outline" size={28} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNotificationPress}>
        <Icon name="notifications-outline" size={28} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default TopBar;
