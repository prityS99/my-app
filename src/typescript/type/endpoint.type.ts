type auth = {
    login: string;
    signup: string
}

type admin = {
    products: string
}

export type Endpoint = {
auth: auth;
admin: admin;
}