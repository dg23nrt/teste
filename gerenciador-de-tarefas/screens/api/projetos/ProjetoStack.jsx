import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjetoLista from './ProjetoLista';
import ProjetoForm from './ProjetoForm';

const Stack = createNativeStackNavigator();

export default function ProjetoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false // Oculta o cabeçalho padrão do Stack
      }}
      initialRouteName="ProjetoLista"
    >
      <Stack.Screen name="ProjetoLista" component={ProjetoLista} />
      <Stack.Screen name="ProjetoForm" component={ProjetoForm} />
    </Stack.Navigator>
  );
}

