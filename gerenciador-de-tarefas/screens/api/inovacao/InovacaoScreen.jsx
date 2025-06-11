import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Alert, ScrollView } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, Text, Button } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import * as TarefaService from '../services/TarefaService';

// Cores para o gráfico de pizza
const chartColors = [
  '#FF6384', // Pendente
  '#36A2EB', // Concluída
  '#FFCE56', // Outro Status (se houver)
  '#4BC0C0',
  '#9966FF',
  '#FF9F40'
];

export default function InovacaoScreen() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const processarDadosGrafico = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const tarefas = await TarefaService.listarTarefas();
      if (tarefas.length === 0) {
        setChartData([]);
        setLoading(false);
        return;
      }

      const statusCounts = tarefas.reduce((acc, tarefa) => {
        const status = tarefa.status || 'desconhecido';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      const dataForChart = Object.keys(statusCounts).map((status, index) => ({
        name: status.charAt(0).toUpperCase() + status.slice(1), // Capitaliza o status
        population: statusCounts[status],
        color: chartColors[index % chartColors.length], // Seleciona cor do array
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      }));

      setChartData(dataForChart);
    } catch (err) {
      console.error('Erro ao processar dados para o gráfico:', err);
      setError('Não foi possível gerar o gráfico de tarefas.');
      Alert.alert('Erro', 'Não foi possível gerar o gráfico de tarefas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      processarDadosGrafico();
    }, [processarDadosGrafico])
  );

  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Title style={styles.title}>Gráfico de Status das Tarefas</Title>

      {loading && <ActivityIndicator animating={true} size="large" style={styles.loader} />}

      {error && !loading && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button mode="contained" onPress={processarDadosGrafico}>Tentar Novamente</Button>
        </View>
      )}

      {!loading && !error && chartData.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma tarefa encontrada para gerar o gráfico.</Text>
            <Text style={styles.emptySubText}>Adicione tarefas para visualizar o gráfico de status.</Text>
          </View>
      )}

      {!loading && !error && chartData.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <PieChart
              data={chartData}
              width={screenWidth - 64} // Largura ajustada para caber no card
              height={220}
              chartConfig={chartConfig}
              accessor={'population'} // Chave dos dados a serem usados
              backgroundColor={'transparent'}
              paddingLeft={'15'} // Ajuste para centralizar
              // center={[10, 0]} // Ajuste fino da posição central (opcional)
              absolute // Mostra valores absolutos em vez de porcentagens
            />
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
   contentContainer: {
    padding: 16,
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '100%', // Ocupa a largura total disponível
    elevation: 4,
    marginBottom: 20,
  },
  loader: {
    marginTop: 50,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginTop: 50,
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

