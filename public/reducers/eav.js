import {
	SET_ENTITY_DATA_TYPE,
	SET_ENTITY_DATA,
	CREATE_EAV
} from '../actions/eav.js';
import { SET_FIELD_VALUE } from '../actions/forms.js';
const initialState = {
	rows: null,
	entity: null,
	edit: {}
};
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
	case SET_ENTITY_DATA_TYPE:
		return {
			...state,
			entity: action.entity.id,
			rows: null
		};
	case SET_ENTITY_DATA:
		return {
			...state,
			rows: action.rows
		};
	case SET_FIELD_VALUE:
		if (action.id !== state.edit.id) return state;
		return {
			...state,
			edit: {
				...state.edit,
				[action.field]: action.value
			}
		};
	case CREATE_EAV:
		return {
			...state,
			edit: action.data
		};
	default:
		return state;
	}
}