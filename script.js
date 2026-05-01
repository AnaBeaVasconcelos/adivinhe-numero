let numeroSecreto = Math.floor(Math.random() * 100) + 1;

let tentativas = 0;

const limiteTentativas = 5;

atualizarTentativasRestantes();

function verificarPalpite() {
  let palpite = document.getElementById("palpite").value;
  let mensagem = document.getElementById("mensagem");

  tentativas++;

  atualizarTentativasRestantes();

  if (palpite == numeroSecreto) {
    mensagem.innerText = `Parabéns! Você acertou em ${tentativas} tentativas!`;

    desabilitarJogo();

    setTimeout(() => {
      reiniciarJogo();
    }, 2000);

    return;
  }

  if (tentativas >= limiteTentativas) {
    mensagem.innerText = `Game Over! O número era ${numeroSecreto}`;

    desabilitarJogo();

    setTimeout(() => {
      reiniciarJogo();
    }, 2000);

    return;
  }

  if (palpite < numeroSecreto) {
    mensagem.innerText = "Tente um número maior!";
  } else {
    mensagem.innerText = "Tente um número menor!";
  }
}

function reiniciarJogo() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  tentativas = 0;

  document.getElementById("palpite").value = "";
  document.getElementById("mensagem").innerText = "";

  habilitarJogo();
  atualizarTentativasRestantes();
}

function atualizarTentativasRestantes() {
  const restante = limiteTentativas - tentativas;
  document.getElementById("tentativasRestantes").innerText =
    `Tentativas restantes: ${restante}`;
}

function desabilitarJogo() {
  document.getElementById("palpite").disabled = true;
  document.getElementById("botao").disabled = true;
  document.getElementById("botao").innerText = "Aguarde 2 segundos...";
}

function habilitarJogo() {
  document.getElementById("palpite").disabled = false;
  document.getElementById("botao").disabled = false;
  document.getElementById("botao").innerText = "Verificar Palpite";
}
