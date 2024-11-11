import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  PanResponder,
} from "react-native";

const AccountSettings = ({ navigation }) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [buttonLabel, setButtonLabel] = useState("Account Management");
  const [confirmButtonLabel, setConfirmButtonLabel] = useState("Confirm");
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState(""); // Store "Other" reason

  const [modalTranslateY, setModalTranslateY] = useState(0); // Track the vertical position of the modal

  const modalPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // Allow the modal to be dragged
        setModalTranslateY(gestureState.dy);
      },
      onPanResponderRelease: (e, gestureState) => {
        // If the modal is dragged down far enough, close it
        if (gestureState.dy > 150) {
          setIsModalVisible(false); // Close the modal when dragged down enough
        }
        setModalTranslateY(0); // Reset the position
      },
    })
  ).current;

  const toggleNotifications = () => setIsNotificationsEnabled((prev) => !prev);

  const handlePasswordReset = () => {
    Alert.alert(
      "Password Reset",
      "Password reset functionality not implemented."
    );
  };

  const handleAccountManagement = () => {
    setIsModalVisible(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Change the "Confirm" button text based on the option selected
    if (option === "Temporary Disable") {
      setConfirmButtonLabel("Confirm Disable Account");
    } else if (option === "Delete Account") {
      setConfirmButtonLabel("Confirm Deletion");
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
  };

  const handleOtherReasonChange = (text) => {
    setOtherReason(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ScrollView to allow content scrolling */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Vehicle Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Vehicle Information</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Make: Tesla</Text>
            <Text style={styles.cardTitle}>Model: Model X</Text>
            <Text style={styles.cardTitle}>License Plate: ABC123</Text>
          </View>
        </View>

        {/* Account Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account Settings</Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>Enable Push Notifications</Text>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: "#ccc", true: "#4CAF50" }}
              thumbColor={isNotificationsEnabled ? "#fff" : "#f4f3f4"}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>

        {/* Account Management Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.button, styles.manageButton]}
            onPress={handleAccountManagement}
          >
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal for Account Management Options */}
      <Modal
        animationType="none" // We will control the animation manually
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleModalClose}
      >
        <View
          style={[
            styles.modalOverlay,
            { transform: [{ translateY: modalTranslateY }] },
          ]}
        >
          <View
            style={styles.modalContainer}
            {...modalPanResponder.panHandlers}
          >
            <Text style={styles.modalTitle}>Select Account Option</Text>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleOptionSelect("Temporary Disable")}
            >
              <Text style={styles.radioText}>Temporary Disable </Text>
              {selectedOption === "Temporary Disable" && (
                <Text style={styles.radioSelected}>✔</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleOptionSelect("Delete Account")}
            >
              <Text style={styles.radioText}>Delete Account</Text>
              {selectedOption === "Delete Account" && (
                <Text style={styles.radioSelected}>✔</Text>
              )}
            </TouchableOpacity>

            {/* Show predefined reasons for account deletion if "Delete Account" is selected */}
            {selectedOption === "Delete Account" && (
              <View style={styles.reasonsContainer}>
                <Text style={styles.reasonText}>
                  Please select a reason for deleting your account:
                </Text>
                {[
                  "Not satisfied with the service",
                  "Privacy concerns",
                  "Found a better alternative",
                  "Other",
                ].map((reason) => (
                  <TouchableOpacity
                    key={reason}
                    style={styles.radioButton}
                    onPress={() => handleReasonSelect(reason)}
                  >
                    <Text style={styles.radioText}>{reason}</Text>
                    {selectedReason === reason && (
                      <Text style={styles.radioSelected}>✔</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* If "Other" is selected, show a text area for custom reason */}
            {selectedReason === "Other" && (
              <View style={styles.otherReasonContainer}>
                <TextInput
                  style={styles.reasonInput}
                  placeholder="Please specify your reason"
                  value={otherReason}
                  onChangeText={handleOtherReasonChange}
                  multiline
                />
              </View>
            )}

            {/* Button to confirm the selected option */}
            <TouchableOpacity style={styles.button} onPress={handleModalClose}>
              <Text style={styles.buttonText}>{confirmButtonLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#f4f4f4",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  section: {
    marginVertical: 15,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  cardTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },

  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
  },

  toggleText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 16,
  },

  manageButton: {
    backgroundColor: "white",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "100%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  radioText: {
    fontSize: 16,
    color: "#333",
  },
  radioSelected: {
    marginLeft: 10,
    fontSize: 16,
    color: "#4CAF50",
  },
  reasonsContainer: {
    width: "100%",
    marginVertical: 10,
  },
  reasonText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  otherReasonContainer: {
    marginTop: 10,
    width: "100%",
  },
  reasonInput: {
    height: 100,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default AccountSettings;
