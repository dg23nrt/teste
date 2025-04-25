import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';

export default function ReceitaScreen({ route }) {
  const { receita } = route.params;

  return (
    <ScrollView style={{ padding: 10 }}>
      <Card>
        <Card.Cover source={{ uri: receita.imagem }} />
        <Card.Content>
          <Text variant="titleLarge">{receita.nome}</Text>
          <Text>⏱ Tempo de Preparo: {receita.tempoPreparo}</Text>
          <Text>🍽 Porções: {receita.porcoes}</Text>

          <Divider style={{ marginVertical: 10 }} />

          <Text variant="titleMedium">🥣 Ingredientes:</Text>
          {receita.ingredientes.map((item, idx) => (
            <Text key={idx}>• {item}</Text>
          ))}

          <Divider style={{ marginVertical: 10 }} />

          <Text variant="titleMedium">👨‍🍳 Modo de Preparo:</Text>
          {receita.modoPreparo.map((passo, idx) => (
            <Text key={idx}>{passo}</Text>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
