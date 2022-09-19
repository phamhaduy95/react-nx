
type DataWithID<T> = T & {uuid:string};

export type ColumnsDefType<T> = {
    [key in keyof T as Exclude<key,"uuid">]: {
        headerName?:string,
        valueFormatter?:(value:T[key],rowData:T)=>string,
        renderHeader?:(value:T[key],rowData:T)=>JSX.Element,
        type?:"string"|"dateTime"|"date"|"number"|"select";
    }
}



