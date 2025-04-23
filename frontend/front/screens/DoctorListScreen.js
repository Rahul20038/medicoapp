// screens/DoctorListScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const doctorsData = {
  Cardiology: [
    {
      id: '1',
      name: 'Dr. Anjali Sharma',
      rating: 4.9,
      description: 'Cardiologist with 10+ years experience in heart health.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      phone: "+919876543210"
    },
    {
      id: '2',
      name: 'Dr. Rakesh Gupta',
      rating: 4.7,
      description: 'Expert in heart surgery and cardiovascular diseases.',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      phone: "+919876543210"
    },
  ],
  Neurology: [
    {
      id: '3',
      name: 'Dr. Priya Menon',
      rating: 4.8,
      description: 'Specialist in treating brain and spine disorders.',
      image: 'https://randomuser.me/api/portraits/women/55.jpg',
      phone: "+919876543210"
    },
  ],
  General: [
    {
      id: '4',
      name: 'Dr. Sameer Verma',
      rating: 4.5,
      description: 'General physician treating common illnesses and checkups.',
      image: 'https://randomuser.me/api/portraits/men/66.jpg',
      phone: "+919876543210"
    },
  ],
  Pediatrics: [
    {
      id: '5',
      name: 'Dr. Neha Bansal',
      rating: 4.6,
      description: 'Pediatrician caring for infants and children.',
      image: 'https://randomuser.me/api/portraits/women/33.jpg',
      phone: "+919876543210"
    },
  ],
  Orthopedics: [
    {
      id: '6',
      name: 'Dr. Rajeev Nair',
      rating: 4.8,
      description: 'Expert in bone and joint issues.',
      image: 'https://randomuser.me/api/portraits/men/21.jpg',
      phone: "+919876543210"
    },
  ],
  Dermatology: [
    {
      id: '7',
      name: 'Dr. Sneha Kapoor',
      rating: 4.9,
      description: 'Dermatologist specializing in skin care and treatment.',
      image: 'https://randomuser.me/api/portraits/women/61.jpg',
      phone: "+919876543210"
    },
  ],
};

const DoctorListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const doctors = doctorsData[category] || [];

  const handleDoctorPress = (doctor) => {
    // Navigate to DoctorDetailScreen with the selected doctor's details
    navigation.navigate('DoctorDetail', { doctor });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category} Doctors</Text>
      </View>

      {/* Doctor List */}
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDoctorPress(item)}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" color="#f1c40f" size={16} />
                  <Text style={styles.rating}>{item.rating} / 5.0</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default DoctorListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#2c3e50',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495E',
  },
  desc: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  rating: {
    fontSize: 14,
    marginLeft: 6,
    color: '#2d3436',
  },
});