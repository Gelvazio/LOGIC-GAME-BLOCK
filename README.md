# Logic Game Block

Jogo de blocos (estilo Scratch) feito com **Google Blockly** para alunos da 8ª série
**simularem condições lógicas** — SE/SENÃO, comparações (`=`, `≠`, `>`, `<`, `≥`, `≤`) e
E/OU/NÃO. Escolha um **cenário**, monte uma regra com blocos e clique em **Executar** para
ver o resultado.

## Cenários

| Cenário | Entradas | Saídas |
|---|---|---|
| 🏠 **Casa inteligente** | temperatura, umidade, luminosidade, presença, hora | ventilador, ar-condicionado, luz, irrigação, alarme |
| 🚦 **Semáforo** | carro na via, botão do pedestre, hora | luz verde, amarela, vermelha |
| 🌱 **Fazenda** | umidade do solo, temperatura, chuva, hora | irrigação, lona, aquecedor, ventilador |
| 🔢 **Matemática** | número A, número B | (usa "mostrar mensagem" para a conclusão) |
| 🎮 **Personagem de jogo** | vida, energia, inimigo perto?, tem item? | atacar, defender, usar poção, pular |
| 🚗 **Carro inteligente** | chovendo?, noite?, velocidade, tanque | limpador, farol, frear, alerta |
| 🛗 **Elevador** | andar chamado, andar atual, peso, porta obstruída? | subir, descer, abrir porta, alarme |
| 🎢 **Parque de diversões** | altura, idade, ingresso válido?, lotação | liberar, barrar, exigir acompanhante, alerta |
| 🛒 **Caixa de supermercado** | total da compra, valor pago, cupom?, maior de idade? | liberar venda, aplicar desconto, negar, chamar gerente |

## Como usar em aula

1. Escolha o **cenário** no seletor do topo.
2. O painel **Entradas** mostra os valores sorteados da rodada.
3. O aluno monta uma regra com blocos. Exemplos de desafio:
   - 🏠 *"SE temperatura > 28 ENTÃO ligar ventilador."*
   - 🚦 *"SE tem carro na via ENTÃO ligar luz verde, SENÃO ligar luz vermelha."*
   - 🌱 *"SE umidade do solo < 40 ENTÃO ligar irrigação."*
   - 🔢 *"SE número A > número B ENTÃO mostrar 'A é maior', SENÃO mostrar 'A não é maior'."*
   - 🎢 *"SE altura ≥ 130 E ingresso válido ENTÃO liberar, SENÃO barrar."*
4. Clica em **▶ Executar** e observa o painel **Resultado** (saídas + mensagens).
5. **🎲 Sortear valores** troca os valores para testar a mesma regra em cenários diferentes.

## Como rodar (desenvolvimento)

```powershell
node C:/Users/gelva/.dsh/dsh-runtimes/dsh-primary-runtime/dependencies/pnpm/bin/pnpm.mjs install
node C:/Users/gelva/.dsh/dsh-runtimes/dsh-primary-runtime/dependencies/pnpm/bin/pnpm.mjs run dev
```

Abra a URL que o Vite mostrar (ex.: `http://localhost:5173`).

## Como levar no pendrive (alunos, offline)

```powershell
node C:/Users/gelva/.dsh/dsh-runtimes/dsh-primary-runtime/dependencies/pnpm/bin/pnpm.mjs run build
```

O build gera **um único arquivo autocontido**: `dist/index.html`.

- Copie o arquivo `dist/index.html` para o pendrive.
- No computador dos alunos, basta **dar dois cliques** no arquivo — abre no navegador, sem
  internet e sem instalar nada.

## Estrutura

```
index.html            — shell da aplicação
vite.config.js        — build em arquivo único (vite-plugin-singlefile)
src/main.js           — injeção do Blockly + seletor de cenário + execução
src/scenarios.js      — definição dos 4 cenários (entradas e saídas)
src/simulator.js      — estado da simulação (por cenário)
src/blocks.js         — blocos customizados (ler, ligar, desligar, mostrar)
src/generators.js     — geradores de código JS dos blocos
src/toolbox.js        — caixa de blocos dinâmica (pt-BR)
src/style.css         — layout e visual
docs/logic-game-block.md — plano e histórico das versões
```

## Como cadastrar um novo cenário

Edite `src/scenarios.js` e adicione um objeto ao array `CENARIOS`:

```js
{
  id: 'meu_cenario',
  nome: 'Meu cenário',
  icone: '✨',
  descricao: 'O que este cenário simula.',
  entradas: [
    { id: 'sensor', label: 'Sensor (0-100)', tipo: 'numero', sortear: () => Math.floor(Math.random() * 100) },
  ],
  saidas: [
    { id: 'motor', label: 'Motor', tipo: 'onoff' },
  ],
}
```

Pronto — o seletor, a caixa de blocos e o painel passam a mostrar o novo cenário automaticamente.

## Versões

| Versão | Conteúdo | Status |
|--------|----------|--------|
| V1 | Condições (SE/SENÃO, comparações, E/OU/NÃO) | ✅ Jogável |
| V1.1 | Multi-projeto: seletor com 4 cenários | ✅ Jogável |
| V2 | Laços (REPITA, ENQUANTO) | ⬜ Pendente |
| V3 | Variáveis (criar/ler/atribuir) + entrada/saída | ⬜ Pendente |
