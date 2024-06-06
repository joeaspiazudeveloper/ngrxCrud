import { createAction, props } from "@ngrx/store";
import { Client } from "../Model/client.model";

export const LOAD_CLIENT = '[client page]load client'
export const LOAD_CLIENT_SUCCESS = '[client page]load client success'
export const LOAD_CLIENT_FAIL = '[client page]load client fail'

export const ADD_CLIENT = '[client page]add client'
export const ADD_CLIENT_SUCCESS = '[client page]add client success'

export const UPDATE_CLIENT = '[client page]update client'
export const UPDATE_CLIENT_SUCCESS = '[client page]update client success'

export const DELETE_CLIENT = '[client page]delete client'
export const DELETE_CLIENT_SUCCESS = '[client page]delete client success'

export const LOAD_CLIENT_BY_ID = '[client page]load client by id'
export const LOAD_CLIENT_BY_ID_SUCCESS = '[client page]load client by id success'

export const OPEN_POPUP = '[client page]Open Popup'

export const loadClient = createAction(LOAD_CLIENT)
export const loadClientSuccess = createAction(LOAD_CLIENT_SUCCESS, props<{list: Client[]}>())
export const loadClientFail = createAction(LOAD_CLIENT_FAIL, props<{errorMessage: string}>())

export const addClient = createAction(ADD_CLIENT, props<{inputData: Client}>())
export const addClientSuccess = createAction(ADD_CLIENT_SUCCESS, props<{inputData: Client}>())

export const updateClient = createAction(UPDATE_CLIENT, props<{inputData: Client}>())
export const updateClientSuccess = createAction(UPDATE_CLIENT_SUCCESS, props<{inputData: Client}>())

export const deleteClient = createAction(DELETE_CLIENT, props<{id: number}>())
export const deleteClientSuccess = createAction(DELETE_CLIENT_SUCCESS, props<{id: number}>())

export const loadClientbyId = createAction(LOAD_CLIENT_BY_ID, props<{id: number}>())
export const loadClientbyIdSuccess = createAction(LOAD_CLIENT_BY_ID_SUCCESS, props<{obj: Client}>())

export const openPopup = createAction(OPEN_POPUP);
