import {
	TOGGLE_DRAWER
} from '../actions/navigation';
const initialState = {
	drawer: {
		open: true
	}
};
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
	// focus action is dispatched when a new screen comes into focus
	case TOGGLE_DRAWER:
		return {
			...state,
			drawer: action.drawer,
		};
	default:
		return state;
	}
}