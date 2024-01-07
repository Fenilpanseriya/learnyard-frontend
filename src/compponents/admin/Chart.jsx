import React from 'react'
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,ArcElement,Legend} from "chart.js"
import {Line,Doughnut} from 'react-chartjs-2'
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,ArcElement,Legend);
export const LineChart = ({viewArray=[]}) => {
    const labels=lastYearMonth();
    const options={
        responsive:true,
        plugins:{
            legend:{
                position:"bottom",
            },
            title:{
                display:true,
                text:"Yearly Views"
            }
        }
    }
    const data={
        labels,
        datasets:[
            {
                label:"views",
                data:viewArray,
                borderColor:"rgba(107,70,193,0.5)",
                backgroundColor:"#6b46c1",
            }
        ]
    }
  return (
   <Line options={options}  data={data}/>
  )
}

export const  DoughnutChart=()=>{
    const labels=["Subscribed","nonSubscribed"];
    
    const data={
        labels,
        datasets:[
            {
                label:"views",
                data:[100,23],
                borderColor:["rgb(62,12,171,0.7)","rgb(214,43,127,0.8)"],
                backgroundColor:["rgba(62,12,171,0.3)","rgba(214,43,130,0.4)"],
                borderWidth:1,
            }
        ]
    }
    return (
        <Doughnut data={data}/>
    )

}


function lastYearMonth(){
    const labels=[];
    const months=[
        "January","February","March","April","May","June","July","August","September","October","November","December"
    ]
    const currMonth=new Date().getMonth();
    const remaining=11-currMonth;

    for (let index = currMonth; index >=0; index--) {
      const ele=months[index];
      labels.unshift(ele);
      if(index===0){
        break;
      }
       
    }
    
    for (let index = 11; index>currMonth; index--) {
        const element = months[index];
        labels.unshift(element);
        if(index===currMonth)break;
        
    }
    //console.log(labels);
    return labels;

}
