import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, TextInput, Button, Card, Snackbar, Dialog, Portal, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AlimentacaoScreen() {
  const [refeicoes, setRefeicoes] = useState([]);
  const [form, setForm] = useState({ tipo: '', descricao: '', calorias: '', horario: '', observacoes: '' });
  const [indexEdit, setIndexEdit] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [indexDelete, setIndexDelete] = useState(null);

  useEffect(() => {
    loadRefeicoes();
  }, []);

  const loadRefeicoes = async () => {
    const data = await AsyncStorage.getItem('refeicoes');
    if (data) setRefeicoes(JSON.parse(data));
  };

  const saveRefeicoes = async (data) => {
    await AsyncStorage.setItem('refeicoes', JSON.stringify(data));
    setRefeicoes(data);
  };

  const handleSalvar = () => {
    const campos = Object.values(form);
    if (campos.includes('')) {
      setShowSnackbar(true);
      return;
    }

    let novasRefeicoes = [...refeicoes];
    if (indexEdit !== null) {
      novasRefeicoes[indexEdit] = form;
      setIndexEdit(null);
    } else {
      novasRefeicoes.push(form);
    }
    saveRefeicoes(novasRefeicoes);
    setForm({ tipo: '', descricao: '', calorias: '', horario: '', observacoes: '' });
  };

  const handleEditar = (index) => {
    setForm(refeicoes[index]);
    setIndexEdit(index);
  };

  const handleConfirmarExcluir = () => {
    let novasRefeicoes = refeicoes.filter((_, i) => i !== indexDelete);
    saveRefeicoes(novasRefeicoes);
    setDialogVisible(false);
    setIndexDelete(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Cadastro de Alimentação" />
      </Appbar.Header>

      <View style={{ padding: 16 }}>
        <TextInput
          label="Tipo de refeição"
          value={form.tipo}
          onChangeText={(v) => setForm({ ...form, tipo: v })}
          style={{ marginBottom: 8 }}
        />
        <TextInput
          label="Descrição"
          value={form.descricao}
          onChangeText={(v) => setForm({ ...form, descricao: v })}
          style={{ marginBottom: 8 }}
        />
        <TextInput
          label="Calorias"
          keyboardType="numeric"
          value={form.calorias}
          onChangeText={(v) => setForm({ ...form, calorias: v })}
          style={{ marginBottom: 8 }}
        />
        <TextInput
          label="Horário"
          placeholder="HH:mm"
          value={form.horario}
          onChangeText={(v) => setForm({ ...form, horario: v })}
          style={{ marginBottom: 8 }}
        />
        <TextInput
          label="Observações"
          value={form.observacoes}
          onChangeText={(v) => setForm({ ...form, observacoes: v })}
          style={{ marginBottom: 8 }}
        />
        <Button mode="contained" onPress={handleSalvar}>
          {indexEdit !== null ? 'Atualizar' : 'Salvar'}
        </Button>
      </View>

      <FlatList
        data={refeicoes}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card style={{ margin: 10 }}>
            <Card.Title title={item.tipo} subtitle={item.horario} />
            <Card.Content>
              <Paragraph>
                {item.descricao} | {item.calorias} kcal
                {'\n'}Obs: {item.observacoes}
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
            <Paragraph>Deseja realmente excluir esta refeição?</Paragraph>
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
