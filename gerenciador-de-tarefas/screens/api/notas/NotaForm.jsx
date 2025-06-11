import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Text, Chip } from 'react-native-paper';
import * as NotaService from '../services/NotaService';

// Cores predefinidas para as notas
const CORES_NOTAS = ['#FFCDD2', '#E1BEE7', '#C5CAE9', '#B3E5FC', '#C8E6C9', '#FFF9C4', '#FFCCBC', '#CFD8DC'];

export default function NotaForm({ navigation, route }) {
  const { nota: notaAntiga, onSave } = route.params || {};

  const [titulo, setTitulo] = useState(notaAntiga?.titulo || '');
  const [conteudo, setConteudo] = useState(notaAntiga?.conteudo || '');
  const [categoria, setCategoria] = useState(notaAntiga?.categoria || '');
  const [cor, setCor] = useState(notaAntiga?.cor || CORES_NOTAS[0]); // Cor padrão

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (notaAntiga) {
      setTitulo(notaAntiga.titulo);
      setConteudo(notaAntiga.conteudo);
      setCategoria(notaAntiga.categoria);
      setCor(notaAntiga.cor);
    }
  }, [notaAntiga]);

  const validarCampos = () => {
    const novosErros = {};
    if (!titulo) novosErros.titulo = 'Título da nota é obrigatório';
    if (!conteudo) novosErros.conteudo = 'Conteúdo da nota é obrigatório';
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSalvar = async () => {
    if (!validarCampos()) {
      Alert.alert('Erro', 'Por favor, corrija os erros no formulário.');
      return;
    }

    const novaNota = {
      id: notaAntiga?.id,
      titulo,
      conteudo,
      categoria,
      cor,
      // dataCriacao é adicionada no service
    };

    try {
      const notaSalva = await NotaService.salvarNota(novaNota);
      if (notaSalva) {
        Alert.alert('Sucesso', `Nota ${notaAntiga ? 'atualizada' : 'salva'} com sucesso!`);
        if (onSave) onSave();
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Não foi possível salvar a nota.');
      }
    } catch (error) {
      console.error('Erro ao salvar nota:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado ao salvar a nota.');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{notaAntiga ? 'Editar Nota' : 'Nova Nota Rápida'}</Title>

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
            label="Conteúdo"
            value={conteudo}
            onChangeText={setConteudo}
            mode="outlined"
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={5}
            error={!!errors.conteudo}
          />
          {errors.conteudo && <Text style={styles.errorText}>{errors.conteudo}</Text>}

          <TextInput
            label="Categoria (Opcional)"
            value={categoria}
            onChangeText={setCategoria}
            mode="outlined"
            style={styles.input}
          />

          <Text style={styles.label}>Cor da Nota:</Text>
          <View style={styles.colorSelector}>
            {CORES_NOTAS.map((colorOption) => (
              <Chip
                key={colorOption}
                icon="circle" // Usando ícone para representar a cor
                selected={cor === colorOption}
                onPress={() => setCor(colorOption)}
                style={[styles.colorChip, { backgroundColor: colorOption }]}
                selectedColor="#000" // Cor do ícone quando selecionado
              >
                {/* Texto vazio para não exibir texto no chip */}
              </Chip>
            ))}
          </View>

        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>
            Cancelar
          </Button>
          <Button mode="contained" onPress={handleSalvar} style={styles.button}>
            Salvar Nota
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
  textArea: {
    height: 120, // Altura maior para o conteúdo
    textAlignVertical: 'top', // Alinha o texto no topo em Android
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que os chips quebrem linha
    justifyContent: 'center',
    marginBottom: 10,
  },
  colorChip: {
    margin: 4,
    minWidth: 40, // Largura mínima para o chip de cor
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

