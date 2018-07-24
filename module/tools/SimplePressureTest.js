/**
 * Created by wushuang on 2018/7/23.
 */
import React from 'react'
import {Row,Input,Button,InputNumber} from 'antd'
import {isEmpty} from '../../util/cmnf'
import {Post} from '../../sys/Post'

export default class SimplePressureTest extends React.Component{
    constructor(props){
        super(props);

        this.send = this.send.bind(this);

        this.state = {
            url: "",
            times: ""
        }
    }

    send(){
        let {url, times} = this.state;
        for(let i = 0;i<times;i++){
            Post(url);
        }
    }

    render(){
        let {url,times} = this.state;
        return (
            <div>
                <Row
                    type="flex"
                    style={{marginLeft:"20px",fontSize:"20px",fontWeight:"bold"}}
                >
                    简易压力测试(v0.1)
                </Row>
                <Row type="flex" style={{margin:"20px"}}>
                    URL
                    <Input
                        onChange={e => {
                            this.setState({url: e.target.value})
                        }}
                        style={{width:"500px"}}
                    />
                </Row>
                <Row type="flex" style={{margin:"20px"}}>
                    次数
                    <InputNumber
                        onChange={times => {
                            this.setState({times})
                        }}
                        style={{width:"50px"}}
                        min={1}
                    />
                </Row>
                <Row type="flex" style={{margin:"20px"}}>
                    <Button
                        disabled={isEmpty(url) || isEmpty(times)}
                        type="primary"
                        onClick={this.send}
                    >发送</Button>
                </Row>
            </div>
        )
    }
}