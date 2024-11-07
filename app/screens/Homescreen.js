import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Image, ScrollView } from 'react-native';
import TopBar from './TopBar';
import BottomNav from './Bottomnav';

const Homescreen = ({ navigation }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [activeTab, setActiveTab] = useState("New Orders");
  const [newOrders, setNewOrders] = useState([
    { id: 'OD101', pickupTime: '10:00 AM', address: 'Olaya St...', status: 'Not Ready' },
    { id: 'OD102', pickupTime: '11:00 AM', address: 'Sulaimaniyah St...', status: 'Ready' },
    { id: 'OD103', pickupTime: '12:00 PM', address: 'Al Kharj Road...', status: 'Not Ready' },
    { id: 'OD104', pickupTime: '1:00 PM', address: 'Malaz Road...', status: 'Ready' },
    { id: 'OD105', pickupTime: '2:00 PM', address: 'Kingdom Centre...', status: 'Not Ready' },
  ]);
  const [myOrders, setMyOrders] = useState([]);

  const handleToggle = () => setIsOnline(!isOnline);

  const acceptOrder = (order) => {
    setNewOrders(newOrders.filter(o => o.id !== order.id));
    setMyOrders([...myOrders, order]);
  };

  return (
    <View style={styles.container}>
      <TopBar onMenuPress={() => {}} onNotificationPress={() => {}} />

       
      <View style={styles.driverInfoBox}>
        <View style={styles.leftSection}>
          <Image
            source={require('../assets/userpicture.png')}
            style={styles.profilePicture}
          />
          <View style={styles.textContainer}>
            <Text style={styles.username}>ZafranRider</Text>
            <Text style={styles.driverID}>Driver ID: ZFD101</Text>
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <Switch value={isOnline} onValueChange={handleToggle} />
          <Text style={styles.statusText}>{isOnline ? "Online" : "Offline"}</Text>
        </View>
      </View>

       
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setActiveTab("New Orders")}>
          <Text style={[styles.tabText, activeTab === "New Orders" && styles.activeTab]}>
            New Orders ({newOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("My Orders")}>
          <Text style={[styles.tabText, activeTab === "My Orders" && styles.activeTab]}>
            My Orders ({myOrders.length})
          </Text>
        </TouchableOpacity>
      </View>

       
      <ScrollView style={styles.orderListContainer}>
        {(activeTab === "New Orders" ? newOrders : myOrders).map((order) => (
          <View key={order.id} style={styles.orderContainer}>
            <Text style={styles.orderID}>Order ID: {order.id}</Text>
            <Text style={styles.deliveryAddress}>Address: {order.address}</Text>
            <Text style={styles.pickupTime}>Pickup Time: {order.pickupTime}</Text>

             
            <View style={styles.orderActions}>
              <Text
                style={[
                  styles.orderStatus,
                  { color: order.status === 'Ready' ? 'green' : 'darkorange' },
                ]}
              >
                {order.status}
              </Text>
              {activeTab === "New Orders" ? (
                <TouchableOpacity style={styles.acceptOrderButton} onPress={() => acceptOrder(order)}>
                  <Text style={styles.acceptOrderText}>Accept</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.inProgressButton}>
                  <Text style={styles.inProgressText}>In Progress</Text>
                </TouchableOpacity>
              )}
            </View>

             
            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },

  driverInfoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f08000',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  leftSection: { flexDirection: 'row', alignItems: 'center' },
  profilePicture: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  textContainer: { justifyContent: 'center' },
  username: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  driverID: { fontSize: 14, fontWeight: 'black', color: '#fff' },
  toggleContainer: { alignItems: 'center' },
  statusText: { marginTop: 1, fontSize: 12, color: '#fff' },

  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tabText: { fontSize: 16 },
  activeTab: { fontWeight: 'bold', color: '#FFA500' },

  orderListContainer: { flex: 1, marginHorizontal: 20 },
  orderContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
  },
  orderID: { fontSize: 16, fontWeight: '500', marginBottom: 5 },
  deliveryAddress: { fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 5 },
  pickupTime: { fontSize: 14, color: 'green', marginBottom: 10 },

  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  orderStatus: { fontSize: 14, fontWeight: 'bold', alignSelf: 'flex-start' },
  acceptOrderButton: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  acceptOrderText: { color: '#fff', fontSize: 11 },
  inProgressButton: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inProgressText: { color: '#fff', fontSize: 12 },

  viewDetailsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  viewDetailsText: { color: '#fff', fontSize: 12 },
});

export default Homescreen;
