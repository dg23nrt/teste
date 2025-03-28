import react from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PrimeiroComponente from './components/PrimeiroComponente';
import SegundoComponente from './components/SegundoComponente';
import JavascriptComponente from "./components/JavascriptComponente";
import Perfil from "./components/Perfil";

export default function App() {
  return (
    <View style={styles.container}>
      
      <PrimeiroComponente/>
      <SegundoComponente/>
      <JavascriptComponente/>
      <Perfil/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
