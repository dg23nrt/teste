import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotaLista from '.';
import NotaForm from './NotaForm';

const Stack = createNativeStackNavigator();

export default function NotaStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false // Oculta o cabeçalho padrão do Stack
      }}
      initialRouteName="NotaLista"
    >
      <Stack.Screen name="NotaLista" component={NotaLista} />
      <Stack.Screen name="NotaForm" component={NotaForm} />
    </Stack.Navigator>
  );
}

