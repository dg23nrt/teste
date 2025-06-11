import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Title, Divider } from 'react-native-paper';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Title>Configurações</Title>

      <Divider style={styles.divider} />

      <Text style={styles.label}>Tema Escuro (desativado)</Text>
      <Text style={styles.label}>Moeda Padrão: R$ Real (fixo)</Text>
      <Text style={styles.label}>Notificações: Desativadas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  divider: {
    marginVertical: 15,
  },
});
