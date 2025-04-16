import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getMyAppointments } from '../utils/api';

const AppointmentListScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMyAppointments();
      setAppointments(data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchAppointments();
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Fetch appointments when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchAppointments();
    }, [])
  );

  const getAppointmentStatus = (appointment) => {
    const appointmentDate = new Date(appointment.slot.date);
    const today = new Date();
    
    // Set both dates to midnight for comparison
    appointmentDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return 'completed';
    } else if (appointmentDate.getTime() === today.getTime()) {
      return 'today';
    } else {
      return 'upcoming';
    }
  };

  const renderAppointmentItem = ({ item }) => {
    const status = getAppointmentStatus(item);
    
    return (
      <View style={[styles.appointmentCard, styles[`${status}Card`]]}>
        <View style={styles.appointmentHeader}>
          <Text style={styles.doctorName}>
            Dr. {item.doctor.first_name} {item.doctor.last_name}
          </Text>
          <View style={[styles.statusBadge, styles[`${status}Badge`]]}>
            <Text style={styles.statusText}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </View>
        </View>
        
        <View style={styles.appointmentDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="medical" size={16} color="#666" />
            <Text style={styles.detailText}>{item.doctor.specialty}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="calendar" size={16} color="#666" />
            <Text style={styles.detailText}>
              {new Date(item.slot.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="time" size={16} color="#666" />
            <Text style={styles.detailText}>
              {item.slot.start_time} - {item.slot.end_time}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Loading appointments...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchAppointments}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.appointmentsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>
              You don't have any appointments yet
            </Text>
            <Text style={styles.emptySubText}>
              Book an appointment with a doctor from the home screen
            </Text>
          </View>
        }
      />
    </View>
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
  appointmentsList: {
    padding: 16,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#9e9e9e',
  },
  todayCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#4caf50',
  },
  upcomingCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#4285F4',
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: '#f0f0f0',
  },
  todayBadge: {
    backgroundColor: '#e8f5e9',
  },
  upcomingBadge: {
    backgroundColor: '#e3f2fd',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  appointmentDetails: {
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  emptySubText: {
    marginTop: 8,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});

export default AppointmentListScreen;