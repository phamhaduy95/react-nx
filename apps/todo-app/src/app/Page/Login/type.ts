export type LoginData = {
    email:string,
    password:string,
}

export type LoginErrorsMessage = {
    email:string|false,
    password:string|false,
    connection:string|false,
}

export type ErrorObject = { key: string; message: string };

export type LoginPageState = {
    loginData: LoginData,
    errorMessage:LoginErrorsMessage,
}


export type LoginPageStoreContext = {
       
}