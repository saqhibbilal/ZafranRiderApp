import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
  Modal,
} from "react-native";
import TopBar from "./TopBar";
import BottomNav from "./Bottomnav";

const Walletscreen = ({ navigation }) => {
  const openSidebar = () => {};
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const availableBalance = 120.5;
  const openNotifications = () => {};

  const handleWithdrawal = () => {
    // Open modal for withdrawal
    setModalVisible(true);
  };

  const handleSubmitWithdrawal = () => {
    // Logic for handling withdrawal submission
    console.log("Withdrawal submitted:", withdrawAmount);
  };
  const formatAmount = (amount) => {
    const cleanedAmount = amount.replace(/[^\d.]/g, "");
    if (cleanedAmount) {
      const parts = cleanedAmount.split(".");
      if (parts[1] && parts[1].length > 2) {
        // Limit to 2 decimal places
        return `${parts[0]}.${parts[1].substring(0, 2)}`;
      }
      return cleanedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  };
  const handleChange = (text) => {
    const formattedAmount = formatAmount(text);
    setWithdrawAmount(formattedAmount);

    const numericAmount = parseFloat(formattedAmount.replace(/,/g, ""));
    if (numericAmount > availableBalance) {
      setInsufficientFunds(true);
    } else {
      setInsufficientFunds(false);
    }
  };
  const transactions = [
    { date: "12/11/24", amount: 30.0, type: "inward" },
    { date: "11/11/24", amount: -40.0, type: "outward" },
    { date: "10/11/24", amount: 20.0, type: "inward" },
    { date: "09/11/24", amount: -25.0, type: "outward" },
    { date: "08/11/24", amount: 35.0, type: "inward" },
    { date: "07/11/24", amount: -50.0, type: "outward" },
  ];

  const transactionsToShow = showAllTransactions
    ? transactions
    : transactions.slice(0, 3);
  const isButtonDisabled = !withdrawAmount || insufficientFunds;

  return (
    <ScrollView style={styles.container}>
      <TopBar
        onMenuPress={openSidebar}
        onNotificationPress={openNotifications}
      />

      <View style={styles.content}>
        <View style={styles.walletAmountWrapper}>
          <Text style={styles.walletHeading}>My Earnings</Text>
          <View style={styles.balanceSection}>
            <Text style={styles.balanceText}>
              {availableBalance.toFixed(2)} SAR
            </Text>
          </View>
          <TouchableOpacity
            style={styles.withdrawButton}
            onPress={handleWithdrawal}
          >
            <Text style={styles.withdrawButtonText}>Withdraw Amount</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Pending Payments</Text>
          <Text style={styles.paymentText}>Pending Delivery: 50.00 SAR</Text>
        </View>

        <View style={styles.transactionHistorySection}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          <ScrollView style={styles.historyList}>
            {transactionsToShow.map((transaction, index) => (
              <View key={index} style={styles.historyItem}>
                <View style={styles.transactionDetails}>
                  <Text style={styles.historyText}>
                    <Text style={styles.boldText}>
                      {transaction.type === "inward"
                        ? "Inward Payment"
                        : "Outward Payment"}
                    </Text>
                  </Text>
                  <Text style={styles.dateText}>{transaction.date}</Text>
                </View>
                <Text
                  style={[
                    styles.amountText,
                    transaction.amount > 0
                      ? styles.inwardAmount
                      : styles.outwardAmount,
                  ]}
                >
                  {transaction.amount > 0
                    ? `+${transaction.amount.toFixed(2)}`
                    : `-${Math.abs(transaction.amount).toFixed(2)}`}
                </Text>
              </View>
            ))}
          </ScrollView>

          {transactions.length > 3 && (
            <TouchableOpacity
              style={styles.viewToggleButton}
              onPress={() => setShowAllTransactions(!showAllTransactions)}
            >
              <Text style={styles.viewToggleButtonText}>
                {showAllTransactions
                  ? "View Less Transactions"
                  : "View All Transactions"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <BottomNav navigation={navigation} />

      {/* Modal for Withdrawal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* Show Input for Amount */}
            <Text style={styles.modalTitle}>Enter Withdrawal Amount</Text>
            <TextInput
              style={[styles.input, isFocused && styles.inputFocused]}
              placeholder="Enter Amount"
              placeholderTextColor="#D3D3D3"
              keyboardType="numeric"
              value={withdrawAmount}
              onChangeText={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              maxLength={15}
            />
            {/* Insufficient Funds Message */}
            {insufficientFunds && (
              <Text style={styles.errorText}>Insufficient Funds</Text>
            )}
            <View style={styles.bandDetails}>
              <View style={styles.borderBox}>
                {/* Left side - Name and Account Number */}
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>John Doe</Text>
                  <Text style={styles.accountNumber}>XXXXXXXXXX123</Text>
                </View>

                {/* Right side - Radio Button */}
                <View style={styles.radioContainer}>
                  <View style={styles.radioOuterCircle}>
                    <View style={styles.radioInnerCircle}></View>
                  </View>
                </View>
              </View>
            </View>

            {/* Send Button */}
            <View style={styles.ButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  isButtonDisabled && styles.sendButtonDisabled,
                ]}
                onPress={handleSubmitWithdrawal}
                disabled={isButtonDisabled} // Disable button when input is empty or insufficient funds
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  content: { flex: 1, paddingHorizontal: 20, justifyContent: "flex-start" },

  // My Wallet Heading
  walletHeading: {
    fontSize: 16,
    color: "white",
    marginBottom: 22,
    alignSelf: "flex-start",
  },

  walletAmountWrapper: {
    backgroundColor: "black",
    elevation: 1.2,
    justifyContent: "center",
    borderRadius: 20,
    marginVertical: 25,
    padding: 25,
  },

  balanceSection: {
    alignItems: "flex-start",
  },

  balanceText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },

  // Remaining Details
  detailsSection: {
    alignSelf: "flex-start",
    backgroundColor: "#F4F6FC",
    borderRadius: 20,
    padding: 25,
    width: "100%",
  },
  sectionTitle: { fontSize: 18, fontWeight: "500", marginBottom: 10 },

  paymentText: {
    fontSize: 16,
    color: "red",
  },
  transactionHistorySection: {
    marginVertical: 20,
    padding: 25,
    backgroundColor: "#F4F6FC",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  historyList: {
    maxHeight: 150,
    marginBottom: 15,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  transactionDetails: {
    flexDirection: "column",
  },
  historyText: {
    fontSize: 16,
    color: "#555",
  },
  boldText: {
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#888",
  },

  amountText: {
    fontSize: 18,
  },

  inwardAmount: {
    color: "green",
  },

  outwardAmount: {
    color: "red",
  },
  viewToggleButton: {
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 10,
  },

  viewToggleButtonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },

  withdrawButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    marginTop: 15,
  },

  withdrawButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    height: "50%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    padding: 25,
  },

  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 16, marginVertical: 5 },
  input: {
    height: 60,
    fontSize: 36,
    fontWeight: "bold",
    color: "black",
    borderBottomWidth: 2,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 60,
  },

  // Focused state styles
  inputFocused: {
    borderColor: "black",
  },

  ButtonsContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
    height: "10px",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sendButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    marginVertical: 20,
    borderRadius: 25,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  sendButtonDisabled: {
    backgroundColor: "#B0B0B0",
  },

  sendButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },

  closeButton: {
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 12,
    marginVertical: 20,
    borderRadius: 25,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  closeButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  bandDetails: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
  },

  borderBox: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#000",
    padding: 10,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },

  textContainer: {
    flex: 1,
  },

  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },

  accountNumber: {
    fontSize: 14,
    color: "gray",
  },

  radioContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  radioOuterCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  radioInnerCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "black",
  },
});

export default Walletscreen;
