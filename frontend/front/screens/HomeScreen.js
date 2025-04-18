import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const departments = [
    { name: 'General', icon: 'medical-bag', color: '#007AFF' },
    { name: 'Cardiology', icon: 'heart', color: '#FF2D55' },
    { name: 'Neurology', icon: 'brain', color: '#8E44AD' },
    { name: 'Pediatrics', icon: 'baby-face-outline', color: '#F39C12' },
    { name: 'Orthopedics', icon: 'bone', color: '#27AE60' },
    { name: 'Dermatology', icon: 'face-man-shimmer', color: '#E67E22' },
  ];

  const handleDepartmentPress = (name) => {
    navigation.navigate('DoctorList', { category: name });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.welcome}>👋 Welcome</Text>
        <Text style={styles.subtitle}>Find your doctor & book appointments</Text>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search doctor, specialty..."
          style={styles.searchInput}
        />
      </View>

      {/* Departments */}
      <Text style={styles.sectionTitle}>Departments</Text>
      <View style={styles.grid}>
        {departments.map((dept, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleDepartmentPress(dept.name)}
          >
            <MaterialCommunityIcons name={dept.icon} size={30} color={dept.color} />
            <Text style={styles.cardText}>{dept.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Health Tips */}
      <Text style={styles.sectionTitle}>Health Tips</Text>
      <View style={styles.tipCard}>
        <Image
          source={{ uri: 'https://cdn.pixabay.com/photo/2017/09/04/18/40/doctor-2716749_960_720.jpg' }}
          style={styles.tipImage}
        />
        <Text style={styles.tipText}>Stay hydrated & eat fresh fruits every day 🍎</Text>
      </View>
      {/* Bottom Navigation Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Appointments')}
        >
          <Text style={styles.buttonText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    paddingHorizontal: 16,
  },
  banner: {
    marginTop: 24,
    marginBottom: 16,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495E',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 4,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    paddingVertical: 18,
    marginBottom: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    elevation: 2,
  },
  tipImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    color: '#2d3436',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
