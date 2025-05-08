import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';

const time = {
  nome: "Flamengo",
  escudo: "https://i.pinimg.com/236x/16/db/d2/16dbd20fd582e025dc54cc3fbd1839c9.jpg",
  fundacao: "15 de novembro de 1895",
  estadio: "Maracanã",
  mascote: "Urubu",
  cores: ["Vermelho", "Preto"]
};

export default function EscudoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Bem-vindo ao Flamengo App
      </Text>

      <Image
        source={{ uri: time.escudo }}
        style={styles.image}
        resizeMode="contain"
      />

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Jogadores')}
        style={styles.button}
      >
        Ver Elenco
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Títulos')}
        style={styles.button}
      >
        Ver Títulos
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 24,
    borderRadius: 12,
  },
  button: {
    marginBottom: 16,
    width: '100%',
  },
});
