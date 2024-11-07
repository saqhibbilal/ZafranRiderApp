import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const Mapscreen = ({ navigation }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const handleRoute = () => {
    setRouteCoordinates([
      { latitude: 37.7749, longitude: -122.4194 },
      { latitude: 34.0522, longitude: -118.2437 },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Map</Text>
      </View>

      <MapView
        style={styles.map}
        region={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        <Marker coordinate={{ latitude: 24.69388, longitude: 46.7795 }} title="Pickup Location" />
        <Marker coordinate={{ latitude: 24.7613735, longitude: 46.6471811 }} title="Drop Location" />
        <Polyline coordinates={routeCoordinates} strokeColor="green" strokeWidth={4} />
      </MapView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pickup Location"
          value={pickupLocation}
          onChangeText={setPickupLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Drop Location"
          value={dropLocation}
          onChangeText={setDropLocation}
        />
        <TouchableOpacity style={styles.routeButton} onPress={handleRoute}>
          <Text style={styles.routeButtonText}>Show Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  backButtonText: { fontSize: 16, color: '#FFA500' },
  title: { fontSize: 22, fontWeight: '600', color: '#fff', marginLeft: 20 },
  map: { flex: 1 },
  inputContainer: { padding: 20, backgroundColor: '#fff' },
  input: { padding: 10, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  routeButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  routeButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default Mapscreen;
