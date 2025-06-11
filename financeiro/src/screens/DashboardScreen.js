import React, { useContext, useEffect } from 'react';
import { View, ScrollView, Dimensions, Alert } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { SettingsContext } from '../context/SettingsContext';

export default function DashboardScreen() {
  const [total, setTotal] = React.useState(0);
  const [expensesCount, setExpensesCount] = React.useState(0);
  const isFocused = useIsFocused();

  const { currency, notificationsEnabled } = useContext(SettingsContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem('expenses');
        const expenses = stored ? JSON.parse(stored) : [];

        const totalValue = expenses.reduce((sum, e) => sum + parseFloat(e.value), 0);
        setExpensesCount(expenses.length);
        setTotal(totalValue);
      } catch (err) {
        console.error('Erro ao carregar despesas:', err);
      }
    };

    if (isFocused) loadData();
  }, [isFocused]);

  useEffect(() => {
    if (notificationsEnabled) {
      Alert.alert('Notificação', 'As notificações estão ativadas!');
    }
  }, [notificationsEnabled]);

  // Função simples para mostrar símbolo da moeda
  const formatCurrency = (value) => {
    switch (currency) {
      case 'USD': return `$ ${value.toFixed(2)}`;
      case 'EUR': return `€ ${value.toFixed(2)}`;
      default: return `R$ ${value.toFixed(2)}`;
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Card style={{ marginBottom: 20 }}>
        <Card.Content>
          <Title>Total de Despesas</Title>
          <Paragraph>{formatCurrency(total)}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 20 }}>
        <Card.Content>
          <Title>Quantidade de Despesas</Title>
          <Paragraph>{expensesCount} lançamentos</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
