import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Text, Button, Card, ListItem, Icon } from 'react-native-elements';

const ProfileScreen = ({ setIsLoggedIn }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    profileImage: '',
  });

  useEffect(() => {
    const loadUserInfo = async () => {
      const name = await AsyncStorage.getItem('user_name');
      const email = await AsyncStorage.getItem('user_email');
      const profileImage = await AsyncStorage.getItem('user_profile_image');
      setUserDetails({ name, email, profileImage });
    };
    loadUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar
          rounded
          size="xlarge"
          source={{
            uri: userDetails.profileImage || 'https://www.w3schools.com/howto/img_avatar.png',
          }}
        />
        <Text style={styles.name}>{userDetails.name}</Text>
        <Text style={styles.email}>{userDetails.email}</Text>
      </View>

      <Card containerStyle={styles.card}>
        <Card.Title>Account Settings</Card.Title>
        <Card.Divider />

        <ListItem bottomDivider onPress={() => {}}>
          <Icon name="edit" type="feather" />
          <ListItem.Content>
            <ListItem.Title>Edit Profile</ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider onPress={() => {}}>
          <Icon name="lock" type="feather" />
          <ListItem.Content>
            <ListItem.Title>Change Password</ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider onPress={() => {}}>
          <Icon name="bell" type="feather" />
          <ListItem.Content>
            <ListItem.Title>Notification Preferences</ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider onPress={() => {}}>
          <Icon name="help-circle" type="feather" />
          <ListItem.Content>
            <ListItem.Title>Help & Support</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </Card>

      <Button
        title="Logout"
        onPress={handleLogout}
        buttonStyle={styles.logoutButton}
        icon={<Icon name="log-out" type="feather" color="white" />}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  card: {
    borderRadius: 10,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    margin: 20,
    borderRadius: 8,
  },
});

export default ProfileScreen;
