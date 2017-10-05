export const LOAD_ENTITY_DATA = 'LOAD_ENTITY_DATA';
export function loadEntityData(entityId) {
	return async function (dispatch) {

		let entityRes = await fetch('/api/1.0/entity/' + entityId, {
			method: 'GET',
			type: 'application/json'
		});
		let entityJSON = await entityRes.json();
		dispatch(setEntityDataType(entityJSON));
		var entityDataJSON = [
			{ID: '1'},
			{ID: '2'}
		];
		dispatch(setEntityData(entityDataJSON));
	};
}
export const SET_ENTITY_DATA_TYPE = 'SET_ENTITY_DATA_TYPE';
export function setEntityDataType(entity){
	return {
		type: SET_ENTITY_DATA_TYPE,
		entity: entity
	};
}
export const SET_ENTITY_DATA = 'SET_ENTITY_DATA';
export function setEntityData(data){
	return {
		type: SET_ENTITY_DATA,
		rows: data
	};
}