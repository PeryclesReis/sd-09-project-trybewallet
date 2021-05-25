/* eslint-disable max-lines-per-function */
/* eslint-disable react/jsx-first-prop-new-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesValues, addExpense } from '../actions';

const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const payment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
class Forms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // id: -1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      // exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange({ target: { name, value } }) {
    const { state } = this.state;
    this.setState({
      ...state, [name]: value,
    });
  }

  handleClick() {
    const { addExpenseAction } = this.props;
    console.log(addExpenseAction);
    // addExpenseAction(this.state);
  }

  renderButtonAddExpense() {
    return (
      <button
        type="button"
        onClick={ this.handleClick }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    // console.log(this.state);
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            name="value"
            value={ value }
            type="text"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            value={ description }
            type="text"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="method">
          Pagamento:
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            id="method"
            onChange={ this.handleChange }
          >
            {payment.map((pay) => (
              <option key={ pay }>
                {pay}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            id="currency"
            data-testid="currency-input"
          >
            {Object.keys(currencies).map((cur, index) => {
              if (cur !== 'USDT') {
                return (
                  <option data-testid={ cur } key={ index }>
                    {cur}
                  </option>
                );
              } return null;
            })}
          </select>
        </label>
        <label htmlFor="tag">
          Tipo:
          <select
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
            name="tag"
            id="tag"
          >
            {categories.map((tg) => (
              <option key={ tg }>
                {tg}
              </option>
            ))}
          </select>
        </label>
        {this.renderButtonAddExpense()}
      </div>
    );
  }
}

Forms.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf({}).isRequired,
  addExpenseAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesValues()),
  addExpenseAction: (expense) => dispatch(addExpense(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);