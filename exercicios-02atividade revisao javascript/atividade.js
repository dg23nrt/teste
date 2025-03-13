//1
let nome = "diego"
let maiusculas = nome.toUpperCase();
console.log(nome)
console.log(maiusculas)

//2
let minusculas = nome.toLowerCase();
console.log(minusculas)

//3
function inverterString(str) {
    let arr = str.split('');
    arr.reverse();
    let stringInvertida = arr.join ('');
    return stringInvertida;
}

const minhaString = "diego"
const stringInvertida = inverterString (minhaString);
console.log(stringInvertida);
