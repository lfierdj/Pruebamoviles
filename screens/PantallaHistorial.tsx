import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type ItemHistorial = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

const PantallaHistorial = () => {
  const navigation = useNavigation();
  const [datosHistorial, setDatosHistorial] = useState<ItemHistorial[]>([]);

  useEffect(() => {
    obtenerDatosHistorial();
  }, []);

  const obtenerDatosHistorial = async () => {
    try {
      const respuesta = await fetch('https://jritsqmet.github.io/web-api/menu.json');
      const datos = await respuesta.json();
      if (datos) {
        const datosMapeados: ItemHistorial[] = datos.map((elemento: any) => ({
          idCategory: elemento.idCategory,
          strCategory: elemento.strCategory,
          strCategoryThumb: elemento.strCategoryThumb,
          strCategoryDescription: elemento.strCategoryDescription,
        }));
        setDatosHistorial(datosMapeados);
      }
    } catch (error) {
      console.error('Error al obtener los datos del historial:', error);
    }
  };

  const cerrarSesion = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Historial de Menu</Text>
      <ScrollView contentContainerStyle={estilos.contenidoScrollView}>
        <FlatList
          data={datosHistorial}
          keyExtractor={(item) => item.idCategory.toString()}
          renderItem={({ item }) => (
            <View style={estilos.item}>
              <Image source={{ uri: item.strCategoryThumb }} style={estilos.imagen} />
              <Text style={estilos.textoTitulo}>{item.strCategory}</Text>
              <Text>{item.strCategoryDescription}</Text>
            </View>
          )}
        />
        <TouchableOpacity style={estilos.boton} onPress={cerrarSesion}>
          <Text style={estilos.textoBoton}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  contenidoScrollView: {
    flexGrow: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    paddingVertical: 10,
    marginBottom: 10,
  },
  imagen: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  textoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  boton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default PantallaHistorial;
