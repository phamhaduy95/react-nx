import { useState } from "react";
import BarStackChart from "./BarStackedChart";
import { StackDataType, BarStackCharSettingsType } from "./type";

type DataType = {
    completed:number;
    fail:number;
    unfinished:number;
  }
  
  const data:StackDataType<DataType>[] = [
    { key: "January", valuesList:{ completed: 16, unfinished: 12, fail: 5 }},
    { key: "February",valuesList: {completed: 12, unfinished: 10,fail:5 }},
    { key: "March", valuesList: { completed: 8, unfinished: 10, fail: 0 }},
    { key: "April", valuesList: { completed: 0, unfinished: 3, fail: 1 }},
    { key: "june", valuesList: { completed: 10, unfinished: 0, fail: 0 }},
  ];
  
  const settings:BarStackCharSettingsType= {
    height:450,
    width:450,
    padding:0.2,
    axis:{
      XLength:350,
      YLength:350,
      offsetLeft:30,
      offsetTop:30
    },
    legends:{
      position:"right"
    }
  }
  
 export default function BarStackedChartApp() {
      const [height,setHeight] = useState(10);
      const handleCLick = (e:React.MouseEvent)=>{
          setHeight(height+10);
      }
    return (
      <BarStackChart dataSet={data} settings={settings}/>
    )
  }