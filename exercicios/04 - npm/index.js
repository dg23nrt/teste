// codigo para executar o projeto 

// importar em modulo 
import {calcular, tabelaIMC} from "./calculadoraIMC.js"
console.log(">>>cauculadora IMC<<<")
console.table(tabelaIMC)

const peso = 80
const altura = 1.70

const resultado = calcular(peso, altura)

console.log("Resultado IMC:")
console.log(resultado.toFixed(2))





// importar um modulo externo, uma biblioteca 
import moment from "moment";
const hoje = moment().locale('pt-br')

console.log("DATA")
console.log(hoje.format("DD/MM/YYY"))