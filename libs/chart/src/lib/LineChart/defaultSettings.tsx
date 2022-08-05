import { timeFormat } from "d3";
import { LineChartSettings } from "./type";

const defaultSettings: LineChartSettings = {
    height:400,
    width:400,
    axis:{
        XLength:350,
        YLength:350,
        offsetX:20,
        offsetY:20,
    },
    dots:{
        size:2
    },
    grid:false,
    tickFormat:"%x",
}

export const chartLineDefaultSettings:LineChartSettings = {...defaultSettings};

export function provideDefaultValueWhenNotProvided(settings:LineChartSettings){
    const tempSettings = {...defaultSettings,...settings};
    return tempSettings as Required<LineChartSettings>
}
