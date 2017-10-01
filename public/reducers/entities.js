import _ from 'lodash';
import {
	ADD_ENTITY,
	SET_ENTITIES,
	SET_ENTITY_FIELD_VALUE
} from '../actions/entities.js';
const initialState = {
	all: [],
	edit: {}
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
	default:
		return state;
	}
}