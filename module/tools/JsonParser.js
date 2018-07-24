/**
 * Created by wushuang on 2018/7/23.
 */
import React from 'react'
import {Row,Input,Button} from 'antd'

const TextArea = Input.TextArea;
export default class JsonParser extends React.Component{
    constructor(props){
        super(props);

        this.decode = this.decode.bind(this);

        this.state = {
            res: ""
        }
    }

    decode(){
        try{
            let jsonObj = JSON.parse(this.value);
            this.setState({
                res: JSON.stringify(jsonObj, null, "\t")
            })
        }catch(e){
            this.setState({
                res: "JSON校验失败!"
            })
        }
    }

    render(){
        return (
            <div>
                <Row
                    type="flex"
                    style={{marginLeft:"20px",fontSize:"20px",fontWeight:"bold"}}
                >
                    JSON格式化
                </Row>
                <Row type="flex" style={{margin:"20px"}}>
                    <TextArea
                        onChange={e => {
                            this.value = e.target.value;
                        }}
                        autosize={{minRows:10,maxRows:15}}
                    />
                </Row>
                <Row type="flex" justify="center">
                    <Button
                        type="primary"
                        onClick={this.decode}
                    >JSON格式化</Button>
                </Row>
                <Row type="flex" style={{margin:"20px"}}>
                    <TextArea
                        value={this.state.res}
                        autosize={{minRows:10,maxRows:15}}
                    />
                </Row>
            </div>
        )
    }
}