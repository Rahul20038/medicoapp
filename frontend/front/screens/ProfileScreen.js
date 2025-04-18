// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ProfileScreen = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    // Handle logout logic here
    setIsLoggedIn(false); // Redirect to login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {/* Add your profile details UI here */}
      <Button title="Logout" onPress={handleLogout} />
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

export default ProfileScreen;
