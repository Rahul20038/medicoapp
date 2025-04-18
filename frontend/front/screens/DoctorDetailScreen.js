// screens/DoctorDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const DoctorDetailScreen = ({ route, navigation }) => {
  // Get the doctor details passed from DoctorListScreen
  const { doctor } = route.params;

  const handleBookAppointment = () => {
    alert('Appointment booked successfully!');
    // Later, you can add functionality to handle booking
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: doctor.image }} style={styles.avatar} />
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.specialty}>Specialty: {doctor.description}</Text>
      <Text style={styles.rating}>Rating: {doctor.rating} / 5.0</Text>

      <Button title="Book Appointment" onPress={handleBookAppointment} />
    </View>
  );
};

export default DoctorDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  specialty: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: '#f1c40f',
    marginBottom: 20,
  },
});
