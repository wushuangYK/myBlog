/**
 * Created by wushuang on 2018/7/23.
 */
import React from 'react'
import {Row,Input,Button} from 'antd'
import {Encoder,Decoder} from '../../util/base64'

const TextArea = Input.TextArea;
export default class Base64Encode extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            res: ""
        }
    }

    render(){
        return (
            <div>
                <Row
                    type="flex"
                    style={{marginLeft:"20px",fontSize:"20px",fontWeight:"bold"}}
                >
                    Base64加密解密
                </Row>
                <Row type="flex" style={{margin:"20px"}}>
                    <TextArea
                        onChange={e => {
                            this.value = e.target.value;
                        }}
                        autosize={{minRows:8,maxRows:8}}
                    />
                </Row>
                <Row type="flex" justify="center">
                    <Button
                        type="primary"
                        onClick={() => {
                            this.setState({
                                res: Encoder(this.value)
                            })
                        }}
                    >加密</Button>
                    <Button
                        type="primary"
                        style={{marginLeft:"100px"}}
                        onClick={() => {
                            this.setState({
                                res: Decoder(this.value)
                            })
                        }}
                    >解密</Button>
                </Row>
                <Row type="flex" style={{margin:"20px"}}>
                    <TextArea
                        value={this.state.res}
                        autosize={{minRows:8,maxRows:8}}
                    />
                </Row>
            </div>
        )
    }
}