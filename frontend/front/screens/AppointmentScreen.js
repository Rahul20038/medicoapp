import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    try {
      const stored = await AsyncStorage.getItem('appointments');
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading appointments:', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [])
  );

  const handleDelete = async (index) => {
    const updated = [...appointments];
    updated.splice(index, 1);
    setAppointments(updated);
    await AsyncStorage.setItem('appointments', JSON.stringify(updated));
  };

  const confirmDelete = (index) => {
    Alert.alert('Delete Appointment', 'Are you sure you want to delete this appointment?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => handleDelete(index), style: 'destructive' },
    ]);
  };

  const clearAllAppointments = async () => {
    Alert.alert('Clear All', 'Do you want to remove all appointments?', [
      { text: 'Cancel' },
      {
        text: 'Clear All',
        onPress: async () => {
          await AsyncStorage.removeItem('appointments');
          setAppointments([]);
        },
        style: 'destructive',
      },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onLongPress={() => confirmDelete(index)}>
      <View style={styles.card}>
        <Image source={{ uri: item.doctorImage }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.doctorName}</Text>
          <Text style={styles.specialty}>{item.doctorSpecialty}</Text>
          <Text style={styles.time}>🕒 {item.appointmentTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Appointments</Text>

      {appointments.length === 0 ? (
        <Text>No appointments booked yet.</Text>
      ) : (
        <>
          <FlatList
            data={appointments}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
          <TouchableOpacity onPress={clearAllAppointments} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear All Appointments</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fdfdfd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 14,
    color: '#7f8c8d',
    marginVertical: 4,
  },
  time: {
    fontSize: 14,
    color: '#27ae60',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  clearText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
