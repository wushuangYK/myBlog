/**
 * Created by wushuang on 2018/2/26.
 */
import React from 'react'
import {Calendar} from 'antd'

export default class CalendarPanel extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Calendar />
        )
    }
}