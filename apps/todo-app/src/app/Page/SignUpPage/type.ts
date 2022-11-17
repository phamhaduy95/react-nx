export type SignUpData = {
    displayName:string;
    email:string,
    password:string,
    confirmPassword:string,
}

export type ErrorsMessage = {
    displayName:string|false,
    email:string|false,
    password:string|false,
    confirmPassword:string|false,
    connection:string|false,
}

export type ErrorObject = { key: string; message: string };

export type LoginPageState = {
    signUpData: SignUpData,
    errorMessage:ErrorsMessage,
}


