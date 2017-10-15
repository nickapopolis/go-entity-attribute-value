import { push } from 'react-router-redux';
import { pushError } from './errors.js';
import uuid from 'uuid';
export const LOAD_ENTITY_DATA = 'LOAD_ENTITY_DATA';
export function loadEntityData(entityId) {
	return async function (dispatch) {
		var entityDataJSON = [
			{id: '1', field: 'field1'},
			{id: '2', field: 'field2'}
		];
		dispatch(setEntityData(entityDataJSON));
	};
}
export const SET_ENTITY_DATA_TYPE_ID = 'SET_ENTITY_DATA_TYPE_ID';
export function setEntityDataTypeID(entityId){
	return async function (dispatch) {

		let entityRes = await fetch('/api/1.0/entity/' + entityId, {
			method: 'GET',
			type: 'application/json'
		});
		let entityJSON = await entityRes.json();
		dispatch(setEntityDataType(entityJSON));
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

export const CREATE_EAV = 'CREATE_EAV';
export function create() {
	return {
		type: CREATE_EAV,
		data: {
			id: uuid.v4()
		}
	};
}
export const ADD_EAV = 'ADD_EAV';
export function add(data) {
	return {
		type: ADD_EAV,
		data
	};
}
export const SAVE_EAV = 'SAVE_EAV';
export function save() {
	return async function(dispatch, getState){
		let state = getState();
		let entityId = state.eav.entity;
		let body = state.eav.edit;
		try{
			await fetch('/api/1.0/eav/' + entityId, {
				method: 'POST',
				type: 'application/json',
				body: JSON.stringify(body)
			});
			dispatch(push('/eav/' + entityId));
		}catch(err){
			pushError(err);
		}
		
	};
}
export const EDIT_EAV_ID = 'EDIT_EAV_ID';
export function editID(id) {
	return function(dispatch, getState){
	};
}
export const EDIT_EAV = 'EDIT_EAV';
export function edit(data) {
	return {
		type: EDIT_EAV,
		data: data
	};
}