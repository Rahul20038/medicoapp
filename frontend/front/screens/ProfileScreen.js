import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation, setIsLoggedIn }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    profileImage: '', // This will hold the user's profile image URL
  });

  // Load user info from AsyncStorage
  useEffect(() => {
    const loadUserInfo = async () => {
      const name = await AsyncStorage.getItem('user_name');
      const email = await AsyncStorage.getItem('user_email');
      const profileImage = await AsyncStorage.getItem('user_profile_image'); // Assuming you store the profile image URL
      setUserDetails({ name, email, profileImage });
    };
    loadUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Or selectively remove items
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          style={styles.profileImage}
          source={{
            uri: userDetails.profileImage || 'https://www.w3schools.com/howto/img_avatar.png', // Fallback to default image
          }}
        />
        <Text style={styles.name}>{userDetails.name}</Text>
        <Text style={styles.email}>{userDetails.email}</Text>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <Button title="Logout" onPress={handleLogout} color="#ff6347" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  settingsContainer: {
    marginBottom: 30,
  },
  settingItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
});

export default ProfileScreen;
