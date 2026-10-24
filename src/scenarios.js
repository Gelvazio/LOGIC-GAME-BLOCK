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
  {
    id: 'jogo',
    nome: 'Personagem de jogo',
    icone: '🎮',
    descricao: 'Ajude o personagem a reagir conforme vida, energia e inimigos.',
    entradas: [
      { id: 'vida', label: 'Vida (0-100)', tipo: 'numero', sortear: () => Math.floor(Math.random() * 101) },
      { id: 'energia', label: 'Energia (0-100)', tipo: 'numero', sortear: () => Math.floor(Math.random() * 101) },
      { id: 'inimigo_perto', label: 'Inimigo perto?', tipo: 'booleano', sortear: () => Math.random() < 0.5 },
      { id: 'tem_item', label: 'Tem item?', tipo: 'booleano', sortear: () => Math.random() < 0.5 },
    ],
    saidas: [
      { id: 'atacar', label: 'Atacar', tipo: 'onoff' },
      { id: 'defender', label: 'Defender', tipo: 'onoff' },
      { id: 'usar_pocao', label: 'Usar poção', tipo: 'onoff' },
      { id: 'pular', label: 'Pular', tipo: 'onoff' },
    ],
  },
  {
    id: 'carro',
    nome: 'Carro inteligente',
    icone: '🚗',
    descricao: 'Controle limpador, farol e alertas conforme o clima e o carro.',
    entradas: [
      { id: 'chovendo', label: 'Está chovendo?', tipo: 'booleano', sortear: () => Math.random() < 0.5 },
      { id: 'noite', label: 'É noite?', tipo: 'booleano', sortear: () => Math.random() < 0.5 },
      { id: 'velocidade', label: 'Velocidade (km/h)', tipo: 'numero', sortear: () => Math.floor(Math.random() * 121) },
      { id: 'tanque', label: 'Tanque (%)', tipo: 'numero', sortear: () => Math.floor(Math.random() * 101) },
    ],
    saidas: [
      { id: 'limpador', label: 'Limpador', tipo: 'onoff' },
      { id: 'farol', label: 'Farol', tipo: 'onoff' },
      { id: 'frear', label: 'Frear', tipo: 'onoff' },
      { id: 'alerta', label: 'Alerta', tipo: 'onoff' },
    ],
  },
  {
    id: 'elevador',
    nome: 'Elevador',
    icone: '🛗',
    descricao: 'Decida se o elevador sobe, desce ou dispara o alarme.',
    entradas: [
      { id: 'andar_chamado', label: 'Andar chamado (0-20)', tipo: 'numero', sortear: () => Math.floor(Math.random() * 21) },
      { id: 'andar_atual', label: 'Andar atual (0-20)', tipo: 'numero', sortear: () => Math.floor(Math.random() * 21) },
      { id: 'peso', label: 'Peso (kg)', tipo: 'numero', sortear: () => Math.floor(Math.random() * 801) },
      { id: 'porta_obstruida', label: 'Porta obstruída?', tipo: 'booleano', sortear: () => Math.random() < 0.3 },
    ],
    saidas: [
      { id: 'subir', label: 'Subir', tipo: 'onoff' },
      { id: 'descer', label: 'Descer', tipo: 'onoff' },
      { id: 'abrir_porta', label: 'Abrir porta', tipo: 'onoff' },
      { id: 'alarme', label: 'Alarme', tipo: 'onoff' },
    ],
  },
  {
    id: 'parque',
    nome: 'Parque de diversões',
    icone: '🎢',
    descricao: 'Libere ou barre visitantes conforme altura, idade e lotação.',
    entradas: [
      { id: 'altura', label: 'Altura (cm)', tipo: 'numero', sortear: () => 80 + Math.floor(Math.random() * 121) },
      { id: 'idade', label: 'Idade', tipo: 'numero', sortear: () => 5 + Math.floor(Math.random() * 76) },
      { id: 'ingresso_valido', label: 'Ingresso válido?', tipo: 'booleano', sortear: () => Math.random() < 0.7 },
      { id: 'lotacao', label: 'Lotação (%)', tipo: 'numero', sortear: () => Math.floor(Math.random() * 101) },
    ],
    saidas: [
      { id: 'liberar', label: 'Liberar', tipo: 'onoff' },
      { id: 'barrar', label: 'Barrar', tipo: 'onoff' },
      { id: 'exigir_acompanhante', label: 'Exigir acompanhante', tipo: 'onoff' },
      { id: 'alerta', label: 'Alerta', tipo: 'onoff' },
    ],
  },
  {
    id: 'mercado',
    nome: 'Caixa de supermercado',
    icone: '🛒',
    descricao: 'Libere a venda, aplique desconto ou chame o gerente.',
    entradas: [
      { id: 'total_compra', label: 'Total da compra (R$)', tipo: 'numero', sortear: () => 10 + Math.floor(Math.random() * 191) },
      { id: 'valor_pago', label: 'Valor pago (R$)', tipo: 'numero', sortear: () => 10 + Math.floor(Math.random() * 191) },
      { id: 'tem_cupom', label: 'Tem cupom?', tipo: 'booleano', sortear: () => Math.random() < 0.4 },
      { id: 'maior_idade', label: 'Maior de idade?', tipo: 'booleano', sortear: () => Math.random() < 0.5 },
    ],
    saidas: [
      { id: 'liberar_venda', label: 'Liberar venda', tipo: 'onoff' },
      { id: 'aplicar_desconto', label: 'Aplicar desconto', tipo: 'onoff' },
      { id: 'negar', label: 'Negar venda', tipo: 'onoff' },
      { id: 'chamar_gerente', label: 'Chamar gerente', tipo: 'onoff' },
    ],
  },
];

export function getCenarioPorId(id) {
  return CENARIOS.find((c) => c.id === id) || CENARIOS[0];
}
