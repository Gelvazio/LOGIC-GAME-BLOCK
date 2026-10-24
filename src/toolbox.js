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
