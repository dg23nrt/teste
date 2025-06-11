import React, { useEffect, useState } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { Appbar, Text, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';

export default function RelatorioScreen() {
  const [dados, setDados] = useState({ labels: [], datasets: [{ data: [] }] });

  useEffect(() => {
    const carregarDados = async () => {
      const data = await AsyncStorage.getItem('refeicoes');
      const refeicoes = data ? JSON.parse(data) : [];

      const agrupadas = {};

      refeicoes.forEach((r) => {
        if (!agrupadas[r.tipo]) agrupadas[r.tipo] = 0;
        agrupadas[r.tipo] += parseFloat(r.calorias || 0);
      });

      const labels = Object.keys(agrupadas);
      const dataValues = labels.map((tipo) => agrupadas[tipo]);

      setDados({
        labels,
        datasets: [{ data: dataValues }],
      });
    };

    carregarDados();
  }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Relatório de Refeições" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Card>
          <Card.Content>
            <Text style={{ marginBottom: 16, fontSize: 16 }}>
              Calorias por tipo de refeição
            </Text>
            {dados.labels.length === 0 ? (
              <Text>Nenhum dado encontrado.</Text>
            ) : (
              <BarChart
                data={dados}
                width={Dimensions.get('window').width - 40}
                height={250}
                yAxisLabel=""
                chartConfig={{
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                  labelColor: () => '#000',
                }}
                style={{ borderRadius: 10 }}
              />
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
}
