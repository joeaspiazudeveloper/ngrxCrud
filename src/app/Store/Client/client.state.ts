import { ClientModel } from "../Model/client.model";

export const ClientState: ClientModel = {
    list: [],
    errorMessage: '',
    clientObj: {
        id: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        status: true
    }
}