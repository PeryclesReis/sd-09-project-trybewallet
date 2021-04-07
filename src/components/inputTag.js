import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './inputTag.css';

class InputTag extends Component {
  render() {
    const { fieldFunction, fieldValue } = this.props;
    return (
      <div className="class-tag">
        <label htmlFor="form-tag">
          Tag&nbsp;&nbsp;
          <select
            data-testid="tag-input"
            id="form-tag"
            name="tag"
            type="text"
            value={ fieldValue }
            onChange={ fieldFunction }
            defaultValue="Alimentação"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

InputTag.propTypes = {
  fieldValue: PropTypes.string.isRequired,
  fieldFunction: PropTypes.func.isRequired,
};

export default InputTag;
