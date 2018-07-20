/**
 * Created by wushuang on 2018/7/20.
 */
import React from 'react'
import {Link} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

export default class Test1 extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <li><Link to="/t1/1">t1/1</Link></li>
                <li><Link to="/t1/2">t1/2</Link></li>
                <div>
                    {renderRoutes(this.props.route.routes)}
                </div>
            </div>
        )
    }
}