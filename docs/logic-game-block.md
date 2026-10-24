# LOGIC-GAME-BLOCK — Jogo de blocos (estilo Scratch) com Blockly

**Objetivo:** Criar um jogo web de arrastar-e-soltar blocos (Google Blockly) para alunos da 8ª
série simularem condições lógicas (SE/SENÃO, comparações, E/OU/NÃO), com evolução incremental em
3 versões — V1 condições, V2 laços, V3 variáveis — sendo a V1 já jogável.

**Tech Stack:** Vite + JavaScript vanilla + CSS + Google Blockly (npm) + `vite-plugin-singlefile`.

**Distribuição:** build gera um único `index.html` autocontido, que roda offline direto de um
pendrive (abrir no navegador sem servidor e sem internet).

**Criado em:** 2026-10-24 07:15 -03
**Concluído em:** 2026-10-24 07:26 -03
**Tempo decorrido:** ~11 min

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Scaffold Vite vanilla (package.json, vite.config.js, index.html, src/) | ✅ Concluído | 2026-10-24 07:15 | 2026-10-24 07:18 | ~3 min |
| 2 | Instalar dependências (blockly, vite, vite-plugin-singlefile) | ✅ Concluído | 2026-10-24 07:15 | 2026-10-24 07:19 | ~4 min |
| 3 | Simulação: sensores + atuadores + executor (src/simulator.js) | ✅ Concluído | 2026-10-24 07:15 | 2026-10-24 07:20 | ~5 min |
| 4 | Blocos customizados pt-BR (src/blocks.js) | ✅ Concluído | 2026-10-24 07:15 | 2026-10-24 07:22 | ~7 min |
| 5 | Geradores de código JS (src/generators.js) | ✅ Concluído | 2026-10-24 07:15 | 2026-10-24 07:22 | ~7 min |
| 6 | Toolbox pt-BR (src/toolbox.js) | ✅ Concluído | 2026-10-24 07:15 | 2026-10-24 07:20 | ~5 min |
| 7 | Interface + execução (src/main.js, index.html, src/style.css) | ✅ Concluído | 2026-10-24 07:15 | 2026-10-24 07:22 | ~7 min |
| 8 | Build single-file e verificação da saída | ✅ Concluído | 2026-10-24 07:15 | 2026-10-24 07:24 | ~9 min |
| 9 | Commit da V1 | ✅ Concluído | 2026-10-24 07:15 | 2026-10-24 07:26 | ~11 min |

### Roadmap (versões incrementais)

| Versão | Escopo | Status |
|--------|--------|--------|
| V1 — Condições | SE/SENÃO, comparações (`=`, `≠`, `>`, `<`, `≥`, `≤`), E/OU/NÃO, sensores + ações; **jogável** | ✅ Concluída |
| V1.1 — Multi-projeto | Seletor de cenário: Casa inteligente, Semáforo, Fazenda, Matemática | ✅ Concluída |
| V2 — Laços | REPITA (N vezes), ENQUANTO (condição) | ⬜ Pendente |
| V3 — Variáveis | Criar/ler/atribuir variáveis + entrada/saída de dados | ⬜ Pendente |

---

### Passo 1: Scaffold Vite vanilla

**Status:** ⬜ Pendente

**Arquivo:** Criar `package.json`, `vite.config.js`, `index.html`, `src/`

**Ação:** Estrutura mínima de projeto Vite com saída em arquivo único.

**`package.json`**

```json
{
  "name": "logic-game-block",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "blockly": "^11.0.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "vite-plugin-singlefile": "^2.0.0"
  }
}
```

**`vite.config.js`**

```js
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  base: './',
  plugins: [viteSingleFile()],
  build: {
    target: 'es2019',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
  },
});
```

**Verificação:**

```powershell
node -e "JSON.parse(require('fs').readFileSync('package.json','utf8')); console.log('package.json OK')"
```

Esperado: `package.json OK`

---

### Passo 2: Instalar dependências

**Status:** ⬜ Pendente

**Arquivo:** `node_modules/` (via pnpm)

**Ação:** Instalar Blockly e as ferramentas de build.

**Verificação:**

```powershell
node C:/Users/gelva/.dsh/dsh-runtimes/dsh-primary-runtime/dependencies/pnpm/bin/pnpm.mjs install
```

Esperado: instalação concluída sem erro.

---

### Passo 3: Simulação (sensores + atuadores + executor)

**Status:** ⬜ Pendente

**Arquivo:** Criar `src/simulator.js`

**Ação:** Define os valores que os alunos testam (sensores), os dispositivos que as condições
ligam/desligam (atuadores) e o executor que roda o código gerado pelos blocos.

**`src/simulator.js`**

```js
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
    temperatura: Math.round(20 + Math.random() * 18),   // 20..37
    umidade: Math.round(20 + Math.random() * 70),        // 20..89
    luminosidade: Math.round(5 + Math.random() * 95),    // 5..99
    presenca: Math.random() < 0.5,                       // true/false
    hora: Math.floor(Math.random() * 24),                // 0..23
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
```

**Verificação:**

```powershell
node --check src/simulator.js
```

Esperado: nenhuma saída (sem erro de sintaxe).

---

### Passo 4: Blocos customizados pt-BR

**Status:** ⬜ Pendente

**Arquivo:** Criar `src/blocks.js`

**Ação:** Registra os blocos de sensores (valor) e de ações (ligar/desligar/mostrar). Os blocos de
lógica (SE/SENÃO, comparação, E/OU/NÃO) vêm prontos do Blockly.

**`src/blocks.js`**

```js
import * as Blockly from 'blockly/core';
import { SENSOR_LABELS, DEVICE_LABELS } from './simulator.js';

export function definirBlocos() {
  // Bloco de valor: lê um sensor da simulação.
  Blockly.Blocks['sensor_valor'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('sensor')
        .appendField(new Blockly.FieldDropdown(
          Object.entries(SENSOR_LABELS).map(([v, label]) => [label, v])
        ), 'SENSOR');
      this.setOutput(true);
      this.setColour(230);
      this.setTooltip('Lê o valor de um sensor da simulação.');
    },
  };

  // Ação: ligar um dispositivo.
  Blockly.Blocks['acao_ligar'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('ligar')
        .appendField(new Blockly.FieldDropdown(
          Object.entries(DEVICE_LABELS).map(([v, label]) => [label, v])
        ), 'DISPOSITIVO');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('Liga um dispositivo da casa.');
    },
  };

  // Ação: desligar um dispositivo.
  Blockly.Blocks['acao_desligar'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('desligar')
        .appendField(new Blockly.FieldDropdown(
          Object.entries(DEVICE_LABELS).map(([v, label]) => [label, v])
        ), 'DISPOSITIVO');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('Desliga um dispositivo da casa.');
    },
  };

  // Ação: mostrar uma mensagem no painel de resultados.
  Blockly.Blocks['acao_mostrar'] = {
    init: function () {
      this.appendValueInput('TEXTO')
        .appendField('mostrar mensagem');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip('Mostra uma mensagem quando executado.');
    },
  };
}
```

**Verificação:**

```powershell
node --check src/blocks.js
```

Esperado: nenhuma saída.

---

### Passo 5: Geradores de código JS

**Status:** ⬜ Pendente

**Arquivo:** Criar `src/generators.js`

**Ação:** Ensina ao gerador JavaScript como traduzir os blocos customizados em código.

**`src/generators.js`**

```js
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

export function registrarGeradores() {
  javascriptGenerator.forBlock['sensor_valor'] = function (block) {
    const nome = block.getFieldValue('SENSOR');
    return [`sensor(${JSON.stringify(nome)})`, javascriptGenerator.ORDER_ATOMIC];
  };

  javascriptGenerator.forBlock['acao_ligar'] = function (block) {
    const nome = block.getFieldValue('DISPOSITIVO');
    return `ligar(${JSON.stringify(nome)});\n`;
  };

  javascriptGenerator.forBlock['acao_desligar'] = function (block) {
    const nome = block.getFieldValue('DISPOSITIVO');
    return `desligar(${JSON.stringify(nome)});\n`;
  };

  javascriptGenerator.forBlock['acao_mostrar'] = function (block) {
    const texto = javascriptGenerator.valueToCode(block, 'TEXTO', javascriptGenerator.ORDER_NONE) || "''";
    return `mostrar(${texto});\n`;
  };
}

export { javascriptGenerator };
```

**Verificação:**

```powershell
node --check src/generators.js
```

Esperado: nenhuma saída.

---

### Passo 6: Toolbox pt-BR

**Status:** ⬜ Pendente

**Arquivo:** Criar `src/toolbox.js`

**Ação:** Define as categorias/aba de blocos em português.

**`src/toolbox.js`**

```js
import { SENSOR_LABELS, DEVICE_LABELS } from './simulator.js';

const sensorOptions = Object.entries(SENSOR_LABELS)
  .map(([v, label]) => ({ kind: 'block', type: 'sensor_valor', fields: { SENSOR: v } }));

const ligarOptions = Object.entries(DEVICE_LABELS)
  .map(([v, label]) => ({ kind: 'block', type: 'acao_ligar', fields: { DISPOSITIVO: v } }));

const desligarOptions = Object.entries(DEVICE_LABELS)
  .map(([v, label]) => ({ kind: 'block', type: 'acao_desligar', fields: { DISPOSITIVO: v } }));

export const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category', name: 'Lógica', colour: '210',
      contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'logic_compare' },
        { kind: 'block', type: 'logic_operation' },
        { kind: 'block', type: 'logic_negate' },
        { kind: 'block', type: 'logic_boolean' },
      ],
    },
    {
      kind: 'category', name: 'Sensores', colour: '230',
      contents: sensorOptions,
    },
    {
      kind: 'category', name: 'Ações', colour: '120',
      contents: [
        ...ligarOptions,
        ...desligarOptions,
        { kind: 'block', type: 'acao_mostrar' },
      ],
    },
    {
      kind: 'category', name: 'Valores', colour: '160',
      contents: [
        { kind: 'block', type: 'math_number' },
        { kind: 'block', type: 'text' },
      ],
    },
  ],
};
```

**Verificação:**

```powershell
node --check src/toolbox.js
```

Esperado: nenhuma saída.

---

### Passo 7: Interface + execução

**Status:** ⬜ Pendente

**Arquivo:** Criar `index.html`, `src/main.js`, `src/style.css`

**Ação:** Monta o layout (área de blocos + painel de sensores + painel de resultado), injeta o
workspace do Blockly e liga o botão "Executar".

**`index.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Logic Game Block — Condições Lógicas</title>
</head>
<body>
  <header>
    <h1>Logic Game Block</h1>
    <span class="subtitulo">Monte condições lógicas e veja a casa reagir</span>
    <div class="acoes">
      <button id="btn-executar">▶ Executar</button>
      <button id="btn-limpar">Limpar blocos</button>
      <button id="btn-sortear">🎲 Sortear sensores</button>
    </div>
  </header>
  <main>
    <section id="workspace"></section>
    <aside>
      <div class="painel" id="painel-sensores">
        <h2>Sensores (valores da rodada)</h2>
        <ul id="lista-sensores"></ul>
      </div>
      <div class="painel" id="painel-resultado">
        <h2>Resultado</h2>
        <div id="dispositivos"></div>
        <h3>Mensagens</h3>
        <ul id="lista-mensagens"></ul>
      </div>
    </aside>
  </main>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

**`src/main.js`**

```js
import * as Blockly from 'blockly/core';
import * as ptBR from 'blockly/msg/pt-br';
import { toolbox } from './toolbox.js';
import { definirBlocos } from './blocks.js';
import { registrarGeradores, javascriptGenerator } from './generators.js';
import {
  getSensores, getDispositivos, getMensagens, novaRodada,
  resetarExecucao, sensor, ligar, desligar, mostrar,
  SENSOR_LABELS, DEVICE_LABELS,
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
});

function renderSensores() {
  const ul = document.getElementById('lista-sensores');
  ul.innerHTML = '';
  for (const [chave, valor] of Object.entries(getSensores())) {
    const li = document.createElement('li');
    const chaveLabel = SENSOR_LABELS[chave];
    const valorTexto = typeof valor === 'boolean' ? (valor ? 'verdadeiro' : 'falso') : String(valor);
    li.innerHTML = `<span class="sensor-nome">${chaveLabel}</span><span class="sensor-valor">${valorTexto}</span>`;
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

renderSensores();
renderResultado();
```

**`src/style.css`** — layout em duas colunas com painéis; ver arquivo (completo) no repositório.

**Verificação:**

```powershell
node --check src/main.js
```

Esperado: nenhuma saída.

---

### Passo 8: Build single-file e verificação

**Status:** ⬜ Pendente

**Arquivo:** `dist/index.html`

**Ação:** Gerar o HTML autocontido.

**Verificação:**

```powershell
node C:/Users/gelva/.dsh/dsh-runtimes/dsh-primary-runtime/dependencies/pnpm/bin/pnpm.mjs run build
Get-Item dist/index.html | Select-Object Name, Length
```

Esperado: `dist/index.html` existe, com tamanho considerável (Blockly embutido) e sem erros de build.

---

### Passo 9: Commit da V1

**Status:** ⬜ Pendente

**Ação:** Commitar a V1 (condições) jogável.

**Verificação:**

```powershell
git status --short
```

Esperado: arquivos da V1 listados e commitado.

---

## V1.1 — Multi-projeto (seletor de cenários)

**Objetivo:** Tornar o jogo reutilizável para vários temas, não só "casa inteligente".
Adiciona um seletor de cenário e 4 cenários prontos.

**Arquivos:** `src/scenarios.js` (novo), `src/simulator.js`, `src/blocks.js`,
`src/generators.js`, `src/toolbox.js`, `src/main.js`, `index.html`, `src/style.css`.

### Cenários

| id | Cenário | Entradas | Saídas (on/off) |
|----|---------|----------|-----------------|
| `casa` | 🏠 Casa inteligente | temperatura, umidade, luminosidade, presença, hora | ventilador, ar-condicionado, luz, irrigação, alarme |
| `semaforo` | 🚦 Semáforo | carro na via, botão do pedestre, hora | luz verde, amarela, vermelha |
| `fazenda` | 🌱 Fazenda | umidade do solo, temperatura, chuva, hora | irrigação, lona, aquecedor, ventilador |
| `matematica` | 🔢 Matemática | número A, número B | (nenhuma — usa "mostrar mensagem") |

### Arquitetura

- `src/scenarios.js` — fonte única dos cenários. Cada cenário tem `entradas`
  (`{id, label, tipo, sortear()}`) e `saidas` (`{id, label, tipo:'onoff'}`).
- `src/simulator.js` — guarda o estado do cenário atual (entradas/valores, saídas, mensagens).
- `src/blocks.js` — blocos com dropdowns **dinâmicos** (função lê o cenário atual).
- `src/toolbox.js` — `montarToolbox()` constrói a caixa de blocos conforme o cenário.
- `src/main.js` — seletor `<select id="cenario">`; ao trocar: `definirCenario()`,
  `workspace.clear()`, `workspace.updateToolbox()`, carrega demo do cenário e re-renderiza.

### Troca de cenário (fluxo)

```js
function trocarCenario(id) {
  definirCenario(id);                 // novo cenário + nova rodada
  workspace.clear();                  // remove blocos do cenário anterior
  workspace.updateToolbox(montarToolbox()); // atualiza a caixa de blocos
  carregarDemo();                     // bloco-exemplo do cenário
  renderEntradas();
  renderResultado();
}
```

### Como cadastrar um novo cenário

Adicionar um objeto em `src/scenarios.js` no array `CENARIOS` (sem mexer em mais nada —
seletor, blocos e painel passam a mostrar o cenário novo automaticamente).

**Verificação:**

```powershell
node --check src/scenarios.js
node --check src/simulator.js
node --check src/blocks.js
node --check src/generators.js
node --check src/toolbox.js
node --check src/main.js
```

Esperado: nenhuma saída.
