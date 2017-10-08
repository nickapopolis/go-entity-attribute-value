
export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export function fieldChanged(id, field, value) {
	return {
		type: SET_FIELD_VALUE,
		id,
		field,
		value
	};
}