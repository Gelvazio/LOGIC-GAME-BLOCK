// Definições dos cenários (projetos). Cada cenário define:
// - entradas: valores que o aluno lê para montar as condições;
// - saidas:   coisas que o aluno liga/desliga (tipo 'onoff').

export const CENARIOS = [
  {
    id: 'casa',
    nome: 'Casa inteligente',
    icone: '🏠',
    descricao: 'Sensores de casa que ligam e desligam aparelhos.',
    entradas: [
      { id: 'temperatura', label: 'Temperatura (°C)', tipo: 'numero', sortear: () => 20 + Math.floor(Math.random() * 18) },
      { id: 'umidade', label: 'Umidade (%)', tipo: 'numero', sortear: () => 20 + Math.floor(Math.random() * 70) },
      { id: 'luminosidade', label: 'Luminosidade (lux)', tipo: 'numero', sortear: () => 5 + Math.floor(Math.random() * 95) },
      { id: 'presenca', label: 'Presença (tem gente?)', tipo: 'booleano', sortear: () => Math.random() < 0.5 },
      { id: 'hora', label: 'Hora do dia (0-23)', tipo: 'numero', sortear: () => Math.floor(Math.random() * 24) },
    ],
    saidas: [
      { id: 'ventilador', label: 'Ventilador', tipo: 'onoff' },
      { id: 'ar_condicionado', label: 'Ar-condicionado', tipo: 'onoff' },
      { id: 'luz', label: 'Luz', tipo: 'onoff' },
      { id: 'irrigacao', label: 'Irrigação', tipo: 'onoff' },
      { id: 'alarme', label: 'Alarme', tipo: 'onoff' },
    ],
  },
  {
    id: 'semaforo',
    nome: 'Semáforo',
    icone: '🚦',
    descricao: 'Controle as luzes do semáforo para carros e pedestres.',
    entradas: [
      { id: 'carro_na_via', label: 'Tem carro na via?', tipo: 'booleano', sortear: () => Math.random() < 0.6 },
      { id: 'botao_pedestre', label: 'Pedestre apertou o botão?', tipo: 'booleano', sortear: () => Math.random() < 0.4 },
      { id: 'hora', label: 'Hora do dia (0-23)', tipo: 'numero', sortear: () => Math.floor(Math.random() * 24) },
    ],
    saidas: [
      { id: 'sinal_verde', label: 'Luz verde', tipo: 'onoff' },
      { id: 'sinal_amarelo', label: 'Luz amarela', tipo: 'onoff' },
      { id: 'sinal_vermelho', label: 'Luz vermelha', tipo: 'onoff' },
    ],
  },
  {
    id: 'fazenda',
    nome: 'Fazenda',
    icone: '🌱',
    descricao: 'Cuide da plantação: irrigue e proteja conforme o clima.',
    entradas: [
      { id: 'umidade_solo', label: 'Umidade do solo (%)', tipo: 'numero', sortear: () => Math.floor(Math.random() * 100) },
      { id: 'temperatura', label: 'Temperatura (°C)', tipo: 'numero', sortear: () => 10 + Math.floor(Math.random() * 30) },
      { id: 'chovendo', label: 'Está chovendo?', tipo: 'booleano', sortear: () => Math.random() < 0.4 },
      { id: 'hora', label: 'Hora do dia (0-23)', tipo: 'numero', sortear: () => Math.floor(Math.random() * 24) },
    ],
    saidas: [
      { id: 'irrigacao', label: 'Irrigação', tipo: 'onoff' },
      { id: 'lona', label: 'Lona de proteção', tipo: 'onoff' },
      { id: 'aquecedor', label: 'Aquecedor', tipo: 'onoff' },
      { id: 'ventilador', label: 'Ventilador da estufa', tipo: 'onoff' },
    ],
  },
  {
    id: 'matematica',
    nome: 'Matemática',
    icone: '🔢',
    descricao: 'Compare dois números e mostre a sua conclusão.',
    entradas: [
      { id: 'numero_a', label: 'Número A', tipo: 'numero', sortear: () => Math.floor(Math.random() * 100) },
      { id: 'numero_b', label: 'Número B', tipo: 'numero', sortear: () => Math.floor(Math.random() * 100) },
    ],
    saidas: [], // Matemática usa "mostrar mensagem" para exibir a conclusão.
  },
];

export function getCenarioPorId(id) {
  return CENARIOS.find((c) => c.id === id) || CENARIOS[0];
}
