/**
 * Created by wushuang on 2018/2/26.
 */
import React from 'react'
import {Row,Input,Button} from 'antd'
import {Md5} from '../../util/md5'

const TextArea = Input.TextArea;
export default class Md5Encoder extends React.Component{
    constructor(props){
        super(props);

        this.value = "";
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
                    MD5加密
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
                                res: Md5(this.value)
                            })
                        }}
                    >MD5加密</Button>
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