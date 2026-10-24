import { getCenario } from './simulator.js';

// Monta a caixa de blocos conforme o cenário atual (entradas e saídas mudam).
export function montarToolbox() {
  const cenario = getCenario();
  const saidasOnOff = cenario.saidas.filter((s) => s.tipo === 'onoff');

  const categoriaEntradas = {
    kind: 'category',
    name: 'Entradas',
    colour: '230',
    contents: cenario.entradas.map((e) => ({
      kind: 'block',
      type: 'entrada_valor',
      fields: { ENTRADA: e.id },
    })),
  };

  const acoes = [
    ...saidasOnOff.map((s) => ({ kind: 'block', type: 'acao_ligar', fields: { SAIDA: s.id } })),
    ...saidasOnOff.map((s) => ({ kind: 'block', type: 'acao_desligar', fields: { SAIDA: s.id } })),
    { kind: 'block', type: 'acao_mostrar' },
  ];

  const categoriaAcoes = {
    kind: 'category',
    name: 'Ações',
    colour: '120',
    contents: acoes,
  };

  return {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: 'Lógica',
        colour: '210',
        contents: [
          { kind: 'block', type: 'controls_if' },
          { kind: 'block', type: 'logic_compare' },
          { kind: 'block', type: 'logic_operation' },
          { kind: 'block', type: 'logic_negate' },
          { kind: 'block', type: 'logic_boolean' },
        ],
      },
      categoriaEntradas,
      categoriaAcoes,
      {
        kind: 'category',
        name: 'Valores',
        colour: '160',
        contents: [
          { kind: 'block', type: 'math_number' },
          { kind: 'block', type: 'text' },
        ],
      },
    ],
  };
}
