/**
 * Created by wushuang on 2018/7/24.
 */
import React from 'react'
import {Row,Col} from 'antd'
import {Panel} from '../../component/ui/UiComponent'

export default class TaskHomePage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Row>
                <Col span="12">
                    <Panel>
                        <div style={{width:"100px", height:"100px"}}>111</div>
                    </Panel>
                </Col>
            </Row>
        )
    }
}