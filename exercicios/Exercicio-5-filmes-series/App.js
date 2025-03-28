import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Filme from './componentes/Filmes';
import Serie from './componentes/Serie';

export default function App() {

const listaFilmes = [
  {
  "nome": "O Pianista",
  "ano": 2003,
  "diretor": "Roman Polanski",
  "tipo": "Drama",
  "capa": "https://upload.wikimedia.org/wikipedia/pt/0/0d/ThePianistPoster.jpg"
  },
  {
  "nome": "O Exorcista",
  "ano": 1973,
  "diretor": " William Friedkin",
  "tipo": "Terror",
  "capa": "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/26/84/19873738.jpg"
  },
  {
  "nome": "O Beijo da Mulher Aranha",
  "ano": 1985,
  "diretor": "Hector Babenco",
  "tipo": "Drama",
  "capa": "https://upload.wikimedia.org/wikipedia/pt/thumb/8/8b/Kiss_Of_The_Spiderwoman.jpg/250px-Kiss_Of_The_Spiderwoman.jpg"
  },
  {
  "nome": "american pie",
  "ano": 1999 ,
  "diretor": "Paul Weitz",
  "tipo": "Terror",
  "capa": "https://upload.wikimedia.org/wikipedia/pt/thumb/2/23/American_pie_poster_promocional.jpg/230px-American_pie_poster_promocional.jpg"
  }
]

const listaSeries = [
  {
  "nome": "Buffy, a Caça-Vampiros",
  "ano": 1997,
  "diretor": "Joss Whedon",
  "temporadas": 7,
  "capa": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Buffy_the_vampire_slayer.svg/250px-Buffy_the_vampire_slayer.svg.png"
  },
  {
  "nome": "Desperate Housewives",
  "ano": 2004,
  "diretor": "Marc Cherry",
  "temporadas": 8,
  "capa": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Desperate_Housewives_Logo.svg/250px-Desperate_Housewives_Logo.svg.png"
  },
  {
  "nome": "Sons of Anarchy",
  "ano": 2008,
  "diretor": "Kurt Sutter",
  "temporadas": 7,
  "capa": "https://upload.wikimedia.org/wikipedia/pt/7/7b/SOATitlecard.jpg"
  }
  ];





return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />

        {
          listaFilmes.map(
            filme => {
              return (
                <Filme
                  nome={filme.nome}
                  ano={filme.ano}
                  diretor={filme.diretor}
                  tipo={filme.tipo}
                  capa={filme.capa}
                />
              )
            }
          )
        }

        {
          listaSeries.map(
            serie => {
              return (
                <Serie 
                  nome={serie.nome}
                  ano={serie.ano}
                  diretor={serie.diretor}
                  tipo={serie.tipo}
                  capa={serie.capa}
                />
              )
            }
          )
        }



      </View>
    </ScrollView>
  );
}



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
  });