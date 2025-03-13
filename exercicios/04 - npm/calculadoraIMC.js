// criando um modulo no meu projeto
// Exportar as funcionalidades desse modulo

 export function calcular(peso, altura) {
    return peso / (altura * altura)
}

export const tabelaIMC = [
    {limite: 18.5, classificaçao: "magreza"},
    {limite: 24.9, classificaçao: "normal"},
    {limite: 29.9, classificaçao: "sobrepeso"},
    {limite: 34.9, classificaçao: "obesidade grau I"},
    {limite: 39.9, classificaçao: "obesidade grau II"},
    {limite: 40.0, classificaçao: "obesidade grau III"},
]