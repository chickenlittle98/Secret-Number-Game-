let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto =  gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'US English Female', {rate:1.2}); 
}


function exibirMensagemInicial () {
    exibirTextoNaTela('h1', 'Secret Number');
    exibirTextoNaTela('p', 'Choose a number between 1 and 100');
}

exibirMensagemInicial ();
function verificarChute() {
    let chute = document.querySelector('input').value;
   console.log(chute == numeroSecreto);
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Yes!');
        let palavraTentativa = tentativas > 1? 'tries' : 'try';
        let mensagemTentativas = `You got it right after ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'Nah, the number is lower.');
        } else {
            exibirTextoNaTela('p', 'Nah, the number is higher.');
        }
        tentativas++;
        limparCampo();
    }
}
function gerarNumeroAleatorio (){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite +1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector ('input');
    chute.value = '';
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1; 
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}