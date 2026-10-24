# Logic Game Block

Jogo de blocos (estilo Scratch) feito com **Google Blockly** para alunos da 8ª série
**simularem condições lógicas** — SE/SENÃO, comparações (`=`, `≠`, `>`, `<`, `≥`, `≤`) e
E/OU/NÃO. Arraste os blocos, monte uma regra e clique em **Executar** para ver a "casa
inteligente" reagir (ligar/desligar dispositivos e mostrar mensagens).

## Como usar em aula

1. A casa tem **sensores** (temperatura, umidade, luminosidade, presença, hora) com valores
   sorteados a cada rodada.
2. O aluno monta uma regra com blocos. Exemplo de desafio:
   > *"SE temperatura > 28 ENTÃO ligar ventilador, SENÃO desligar."*
3. Clica em **▶ Executar** e observa no painel **Resultado** o que ligou/desligou e as
   mensagens.
4. **🎲 Sortear sensores** troca os valores para testar a mesma regra em cenários diferentes.

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

> Nota: os únicos recursos externos são 3 arquivos de mídia do Blockly (cursores de arrastar),
> que têm fallback CSS e não afetam o uso offline.

## Estrutura

```
index.html            — shell da aplicação
vite.config.js        — build em arquivo único (vite-plugin-singlefile)
src/main.js           — injeção do Blockly + execução
src/blocks.js         — blocos customizados (sensor, ligar, desligar, mostrar)
src/generators.js     — geradores de código JS dos blocos
src/toolbox.js        — categorias da caixa de blocos (pt-BR)
src/simulator.js      — sensores, atuadores e executor da simulação
src/style.css         — layout e visual
docs/logic-game-block.md — plano e histórico das versões
```

## Versões

| Versão | Conteúdo | Status |
|--------|----------|--------|
| V1 | Condições (SE/SENÃO, comparações, E/OU/NÃO) + sensores + ações | ✅ Jogável |
| V2 | Laços (REPITA, ENQUANTO) | ⬜ Pendente |
| V3 | Variáveis (criar/ler/atribuir) + entrada/saída | ⬜ Pendente |
