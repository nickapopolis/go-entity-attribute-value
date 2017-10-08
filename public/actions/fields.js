import uuid from 'uuid';
export const CREATE_FIELD = 'CREATE_FIELD';
export function createField() {
	return (dispatch, getState)=>{
		const {entities} = getState();
		return dispatch({
			type: CREATE_FIELD,
			field: {
				entityId: entities.edit.id,
				id: uuid.v4()
			}
		});
	};
}