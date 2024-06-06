import { createReducer, on } from "@ngrx/store";
import { ClientState } from "./client.state";
import { addClientSuccess, deleteClientSuccess, loadClientFail, loadClientSuccess, loadClientbyIdSuccess, openPopup, updateClientSuccess } from "./client.action";

const _ClientReducer = createReducer(ClientState, 
    on(loadClientSuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errorMessage: ''
        }
    }),

    on(loadClientFail, (state, action) => {
        return {
            ...state,
            list: [],
            errorMessage: action.errorMessage
        }
    }),

    on(addClientSuccess, (state, action) => {
        const maxId = Math.max(...state.list.map(c => c.id));
        const newData = {...action.inputData};
        newData.id = maxId + 1;
        return {
            ...state,
            list: [...state.list, newData],
            errorMessage: ''
        }
    }),

    on(loadClientSuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errorMessage: ''
        }
    }),

    on(loadClientbyIdSuccess, (state, action) => {
        return {
            ...state,
            clientObj: action.obj,
            errorMessage: ''
        }
    }),

    on(updateClientSuccess, (state, action) => {
        const newData = state.list.map(o => {
            return o.id === action.inputData.id ? action.inputData : o
        })
        return {
            ...state,
            list: newData,
            errorMessage: ''
        }
    }),

    on(deleteClientSuccess, (state, action) => {
        const newData = state.list.filter(o => o.id!==action.id)
        return {
            ...state,
            list: newData,
            errorMessage: ''
        }
    }),

    on(openPopup, (state, action) => {
        return {
            ...state,
            clientObj: {
                id: 0,
                name: '',
                email: '',
                phone: '',
                address: '',
                status: true
            }
        }
    }),

)

export function ClientReducer(state: any, action: any) {
    return _ClientReducer(state, action)
}