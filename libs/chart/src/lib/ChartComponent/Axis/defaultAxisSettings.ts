import { AxisSettings } from './type';
const defaultSettings:AxisSettings = {
    length:300,
    offset:{
        left:20,
        top:20,
    },
    orient:"bottom",
    gird:false,
    girdLength:300,
    ticks:false,
    ticksFormat:false,
}

export const defaultAxisSetting = {...defaultSettings};

export function provideDefaultValueForInputSetting(settings:AxisSettings){
    return {...settings,defaultSettings} as Required<AxisSettings>
}