import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './Screens/HomeScreen';
import ReceitaScreen from './Screens/ReceitaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#ff7043' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Receitas Deliciosas' }} />
          <Stack.Screen name="Receita" component={ReceitaScreen} options={{ title: 'Detalhes da Receita' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
