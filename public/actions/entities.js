import { push } from 'react-router-redux';
import uuid from 'uuid';
import _ from 'lodash';

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
export const CREATE_ENTITY = 'CREATE_ENTITY';
export function createEntity() {
	return {
		type: CREATE_ENTITY,
		entity: {
			id: uuid.v4(),
			fields: [],
			name: ''
		}
	};
}
export const ADD_ENTITY = 'ADD_ENTITY';
export function addEntity(entity) {
	return {
		type: ADD_ENTITY,
		entity: entity
	};
}
export const SAVE_ENTITY = 'SAVE_ENTITY';
export function save(entity) {
	var url = '/api/1.0/entity';
	if(entity.createdAt){
		url = url + '/' + entity.id;
	}
	return function(dispatch, getState){
		var {fields} = getState();
		const body = {
			...entity,
			fields: _.values(fields.edit)
		};
		fetch(url, {
			method: 'POST',
			type: 'application/json',
			body: JSON.stringify(body)
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