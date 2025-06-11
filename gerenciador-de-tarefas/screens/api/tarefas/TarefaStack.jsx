import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TarefaLista from './TarefaLista';
import TarefaForm from './TarefaForm';

const Stack = createNativeStackNavigator();

export default function TarefaStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false // Oculta o cabeçalho padrão do Stack, pois usaremos um cabeçalho na Tab
      }}
      initialRouteName="TarefaLista"
    >
      <Stack.Screen name="TarefaLista" component={TarefaLista} />
      <Stack.Screen name="TarefaForm" component={TarefaForm} />
    </Stack.Navigator>
  );
}

