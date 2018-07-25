/**
 * Created by wushuang on 2018/2/23.
 */
import React from 'react'
import {withRouter} from 'react-router-dom'
import {Row,Col} from 'antd'
import {RouteWithSubRoutes} from '../config/router.config'

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
                    <Row type="flex" key={i}>
                        <Col span="14">
                            <a
                                style={{
                                    marginLeft:"5px",
                                    fontSize:"16px",
                                    color:"rgba(0, 0, 0, 0.65)"
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
            <Row type="flex" style={{height:"100%"}}>
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
                    {this.props.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                </Col>
            </Row>
        )
    }
}

export default withRouter(ToolsMainPage)