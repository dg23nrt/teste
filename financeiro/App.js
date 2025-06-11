import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import DrawerNavigator from './src/navigation/DrawerNavigator';

export default function App() {
  return (
    <PaperProvider>
      <DrawerNavigator />
    </PaperProvider>
  );
}
