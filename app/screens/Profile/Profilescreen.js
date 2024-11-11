import React, { useState, useRef } from "react";
import {
  View,
  Modal,
  Animated,
  PanResponder,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView, // For showing delivery history items
} from "react-native";
import TopBar from "../TopBar";
import BottomNav from "../Bottomnav";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = ({ navigation }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal for editing profile
  const [historyModalVisible, setHistoryModalVisible] = useState(false); // Modal for delivery history
  const [name, setName] = useState("Abdullah");
  const [phone, setPhone] = useState("+966 51 234 569");
  const [email, setEmail] = useState("abdullah@gmail.com");
  const [deliveries, setDeliveries] = useState([
    { id: 1, date: "2024-11-01", details: "Delivered to Customer A" },
    { id: 2, date: "2024-11-02", details: "Delivered to Customer B" },
    { id: 3, date: "2024-11-02", details: "Delivered to Customer C" },
    { id: 4, date: "2024-11-02", details: "Delivered to Customer D" },
    { id: 5, date: "2024-11-02", details: "Delivered to Customer E" },
  ]);
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (_, gestureState) => {
      return true; // Allow the drag to start
    },
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return gestureState.dy > 5; // Only trigger on vertical movement
    },
    onPanResponderMove: (_, gestureState) => {
      translateY.setValue(gestureState.dy); // Move the modal with drag
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        closeHistoryModal(); // Close the modal if dragged down enough
      } else {
        // Otherwise, reset the modal position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const toggleAvailability = () => {
    setIsOnline(!isOnline);
  };

  const openEditModal = () => {
    setModalVisible(true);
    translateY.setValue(0); // Reset position when modal opens
  };

  const closeEditModal = () => {
    setModalVisible(false);
  };

  const openHistoryModal = () => {
    setHistoryModalVisible(true);
    translateY.setValue(0); // Reset position when modal opens
  };

  const closeHistoryModal = () => {
    setHistoryModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TopBar onMenuPress={() => {}} onNotificationPress={() => {}} />

      <View style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-309.jpg?w=360",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{name}</Text>
              <TouchableOpacity onPress={openEditModal}>
                <Icon
                  name="edit"
                  size={20}
                  color="black"
                  style={styles.editButton}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.contactInfo}>
              {phone} | {email}
            </Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Icon name="directions-bike" size={30} color="black" />
            <Text style={styles.statValue}>120</Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          <View style={styles.statBox}>
            <Icon name="star" size={30} color="black" />
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statBox}>
            <Icon name="money" size={30} color="black" />
            <Text style={styles.statValue}>450</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>
        </View>

        {/* Navigation Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={openHistoryModal} // Open history modal
        >
          <Text style={styles.buttonText}>View Delivery History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AccountSettings")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Account Settings</Text>
            <Icon name="arrow-forward-ios" size={20} color="#333" />
          </View>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.logOutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Modal for Editing Profile */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: translateY }] },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragBar} />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.saveButton} onPress={closeEditModal}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      {/* Modal for Delivery History */}
      <Modal visible={historyModalVisible} transparent animationType="slide">
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: translateY }] },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragBar} />
          <Text style={styles.historyTitle}>Delivery History</Text>
          <ScrollView style={styles.historyList}>
            {deliveries.map((delivery) => (
              <View key={delivery.id} style={styles.deliveryItem}>
                <Text style={styles.deliveryDate}>{delivery.date}</Text>
                <Text style={styles.deliveryDetails}>{delivery.details}</Text>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: "#f7f7f7",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  contactInfo: {
    fontSize: 16,
    color: "#777",
  },
  editButton: {
    margin: 5,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 20,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#777",
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  dragBar: {
    width: 40,
    height: 5,
    backgroundColor: "#ddd",
    borderRadius: 2.5,
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },

  historyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  historyList: {
    maxHeight: 300,
  },
  deliveryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  deliveryDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  deliveryDetails: {
    fontSize: 14,
    color: "#777",
  },
  button: {
    flexDirection: "row", // Ensure items are laid out in a row
    alignItems: "center", // Vertically center the items
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  buttonContent: {
    flexDirection: "row", // Row for text and icon
    justifyContent: "space-between", // Space out text and icon
    width: "100%", // Occupy full width
    alignItems: "center", // Vertically center text and icon
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1, // Ensures text takes up available space
  },
  logOutButton: {
    backgroundColor: "black", // Black background
    width: "100%",
    paddingVertical: 12, // Vertical padding for the button
    paddingHorizontal: 20, // Horizontal padding for the button
    borderRadius: 10, // Rounded corners
    marginVertical: 15, // Vertical margin for spacing
    alignItems: "center", // Center the text inside the button
    justifyContent: "center", // Vertically center the text
  },
  logOutButtonText: {
    color: "white", // White text color
    fontSize: 16, // Text size
    fontWeight: "bold", // Bold text
  },
});

export default ProfileScreen;
