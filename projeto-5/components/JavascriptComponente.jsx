import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function JavascriptComponente() {
 const nome = "Diego"
 const idade = 20

 function exibirNome() {
    return nome
 }
 
function checarMaiorIdade() {
    if(idade >= 18){
        return "Maior de Idade"
    } else {
        return "Maior de Idade"
    }
}


 
    return (
    <View>
      <Text>JavascriptComponente</Text>
      <Text>nome: {nome}</Text>
      <Text>idade: {idade}</Text>
      <Text>nome: {exibirNome()}</Text>
      <Text>Resultado: {20 + 31}</Text>
      <Text>Idade: {idade + 20}</Text>
      <Text>check 18+: {checarMaiorIdade()}</Text>
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({})