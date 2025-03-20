
// imports dos componentes e libs
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';

// função principal do componente
export default function App() {
  // lógica do meu componente
  const nome = "Diego"

  function alerta() {
    alert('gol do neymar!!!')
  }

  // retorno é um código JSX (Template) do que vai ser
  // renderizado na tela
  return (
    <ScrollView>

      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.textoGrande} >Neymar</Text>
        <Text style={{ fontSize: 25 }} >É jogador do Santos, do Brasil, e atua pela Seleção Brasileira. Neymar é considerado o principal futebolista brasileiro da atualidade e um dos melhores futebolistas do mundo.</Text>
        <Text style={styles.infoJogador}>Posição: Atacante</Text>
<Text style={styles.infoJogador}>Time: PSG (Paris Saint-Germain)</Text>
<Text style={styles.infoJogador}>Número: 11</Text>
<Text style={styles.infoJogador}>Nacionalidade: Brasileiro</Text>

        <Text style={styles.textoGrande} ></Text>

        <Button title='neymar' onPress={alerta} ></Button>

        <Image
          source={{
            uri: 'https://i.pinimg.com/736x/47/e7/fd/47e7fd39f8e5a44877234f1d3c7bf1dc.jpg'
          }}
          style={{
            height: 300,
            width: 300
          }}
        />
<Text style={{ fontSize: 25 }} >Artilharias
Copa do Brasil de 2010 (11 gols)
Campeonato Paulista de 2012 (20 gols)
Recopa Sul-Americana de 2012 (1 gol)
Copa Libertadores da América de 2012 (8 gols)
Supercopa da Espanha de 2013 (1 gol)
Copa do Rei de 2014–15 (7 gols)
Liga dos Campeões de 2014–15 (10 gols) </Text>
        <Image
          
          style={{
            height: 300,
            width: 300,
            padding: 10
          }}
        />
        <Image
          source={{
            uri: 'https://bandsports.uol.com.br/wp-content/uploads/2025/02/Neymar-Reestreia-Santos-scaled.jpg'
          }}
          style={{
            height: 300,
            width: 300
          }}
        />
 <Text style={{ fontSize: 25 }} >Neymar Jr. tem se envolvido em projetos sociais, como a fundação do Instituto Projeto Neymar Jr. e apoio a campanhas contra o trabalho infantil e o Ebola. </Text>
        <Image
          
          style={{
            height: 300,
            width: 300,
            padding: 10
          }}
        />
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJRbGThsWRL0BLlcWhz7_EQzbsAqerEIYTRQ&s'
          }}
          style={{
            height: 300,
            width: 300,
            padding: 10
          }}
        />
<Text style={{ fontSize: 25 }} >Filho do mecânico Neymar da Silva Santos (de quem herdou o nome) e Nadine Santos, Neymar nasceu na cidade de Mogi das Cruzes, na Região Metropolitana de São Paulo, em 5 de fevereiro de 1992, mas ainda muito jovem mudou-se a São Vicente e em seguida a Santos. Em 2003, aos 11 anos de idade, chegou às categorias de base do Santos, donde não saiu mais até tornar-se profissional. </Text>
        <Image
          
          style={{
            height: 300,
            width: 300
          }}
        />

<Image
          source={{
            uri: 'https://ogimg.infoglobo.com.br/in/16362136-1be-f60/FT1086A/neymar1ap.jpg'
          }}
          style={{
            height: 300,
            width: 300,
            padding: 10
          }}
        />

        <Image
          
          style={{
            height: 300,
            width: 300
          }}
        />
<Image
          source={{
            uri: 'https://www.oliberal.com/image/contentid/policy:1.883407:1730762696/neymar.jfif?f=2x1&$p$f=8225cb8&w=1500&$w=f075b93'
          }}
          style={{
            height: 300,
            width: 300,
            padding: 10
          }}
        />

        <Image
          
          style={{
            height: 300,
            width: 300
          }}
        />

      </View>


    </ScrollView>    
  );
}


// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
  textoGrande: {
    fontSize: 50,
    fontWeight: 900,
    fontStyle: 'italic'
  }
});
