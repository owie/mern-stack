import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../constants/auth';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
  loading: false,
  user: null
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'USER_LOADING': 
      return {
        ...state,
        loading: true
      }
    case 'USER_LOADED': 
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthenticated: true
      }
    case 'AUTH_ERROR':
    case 'REGISTER_FAIL':
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          loading: false
        }
    default:
        return state
  }
}

export default authReducer