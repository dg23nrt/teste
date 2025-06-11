import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert, RefreshControl } from 'react-native';
import { Button, Card, Title, Paragraph, IconButton, FAB, ActivityIndicator, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as TarefaService from '../services/TarefaService';

export default function TarefaLista({ navigation }) {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarTarefas = useCallback(async () => {
    setLoading(true);
    try {
      const dados = await TarefaService.listarTarefas();
      setTarefas(dados);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Use useFocusEffect para recarregar os dados quando a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      carregarTarefas();
    }, [carregarTarefas])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    carregarTarefas();
  }, [carregarTarefas]);

  const handleEdit = (tarefa) => {
    navigation.navigate('TarefaForm', { tarefa: tarefa, onSave: carregarTarefas }); // Passa a tarefa e o callback
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const sucesso = await TarefaService.removerTarefa(id);
              if (sucesso) {
                Alert.alert('Sucesso', 'Tarefa excluída com sucesso!');
                carregarTarefas(); // Recarrega a lista
              } else {
                Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
              }
            } catch (error) {
              console.error('Erro ao excluir tarefa:', error);
              Alert.alert('Erro', 'Ocorreu um erro inesperado ao excluir a tarefa.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.titulo}</Title>
        <Paragraph>Descrição: {item.descricao}</Paragraph>
        <Paragraph>Prioridade: {item.prioridade}</Paragraph>
        <Paragraph>Data Limite: {item.dataLimite || 'Não definida'}</Paragraph>
        <Paragraph>Status: {item.status}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <IconButton
          icon="pencil" // Ícone de editar
          onPress={() => handleEdit(item)}
        />
        <IconButton
          icon="delete" // Ícone de excluir
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
      {tarefas.length === 0 && !loading ? (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma tarefa cadastrada.</Text>
            <Text style={styles.emptySubText}>Adicione uma nova tarefa clicando no botão +</Text>
        </View>
      ) : (
        <FlatList
          data={tarefas}
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
        onPress={() => navigation.navigate('TarefaForm', { onSave: carregarTarefas })} // Passa o callback
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

