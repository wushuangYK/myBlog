/**
 * Created by wushuang on 2018/7/30.
 */
import React from 'react'
import {Switch} from 'react-router-dom'
import {RouteWithSubRoutes, noMatchRoute} from '../config/router.config'

class CmnContainer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Switch>
                {this.props.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                <RouteWithSubRoutes {...noMatchRoute} />
            </Switch>
        )
    }
}

export default CmnContainer