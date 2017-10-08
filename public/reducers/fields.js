import {
	SET_ENTITIES,
	EDIT_ENTITY
} from '../actions/entities.js';
import {
	SET_FIELD_VALUE
} from '../actions/forms.js';
import {
	CREATE_FIELD,
} from '../actions/fields.js';
import _ from 'lodash';
const initialState = {
	all: {},
	edit: {}
};
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
	case SET_ENTITIES:
		return {
			...state,
			all: _.chain(action.entities)
				.map('fields')
				.flatten()
				.keyBy('id')
				.value()
		};
	case CREATE_FIELD:
		return {
			...state,
			edit: {
				[action.field.id]: action.field
			}
		};
	case SET_FIELD_VALUE:
		if(!state.edit[action.id]) return state;
		return {
			...state,
			edit: {
				...state.edit,
				[action.id]: {
					...state.edit[action.id],
					[action.field]: action.value
				}
			}
		};
	case EDIT_ENTITY:
		return {
			...state,
			edit: _.keyBy(action.entity.fields, 'id')
		};
	default:
		return state;
	}
}