// --- SELEÇÃO DOS ELEMENTOS ---
const nomeCapitulo = document.getElementById("capitulo");
const audio = document.getElementById("audio-capitulo");
const botaoPlayPause = document.getElementById("play-pause");
const botaoProximoCapitulo = document.getElementById("proximo");
const botaoCapituloAnterior = document.getElementById("anterior");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const tempoAtual = document.getElementById("tempo-atual");
const tempoTotal = document.getElementById("tempo-total");
//Seleciona o slider de volume
const volumeSlider = document.getElementById("volume-slider");

// --- VARIÁVEIS DE ESTADO ---
const quantidadeCapitulos = 10;
let taTocando = false;
let capitulo = 1;

// --- FUNÇÕES PRINCIPAIS ---
function tocarFaixa() {
    botaoPlayPause.classList.add("tocando");
    audio.play();
    taTocando = true;
}

function pausarFaixa() {
    botaoPlayPause.classList.remove("tocando");
    audio.pause();
    taTocando = false;
}

function tocarOuPausarFaixa() {
    taTocando ? pausarFaixa() : tocarFaixa();
}

function carregarFaixa() {
    audio.src = `./Gabarito/audios/${capitulo}.mp3`;
    nomeCapitulo.innerText = `Capítulo ${capitulo}`;
}

function capituloAnterior() {
    capitulo = capitulo === 1 ? quantidadeCapitulos : capitulo - 1;
    carregarFaixa();
    tocarFaixa();
}

function proximoCapitulo() {
    capitulo = capitulo < quantidadeCapitulos ? capitulo + 1 : 1;
    carregarFaixa();
    tocarFaixa();
}

// --- FUNÇÕES DE TEMPO, PROGRESSO E VOLUME ---
function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg.toString().padStart(2, '0')}`;
}

function atualizarProgresso() {
    // Salva o progresso no LocalStorage
    localStorage.setItem('progressoAudiobook', JSON.stringify({ capitulo: capitulo, tempo: audio.currentTime }));

    const { duration, currentTime } = audio;
    if (duration) {
        progressBar.style.width = `${(currentTime / duration) * 100}%`;
        tempoTotal.innerText = formatarTempo(duration);
        tempoAtual.innerText = formatarTempo(currentTime);
    }
}

function definirProgresso(event) {
    const larguraTotal = this.clientWidth;
    const cliqueX = event.offsetX;
    const duration = audio.duration;
    
    if (duration) {
        audio.currentTime = (cliqueX / larguraTotal) * duration;
    }
}

//  Função para ajustar o volume
function ajustarVolume() {
    audio.volume = volumeSlider.value;
}

// Função para carregar o progresso salvo
function carregarProgresso() {
    const progressoSalvo = JSON.parse(localStorage.getItem('progressoAudiobook'));
    if (progressoSalvo) {
        capitulo = progressoSalvo.capitulo;
        carregarFaixa();
        // Espera os metadados do áudio serem carregados para definir o tempo
        audio.addEventListener('loadedmetadata', () => {
            audio.currentTime = progressoSalvo.tempo;
        });
    } else {
        carregarFaixa();
    }
}

// --- EVENTOS ---
botaoPlayPause.addEventListener("click", tocarOuPausarFaixa);
botaoCapituloAnterior.addEventListener("click", capituloAnterior);
botaoProximoCapitulo.addEventListener("click", proximoCapitulo);
audio.addEventListener("timeupdate", atualizarProgresso);
audio.addEventListener("loadedmetadata", atualizarProgresso);
audio.addEventListener("ended", proximoCapitulo);
progressContainer.addEventListener("click", definirProgresso);
// NOVO: Evento para o slider de volume
volumeSlider.addEventListener("input", ajustarVolume);
-
// Chama a função para carregar o progresso salvo
carregarProgresso();