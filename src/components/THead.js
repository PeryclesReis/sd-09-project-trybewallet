import React from 'react';

class THead extends React.Component {
  render() {
    const fields = {
      description: 'Descrição',
      tag: 'Tag',
      method: 'Método de pagamento',
      value: 'Valor',
      currency: 'Moeda',
      exchangeUsed: 'Câmbio utilizado',
      convertedValue: 'Valor convertido',
      exchangeCurrency: 'Moeda de conversão',
      editDelete: 'Editar/Excluir',
    };
    return (
      <thead>
        <tr>
          {Object.values(fields).map((fieldName) => (
            <td key={ fieldName }>{ fieldName }</td>
          ))}
        </tr>
      </thead>
    );
  }
}

export default THead;