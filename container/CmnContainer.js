/**
 * Created by wushuang on 2018/7/30.
 */
import React from 'react'
import {withRouter} from 'react-router-dom'
import {Row,Col} from 'antd'
import {RouteWithSubRoutes} from '../config/router.config'

class CmnContainer extends React.Component{
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

export default withRouter(CmnContainer)