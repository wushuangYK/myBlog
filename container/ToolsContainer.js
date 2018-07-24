/**
 * Created by wushuang on 2018/2/23.
 */
import React from 'react'
import {Route,withRouter} from 'react-router-dom'
import {Row,Col,Button} from 'antd'
import Panel from '../component/uiWidget/Panel'
import Base64Encode from '../module/tools/Base64Encode'
import SimplePressureTest from '../module/tools/SimplePressureTest'
import JsonParser from '../module/tools/JsonParser'
import Md5Encoder from '../module/tools/Md5Encoder'
import ColorPanel from '../module/tools/ColorPanel'
import CalendarPanel from '../module/tools/CalendarPanel'

const LIST = [
    {
        name: "Base64",
        path: "base64"
    },
    {
        name: "JSON格式化",
        path: "jsonParser"
    },
    {
        name: "md5加密",
        path: "md5"
    },
    {
        name: "调色板",
        path: "colorPicker"
    },
    {
        name: "日历",
        path: "calendar"
    },
    {
        name: "简易压力测试",
        path: "simplePressureTest"
    },
];
class ToolsMainPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const getList = arr => {
            let res = [];
            let i = 1;
            arr.map(item => {
                res.push(
                    <Row type="flex">
                        <Col span="14">
                            <a
                                style={{
                                    marginLeft:"5px",
                                    fontSize:"16px",
                                    color:"#3200ff"
                                }}
                                onClick={() => {
                                    this.props.history.push("/tools/"+item.path)
                                }}
                            >{i+". "+item.name}</a>
                        </Col>
                    </Row>
                );
                i++;
            });
            return res;
        };
        return (
            <div style={{height:"100%"}}>
                <div style={{height:"95%"}}>
                    <Row
                        type="flex"
                        style={{
                            height:"100%",
                            backgroundImage: "url(../../resource/blog_bg.jpg)",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% 100%"
                        }}
                    >
                        <Col span="1"/>
                        <Col span="5">
                            {getList(LIST)}
                        </Col>
                        <Col span="1"/>
                        <Col
                            span="16"
                            style={{
                                backgroundColor:"#FFFFFF",
                                height:"95%",
                                marginTop:"2.5px",
                                padding:"10px",
                                overflowY:"auto"
                            }}
                        >
                            <Route exact path="/tools/base64" component={Base64Encode}/>
                            <Route exact path="/tools/simplePressureTest" component={SimplePressureTest}/>
                            <Route exact path="/tools/jsonParser" component={JsonParser}/>
                            <Route exact path="/tools/md5" component={Md5Encoder}/>
                            <Route exact path="/tools/colorPicker" component={ColorPanel}/>
                            <Route exact path="/tools/calendar" component={CalendarPanel}/>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default withRouter(ToolsMainPage)