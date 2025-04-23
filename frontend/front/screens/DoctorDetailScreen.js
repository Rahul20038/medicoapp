import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const DoctorDetailScreen = ({ route, navigation }) => {
  const { doctor } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');

  const slots = [
    '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const onChange = (event, date) => {
    setShowPicker(false);
    if (date) setSelectedDate(date);
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot!');
      return;
    }

    const formattedDate = selectedDate.toLocaleDateString();
    const newAppointment = {
      doctorName: doctor.name,
      doctorSpecialty: doctor.description,
      doctorImage: doctor.image,
      appointmentDate: formattedDate,
      appointmentTime: selectedSlot,
    };

    try {
      const stored = await AsyncStorage.getItem('appointments');
      const appointments = stored ? JSON.parse(stored) : [];

      const updatedAppointments = [...appointments, newAppointment];
      await AsyncStorage.setItem('appointments', JSON.stringify(updatedAppointments));

      console.log('Saved appointment:', newAppointment);
      navigation.navigate('Appointment');
    } catch (error) {
      console.error('Failed to save appointment:', error);
    }
  };

  const handleCallDoctor = () => {
    if (doctor.phone) {
      Linking.openURL(`tel:${doctor.phone}`);
    } else {
      alert('Phone number not available');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: doctor.image }} style={styles.avatar} />
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.specialty}>Specialty: {doctor.description}</Text>
      <Text style={styles.rating}>Rating: {doctor.rating} / 5.0</Text>

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
        <Text>Select Date: {selectedDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <Text style={styles.slotLabel}>Select a time slot:</Text>
      <View style={styles.slotContainer}>
        {slots.map((slot) => (
          <TouchableOpacity
            key={slot}
            style={[styles.slot, selectedSlot === slot && styles.selectedSlot]}
            onPress={() => setSelectedSlot(slot)}
          >
            <Text style={styles.slotText}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Book Appointment" onPress={handleBookAppointment} />

      {/* 📞 Call Doctor Button */}
      <TouchableOpacity onPress={handleCallDoctor} style={styles.callButton}>
        <Text style={styles.callText}>📞 Call Doctor</Text>
      </TouchableOpacity>
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
  dateButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  slotLabel: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  slot: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    margin: 5,
  },
  selectedSlot: {
    backgroundColor: '#4CAF50',
  },
  slotText: {
    color: '#000',
  },
  callButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#3498db',
    borderRadius: 10,
  },
  callText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
