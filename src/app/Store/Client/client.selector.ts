import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ClientModel } from "../Model/client.model";

const getClientState = createFeatureSelector<ClientModel>('client')

export const getClientList = createSelector(getClientState, (state) => {
    return state.list;
})

export const getClientById = createSelector(getClientState, (state) => {
    return state.clientObj;
})