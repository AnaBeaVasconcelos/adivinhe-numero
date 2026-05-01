let numeroSecreto;
let tentativas;
let limiteTentativas;
let maxNumero;
let tempo;
let timerInterval;
let pontuacao = 0;
let tempoMax;
let historico = [];

function mostrarTela(id) {
  document.querySelectorAll(".tela").forEach((t) => t.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function toggleTheme() {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
}

function voltar() {
  if (document.getElementById("telaJogo").classList.contains("hidden")) {
    mostrarTela("telaInicio");
  } else {
    mostrarTela("telaDificuldade");
  }
}

function irParaDificuldade() {
  mostrarTela("telaDificuldade");
}

function iniciarJogo(dif) {
  if (dif === "facil") {
    limiteTentativas = 10;
    maxNumero = 50;
    tempo = 30;
    tempoMax = tempo;
  } else if (dif === "medio") {
    limiteTentativas = 7;
    maxNumero = 100;
    tempo = 20;
    tempoMax = tempo;
  } else {
    limiteTentativas = 5;
    maxNumero = 200;
    tempo = 15;
    tempoMax = tempo;
  }

  reiniciarJogo();
  iniciarTimer();
  mostrarTela("telaJogo");
}

function verificarPalpite() {
  const input = document.getElementById("palpite");
  const mensagem = document.getElementById("mensagem");
  const palpite = Number(input.value);

  const container = document.querySelector(".container");

  const diferenca = Math.abs(palpite - numeroSecreto);

  historico.push(palpite);

  input.classList.add("erro");
  setTimeout(() => input.classList.remove("erro"), 200);

  tentativas++;
  atualizarVidas();

  let dica = "";

  if (diferenca > 50) {
    dica = "🔥 Muito longe!";
  } else if (diferenca > 20) {
    dica = "😐 Longe...";
  } else if (diferenca > 10) {
    dica = "🙂 Tá chegando!";
  } else if (diferenca > 5) {
    dica = "😏 Perto!";
  } else {
    dica = "😱 MUITO perto!";
  }

  if (palpite < numeroSecreto) {
    container.style.border = "2px solid #00f5ff";
  } else {
    container.style.border = "2px solid #ff00c8";
  }

  if (palpite === numeroSecreto) {
    tocarSom("somAcerto");
    container.classList.add("win");

    setTimeout(() => {
      container.classList.remove("win");
    }, 400);

    pontuacao += 100;
    mensagem.innerText = "Acertou!";
    fimRodada();
    return;
  }

  if (tentativas >= limiteTentativas) {
    tocarSom("somGameOver");
    mensagem.innerText = `Game Over! Era ${numeroSecreto}`;
    fimRodada();
    return;
  }

  tocarSom("somErro");
  mensagem.innerText =
    palpite < numeroSecreto ? `Maior! ${dica}` : `Menor! ${dica}`;
}

// timer
function iniciarTimer() {

  clearInterval(timerInterval);
  if (tempo <= 0) {
    tempo = 0;
    document.getElementById("timer").innerText = `⏱ 0s`;

    clearInterval(timerInterval);
    tocarSom("somGameOver");
    fimRodada();
    return;
  }

  timerInterval = setInterval(() => {
    tempo--;
    document.getElementById("timer").innerText = `⏱ ${tempo}s`;
    document.getElementById("progresso").style.width =
      (tempo / tempoMax) * 100 + "%";
    if (tempo <= 0) {
      tocarSom("somGameOver");
      fimRodada();
    }
  }, 1000);
}

function usarDica() {
  if (historico.length === 0) {
    document.getElementById("mensagem").innerText =
      "Faça pelo menos um palpite primeiro!";
    return;
  }

  const menor = Math.min(...historico);
  const maior = Math.max(...historico);

  document.getElementById("mensagem").innerText =
    `💡 Está entre ${menor} e ${maior}`;
}

// fim
function fimRodada() {
  clearInterval(timerInterval);
  desabilitarJogo();

  setTimeout(() => {
    reiniciarJogo();
    iniciarTimer();
  }, 2000);
}

// reset
function reiniciarJogo() {
  numeroSecreto = Math.floor(Math.random() * maxNumero) + 1;
  tentativas = 0;
  historico = [];

  document.getElementById("palpite").value = "";
  document.getElementById("mensagem").innerText = "";
  document.getElementById("palpite").focus();
  document.querySelector(".container").style.border = "none";

  atualizarVidas();
  atualizarScore();
  habilitarJogo();
}

// UI
function atualizarVidas() {
  const el = document.getElementById("vidas");
  el.innerHTML = "";

  const restante = limiteTentativas - tentativas;

  for (let i = 0; i < limiteTentativas; i++) {
    el.innerHTML += i < restante ? "❤️" : "🩶";
  }
}

function atualizarScore() {
  document.getElementById("score").innerText = `🏆 ${pontuacao}`;
}

// controle
function desabilitarJogo() {
  document.getElementById("palpite").disabled = true;
  document.getElementById("botao").disabled = true;
}

function habilitarJogo() {
  document.getElementById("palpite").disabled = false;
  document.getElementById("botao").disabled = false;
}

// áudio
function tocarSom(id) {
  const som = document.getElementById(id);
  som.currentTime = 0;
  som.play();
}

document.getElementById("palpite").addEventListener("keydown", (e) => {
  if (e.key === "Enter") verificarPalpite();
});
