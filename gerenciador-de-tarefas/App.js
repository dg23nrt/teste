import { SafeAreaView } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import MainNavigation from './src/navigation/MainNavigation';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <MainNavigation />
      </SafeAreaView>
    </PaperProvider>
  );
}
