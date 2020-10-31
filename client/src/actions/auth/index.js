// Constants
import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS
} from '../../constants/auth';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: 'USER_LOADING' });

  axios
    .get('/api/auth/user', setConfig(getState))
    .then(res =>
      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: 'AUTH_ERROR'
      });
    });
};

export const register = (name, email, password) => {
	return dispatch => {
		// Headers
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		// Request body
		const body = JSON.stringify({ name, email, password });

		axios
			.post('/api/auth/register', body, config)
			.then(res =>
				dispatch({
					type: 'REGISTER_SUCCESS',
					payload: res.data
				})
			)
			.catch(err => {
				dispatch({
					type: 'REGISTER_FAIL'
				});
			});
	}
}

export const loginUser = (email, password) => {
	return async dispatch => {
	dispatch({ type: LOGIN_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth/login', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL
      });
    });
	}
}

export const userLogout = () => {
	return async dispatch => {
		dispatch({ type: 'LOGOUT_REQUEST' })
	}
}

export const setConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};