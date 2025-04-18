// screens/DoctorDetailScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DoctorDetailScreen = ({ route, navigation }) => {
  const { doctor } = route.params;
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleBookAppointment = async () => {
    if (appointmentTime) {
      const newAppointment = {
        doctorName: doctor.name,
        doctorSpecialty: doctor.description,
        doctorImage: doctor.image,
        appointmentTime: appointmentTime,
      };
  
      try {
        const stored = await AsyncStorage.getItem('appointments');
        const appointments = stored ? JSON.parse(stored) : [];
  
        const updatedAppointments = [...appointments, newAppointment];
        await AsyncStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  
        console.log('Saved appointment:', newAppointment);
        navigation.navigate('Appointment'); // Navigate without params now
      } catch (error) {
        console.error('Failed to save appointment:', error);
      }
    } else {
      alert('Please select an appointment time!');
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={{ uri: doctor.image }} style={styles.avatar} />
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.specialty}>Specialty: {doctor.description}</Text>
      <Text style={styles.rating}>Rating: {doctor.rating} / 5.0</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter appointment time"
        value={appointmentTime}
        onChangeText={setAppointmentTime}
      />

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
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
