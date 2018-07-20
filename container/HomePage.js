/**
 * Created by wushuang on 2018/7/20.
 */
import React from 'react'
import {Link} from 'react-router-dom'

export default class HomePage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                this is home page
                <li><Link to="/t1">t1</Link></li>
                <li><Link to="/t2">t2</Link></li>
            </div>
        )
    }
}