import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph, RadioButton, Text } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'; // Para máscara de data
import * as TarefaService from '../services/TarefaService';

export default function TarefaForm({ navigation, route }) {
  const { tarefa: tarefaAntiga, onSave } = route.params || {}; // Recebe tarefa para edição e callback

  const [titulo, setTitulo] = useState(tarefaAntiga?.titulo || '');
  const [descricao, setDescricao] = useState(tarefaAntiga?.descricao || '');
  const [prioridade, setPrioridade] = useState(tarefaAntiga?.prioridade || 'baixa'); // 'baixa', 'media', 'alta'
  const [dataLimite, setDataLimite] = useState(tarefaAntiga?.dataLimite || '');
  const [status, setStatus] = useState(tarefaAntiga?.status || 'pendente'); // 'pendente', 'concluida'

  const [errors, setErrors] = useState({});

  // Carrega dados da tarefa se estiver editando
  useEffect(() => {
    if (tarefaAntiga) {
      setTitulo(tarefaAntiga.titulo);
      setDescricao(tarefaAntiga.descricao);
      setPrioridade(tarefaAntiga.prioridade);
      setDataLimite(tarefaAntiga.dataLimite);
      setStatus(tarefaAntiga.status);
    }
  }, [tarefaAntiga]);

  const validarCampos = () => {
    const novosErros = {};
    if (!titulo) novosErros.titulo = 'Título é obrigatório';
    if (!descricao) novosErros.descricao = 'Descrição é obrigatória';
    // Validação simples de data (formato DD/MM/AAAA)
    if (dataLimite && !/^\d{2}\/\d{2}\/\d{4}$/.test(dataLimite)) {
      novosErros.dataLimite = 'Formato de data inválido (DD/MM/AAAA)';
    }
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSalvar = async () => {
    if (!validarCampos()) {
      Alert.alert('Erro', 'Por favor, corrija os erros no formulário.');
      return;
    }

    const novaTarefa = {
      id: tarefaAntiga?.id, // Mantém o ID se estiver editando
      titulo,
      descricao,
      prioridade,
      dataLimite,
      status,
    };

    try {
      const tarefaSalva = await TarefaService.salvarTarefa(novaTarefa);
      if (tarefaSalva) {
        Alert.alert('Sucesso', `Tarefa ${tarefaAntiga ? 'atualizada' : 'salva'} com sucesso!`);
        if (onSave) onSave(); // Chama o callback para atualizar a lista
        navigation.goBack(); // Volta para a lista
      } else {
        Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
      }
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado ao salvar a tarefa.');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{tarefaAntiga ? 'Editar Tarefa' : 'Nova Tarefa'}</Title>

          <TextInput
            label="Título"
            value={titulo}
            onChangeText={setTitulo}
            mode="outlined"
            style={styles.input}
            error={!!errors.titulo}
          />
          {errors.titulo && <Text style={styles.errorText}>{errors.titulo}</Text>}

          <TextInput
            label="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={3}
            error={!!errors.descricao}
          />
          {errors.descricao && <Text style={styles.errorText}>{errors.descricao}</Text>}

          <Paragraph style={styles.label}>Prioridade:</Paragraph>
          <RadioButton.Group onValueChange={newValue => setPrioridade(newValue)} value={prioridade}>
            <View style={styles.radioGroup}>
              <View style={styles.radioButtonItem}>
                <RadioButton value="baixa" />
                <Text>Baixa</Text>
              </View>
              <View style={styles.radioButtonItem}>
                <RadioButton value="media" />
                <Text>Média</Text>
              </View>
              <View style={styles.radioButtonItem}>
                <RadioButton value="alta" />
                <Text>Alta</Text>
              </View>
            </View>
          </RadioButton.Group>

          <TextInput
            label="Data Limite (DD/MM/AAAA)"
            value={dataLimite}
            onChangeText={setDataLimite}
            mode="outlined"
            style={styles.input}
            render={(props) => (
              <TextInputMask
                {...props}
                type={'datetime'}
                options={{
                  format: 'DD/MM/AAAA'
                }}
              />
            )}
            error={!!errors.dataLimite}
          />
           {errors.dataLimite && <Text style={styles.errorText}>{errors.dataLimite}</Text>}

          <Paragraph style={styles.label}>Status:</Paragraph>
          <RadioButton.Group onValueChange={newValue => setStatus(newValue)} value={status}>
            <View style={styles.radioGroup}>
              <View style={styles.radioButtonItem}>
                <RadioButton value="pendente" />
                <Text>Pendente</Text>
              </View>
              <View style={styles.radioButtonItem}>
                <RadioButton value="concluida" />
                <Text>Concluída</Text>
              </View>
            </View>
          </RadioButton.Group>

        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>
            Cancelar
          </Button>
          <Button mode="contained" onPress={handleSalvar} style={styles.button}>
            Salvar Tarefa
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    elevation: 4, // Sombra no Android
  },
  input: {
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  radioButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    justifyContent: 'flex-end',
    padding: 16,
  },
  button: {
    marginLeft: 8,
  },
   errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});

