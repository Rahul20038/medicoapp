import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile, logout } from '../utils/api';

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUserProfile();
      setProfile(data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              // Force app reload to trigger navigation change
              navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              });
            } catch (err) {
              console.error('Logout error:', err);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProfile}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          {profile?.image ? (
            <Image source={{ uri: profile.image }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImagePlaceholderText}>
                {profile?.first_name?.charAt(0) || ''}
                {profile?.last_name?.charAt(0) || ''}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.profileName}>
          {profile?.first_name} {profile?.last_name}
        </Text>
        <Text style={styles.profileUsername}>@{profile?.username}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.infoItem}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="mail-outline" size={20} color="#4285F4" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{profile?.email || 'Not provided'}</Text>
          </View>
        </View>
        
        <View style={styles.infoItem}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="call-outline" size={20} color="#4285F4" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{profile?.phone || 'Not provided'}</Text>
          </View>
        </View>
        
        <View style={styles.infoItem}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="location-outline" size={20} color="#4285F4" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{profile?.address || 'Not provided'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#d32f2f" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholderText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileUsername: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  actionsSection: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logoutButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#d32f2f',
  },
});

export default ProfileScreen;