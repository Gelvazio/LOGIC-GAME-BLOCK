import { javascriptGenerator, Order } from 'blockly/javascript';

export function registrarGeradores() {
  javascriptGenerator.forBlock['sensor_valor'] = function (block) {
    const nome = block.getFieldValue('SENSOR');
    return [`sensor(${JSON.stringify(nome)})`, Order.ATOMIC];
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
    const texto =
      javascriptGenerator.valueToCode(block, 'TEXTO', Order.NONE) || "''";
    return `mostrar(${texto});\n`;
  };
}

export { javascriptGenerator };
