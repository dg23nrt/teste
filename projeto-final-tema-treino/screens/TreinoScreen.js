import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, TextInput, Button, Card, Snackbar, Dialog, Portal, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TreinoScreen() {
  const [treinos, setTreinos] = useState([]);
  const [form, setForm] = useState({ nome: '', grupo: '', carga: '', reps: '', duracao: '' });
  const [indexEdit, setIndexEdit] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [indexDelete, setIndexDelete] = useState(null);

  useEffect(() => {
    loadTreinos();
  }, []);

  const loadTreinos = async () => {
    const data = await AsyncStorage.getItem('treinos');
    if (data) setTreinos(JSON.parse(data));
  };

  const saveTreinos = async (data) => {
    await AsyncStorage.setItem('treinos', JSON.stringify(data));
    setTreinos(data);
  };

  const handleSalvar = () => {
    const campos = Object.values(form);
    if (campos.includes('')) {
      setShowSnackbar(true);
      return;
    }

    let novosTreinos = [...treinos];
    if (indexEdit !== null) {
      novosTreinos[indexEdit] = form;
      setIndexEdit(null);
    } else {
      novosTreinos.push(form);
    }
    saveTreinos(novosTreinos);
    setForm({ nome: '', grupo: '', carga: '', reps: '', duracao: '' });
  };

  const handleEditar = (index) => {
    setForm(treinos[index]);
    setIndexEdit(index);
  };

  const handleConfirmarExcluir = () => {
    let novosTreinos = treinos.filter((_, i) => i !== indexDelete);
    saveTreinos(novosTreinos);
    setDialogVisible(false);
    setIndexDelete(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Cadastro de Treinos" />
      </Appbar.Header>

      <View style={{ padding: 16 }}>
        <TextInput
          label="Nome do exercício"
          value={form.nome}
          onChangeText={(v) => setForm({ ...form, nome: v })}
          style={{ marginBottom: 8 }}
        />
        <TextInput
          label="Grupo Muscular"
          value={form.grupo}
          onChangeText={(v) => setForm({ ...form, grupo: v })}
          style={{ marginBottom: 8 }}
        />
        <TextInput
          label="Carga (kg)"
          keyboardType="numeric"
          value={form.carga}
          onChangeText={(v) => setForm({ ...form, carga: v })}
          style={{ marginBottom: 8 }}
        />
        <TextInput
          label="Repetições"
          keyboardType="numeric"
          value={form.reps}
          onChangeText={(v) => setForm({ ...form, reps: v })}
          style={{ marginBottom: 8 }}
        />
        <TextInput
          label="Duração (min)"
          keyboardType="numeric"
          value={form.duracao}
          onChangeText={(v) => setForm({ ...form, duracao: v })}
          style={{ marginBottom: 8 }}
        />
        <Button mode="contained" onPress={handleSalvar}>
          {indexEdit !== null ? 'Atualizar' : 'Salvar'}
        </Button>
      </View>

      <FlatList
        data={treinos}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card style={{ margin: 10 }}>
            <Card.Title title={item.nome} subtitle={`Grupo: ${item.grupo}`} />
            <Card.Content>
              <Paragraph>
                Carga: {item.carga}kg | Reps: {item.reps} | Duração: {item.duracao}min
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleEditar(index)}>Editar</Button>
              <Button onPress={() => {
                setDialogVisible(true);
                setIndexDelete(index);
              }}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
      >
        Preencha todos os campos!
      </Snackbar>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Confirmar Exclusão</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Deseja realmente excluir este treino?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancelar</Button>
            <Button onPress={handleConfirmarExcluir}>Excluir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
