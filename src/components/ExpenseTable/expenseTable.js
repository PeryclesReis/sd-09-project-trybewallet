import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUserExpense, editUserExpense } from '../../actions';
import './ExpenseTable.css';

const headerTable = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
  'Editar/Excluir'];

class expenseTable extends React.Component {
  createThTag(array) {
    return array.map((item, i) => (
      <th key={ i }>{item}</th>
    ));
  }

  handleClick(id) {
    const { propDeleteUserExpense } = this.props;
    propDeleteUserExpense(id);
  }

  handleEditClick(id) {
    const { propEditUserExpense, editing, idEdit } = this.props;
    propEditUserExpense({ id, editing: (id === idEdit) ? !editing : true });
  }

  createTBodyExpenseTatle(expenses) {
    return expenses.map((expense, index) => {
      const { description, tag, method, value, currency,
        exchangeRates, id } = expense;
      const { ask, name } = exchangeRates[currency];
      return (
        <tr role="row" key={ index } className="flex-row">
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{value}</td>
          <td>{name}</td>
          <td>{Number(ask).toFixed(2)}</td>
          <td>{(Number(ask) * value).toFixed(2)}</td>
          <td>Real</td>
          <td className="flex-row">
            <button
              className="center-text"
              data-testid="edit-btn"
              type="button"
              id={ id }
              onClick={ () => this.handleEditClick(id) }
            >
              Editar
            </button>
            <button
              data-testid="delete-btn"
              type="button"
              id={ id }
              onClick={ () => this.handleClick(id) }
            >
              Deletar
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="flex-column">
        <thead className="flex-row">
          <tr>
            {this.createThTag(headerTable)}
          </tr>
        </thead>
        <tbody className="flex-column">
          {expenses && this.createTBodyExpenseTatle(expenses)}
        </tbody>
      </table>
    );
  }
}

expenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.Object),
}.isRequired;

const mapStateToProps = ({ wallet: { idEdit, editing, expenses } }) => ({
  expenses,
  editing,
  idEdit,
});

const mapDispatchToProps = (dispatch) => ({
  propDeleteUserExpense: (id) => dispatch(deleteUserExpense(id)),
  propEditUserExpense: (action) => dispatch(editUserExpense(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(expenseTable);
