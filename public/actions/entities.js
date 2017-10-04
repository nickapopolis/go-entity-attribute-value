import { push } from 'react-router-redux';

export const FETCH_ENTITIES = 'FETCH_ENTITIES';
export function fetchEntities(open) {
	return function(dispatch){
		fetch('/api/1.0/entity', {
			method: 'GET',
			type: 'application/json'
		}).then(function(res){
			return res.json();
		}).then(function(res){
			dispatch(setEntities(res));
		});
	};
}
export const SET_ENTITIES = 'SET_ENTITIES';
export function setEntities(entities) {
	return {
		type: SET_ENTITIES,
		entities: entities
	};
}
export const ADD_ENTITY = 'ADD_ENTITY';
export function addEntity(entity) {
	return {
		type: ADD_ENTITY,
		entity: entity
	};
}
export const SET_ENTITY_FIELD_VALUE = 'SET_ENTITY_FIELD_VALUE';
export function fieldChanged(field, value) {
	return {
		type: SET_ENTITY_FIELD_VALUE,
		field: field,
		value: value
	};
}
export const SAVE_ENTITY = 'SAVE_ENTITY';
export function save(entity) {
	var url = '/api/1.0/entity';
	if(entity.id){
		url = url + '/' + entity.id;
	}
	return function(dispatch){
		fetch(url, {
			method: 'POST',
			type: 'application/json',
			body: JSON.stringify(entity)
		}).then(function(res){
			return res.json();
		}).then(function(res){
			dispatch(addEntity(res));
			dispatch(push('/'));
		});
	};
}
export const EDIT_ENTITY_ID = 'EDIT_ENTITY_ID';
export function editEntityID(id) {
	var url = '/api/1.0/entity/' + id;
	return function(dispatch){
		fetch(url, {
			method: 'GET',
			type: 'application/json'
		}).then(function(res){
			return res.json();
		}).then(function(res){
			dispatch(editEntity(res));
		});
	};
}
export const EDIT_ENTITY = 'EDIT_ENTITY';
export function editEntity(entity) {
	return {
		type: EDIT_ENTITY,
		entity: entity
	};
}