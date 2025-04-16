import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const DoctorCard = ({ doctor, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(doctor)}>
      <View style={styles.imageContainer}>
        {doctor.image ? (
          <Image source={{ uri: doctor.image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>
              {doctor.first_name && doctor.last_name
                ? `${doctor.first_name.charAt(0)}${doctor.last_name.charAt(0)}`
                : 'DR'}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Dr. {doctor.first_name} {doctor.last_name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>
        <Text style={styles.experience}>{doctor.experience} years experience</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {doctor.rating || '4.5'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    marginRight: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#757575',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  experience: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#F9A825',
  },
});

export default DoctorCard;