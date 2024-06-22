import { Button, StyleSheet, Text, View, Alert, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/config';


export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Drawer_Welcome");
        setCorreo('');
        setContrasenia('');
      })
      .catch((error) => {
        const errorCode = error.code;

        switch (errorCode) {
          case "auth/invalid-credential":
            Alert.alert("Error", "Credenciales incorrectas");
            break;

          case "auth/missing-password":
            Alert.alert("Error", "Ingrese su contraseña");
            break;

          default:
            Alert.alert("Error", "Ingrese sus credenciales");
            break;
        }
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder='Correo Electrónico'
        keyboardType='email-address'
        onChangeText={(texto: any) => setCorreo(texto)}
        value={correo}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={(texto: any) => setContrasenia(texto)}
        value={contrasenia}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.loginButton} onPress={() => login()}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
      <Text style={styles.registerText}>🌟 Regístrate aquí 🌟</Text>
      </TouchableOpacity>
    </View>
  )
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
  loginButton: {
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
  registerText: {
    marginTop: 20,
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  }
});