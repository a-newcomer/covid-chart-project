
import React, { useState, useEffect } from 'react';
import {VictoryBar,
        VictoryLabel,
        VictoryChart, 
        VictoryAxis} from 'victory'

import axios from 'axios'

function EntryPage(props) {
  
  let [dailyUSData, setDailyUSData] = useState([])

  useEffect(() => {
    axios.get(`https://covidtracking.com/api/v1/us/daily.json`)
    
    .then(response => setDailyUSData(response.data.map(
      day => {
        let victoryDay = {
        "date": day.dateChecked,
        "hospitalizedIncrease": day.hospitalizedIncrease
      }
      return victoryDay}
    ))
    )
    .catch(err => console.log(err))
  },[])
   //console.log("dailyUSData outside:", dailyUSData)

   const formatDate = (date) => {
    // console.log("date indside function",date)
    let shortDate= new Date(date)
    let month = (shortDate.getMonth() + 1)
    let day = shortDate.getDate()
    return `${month}/${day}`
  }

    return (
        <div className="statePage">
            <h1>for the United States</h1>
            <div className="chartHolder">
        <VictoryChart
        domainPadding={{ x: [0, 10], y:[0,0] }}
        scale={{ x: "time", y: 'linear'}}
        >
          <VictoryLabel 
          text="PEOPLE" 
          x={30} y={30} 
          textAnchor="middle"
          style={{fontSize: 12}}
          />
          <VictoryAxis
            tickFormat={formatDate}
            fixLabelOverlap={true}
            invertAxis={true}
            label="DAYS"
            name="x-axis"
            style={{tickLabels: {fontSize: 8}}}
          />
          <VictoryAxis
            dependentAxis
            //label="Number of People"
            name="y-axis"
            style={{tickLabels: {fontSize: 8}}}
          />
          <VictoryBar
          //style={{ data: { strokeWidth: 3, fill: "#c43a31", stroke: "cc0000" } }}
          data={dailyUSData}
          x="date"
          y="hospitalizedIncrease"
          />
        </VictoryChart>
      </div>
        </div>
    );
}

export default EntryPage;