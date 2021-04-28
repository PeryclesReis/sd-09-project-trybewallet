import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import Header from '../components/Header';
import WholeForm from '../components/WholeForm';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <Header email={ email } />
        <WholeForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: string,
}.isRequired;

export default connect(mapStateToProps, null)(Wallet);
