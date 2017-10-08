import {
	SET_ENTITY_DATA_TYPE,
	SET_ENTITY_DATA
} from '../actions/eav.js';
const initialState = {
	rows: [],
	entity: {
		name: '',
		fields: []
	}
};
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
	case SET_ENTITY_DATA_TYPE:
		return {
			...state,
			entity: action.entity
		};
	case SET_ENTITY_DATA:
		return {
			...state,
			rows: action.rows
		};
	default:
		return state;
	}
}