import {
	GET_ITEMS_REQUEST,
	GET_ITEMS_FAILED,
	GET_ITEMS_SUCCESS,
	POST_ITEM_FAILED,
	POST_ITEM_SUCCESS,
	DELETE_ITEM_REQUEST,
	DELETE_ITEM_FAILED,
	DELETE_ITEM_SUCCESS,
	UPDATE_ITEM_REQUEST,
	UPDATE_ITEM_FAILED,
	UPDATE_ITEM_SUCCESS
} from '../constants/inventory'

const initialState = {
	list: [],
	loading: false,
	error: false
}

const inventoryReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SEARCH_ITEM_REQUEST':
		case DELETE_ITEM_REQUEST:
		case GET_ITEMS_REQUEST:
			return {
				...state,
				loading: true
			}
		case 'SEARCH_ITEM_SUCCESS':
		case DELETE_ITEM_SUCCESS:
		case GET_ITEMS_SUCCESS:
			return {
				...state,
				loading: false,
				list: action.payload
			}
		case POST_ITEM_SUCCESS:
			const listCopy = state.list.slice()
			listCopy.push(action.payload)

			return {
				...state,
				list: listCopy
			}
		case GET_ITEMS_FAILED:
		case DELETE_ITEM_FAILED:
		case POST_ITEM_FAILED:
			return {
				...state,
				error: true
			}
		default:
			return state
	}
}

export default inventoryReducer