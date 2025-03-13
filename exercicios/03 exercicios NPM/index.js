import { soma, subtracao, multiplicacao, divisao } from './calculadora.js';
console.log("Soma: ", soma(10, 5));
console.log("Subtração: ", subtracao(10, 5));
console.log("Multiplicação: ", multiplicacao(10, 5));
console.log("Divisão: ", divisao(10, 5));

// 2. modifique o arquivo index.js

import moment from 'moment';

function calcularIdade(anoNascimento) {
    const Anoatual = moment().year();
    const idade = Anoatual- anoNascimento;

  return idade;
}

 const anoNascimento = 1998;
 const idade = calcularIdade(anoNascimento);
 console.log(`idade: ${idade} anos`);
