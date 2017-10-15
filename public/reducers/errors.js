import {
	PUSH_ERROR
} from '../actions/errors.js';
const initialState = [];
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
	case PUSH_ERROR:
		return [
			...state,
			action.err
		];
	default:
		return state;
	}
}