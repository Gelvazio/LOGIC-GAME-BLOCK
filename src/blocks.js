import * as Blockly from 'blockly/core';
import { SENSOR_LABELS, DEVICE_LABELS } from './simulator.js';

export function definirBlocos() {
  // Bloco de valor: lê um sensor da simulação.
  Blockly.Blocks['sensor_valor'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('sensor')
        .appendField(
          new Blockly.FieldDropdown(
            Object.entries(SENSOR_LABELS).map(([v, label]) => [label, v]),
          ),
          'SENSOR',
        );
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
        .appendField(
          new Blockly.FieldDropdown(
            Object.entries(DEVICE_LABELS).map(([v, label]) => [label, v]),
          ),
          'DISPOSITIVO',
        );
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip('Liga um dispositivo da casa.');
    },
  };

  // Ação: desligar um dispositivo.
  Blockly.Blocks['acao_desligar'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('desligar')
        .appendField(
          new Blockly.FieldDropdown(
            Object.entries(DEVICE_LABELS).map(([v, label]) => [label, v]),
          ),
          'DISPOSITIVO',
        );
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip('Desliga um dispositivo da casa.');
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
