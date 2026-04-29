let numeroSecreto = Math.floor(Math.random() * 100) + 1;

function verificarPalpite() {
  let palpite = document.getElementById("palpite").value;
  let mensagem = document.getElementById("mensagem");

  if (palpite == numeroSecreto) {
    mensagem.innerText  = "Parabéns! Você acertou!";
  }
  else if (palpite < numeroSecreto) {
    mensagem.innerText  = "Tente um número maior!";
  }
  else {
    mensagem.innerText  = "Tente um número menor!";
  }
}