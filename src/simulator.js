import { getCenarioPorId, CENARIOS } from './scenarios.js';

let cenario = CENARIOS[0];
let entradas = {};
let saidas = {};
let mensagens = [];

export function getCenarios() {
  return CENARIOS;
}

export function getCenario() {
  return cenario;
}

export function definirCenario(id) {
  cenario = getCenarioPorId(id);
  novaRodada();
}

export function novaRodada() {
  entradas = {};
  for (const e of cenario.entradas) entradas[e.id] = e.sortear();
  resetarExecucao();
  return { ...entradas };
}

export function getEntradas() {
  return { ...entradas };
}

export function resetarExecucao() {
  saidas = {};
  for (const s of cenario.saidas) saidas[s.id] = false;
  mensagens = [];
}

export function getSaidas() {
  return { ...saidas };
}

export function getMensagens() {
  return [...mensagens];
}

// Funções expostas ao código gerado pelos blocos (sandbox via Function).
export function entrada(id) {
  return entradas[id];
}

export function ligar(id) {
  if (id in saidas) saidas[id] = true;
}

export function desligar(id) {
  if (id in saidas) saidas[id] = false;
}

export function mostrar(texto) {
  mensagens.push(String(texto));
}

// Estado inicial (cenário padrão: casa).
novaRodada();
