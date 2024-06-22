import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
// FIREBASE
import { getAuth } from "firebase/auth";
import { db } from '../config/config';
import { ref, onValue, update } from 'firebase/database';

export default function PerfilScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [nick, setNick] = useState('');
  const [edad, setEdad] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userRef = ref(db, 'users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setCorreo(data.email);
          setNick(data.nickname);
          setEdad(data.edad);
        }
      });
    }
  }, []);

  const handleUpdate = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userRef = ref(db, 'users/' + user.uid);
      update(userRef, { edad })
        .then(() => {
          Alert.alert('Éxito', 'Edad actualizada con éxito');
          setIsEditing(false);
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Perfil de Usuario</Text>
      <Text style={styles.label}>Correo: {correo}</Text>
      <Text style={styles.label}>Nick: {nick}</Text>
      <TextInput
        style={styles.input}
        placeholder='Edad'
        value={edad}
        editable={isEditing}
        onChangeText={(texto) => setEdad(texto)}
      />
      {isEditing ? (
        <Button title='Guardar Cambios' onPress={handleUpdate} />
      ) : (
        <Button title='Editar Edad' onPress={() => setIsEditing(true)} />
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});