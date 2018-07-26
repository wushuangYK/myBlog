/**
 * Created by wushuang on 2018/7/24.
 */
import React from 'react'
import {Row,Col} from 'antd'
import BorderCard from '../../component/ui/BorderCard'

export default class TaskHomePage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Row>
                <Col span="12">
                    <BorderCard>
                        <div style={{width:"100px", height:"100px"}}>111</div>
                    </BorderCard>
                </Col>
            </Row>
        )
    }
}