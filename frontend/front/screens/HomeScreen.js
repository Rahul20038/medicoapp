import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ setIsLoggedIn }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Medico</Text>
      <Button title="Logout" onPress={() =>setIsLoggedIn(false)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
