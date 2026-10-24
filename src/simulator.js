// Cenário de simulação: uma "casa inteligente" com sensores e atuadores.
// Os alunos montam condições lógicas e o "Executar" mostra o que liga/desliga.

export const SENSOR_LABELS = {
  temperatura: 'Temperatura (°C)',
  umidade: 'Umidade (%)',
  luminosidade: 'Luminosidade (lux)',
  presenca: 'Presença (tem gente?)',
  hora: 'Hora do dia (0-23)',
};

export const DEVICE_LABELS = {
  ventilador: 'Ventilador',
  ar_condicionado: 'Ar-condicionado',
  luz: 'Luz',
  irrigacao: 'Irrigação',
  alarme: 'Alarme',
};

// Valores padrão da rodada (podem ser sorteados novamente).
export function sortearSensores() {
  return {
    temperatura: Math.round(20 + Math.random() * 18), // 20..37
    umidade: Math.round(20 + Math.random() * 70), // 20..89
    luminosidade: Math.round(5 + Math.random() * 95), // 5..99
    presenca: Math.random() < 0.5, // true/false
    hora: Math.floor(Math.random() * 24), // 0..23
  };
}

let sensores = sortearSensores();
let dispositivos = Object.fromEntries(Object.keys(DEVICE_LABELS).map((d) => [d, false]));
let mensagens = [];

export function getSensores() {
  return { ...sensores };
}

export function novaRodada() {
  sensores = sortearSensores();
  return getSensores();
}

export function resetarExecucao() {
  dispositivos = Object.fromEntries(Object.keys(DEVICE_LABELS).map((d) => [d, false]));
  mensagens = [];
}

export function getDispositivos() {
  return { ...dispositivos };
}

export function getMensagens() {
  return [...mensagens];
}

// Funções expostas ao código gerado pelos blocos (sandbox via Function).
export function sensor(nome) {
  return sensores[nome];
}

export function ligar(nome) {
  if (nome in dispositivos) dispositivos[nome] = true;
}

export function desligar(nome) {
  if (nome in dispositivos) dispositivos[nome] = false;
}

export function mostrar(texto) {
  mensagens.push(String(texto));
}
