import React from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Card, Text, Button, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Gestor de Treinos" />
      </Appbar.Header>
      <ScrollView style={{ padding: 16 }}>
        <Card style={{ marginBottom: 16 }}>
          <Card.Title title="Treinos" subtitle="Gerencie seus treinos diários" />
          <Card.Content>
            <Text>Cadastre, edite e acompanhe seus treinos personalizados.</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Treino')}>Acessar</Button>
          </Card.Actions>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Title title="Alimentação" subtitle="Registre suas refeições" />
          <Card.Content>
            <Text>Controle o que você come e melhore seus resultados.</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Alimentação')}>Acessar</Button>
          </Card.Actions>
        </Card>

        <Card>
          <Card.Title title="Perfil" subtitle="Seus dados e informações" />
          <Card.Content>
            <Text>Veja seu progresso, dados pessoais e clima atual.</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Perfil')}>Acessar</Button>
          </Card.Actions>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        label="Novo Treino"
        onPress={() => navigation.navigate('Treino')}
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
      />
    </>
  );
}
