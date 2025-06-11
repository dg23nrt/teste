import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, IconButton, FAB, ActivityIndicator, Text, Chip } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as NotaService from '../services/NotaService';

export default function NotaLista({ navigation }) {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarNotas = useCallback(async () => {
    setLoading(true);
    try {
      const dados = await NotaService.listarNotas();
      setNotas(dados);
    } catch (error) {
      console.error('Erro ao carregar notas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as notas.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarNotas();
    }, [carregarNotas])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    carregarNotas();
  }, [carregarNotas]);

  const handleEdit = (nota) => {
    navigation.navigate('NotaForm', { nota: nota, onSave: carregarNotas });
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const sucesso = await NotaService.removerNota(id);
              if (sucesso) {
                Alert.alert('Sucesso', 'Nota excluída com sucesso!');
                carregarNotas();
              } else {
                Alert.alert('Erro', 'Não foi possível excluir a nota.');
              }
            } catch (error) {
              console.error('Erro ao excluir nota:', error);
              Alert.alert('Erro', 'Ocorreu um erro inesperado ao excluir a nota.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: item.cor || '#ffffff' }]}>
      <Card.Content>
        <Title>{item.titulo}</Title>
        <Paragraph>{item.conteudo}</Paragraph>
        {item.categoria ? <Chip icon="tag" style={styles.chip}>{item.categoria}</Chip> : null}
        <Text style={styles.dateText}>Criada em: {item.dataCriacao}</Text>
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
      {notas.length === 0 && !loading ? (
         <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma nota cadastrada.</Text>
            <Text style={styles.emptySubText}>Adicione uma nova nota clicando no botão +</Text>
        </View>
      ) : (
        <FlatList
          data={notas}
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
        onPress={() => navigation.navigate('NotaForm', { onSave: carregarNotas })}
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
  chip: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  dateText: {
      fontSize: 12,
      color: '#555',
      marginTop: 8,
      alignSelf: 'flex-end',
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

