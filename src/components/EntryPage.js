
import React, { useState, useEffect } from 'react';
import {VictoryBar, 
        VictoryLine,
        VictoryChart, 
        VictoryAxis} from 'victory'

import axios from 'axios'

function StatePage(props) {
  
  let [dailyUSData, setDailyUSData] = useState([])
// I KNOW THIS NEEDS REFACTORING SO I DONT HAVE TO DO THIS ON BOTH THE STATE AND US/ENTRY PAGES, BUT LATER.
  useEffect(() => {
    axios.get(`https://covidtracking.com/api/v1/us/daily.json`)
    // 
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

    return (
        <div className="statePage">
            <h2>This is the United State's Page</h2>
            <div className="chartHolder">
        <VictoryChart
        //domainPadding={{ x: [30, 10], y:[0,0] }}
        scale={{ x: "time", y: 'linear'}}
        >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            //tickValues={[1, 2, 3, 4, 5]}
            // tickFormat={["Feb", "march", "April", "May", "June", "July"]}
            fixLabelOverlap={true}
            invertAxis={true}
            label="Days"
            name="x-axis"
            // scale={{ x: "time" }}
            style={{tickLabels: {fontSize: 8}}}
          />
          <VictoryAxis
            dependentAxis
            //offsetX={0}
            //crossAxis={false}
            // tickFormat specifies how ticks should be displayed
            //tickFormat={(x) => (`$${x / 1000}k`)}
            //tickFormat={[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50]}
            label="Number of People"
            style={{tickLabels: {fontSize: 8}}}
          />
          <VictoryBar
          //style={{ data: { fill: "#c43a31" } }}
          //offsetY={0}
          data={dailyUSData}
          //HERE'S THE PROBLEM - HOW TO FEED IN THE DATE FORMATTING FUNCTION I MADE - SEE THE STATE PAGE, WHERE I HAVE IT NOW
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