import React, { useState, useEffect } from 'react';
import {VictoryChart,
        VictoryLabel,
        VictoryLine, 
        VictoryAxis} from 'victory'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

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
      //console.log("dailyData inside:", dailyData)
      return victoryDay}
    ))
    )
    .catch(err => console.log(err))
  },[stateParam])
   console.log("dailyData outside:", dailyData)
   //THIS IS THE FUNCTION I WANT TO USE TO FORMAT THE X-AXIS DATES
   const formatDate = (date) => {
    // console.log("date indside function",date)
    let shortDate= new Date(date)
    let month = (shortDate.getMonth() + 1)
    let day = shortDate.getDate()
    return `${month}/${day}`
  }
 
  let foundState = StateNames.find(state =>state.abbreviation.toLowerCase() === stateParam)
  // const findData = dailyData.find(day => day.hospitalizedIncrease > 0)
  

  function checkForData() {
    const findData = dailyData.find(day => day.hospitalizedIncrease !== 0)
    console.log(findData === undefined? "undefined": "object")
    return findData === undefined && `No Data Available`
    // if (findData === undefined) {
    //   return `No Data Available`
    // }else {
    //   return("data is here")
    // }
  }
  
  console.log(foundState.name)
  
    return (
        <div className="statePage">
            <h1>for {foundState.name}</h1>
            <div className="chartHolder">
              <h2 className="caseNoData">{checkForData()}</h2>
        <VictoryChart
        domainPadding={{ x: [30, 10], y:[0,0] }}
        scale={{ x: "time", y: 'linear'}}
        >
          <VictoryLabel 
          text="PEOPLE" 
          x={30} y={30} 
          textAnchor="middle"
          style={{fontSize: 12}}
          />
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            //tickValues={[1, 2, 3, 4, 5]}
            // tickFormat={["Feb", "March", "April", "May", "June", "July"]}
            fixLabelOverlap={true}
            invertAxis={true}
            label="DAYS"
            name="x-axis"
            tickFormat={formatDate}
            style={{tickLabels: {fontSize: 8}, label: {fontSize: 8}}}
          />
          <VictoryAxis
            dependentAxis
            //offsetX={0}
            //crossAxis={false}
            //label="NUMBER OF PEOPLE"
            style={{tickLabels: {fontSize: 8}}}
          />
          
          <VictoryLine
          style={{ data: { stroke: "#cc0000", strokeWidth: .5 } }}
          offsetY={0}
          data={dailyData}
          x="date"
          y="hospitalizedIncrease"
          // padding={{top: 20, bottom: 200}} ?????
          />
        </VictoryChart>
      </div>
            <Link className="uSLink" to={`/`}>United States</Link>
        </div>
    );
}

export default StatePage;