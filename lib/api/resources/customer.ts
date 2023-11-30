import { IRegisterCustomer, IAuthenticateCustomer, ICustomerChangePasswords, ICustomerInformations, ICustomerOrder, IReinitPasswordRequest, INewPasswordAfterForgot } from '../../../types/resources/customerTypes';
import { postResource, getResource, putResource, getCustomerResource } from '../client';
import { getCustomerIdFromToken } from '../../resource/customer';
import Cookies from 'js-cookie';

export const reinitPasswordRequest = async (email: IReinitPasswordRequest): Promise<boolean> => {
    const body = email;
    
    const isMailSent = await postResource('shop/customers/password/reinit-request', null, null, body);

    return isMailSent;
} 

export const validatePasswordToken = async (token: string): Promise<boolean> => {
    const body = {
        "token": token
    };
    
    const isTokenValid = await postResource('shop/customers/password/validate-token', null, null, body);

    return isTokenValid;
} 


export const changeCustomerPasswordAfterForgot = async (newPassord: INewPasswordAfterForgot): Promise<boolean> => {
    const body = newPassord;
    
    const isNewPasswordSet = await postResource('shop/customers/password/reinit', null, null, body);

    return isNewPasswordSet;
} 

export const registerCustomer = async (customer: IRegisterCustomer): Promise<any> => {
    const body = customer;
    
    const isCustomerCreated = await postResource('shop/customers/', null, null, body);
    return isCustomerCreated;
}

export const authenthcateCustomer = async (customerCredentials: IAuthenticateCustomer): Promise<any>  => {
    const body = customerCredentials;

    const customerToken = await postResource('shop/authentication-token', null, null, body);

    return customerToken;
}

export const changeCustomerPassword = async (customerPasswords: ICustomerChangePasswords): Promise<any> => {
    const body = customerPasswords;

    //console.log("Password => getID")
    const customerId = getCustomerIdFromToken();

    if (customerId) {
        return await putResource('shop/customers/{id}/password', {
            "id": customerId
        }, null, body)
    }

    return false;
}

export const changeCustomerInformations = async (customerInformations: ICustomerInformations): Promise<any> => {
    const body = customerInformations;

    const customerId = getCustomerIdFromToken();

    if (customerId) {
        return await putResource('shop/customers/{id}', {
            "id": customerId
        }, null, body)
    }

    return false;
}

export const getCustomer = async (customerId: number): Promise<any> => {
    console.log("getCustomer:", customerId)
    const customer = await getCustomerResource('shop/customers/{id}', {
        "id": customerId
    });

    return customer;
}

export const isEmailRegistered = async (email: string): Promise<boolean> => {
    return await getResource('shop/customers/email/{id}', {
        "id": email
    });
}

export const getCustomerOrders = async (): Promise<any> => {
    //console.log("get orders")
    const orders: ICustomerOrder[] | false = await getResource('shop/orders');
    
    return orders;
}

export const getCustomerFromCookie = async (): Promise<any> => {
    //console.log("COOKIE:",Cookies.getJSON('customerToken'));


    const customerId = getCustomerIdFromToken();
    //console.log("CUSTOMER ID:",customerId)
    if (customerId) {
        return await getCustomer(customerId);
    } 

    return false;
}