import { javascriptGenerator, Order } from 'blockly/javascript';

export function registrarGeradores() {
  javascriptGenerator.forBlock['entrada_valor'] = function (block) {
    const id = block.getFieldValue('ENTRADA');
    return [`entrada(${JSON.stringify(id)})`, Order.ATOMIC];
  };

  javascriptGenerator.forBlock['acao_ligar'] = function (block) {
    const id = block.getFieldValue('SAIDA');
    return `ligar(${JSON.stringify(id)});\n`;
  };

  javascriptGenerator.forBlock['acao_desligar'] = function (block) {
    const id = block.getFieldValue('SAIDA');
    return `desligar(${JSON.stringify(id)});\n`;
  };

  javascriptGenerator.forBlock['acao_mostrar'] = function (block) {
    const texto =
      javascriptGenerator.valueToCode(block, 'TEXTO', Order.NONE) || "''";
    return `mostrar(${texto});\n`;
  };
}

export { javascriptGenerator };
