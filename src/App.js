import React from 'react';
import {Route, Switch} from 'react-router-dom'
import EntryPage from './components/EntryPage'
import StatePage from './components/StatePage'
import StatesMenu from './components/StatesMenu'
//import StateNames from './states_titlecase'


function App() {

  return (
    <div className="App">
      <h2>COVID 19 Tracking USA</h2>
      <h1>Daily change in Hospitalizations</h1>
      <div className="contentHolder">
        <StatesMenu />
        <Switch>
          {/* THE HOME PAGE IS COMMENTED OUT, BECAUSE IT'S THE ONE THING I CAN'T GET ROUTED CORRECTLY - IT WON'T MOVE TO AN INDIVIDUAL STATE PAGE, ALTHOUGH YOU CAN SEE THE STATE PATH IN THE URL! HOPEFULLY I'M JUST FORGETTING SOMETHING OBVIOUS HERE*/}
          <Route exact path="/" component={EntryPage}>
           <EntryPage />
          </Route>
          <Route path="/individualStateDailyHosp/:stateParam">
            <StatePage />
          </Route>
        </Switch>
      </div>
      <h3 style={{alignSelf: "center"}}>Ann's React Project Module 4</h3>
  </div>
  );
}

export default App;
