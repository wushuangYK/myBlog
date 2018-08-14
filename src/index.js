import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import {routes, RouteWithSubRoutes} from '../config/router.config'

const App = () => (
    <Router>
        <Switch>
            {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </Switch>
    </Router>
);


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);