let numeroSecreto = Math.floor(Math.random() * 100) + 1;

let tentativas = 0;

const limiteTentativas = 5;

function verificarPalpite() {
  let palpite = document.getElementById("palpite").value;
  let mensagem = document.getElementById("mensagem");

  tentativas++;

  if(tentativas >= limiteTentativas) {
    mensagem.innerText = `Game Over! O número secreto era ${numeroSecreto}.`;
    return;
  }

  if (palpite == numeroSecreto) {
    mensagem.innerText  = `Parabéns! Você acertou o número em ${tentativas} tentativas!`;
  }
  else if (palpite < numeroSecreto) {
    mensagem.innerText  = "Tente um número maior!";
  }
  else {
    mensagem.innerText  = "Tente um número menor!";
  }
}