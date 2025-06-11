import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Text } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import * as ProjetoService from '../services/ProjetoService';

export default function ProjetoForm({ navigation, route }) {
  const { projeto: projetoAntigo, onSave } = route.params || {};

  const [nome, setNome] = useState(projetoAntigo?.nome || '');
  const [descricao, setDescricao] = useState(projetoAntigo?.descricao || '');
  const [dataInicio, setDataInicio] = useState(projetoAntigo?.dataInicio || '');
  const [dataFimPrevista, setDataFimPrevista] = useState(projetoAntigo?.dataFimPrevista || '');
  const [responsavel, setResponsavel] = useState(projetoAntigo?.responsavel || '');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (projetoAntigo) {
      setNome(projetoAntigo.nome);
      setDescricao(projetoAntigo.descricao);
      setDataInicio(projetoAntigo.dataInicio);
      setDataFimPrevista(projetoAntigo.dataFimPrevista);
      setResponsavel(projetoAntigo.responsavel);
    }
  }, [projetoAntigo]);

  const validarCampos = () => {
    const novosErros = {};
    if (!nome) novosErros.nome = 'Nome do projeto é obrigatório';
    if (!responsavel) novosErros.responsavel = 'Responsável é obrigatório';
    if (dataInicio && !/^\d{2}\/\d{2}\/\d{4}$/.test(dataInicio)) {
      novosErros.dataInicio = 'Formato de data inválido (DD/MM/AAAA)';
    }
    if (dataFimPrevista && !/^\d{2}\/\d{2}\/\d{4}$/.test(dataFimPrevista)) {
      novosErros.dataFimPrevista = 'Formato de data inválido (DD/MM/AAAA)';
    }
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSalvar = async () => {
    if (!validarCampos()) {
      Alert.alert('Erro', 'Por favor, corrija os erros no formulário.');
      return;
    }

    const novoProjeto = {
      id: projetoAntigo?.id,
      nome,
      descricao,
      dataInicio,
      dataFimPrevista,
      responsavel,
    };

    try {
      const projetoSalvo = await ProjetoService.salvarProjeto(novoProjeto);
      if (projetoSalvo) {
        Alert.alert('Sucesso', `Projeto ${projetoAntigo ? 'atualizado' : 'salvo'} com sucesso!`);
        if (onSave) onSave();
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Não foi possível salvar o projeto.');
      }
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado ao salvar o projeto.');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{projetoAntigo ? 'Editar Projeto' : 'Novo Projeto'}</Title>

          <TextInput
            label="Nome do Projeto"
            value={nome}
            onChangeText={setNome}
            mode="outlined"
            style={styles.input}
            error={!!errors.nome}
          />
          {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

          <TextInput
            label="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={3}
          />

          <TextInput
            label="Data de Início (DD/MM/AAAA)"
            value={dataInicio}
            onChangeText={setDataInicio}
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
             error={!!errors.dataInicio}
          />
          {errors.dataInicio && <Text style={styles.errorText}>{errors.dataInicio}</Text>}

          <TextInput
            label="Data Fim Prevista (DD/MM/AAAA)"
            value={dataFimPrevista}
            onChangeText={setDataFimPrevista}
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
            error={!!errors.dataFimPrevista}
          />
          {errors.dataFimPrevista && <Text style={styles.errorText}>{errors.dataFimPrevista}</Text>}

          <TextInput
            label="Responsável"
            value={responsavel}
            onChangeText={setResponsavel}
            mode="outlined"
            style={styles.input}
            error={!!errors.responsavel}
          />
          {errors.responsavel && <Text style={styles.errorText}>{errors.responsavel}</Text>}

        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>
            Cancelar
          </Button>
          <Button mode="contained" onPress={handleSalvar} style={styles.button}>
            Salvar Projeto
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
    elevation: 4,
  },
  input: {
    marginBottom: 10,
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

