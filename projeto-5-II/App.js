import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Atleta from './components/Atleta';

export default function App() {

  const listaAtletas = [
    {
      nome: "Neymar Jr",
      idade: 33,
      numero: 10,
      imagem: 'https://i.pinimg.com/236x/ba/4b/4d/ba4b4d89ee0dcc15ac908758e0eb737a.jpg'
    },
    {
      nome: "Lebron James",
      idade: 38,
      numero: 23,
      imagem: 'https://i.pinimg.com/236x/7c/48/19/7c481977061c7f68bb5970dae91f1787.jpg'
    },
    {
      nome: "Usain Bolt",
      idade: 40,
      numero: 1,
      imagem: 'https://i.pinimg.com/236x/45/b5/d1/45b5d16bf2a2d67cf519ca206fc8d28d.jpg'
    },
  ]


  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />

        {
          listaAtletas.map(
            atleta => {
              return (
                <Atleta
                  nome={atleta.nome}
                  idade={atleta.idade}
                  numero={atleta.numero}
                  imagem={atleta.imagem}
                />
              )
            }
          )
        }



      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});