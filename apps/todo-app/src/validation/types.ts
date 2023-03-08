export type ErrorMessage<SchemaType> = {
    [Property in keyof SchemaType]: false|string; 
}

export type ErrorObject = { key: string; message: string };

