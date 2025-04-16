import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // FontAwesome for icons
import API from '../config/api';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const res = await API.post('/register/', { username, email, password });
      Alert.alert('Success', 'You have registered successfully');
      navigation.navigate('Login');
    } catch (err) {
      console.log('Registration error:', err);
      Alert.alert('Registration failed', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register for Medico</Text>
      <Text style={styles.subtitle}>Create a new account</Text>

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
        <FontAwesome name="envelope" size={20} color="#00796b" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
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

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#00796b" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
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
