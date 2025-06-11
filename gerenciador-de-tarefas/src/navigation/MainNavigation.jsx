import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import Stacks for each CRUD
import TarefaStack from '../screens/tarefas/TarefaStack';
import ProjetoStack from '../screens/projetos/ProjetoStack';
import NotaStack from '../screens/notas/NotaStack';

// Import other screens (to be created)
import ApiScreen from '../screens/api/ApiScreen';
import InovacaoScreen from '../screens/inovacao/InovacaoScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tab Navigator for main sections
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: (props) => <CustomNavigationBar {...props} />, // Use custom header
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Tarefas') {
            iconName = 'check-circle-outline';
          } else if (route.name === 'Projetos') {
            iconName = 'briefcase-outline';
          } else if (route.name === 'Notas') {
            iconName = 'note-text-outline';
          } else if (route.name === 'API') {
            iconName = 'currency-usd'; // Example icon for API
          } else if (route.name === 'Gráfico') {
            iconName = 'chart-bar'; // Example icon for Innovation
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato', // Example active color
        tabBarInactiveTintColor: 'gray', // Example inactive color
      })}
    >
      <Tab.Screen name="Tarefas" component={TarefaStack} />
      <Tab.Screen name="Projetos" component={ProjetoStack} />
      <Tab.Screen name="Notas" component={NotaStack} />
      <Tab.Screen name="API" component={ApiScreen} />
      <Tab.Screen name="Gráfico" component={InovacaoScreen} />
    </Tab.Navigator>
  );
}

// Custom Navigation Bar using Appbar from React Native Paper
function CustomNavigationBar({ navigation, route, options, back }) {
  const title = options.headerTitle ?? options.title ?? route.name;

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {/* Add other actions if needed */}
    </Appbar.Header>
  );
}

// Main Stack Navigator (can be used for modals or global screens later)
export default function MainNavigator() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainTabs"
          screenOptions={{ headerShown: false }} // Hide Stack header for the Tab Navigator screen
        >
          <Stack.Screen name="MainTabs" component={MainTabs} />
          {/* Add other global screens here if needed */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

