import React, { useState, useEffect } from 'react';
import {VictoryLine,
        VictoryChart, 
        VictoryAxis} from 'victory'
import axios from 'axios'
import {useParams} from 'react-router-dom'

import StateNames from '../states_titlecase.js'
function StatePage(props) {
  const {stateParam} = useParams()
  
  let [dailyData, setDailyData] = useState([])

  useEffect(() => {
    axios.get(`https://covidtracking.com/api/v1/states/${stateParam.toLowerCase()}/daily.json`)

    .then(response => setDailyData(response.data.map(
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
   console.log("dailyData outside:", dailyData)
   //THIS IS THE FUNCTION I WANT TO USE TO FORMAT THE X-AXIS DATES
   const formatDate = (date) => {
    let shortDate= new Date(date)
    let month = (shortDate.getMonth())
    let day = shortDate.getDate()
    return `${month}/${day}`
  }
 
  let foundState = StateNames.find(state =>state.abbreviation.toLowerCase() === stateParam)
  
    return (
        <div className="statePage">
            <h1>for {foundState.name}</h1>
            <div className="chartHolder">
        <VictoryChart
        domainPadding={{ x: [30, 10], y:[0,0] }}
        scale={{ x: "time", y: 'linear'}}
        >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            //tickValues={[1, 2, 3, 4, 5]}
            // tickFormat={["Feb", "March", "April", "May", "June", "July"]}
            fixLabelOverlap={true}
            invertAxis={true}
            label="DAYS"
            name="x-axis"
            // scale={{ x: "time" }}
            style={{tickLabels: {fontSize: 8}, label: {fontSize: 8}}}
          />
          <VictoryAxis
            dependentAxis
            //offsetX={0}
            //crossAxis={false}
            // tickFormat specifies how ticks should be displayed
            //tickFormat={(x) => (`$${x / 1000}k`)}
            //tickFormat={[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50]}
            label="NUMBER OF PEOPLE"
            style={{tickLabels: {fontSize: 8}}}
          />
          
          <VictoryLine
          style={{ data: { /*fill: "#c43a31",*/stroke: "#cc0000", strokeWidth: .5 } }}
          offsetY={0}
          data={dailyData}
          x="date"
          y="hospitalizedIncrease"
          // padding={{top: 20, bottom: 200}} ?????
          />
        </VictoryChart>
      </div>
        </div>
    );
}

export default StatePage;