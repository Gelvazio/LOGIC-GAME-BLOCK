import * as Blockly from 'blockly/core';
import { getCenario } from './simulator.js';

// Registra os blocos customizados com dropdowns ESTÁTICOS lidos do cenário
// atual. Chamado no início e de novo a cada troca de cenário (os blocos do
// cenário anterior já foram limpos, então re-registrar é seguro).
export function definirBlocos() {
  const entradas = getCenario().entradas.map((e) => [e.label, e.id]);
  const saidas = getCenario()
    .saidas.filter((s) => s.tipo === 'onoff')
    .map((s) => [s.label, s.id]);

  // Bloco de valor: lê uma entrada do cenário atual.
  Blockly.Blocks['entrada_valor'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('ler')
        .appendField(new Blockly.FieldDropdown(entradas), 'ENTRADA');
      this.setOutput(true);
      this.setColour(230);
      this.setTooltip('Lê o valor de uma entrada do cenário.');
    },
  };

  // Ação: ligar uma saída (on/off).
  Blockly.Blocks['acao_ligar'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('ligar')
        .appendField(new Blockly.FieldDropdown(saidas), 'SAIDA');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip('Liga uma saída do cenário.');
    },
  };

  // Ação: desligar uma saída (on/off).
  Blockly.Blocks['acao_desligar'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('desligar')
        .appendField(new Blockly.FieldDropdown(saidas), 'SAIDA');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip('Desliga uma saída do cenário.');
    },
  };

  // Ação: mostrar uma mensagem no painel de resultados.
  Blockly.Blocks['acao_mostrar'] = {
    init: function () {
      this.appendValueInput('TEXTO').appendField('mostrar mensagem');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip('Mostra uma mensagem quando executado.');
    },
  };
}
