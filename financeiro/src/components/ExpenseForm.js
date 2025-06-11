import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { List, Divider, Text, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function ExpensesListScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused(); // para recarregar ao voltar para esta tela

  const loadExpenses = async () => {
    try {
      const stored = await AsyncStorage.getItem('expenses');
      const data = stored ? JSON.parse(stored) : [];
      setExpenses(data.reverse());
    } catch (error) {
      console.error('Erro ao carregar despesas:', error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <List.Item
      title={`${item.description} - R$ ${item.value.toFixed(2)}`}
      description={`Categoria: ${item.category} | Data: ${item.date} | Pagamento: ${item.paymentMethod}`}
      left={props => <List.Icon {...props} icon="currency-usd" />}
      onPress={() => navigation.navigate('Cadastrar / Editar Despesa', { expense: item })}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {expenses.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Nenhuma despesa cadastrada.</Text>
        </View>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Divider />}
        />
      )}

      <FAB
        icon="plus"
        label="Nova Despesa"
        onPress={() => navigation.navigate('Cadastrar / Editar Despesa')}
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
      />
    </View>
  );
}
