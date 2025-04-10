import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

export default function EscudoScreen() {
  return (
    <View style={styles.container}>
      <Title>Flamengo</Title>
      <Image
        source={{ uri: 'https://static.dicionariodesimbolos.com.br/upload/8f/ec/simbolo-do-flamengo-13_xl.jpeg' }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
