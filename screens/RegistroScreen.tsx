import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/config';
import { ref as databaseRef, update } from "firebase/database";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RegistroScreen({ navigation }: any) {
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [nick, setNick] = useState('');
  const [edad, setEdad] = useState('');

  async function registrarUsuario() {
    try {
      // Registro de usuario
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasenia);
      const user = userCredential.user;

      // Guardar información adicional en la base de datos
      const userRef = databaseRef(db, 'users/' + user.uid);
      await update(userRef, {
        correo: correo,
        contrasenia: contrasenia,
        nick: nick,
        edad: edad,
      });

      // Registro exitoso
      console.log('REGISTRO CORRECTO');
      Alert.alert('Registro exitoso', '¡Bienvenido! Has sido registrado correctamente.');
      navigation.navigate('Login');

      // Limpiar los campos después de un registro exitoso
      setCedula('');
      setCorreo('');
      setContrasenia('');
      setNick('');
      setEdad('');
    } catch (error) {
      // Manejar errores
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error durante el registro.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder='Cédula'
        onChangeText={(texto) => setCedula(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder='Correo Electrónico'
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Nick"
        onChangeText={(texto) => setNick(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        onChangeText={(texto) => setEdad(texto)}
        keyboardType='numeric'
      />
      <TouchableOpacity style={styles.registerButton} onPress={() => registrarUsuario()}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  registerButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    height: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});