import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import * as ptBR from 'blockly/msg/pt-br';
import { montarToolbox } from './toolbox.js';
import { definirBlocos } from './blocks.js';
import { registrarGeradores } from './generators.js';
import {
  getCenarios,
  getCenario,
  definirCenario,
  novaRodada,
  getEntradas,
  getSaidas,
  getMensagens,
  resetarExecucao,
  entrada,
  ligar,
  desligar,
  mostrar,
} from './simulator.js';
import './style.css';

Blockly.setLocale(ptBR);
definirBlocos();
registrarGeradores();

const workspace = Blockly.inject('workspace', {
  toolbox: montarToolbox(),
  renderer: 'zelos',
  zoom: { controls: true, wheel: true, startScale: 1.0 },
  trashcan: true,
  // Não deixa "empurrar" o quadro: desativa arrastar o fundo e scroll por roda.
  move: { scrollbars: true, drag: false, wheel: false },
});

function renderEntradas() {
  const ul = document.getElementById('lista-entradas');
  ul.innerHTML = '';
  const valores = getEntradas();
  for (const e of getCenario().entradas) {
    const valor = valores[e.id];
    const valorTexto =
      typeof valor === 'boolean' ? (valor ? 'verdadeiro' : 'falso') : String(valor);
    const li = document.createElement('li');
    li.innerHTML =
      `<span class="sensor-nome">${e.label}</span>` +
      `<span class="sensor-valor">${valorTexto}</span>`;
    ul.appendChild(li);
  }
}

function renderResultado() {
  const saidasEl = document.getElementById('saidas');
  saidasEl.innerHTML = '';
  const saidasOnOff = getCenario().saidas.filter((s) => s.tipo === 'onoff');
  if (saidasOnOff.length === 0) {
    const p = document.createElement('p');
    p.className = 'vazio';
    p.textContent = 'Este cenário usa "mostrar mensagem" para exibir a conclusão.';
    saidasEl.appendChild(p);
  } else {
    const valores = getSaidas();
    for (const s of saidasOnOff) {
      const ligado = valores[s.id];
      const chip = document.createElement('span');
      chip.className = 'chip ' + (ligado ? 'chip-ligado' : 'chip-desligado');
      chip.textContent = `${s.label}: ${ligado ? 'LIGADO' : 'desligado'}`;
      saidasEl.appendChild(chip);
    }
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
    const fn = new Function('entrada', 'ligar', 'desligar', 'mostrar', code);
    fn(entrada, ligar, desligar, mostrar);
  } catch (erro) {
    mostrar('Erro ao executar: ' + erro.message);
  }
  renderResultado();
}

// Exemplo inicial de cada cenário (carregado ao trocar de cenário).
function demoXml(id) {
  switch (id) {
    case 'casa':
      return `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_if">
    <value name="IF0">
      <block type="logic_compare">
        <field name="OP">GT</field>
        <value name="A"><block type="entrada_valor"><field name="ENTRADA">temperatura</field></block></value>
        <value name="B"><shadow type="math_number"><field name="NUM">28</field></shadow></value>
      </block>
    </value>
    <statement name="DO0"><block type="acao_ligar"><field name="SAIDA">ventilador</field></block></statement>
  </block>
</xml>`;
    case 'semaforo':
      return `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_if">
    <mutation else="1"></mutation>
    <value name="IF0"><block type="entrada_valor"><field name="ENTRADA">carro_na_via</field></block></value>
    <statement name="DO0"><block type="acao_ligar"><field name="SAIDA">sinal_verde</field></block></statement>
    <statement name="ELSE"><block type="acao_ligar"><field name="SAIDA">sinal_vermelho</field></block></statement>
  </block>
</xml>`;
    case 'fazenda':
      return `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_if">
    <value name="IF0">
      <block type="logic_compare">
        <field name="OP">LT</field>
        <value name="A"><block type="entrada_valor"><field name="ENTRADA">umidade_solo</field></block></value>
        <value name="B"><shadow type="math_number"><field name="NUM">40</field></shadow></value>
      </block>
    </value>
    <statement name="DO0"><block type="acao_ligar"><field name="SAIDA">irrigacao</field></block></statement>
  </block>
</xml>`;
    case 'matematica':
      return `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_if">
    <mutation else="1"></mutation>
    <value name="IF0">
      <block type="logic_compare">
        <field name="OP">GT</field>
        <value name="A"><block type="entrada_valor"><field name="ENTRADA">numero_a</field></block></value>
        <value name="B"><block type="entrada_valor"><field name="ENTRADA">numero_b</field></block></value>
      </block>
    </value>
    <statement name="DO0">
      <block type="acao_mostrar">
        <value name="TEXTO"><shadow type="text"><field name="TEXT">A é maior</field></shadow></value>
      </block>
    </statement>
    <statement name="ELSE">
      <block type="acao_mostrar">
        <value name="TEXTO"><shadow type="text"><field name="TEXT">A não é maior</field></shadow></value>
      </block>
    </statement>
  </block>
</xml>`;
    case 'jogo':
      return `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_if">
    <value name="IF0">
      <block type="logic_compare">
        <field name="OP">LT</field>
        <value name="A"><block type="entrada_valor"><field name="ENTRADA">vida</field></block></value>
        <value name="B"><shadow type="math_number"><field name="NUM">20</field></shadow></value>
      </block>
    </value>
    <statement name="DO0"><block type="acao_ligar"><field name="SAIDA">usar_pocao</field></block></statement>
  </block>
</xml>`;
    case 'carro':
      return `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_if">
    <value name="IF0"><block type="entrada_valor"><field name="ENTRADA">chovendo</field></block></value>
    <statement name="DO0"><block type="acao_ligar"><field name="SAIDA">limpador</field></block></statement>
  </block>
</xml>`;
    case 'elevador':
      return `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_if">
    <value name="IF0">
      <block type="logic_compare">
        <field name="OP">GT</field>
        <value name="A"><block type="entrada_valor"><field name="ENTRADA">peso</field></block></value>
        <value name="B"><shadow type="math_number"><field name="NUM">500</field></shadow></value>
      </block>
    </value>
    <statement name="DO0"><block type="acao_ligar"><field name="SAIDA">alarme</field></block></statement>
  </block>
</xml>`;
    case 'parque':
      return `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_if">
    <mutation else="1"></mutation>
    <value name="IF0">
      <block type="logic_compare">
        <field name="OP">GTE</field>
        <value name="A"><block type="entrada_valor"><field name="ENTRADA">altura</field></block></value>
        <value name="B"><shadow type="math_number"><field name="NUM">130</field></shadow></value>
      </block>
    </value>
    <statement name="DO0"><block type="acao_ligar"><field name="SAIDA">liberar</field></block></statement>
    <statement name="ELSE"><block type="acao_ligar"><field name="SAIDA">barrar</field></block></statement>
  </block>
</xml>`;
    case 'mercado':
      return `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_if">
    <mutation else="1"></mutation>
    <value name="IF0">
      <block type="logic_compare">
        <field name="OP">GTE</field>
        <value name="A"><block type="entrada_valor"><field name="ENTRADA">valor_pago</field></block></value>
        <value name="B"><block type="entrada_valor"><field name="ENTRADA">total_compra</field></block></value>
      </block>
    </value>
    <statement name="DO0"><block type="acao_ligar"><field name="SAIDA">liberar_venda</field></block></statement>
    <statement name="ELSE"><block type="acao_ligar"><field name="SAIDA">negar</field></block></statement>
  </block>
</xml>`;
    default:
      return '';
  }
}

function carregarDemo() {
  const xml = demoXml(getCenario().id);
  if (!xml) return;
  try {
    Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xml), workspace);
  } catch (e) {
    console.error('Falha ao carregar exemplo:', e);
  }
}

function trocarCenario(id) {
  definirCenario(id);
  workspace.clear();
  definirBlocos();
  workspace.updateToolbox(montarToolbox());
  carregarDemo();
  renderEntradas();
  renderResultado();
  document.getElementById('descricao-cenario').textContent = getCenario().descricao;
}

// Preenche o seletor de cenários.
const sel = document.getElementById('cenario');
for (const c of getCenarios()) {
  const opt = document.createElement('option');
  opt.value = c.id;
  opt.textContent = `${c.icone} ${c.nome}`;
  sel.appendChild(opt);
}
sel.value = getCenario().id;

document.getElementById('btn-executar').addEventListener('click', executar);
document.getElementById('btn-limpar').addEventListener('click', () => {
  workspace.clear();
  resetarExecucao();
  renderResultado();
});
document.getElementById('btn-sortear').addEventListener('click', () => {
  novaRodada();
  renderEntradas();
  resetarExecucao();
  renderResultado();
});
sel.addEventListener('change', () => trocarCenario(sel.value));

// Inicialização.
carregarDemo();
document.getElementById('descricao-cenario').textContent = getCenario().descricao;
renderEntradas();
renderResultado();
