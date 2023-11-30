import { authenthcateCustomer, changeCustomerInformations, changeCustomerPassword, registerCustomer, reinitPasswordRequest, changeCustomerPasswordAfterForgot, isEmailRegistered } from '../api/resources/customer';
import Cookies from 'js-cookie';
import { NextRouter } from "next/router";
import { ICustomerTokenPayload } from "../../types/resources/customerTypes";
import { ICustomerTokenData } from '../../types/resources/customerTypes';
import jwt from 'jwt-decode';

export const checkIfUserExist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const email = target.email.value;
    
    return await isEmailRegistered(email);
}

export const submitForgottenPassword = async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    const email = {
        "email": target.email.value
   }

   return await reinitPasswordRequest(email);
}

export const submitNewPasswordAfterForgot = async (event: React.FormEvent<HTMLFormElement>, token: string): Promise<boolean> => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    const newPassword = {
        "newPassword": target.newPassword.value,
        "token": token
   }

   return await changeCustomerPasswordAfterForgot(newPassword);
}


export const submitRegister = async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    const customer = {
        "firstName": target.firstName.value,
        "lastName": target.lastName.value,
        "email": target.email.value,
        "password": target.password.value,
   }

   return await registerCustomer(customer);
}

export const submitConnexion = async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    const customerCredentials = {
        "email": target.email.value,
        "password": target.password.value,
    }

    return await authenthcateCustomer(customerCredentials);
}


export const submitNewPassword = async (event : React.FormEvent<HTMLFormElement>): Promise<any>  => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    const customerPasswords = {
        "newPassword": target.newPassword.value,
        "confirmNewPassword": target.confirmNewPassword.value,
        "currentPassword": target.currentPassword.value
    }

    return await changeCustomerPassword(customerPasswords);
}

export const submitNewCustomerInformations = async (event : React.FormEvent<HTMLFormElement>): Promise<any>  => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    const customerInformations = {
        "firstName": target.firstName.value,
        "lastName": target.lastName.value,
        "email": target.email.value
    }

    return await changeCustomerInformations(customerInformations);
}

export const storeCustomerToken = (customerToken: string) => {
    
    Cookies.set('customerToken', customerToken, { sameSite:'strict' });
    //console.log("stokage du token dans cookie",jwt(Cookies.get('customerToken')))
    
   
}

function extractCustomerId(url: string): number | false {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    
    if (!isNaN(parseInt(lastPart))) {
        return parseInt(lastPart);
    }

    return false;
}


export const getCustomerTokenFromCookie = (): string | false => {
    const customerToken = Cookies.get('customerToken');
    //console.log("Get token dans cookie: ",customerToken)
    if (customerToken) {
        return customerToken;
    }
    return false;
}

export const getCustomerIdFromToken = (): number | false => {
    const customerToken = getCustomerTokenFromCookie();
    //console.log("getCustomerIdFromToken: customerToken= ID?",customerToken)
    if (customerToken) {
        const customerData = JSON.parse(customerToken);
            //console.log("Parsed Customer Data:", customerData);
        //const customerTokenDecoded: ICustomerTokenPayload = jwt(customerToken);
        if (customerData.customer) {
            const customerId= extractCustomerId(customerData.customer)
            //console.log("ID:",customerId)
            return customerId;
        }
    }

    return false;
}

export const removeCustomerTokenFromCookie = () => {
    
    Cookies.remove('customerToken');
}

export const logoutCustomer = (router: NextRouter) => {
    console.log("LogoutCustomer => login")
    removeCustomerTokenFromCookie();
    router.push('/account/login');
}