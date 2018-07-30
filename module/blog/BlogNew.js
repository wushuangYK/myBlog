/**
 * Created by wushuang on 2018/2/9.
 */
import React from 'react'
import {Row,Col,Button,message,Input} from "antd"
import {Post,URL} from '../../sys/Post'
import LzEditor from 'react-lz-editor'
import {Encoder} from '../../util/base64'

class BlogNew extends React.Component{
    constructor(props){
        super(props);

        this.receiveHtml = this.receiveHtml.bind(this);
        this.save = this.save.bind(this);
    }

    receiveHtml(html){
        this.html = html;
    }

    save(){
        let param = {
            name: this.name,
            html: Encoder(this.html)
        };
        Post(URL.BLOG_ADD, param).then(
            () => {
                message.success("保存成功!");
            }
        )
    }

    render(){
        return (
            <Row
                type="flex"
                style={{
                    height:"100%",
                    paddingTop:"20px",
                }}
            >
                <Col span="20" push="2">
                    <Row type="flex">
                        <Col span="1">
                            <div style={{marginTop:"4px",fontWeight:"bold"}}>
                                标题:
                            </div>
                        </Col>
                        <Col span="23">
                            <Input
                                onChange={e => {this.name = e.target.value}}
                            />
                        </Col>
                    </Row>
                    <Row type="flex" style={{marginTop:"10px"}}>
                        <LzEditor
                            cbReceiver={this.receiveHtml}
                            style={{height:"100%"}}
                            active={true}
                        />
                    </Row>
                    <Row type="flex" justify="end" style={{marginTop:"10px"}}>
                        <Button
                            type="primary"
                            onClick={this.save}
                        >保存</Button>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default BlogNew