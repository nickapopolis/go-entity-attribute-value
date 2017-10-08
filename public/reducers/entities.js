import {
	ADD_ENTITY,
	SET_ENTITIES,
	EDIT_ENTITY,
	CREATE_ENTITY
} from '../actions/entities.js';
import {SET_FIELD_VALUE} from '../actions/forms.js';
import _ from 'lodash';
const initialState = {
	all: [],
	table: {
		rows: [],
		entity: null
	},
	edit: {
		name: '',
		fields: []
	}
};
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
	// focus action is dispatched when a new screen comes into focus
	case SET_ENTITIES:
		return {
			...state,
			all: _.map(action.entities, (entity)=>{
				return {
					...entity,
					fields: _.map(entity.fields, 'id')
				};
			})
		};
	case SET_FIELD_VALUE:
		if(action.id !== state.edit.id) return state;
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
			edit: {
				...action.entity,
				fields: _.map(action.entity.fields, 'id')
			}
		};
	case CREATE_ENTITY:
		return {
			...state,
			edit: action.entity
		};
	default:
		return state;
	}
}