const nomeCapitulo = document.getElementById("capitulo");
const audio = document.getElementById("audio-capitulo");
const botaoPlayPause = document.getElementById("play-pause");
const botaoProximoCapitulo = document.getElementById("proximo");
const botaoCapituloAnterior = document.getElementById("anterior");

const quantidadeCapitulos = 10;

let taTocando = false;
let capitulo = 1;

function tocarFaixa() {
  audio.play();
  taTocando = true;
  botaoPlayPause.classList.add("tocando");
}

function pausarFaixa() {
  audio.pause();
  taTocando = false;
  botaoPlayPause.classList.remove("tocando");
}

function tocarOuPausarFaixa() {
  if (taTocando) {
    pausarFaixa();
  } else {
    tocarFaixa();
  }
}

function capituloAnterior() {
  pausarFaixa();
  capitulo = capitulo === 1 ? quantidadeCapitulos : capitulo - 1;
  audio.src = `./Gabarito/audios/${capitulo}.mp3`;
  nomeCapitulo.innerText = `Capítulo ${capitulo}`;
}

function proximoCapitulo() {
  pausarFaixa();
  capitulo = capitulo < quantidadeCapitulos ? capitulo + 1 : 1;
  audio.src = `./Gabarito/audios/${capitulo}.mp3`;
  nomeCapitulo.innerText = `Capítulo ${capitulo}`;
}

botaoPlayPause.addEventListener("click", tocarOuPausarFaixa);
botaoCapituloAnterior.addEventListener("click", capituloAnterior);
botaoProximoCapitulo.addEventListener("click", proximoCapitulo);
audio.addEventListener("ended", proximoCapitulo);
