import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function DashboardScreen() {
  const [total, setTotal] = useState(0);
  const [expensesCount, setExpensesCount] = useState(0);
  const isFocused = useIsFocused();

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

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Card style={{ marginBottom: 20 }}>
        <Card.Content>
          <Title>Total de Despesas</Title>
          <Paragraph>R$ {total.toFixed(2)}</Paragraph>
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
