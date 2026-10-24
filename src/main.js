import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import * as ptBR from 'blockly/msg/pt-br';
import { toolbox } from './toolbox.js';
import { definirBlocos } from './blocks.js';
import { registrarGeradores } from './generators.js';
import {
  getSensores,
  getDispositivos,
  getMensagens,
  novaRodada,
  resetarExecucao,
  sensor,
  ligar,
  desligar,
  mostrar,
  SENSOR_LABELS,
  DEVICE_LABELS,
} from './simulator.js';
import './style.css';

Blockly.setLocale(ptBR);
definirBlocos();
registrarGeradores();

const workspace = Blockly.inject('workspace', {
  toolbox,
  renderer: 'zelos',
  zoom: { controls: true, wheel: true, startScale: 1.0 },
  trashcan: true,
  move: { scrollbars: true, drag: true, wheel: true },
});

function renderSensores() {
  const ul = document.getElementById('lista-sensores');
  ul.innerHTML = '';
  for (const [chave, valor] of Object.entries(getSensores())) {
    const li = document.createElement('li');
    const chaveLabel = SENSOR_LABELS[chave];
    const valorTexto =
      typeof valor === 'boolean' ? (valor ? 'verdadeiro' : 'falso') : String(valor);
    li.innerHTML =
      `<span class="sensor-nome">${chaveLabel}</span>` +
      `<span class="sensor-valor">${valorTexto}</span>`;
    ul.appendChild(li);
  }
}

function renderResultado() {
  const dispositivosEl = document.getElementById('dispositivos');
  dispositivosEl.innerHTML = '';
  for (const [chave, ligado] of Object.entries(getDispositivos())) {
    const chip = document.createElement('span');
    chip.className = 'chip ' + (ligado ? 'chip-ligado' : 'chip-desligado');
    chip.textContent = `${DEVICE_LABELS[chave]}: ${ligado ? 'LIGADO' : 'desligado'}`;
    dispositivosEl.appendChild(chip);
  }

  const ulMsg = document.getElementById('lista-mensagens');
  ulMsg.innerHTML = '';
  const msgs = getMensagens();
  if (msgs.length === 0) {
    const li = document.createElement('li');
    li.className = 'vazio';
    li.textContent = 'Nenhuma mensagem ainda.';
    ulMsg.appendChild(li);
  } else {
    for (const m of msgs) {
      const li = document.createElement('li');
      li.textContent = m;
      ulMsg.appendChild(li);
    }
  }
}

function executar() {
  resetarExecucao();
  const code = javascriptGenerator.workspaceToCode(workspace);
  try {
    const fn = new Function('sensor', 'ligar', 'desligar', 'mostrar', code);
    fn(sensor, ligar, desligar, mostrar);
  } catch (erro) {
    mostrar('Erro ao executar: ' + erro.message);
  }
  renderResultado();
}

document.getElementById('btn-executar').addEventListener('click', executar);
document.getElementById('btn-limpar').addEventListener('click', () => {
  workspace.clear();
  resetarExecucao();
  renderResultado();
});
document.getElementById('btn-sortear').addEventListener('click', () => {
  novaRodada();
  renderSensores();
  resetarExecucao();
  renderResultado();
});

// Exemplo inicial: um bloco SE já no workspace para o aluno partir de algo.
const demoXml =
  '<xml xmlns="https://developers.google.com/blockly/xml">' +
  '<block type="controls_if">' +
  '<value name="IF0">' +
  '<block type="logic_compare">' +
  '<field name="OP">GT</field>' +
  '<value name="A"><block type="sensor_valor"><field name="SENSOR">temperatura</field></block></value>' +
  '<value name="B"><shadow type="math_number"><field name="NUM">28</field></shadow></block></value>' +
  '</block>' +
  '</value>' +
  '<statement name="DO0">' +
  '<block type="acao_ligar"><field name="DISPOSITIVO">ventilador</field></block>' +
  '</statement>' +
  '</block>' +
  '</xml>';

try {
  Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(demoXml), workspace);
} catch (e) {
  // Se o exemplo não carregar, o workspace continua vazio.
}

renderSensores();
renderResultado();
