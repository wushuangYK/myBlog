/**
 * Created by wushuang on 2018/7/24.
 */
import React from 'react'
import {RouteWithSubRoutes} from '../config/router.config'

export default class TaskContainer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                {this.props.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
            </div>
        )
    }
}