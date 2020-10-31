import axios from 'axios';
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS,
  POST_ITEM_REQUEST,
  POST_ITEM_FAILED,
  POST_ITEM_SUCCESS,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_FAILED,
  DELETE_ITEM_SUCCESS,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_FAILED,
  UPDATE_ITEM_SUCCESS
} from '../../constants/inventory'
import { setConfig } from '../auth'

export const getItems = () => (dispatch) => {
  dispatch({ type: GET_ITEMS_REQUEST });

  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ITEMS_FAILED
      });
    });
}


export const deleteItem = (_id) => (dispatch) => {
  dispatch({ type: DELETE_ITEM_REQUEST });

  axios
    .delete(`/api/items/${_id}`)
    .then(res =>
      dispatch({
        type: DELETE_ITEM_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: DELETE_ITEM_FAILED
      });
    });
}

export const addItem = (name, price) => (dispatch, getState) => {
  dispatch({ type: POST_ITEM_REQUEST });


  // Request body
  const body = JSON.stringify({ name, price });

  axios
    .post(`/api/items`, body, setConfig(getState))
    .then(res =>
      dispatch({
        type: POST_ITEM_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: POST_ITEM_FAILED
      });
    });
}

export const searchItem = (name) => (dispatch) => {
  dispatch({ type: 'SEARCH_ITEM_REQUEST' });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name });
  console.log("searchItem -> body", body)

  axios
    .get(`/api/items/search`, body, config)
    .then(res =>
      dispatch({
        type: 'SEARCH_ITEM_SUCCESS',
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: 'SEARCH_ITEM_FAIL'
      });
    });
}

