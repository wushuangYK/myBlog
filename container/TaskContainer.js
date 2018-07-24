/**
 * Created by wushuang on 2018/7/24.
 */
import React from 'react'
import {Route} from 'react-router-dom'
import TaskHomePage from '../module/task/TaskHomePage'
import TaskNew from '../module/task/TaskNew'

export default class TaskContainer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Route exact path="/task/home" component={TaskHomePage}/>
                <Route exact path="/task/new" component={TaskNew}/>
            </div>
        )
    }
}