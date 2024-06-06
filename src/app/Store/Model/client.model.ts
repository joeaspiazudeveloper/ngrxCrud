export interface Client {
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    status: boolean
}

export interface ClientModel {
    list: Client[],
    clientObj: Client,
    errorMessage: string
}
