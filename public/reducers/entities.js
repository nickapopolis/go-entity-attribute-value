import {
	ADD_ENTITY,
	SET_ENTITIES,
	SET_ENTITY_FIELD_VALUE,
	EDIT_ENTITY
} from '../actions/entities.js';
const initialState = {
	all: [],
	table: {
		rows: [],
		entity: null
	},
	edit: {
		name: ''
	}
};
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
	// focus action is dispatched when a new screen comes into focus
	case SET_ENTITIES:
		return {
			...state,
			all: action.entities || []
		};
	case SET_ENTITY_FIELD_VALUE:
		return {
			...state,
			edit: {
				...state.edit,
				[action.field]: action.value
			}
		};
	case ADD_ENTITY:
		return {
			...state,
			all: [
				...state.all,
				action.entity
			]
		};
	case EDIT_ENTITY:
		return {
			...state,
			edit: action.entity
		};
	default:
		return state;
	}
}