/**
 * Created by wushuang on 2018/7/23.
 */
import React from 'react'
import { Panel as ColorPickerPanel } from 'rc-color-picker';
import {Row} from 'antd'

export default class ColorPanel extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Row
                    type="flex"
                    style={{marginLeft:"20px",fontSize:"20px",fontWeight:"bold"}}
                >
                    调色板
                </Row>
                <Row type="flex" style={{margin:"20px"}}>
                    <ColorPickerPanel />
                </Row>
            </div>
        )
    }
}