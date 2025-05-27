import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Screens/HomeScreen';
import ListaProdutosScreen from './Screens/ListaProdutosScreen';
import ProdutoScreen from './Screens/ProdutoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Produtos" component={ListaProdutosScreen} />
        <Stack.Screen name="Produto" component={ProdutoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}