
export type BarStackCharSettingsType = {
    axis:{
        /** length of X axis, the total of XLength and offsetLeft should be smaller than 400 */
        XLength:number; 
        /** length of Y axis,  the total of YLength and offsetTop should be smaller than 400 */
        YLength:number;
        /** the offset from the top edge of the svg element*/
        offsetTop:number;
         /** the offset from the left edge of the svg element*/
        offsetLeft:number; 
    }
    /**  padding size relatively to the size of rect. value is [0,1] */
    padding: number;
    /** width of the svg */
    width:number;
    /** height of the svg */
    height:number;
    
    legends: {
        position:"top"|"bottom"|"right"|"left";
    }

}

type BaseDataType = {
    [n:string]:number;
}

export type StackDataType<T extends BaseDataType = BaseDataType> = {
    key:string;
    valuesList:T
}

export type BarStackChartProps = {
    dataSet: StackDataType[];
    settings: BarStackCharSettingsType;
    className?:string
}

