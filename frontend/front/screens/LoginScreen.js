import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // You can use icons from FontAwesome or any other icon library
import API from '../config/api';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await API.post('/token/', { username, password });
      const token = res.data.access;
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      setIsLoggedIn(true); // This will trigger the navigator to show Home
    } catch (err) {
      console.log('Login error:', err);
      Alert.alert('Login failed', 'Check your credentials');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Medico</Text>
      <Text style={styles.subtitle}>Please login to continue</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#00796b" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#00796b" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Don't have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#00796b', textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#616161', textAlign: 'center', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, borderBottomWidth: 2, borderBottomColor: '#00796b' },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, padding: 10 },
  button: { backgroundColor: '#00796b', paddingVertical: 12, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  buttonText: { color: 'white', fontSize: 18 },
  link: { color: '#00796b', marginTop: 10, textAlign: 'center' },
});
