import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const titulos = [
  { nome: "Campeonato Brasileiro", anos: [1980, 1982, 1983, 1992, 2009, 2019, 2020] },
  { nome: "Copa Libertadores da América", anos: [1981, 2019, 2022] },
  { nome: "Copa do Brasil", anos: [1990, 2006, 2013, 2022, 2024] },
  { nome: "Supercopa do Brasil", anos: [2020, 2021, 2025] }
];

export default function TitulosScreen() {
  return (
    <FlatList
      data={titulos}
      keyExtractor={(item) => item.nome}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Content>
            <Title>{item.nome}</Title>
            <Paragraph>Anos: {item.anos.join(', ')}</Paragraph>
          </Card.Content>
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff'
  },
  card: {
    marginBottom: 16
  }
});
