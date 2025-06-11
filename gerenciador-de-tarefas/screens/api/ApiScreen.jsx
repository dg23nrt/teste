import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert, ScrollView, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, Text, Button } from 'react-native-paper';
import axios from 'axios'; // Certifique-se de instalar axios: npm install axios

// URL da API de cotação (Exemplo: AwesomeAPI para Dólar, Euro, Bitcoin)
const API_URL = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL';

export default function ApiScreen() {
  const [cotacoes, setCotacoes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCotacoes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setCotacoes(response.data); // API retorna um objeto com as cotações
    } catch (err) {
      console.error('Erro ao buscar cotações:', err);
      setError('Não foi possível buscar as cotações. Verifique sua conexão.');
      Alert.alert('Erro', 'Não foi possível buscar as cotações.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCotacoes();
  }, [fetchCotacoes]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCotacoes();
  }, [fetchCotacoes]);

  const renderCotacaoCard = (key, data) => {
    if (!data) return null;
    return (
      <Card key={key} style={styles.card}>
        <Card.Content>
          <Title>{data.name} ({data.code}/{data.codein})</Title>
          <Paragraph>Compra: {data.bid}</Paragraph>
          <Paragraph>Venda: {data.ask}</Paragraph>
          <Paragraph>Máxima: {data.high}</Paragraph>
          <Paragraph>Mínima: {data.low}</Paragraph>
          <Paragraph>Variação: {data.varBid} ({data.pctChange}%)</Paragraph>
          <Text style={styles.timestamp}>Atualizado em: {new Date(parseInt(data.timestamp) * 1000).toLocaleString('pt-BR')}</Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Title style={styles.title}>Cotações Atuais</Title>

      {loading && !refreshing && <ActivityIndicator animating={true} size="large" style={styles.loader} />}

      {error && !loading && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button mode="contained" onPress={fetchCotacoes}>Tentar Novamente</Button>
        </View>
      )}

      {cotacoes && !loading && (
        <View>
          {Object.keys(cotacoes).map(key => renderCotacaoCard(key, cotacoes[key]))}
        </View>
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#555',
    marginTop: 8,
    textAlign: 'right',
  },
  loader: {
    marginTop: 50,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

