import React from 'react';
import {Link} from 'react-router-dom'

import StateNames from '../states_titlecase.js'

function StatesMenu(props) {
const menu = StateNames.map(state =>
    <li key={state.abbreviation}>
        <Link className="detailLink" to={`/individualStateDailyHosp/${state.abbreviation.toLowerCase()}`}>
            {state.name}
        </Link>
    </li>)
    return (
        <nav>
            <ul>
                {menu}
            </ul>
        </nav>
    );
}

export default StatesMenu;