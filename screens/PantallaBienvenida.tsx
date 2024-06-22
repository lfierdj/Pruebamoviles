import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

const PantallaBienvenida: React.FC<Props> = ({ navigation }) => {

  const navegarALogin = () => {
    navigation.navigate('Login');
  };

  const navegarARegistro = () => {
    navigation.navigate('Registro');
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Bienvenido</Text>
      <Text style={estilos.nombreEstudiante}>Kerly Cuenca</Text>
      <Image
        source={require('../assets/ant.png')}
        style={estilos.imagen}
      />
      <TouchableOpacity style={estilos.boton} onPress={navegarALogin}>
        <Text style={estilos.textoBoton}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={estilos.boton} onPress={navegarARegistro}>
        <Text style={estilos.textoBoton}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  nombreEstudiante: {
    fontSize: 18,
    marginBottom: 20,
  },
  imagen: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default PantallaBienvenida;