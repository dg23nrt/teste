import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { Text, FAB, List, IconButton, Portal, Dialog, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

export default function ExpensesScreen() {
  const [expenses, setExpenses] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  const loadExpenses = async () => {
    const stored = await AsyncStorage.getItem('expenses');
    const data = stored ? JSON.parse(stored) : [];
    setExpenses(data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const saveExpense = async () => {
    if (!description || !value || isNaN(parseFloat(value))) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
      return;
    }

    const newExpense = {
      id: editingExpense?.id || uuidv4(),
      description,
      value: parseFloat(value),
      category,
      date: new Date().toISOString().split('T')[0],
    };

    const updated = editingExpense
      ? expenses.map(exp => (exp.id === editingExpense.id ? newExpense : exp))
      : [...expenses, newExpense];

    await AsyncStorage.setItem('expenses', JSON.stringify(updated));
    setExpenses(updated);
    closeDialog();
  };

  const deleteExpense = async (id) => {
    const updated = expenses.filter(exp => exp.id !== id);
    await AsyncStorage.setItem('expenses', JSON.stringify(updated));
    setExpenses(updated);
  };

  const openEditDialog = (item) => {
    setEditingExpense(item);
    setDescription(item.description);
    setValue(item.value.toString());
    setCategory(item.category);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setEditingExpense(null);
    setDescription('');
    setValue('');
    setCategory('');
    setDialogVisible(false);
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={`${item.description} - R$ ${item.value.toFixed(2)}`}
      description={`Categoria: ${item.category} | Data: ${item.date}`}
      right={() => (
        <View style={{ flexDirection: 'row' }}>
          <IconButton icon="pencil" onPress={() => openEditDialog(item)} />
          <IconButton icon="delete" onPress={() => deleteExpense(item.id)} />
        </View>
      )}
    />
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <FAB
        icon="plus"
        label="Adicionar"
        onPress={() => setDialogVisible(true)}
        style={{ position: 'absolute', bottom: 16, right: 16 }}
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}>
          <Dialog.Title>{editingExpense ? 'Editar Despesa' : 'Nova Despesa'}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Descrição"
              value={description}
              onChangeText={setDescription}
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Valor (R$)"
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Categoria"
              value={category}
              onChangeText={setCategory}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancelar</Button>
            <Button onPress={saveExpense}>Salvar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
