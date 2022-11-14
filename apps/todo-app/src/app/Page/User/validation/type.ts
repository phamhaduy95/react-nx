export type PasswordInput = {
    oldPassword:string,
    newPassword:string,
    confirmPassword:string,
}

export type ErrorMessage<T> = {
    [Property in keyof T]: string |false;
}

export type UserEmailInput = {
    newEmail:string,
    password:string,
}

export enum PasswordErrorCode  {
    tooShort,
    requireLower,
    requireUpper,
    requireSpecial,
    requireNumber,
}



export type ErrorObject = { key: string; message: string };