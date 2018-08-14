/**
 * Created by wushuang on 2018/2/9.
 */
import React from 'react'
import {Row,Col,Button,message,Input,Select} from "antd"
import {PostUid,URL} from '../../sys/Post'
import LzEditor from 'react-lz-editor'
import {Encoder} from '../../util/base64'
import BlogTypeSelect from '../../module/blog/BlogTypeSelect'
import {DataPanel} from '../../component/ui/UiComponent'
import '../../css/module/blog.css'

class BlogNew extends React.Component{
    constructor(props){
        super(props);

        this.receiveHtml = this.receiveHtml.bind(this);
        this.save = this.save.bind(this);

        this.data = {};
    }

    receiveHtml(html){

    }

    save(){
        let param = Object.assign({html: Encoder(this.html)}, this.data);
        PostUid(URL.BLOG_ADD, param).then(
            () => {
                message.success("保存成功!");
            }
        )
    }

    render(){
        const columns = [
            [
                {
                    span: 12,
                    labelCol: 2,
                    wrapperCol: 22,
                    title: "标题",
                    component: Input,
                    props: {
                        onChange: e => this.data.name = e.target.value
                    }
                },
                {
                    span: 4,
                    labelCol: 6,
                    wrapperCol: 18,
                    title: "分类",
                    component: BlogTypeSelect,
                    props: {
                        onSelect: val => this.data.blog_type = val,
                        style: {width:"100%"}
                    }
                },
                {
                    span: 8,
                    labelCol: 3,
                    wrapperCol: 21,
                    title: "标签",
                    component: Select,
                    props: {
                        onChange: val => this.data.tags = val,
                        mode: "tags",
                        style: {width:"100%"}
                    }
                }
            ],
            [
                {
                    title: "正文",
                    component: LzEditor,
                    props: {
                        className: "blog_edit",
                        cbReceiver: html => this.html = html,
                    }
                }
            ]
        ];
        return (
            <Row type="flex" justify="center">
                <Col span="24">
                    <DataPanel
                        labelCol={1}
                        wrapperCol={23}
                        columns={columns}
                    />
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