// screens/AppointmentScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppointmentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      {/* Add your UI elements here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f6fc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AppointmentScreen;
