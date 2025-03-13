export function soma(a, b) {
    return a + b;
}
// funçao de subtraçao 
export function subtracao(a,b) {
    return a - b;
}

// funçao de multiplicaçao
export function multiplicacao(a, b) {
    return a * b;
}

// funçao divisao
export function divisao(a, b) {
    if (b === 0) {
        return "erro: Divisao por zero";
    }
    return a / b;
}