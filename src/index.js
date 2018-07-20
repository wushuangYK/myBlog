import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router} from "react-router-dom";
import {renderRoutes} from 'react-router-config'
import routes from '../router/router.config'

ReactDOM.render(
    <Router>
        <div>
            {renderRoutes(routes)}
        </div>
    </Router>,
    document.getElementById('root')
);