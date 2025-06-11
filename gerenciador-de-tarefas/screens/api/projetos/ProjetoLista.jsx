import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert, RefreshControl } from 'react-native';
import { Button, Card, Title, Paragraph, IconButton, FAB, ActivityIndicator, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as ProjetoService from '../services/ProjetoService';

export default function ProjetoLista({ navigation }) {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarProjetos = useCallback(async () => {
    setLoading(true);
    try {
      const dados = await ProjetoService.listarProjetos();
      setProjetos(dados);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os projetos.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarProjetos();
    }, [carregarProjetos])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    carregarProjetos();
  }, [carregarProjetos]);

  const handleEdit = (projeto) => {
    navigation.navigate('ProjetoForm', { projeto: projeto, onSave: carregarProjetos });
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este projeto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const sucesso = await ProjetoService.removerProjeto(id);
              if (sucesso) {
                Alert.alert('Sucesso', 'Projeto excluído com sucesso!');
                carregarProjetos();
              } else {
                Alert.alert('Erro', 'Não foi possível excluir o projeto.');
              }
            } catch (error) {
              console.error('Erro ao excluir projeto:', error);
              Alert.alert('Erro', 'Ocorreu um erro inesperado ao excluir o projeto.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.nome}</Title>
        <Paragraph>Descrição: {item.descricao || 'Sem descrição'}</Paragraph>
        <Paragraph>Início: {item.dataInicio || 'Não definida'}</Paragraph>
        <Paragraph>Fim Previsto: {item.dataFimPrevista || 'Não definida'}</Paragraph>
        <Paragraph>Responsável: {item.responsavel}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <IconButton
          icon="pencil"
          onPress={() => handleEdit(item)}
        />
        <IconButton
          icon="delete"
          color="red"
          onPress={() => handleDelete(item.id)}
        />
      </Card.Actions>
    </Card>
  );

   if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
       {projetos.length === 0 && !loading ? (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum projeto cadastrado.</Text>
            <Text style={styles.emptySubText}>Adicione um novo projeto clicando no botão +</Text>
        </View>
      ) : (
        <FlatList
          data={projetos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('ProjetoForm', { onSave: carregarProjetos })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
  emptyText: {
      fontSize: 18,
      color: '#555',
      marginBottom: 10,
      textAlign: 'center',
  },
  emptySubText: {
      fontSize: 14,
      color: '#777',
      textAlign: 'center',
  },
});

