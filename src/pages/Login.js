import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmailAction } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };

    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.login = this.login.bind(this);
  }

  validateEmail(email) {
    const pattern = /\w+@\w+\.\w{2,3}/;
    return pattern.test(email);
  }

  validatePassword(password) {
    const minLength = 6;
    return password.length >= minLength;
  }

  updateEmail({ target: { value: email } }) {
    this.setState({ email });
  }

  updatePassword({ target: { value: password } }) {
    this.setState({ password });
  }

  login() {
    const { email } = this.state;
    const { dispatchEmail } = this.props;
    dispatchEmail(email);
    this.setState({ redirect: true });
  }

  render() {
    const { email, password, redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;

    const isDataInvalid = !(this.validateEmail(email) && this.validatePassword(password));
    return (
      <>
        <div>Login</div>
        <form>
          <input
            type="email"
            data-testid="email-input"
            placeholder="Usuário"
            onChange={ this.updateEmail }
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ this.updatePassword }
          />
          <button
            type="button"
            disabled={ isDataInvalid }
            onClick={ this.login }
          >
            Entrar
          </button>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(saveEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};
