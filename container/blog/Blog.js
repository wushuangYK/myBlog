/**
 * Created by wushuang on 2018/7/30.
 */
import React from 'react'
import {Row,Col,Tag} from "antd"
import {Post,URL} from '../../sys/Post'
import {Panel} from '../../component/ui/UiComponent'
import BlogTypeList from '../../module/blog/BlogTypeList'
import {json_decode} from '../../util/cmnf'

class Blog extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selectType: "",
            data: [],
            article: {}
        }
    }

    onSelectType = blog_type => {
        Post(URL.BLOG_GETBYTYPE, {blog_type}).then(
            data => {
                this.setState({data})
            }
        )
    };

    render(){
        let {article, data} = this.state;
        let list = data.map( (item, key) => (
            <Row style={{margin:"10px"}} key={key}>
                <a onClick={() => this.setState({article: item})}>
                    {(key+1)+"."+item.name}
                </a>
            </Row>
        ));
        return (
            <Row gutter={10}>
                <Col span="6">
                    <Panel title="列表" height="64vh">
                        <Row style={{height:"100%"}}>
                            <Col
                                span="10"
                                style={{borderRight:"1px solid #e9e9e9", height:"100%", overflow:"auto"}}
                            >
                                <BlogTypeList onSelectType={this.onSelectType}/>
                            </Col>
                            <Col
                                span="14"
                                style={{height:"100%", overflow:"auto",paddingLeft:"10px"}}
                            >
                                {list}
                            </Col>
                        </Row>
                    </Panel>
                </Col>
                <Col span="18">
                    <Panel height="68vh">
                        <Row type="flex" justify="center" style={{height:"3vh",fontSize:"2.5vh",fontWeight:"bold"}}>
                            {article.name}
                        </Row>
                        <Row type="flex" style={{height:"3vh",marginTop:"10px"}}>
                            <Col span="6" />
                            <Col span="2">
                                {article.username}
                            </Col>
                            <Col span="6">
                                {article.create_time}
                            </Col>
                            <Col span="10">
                                <Row type="flex">
                                    {json_decode(article.tags, []).map(item => (<Tag>{item}</Tag>))}
                                </Row>
                            </Col>
                        </Row>
                        <Row type="flex" style={{height:"55vh",marginTop:"1vh",}}>
                            <iframe
                                style={{
                                    width:"100%",
                                    overflow:"auto",
                                    border:"1px solid #e9e9e9"
                                }}
                                src={article.url}
                            />
                        </Row>
                    </Panel>
                </Col>
            </Row>
        )
    }
}

export default Blog