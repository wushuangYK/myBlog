/**
 * Created by wushuang on 2018/7/30.
 */
import React from 'react'
import {Row,Col,Button} from "antd"
import {Post,URL} from '../../sys/Post'
import {isEmpty} from '../../util/cmnf'
import BorderCard from '../../component/ui/BorderCard'

class Blog extends React.Component{
    constructor(props){
        super(props);

        this.getData = this.getData.bind(this);

        this.state = {
            data: [],
            record: {}
        }
    }

    componentWillMount(){
        this.getData();
    }

    getData(){
        Post(URL.BLOG_GETALL).then(
            data => {
                this.setState({data, record: data[0]});
            }
        )
    }

    render(){
        let {data, record} = this.state;
        let list = [];
        data.map((item, key) => {
            list.push(
                <Row type="flex" key={key}>
                    <Col span="14">
                        <a
                            style={{
                                marginLeft:"5px",
                                fontSize:"13px",
                                color:"#c88326"
                            }}
                            onClick={() => {
                                this.setState({
                                    record: item,
                                })
                            }}
                        >{(key+1)+". "+item.name}</a>
                    </Col>
                </Row>
            );
        });
        let timeRow = "";
        if(!isEmpty(record)){
            timeRow = (
                <Row type="flex">
                    <Col span="16"/>
                    <Col span="4">
                        {record.create_time}
                    </Col>
                    <Col span="1">
                        <Button
                            style={{color:"#c88326"}}
                            onClick={() => {

                            }}
                        >编辑</Button>
                    </Col>
                </Row>
            )
        }
        return (
            <Row
                type="flex"
                style={{
                    height:"100%",
                }}
            >
                <Col span="1"/>
                <Col span="5">
                    <BorderCard title="我的博客" style={{height:"95%"}}>
                        {list}
                    </BorderCard>
                </Col>
                <Col span="1"/>
                <Col
                    span="16"
                    style={{
                        backgroundColor:"#FFFFFF",
                        height:"95%",
                        marginTop:"2.5px"
                    }}
                >
                    <h1 style={{textAlign:"center"}}>{record.name}</h1>
                    {timeRow}
                    <iframe
                        style={{
                            marginLeft:"5%",
                            width:"90%",
                            height:"90%",
                            border:"none",
                        }}
                        src={record.url}
                    />
                </Col>
            </Row>
        )
    }
}

export default Blog