export interface IRegisterCustomer {
    "firstName": string,
    "lastName": string,
    "email": string,
    "password": string
}

export interface IReinitPasswordRequest {
    "email": string
}

export interface INewPasswordAfterForgot {
    "newPassword": string;
    "token": string;
}

export interface IAuthenticateCustomer {
    "email": string,
    "password": string
}

export interface ICustomerTokenPayload {
    "id": number; // A MODIFIER : IL MANQUE ID
    "customer" : string
    "roles": [];
    "username": string;
}

export interface ICustomerTokenData {
    token: string;
    customer: string; // ou un type spécifique pour les données du customer
}

export interface ICustomer {
    "defaultAddress": string;
    "email": string;
    "firstName": string;
    "fullName": string;
    "lastName": string;
}

export interface ICustomerChangePasswords {
    "newPassword": string;
    "confirmNewPassword": string;
    "currentPassword": string;
}

export interface ICustomerInformations {
    "email": string;
    "firstName": string;
    "lastName": string;
}

export interface ICustomerOrder {
    "paymentState": string;
    "shippingState": string;
    "id": number;
    "number": string;
    "total": number;
    //"createdAt": string;
    "checkout_completed_at" : string
}