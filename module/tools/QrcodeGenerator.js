/**
 * Created by wushuang on 2018/8/15.
 */
import React from 'react'
import {Row,Col,Input,Button} from 'antd'
import QRCode from 'qrcode.react'

export default class QrcodeGenerator extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            value: ""
        }
    }

    render(){
        return (
            <div>
                <Row
                    type="flex"
                    style={{marginLeft:"20px",fontSize:"20px",fontWeight:"bold"}}
                >
                    二维码
                </Row>
                <Row type="flex" style={{margin:"20px"}}>
                    <Input
                        onChange={e => this.value = e.target.value}
                    />
                </Row>
                <Row type="flex" justify="center">
                    <Button
                        type="primary"
                        onClick={() => {
                            this.setState({
                                value: this.value
                            })
                        }}
                    >生成二维码</Button>
                </Row>
                <Row type="flex" style={{margin:"20px"}}>
                    <QRCode value={this.state.value} />
                </Row>
            </div>
        )
    }
}