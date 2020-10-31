import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { userLogout } from '../../actions/auth';

export const Logout = ({ logout }) => {
  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userLogout())
});

export default connect(null, mapDispatchToProps)(Logout);