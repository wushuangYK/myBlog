/**
 * Created by wushuang on 2018/8/14.
 */
import React from 'react'
import {withRouter} from 'react-router-dom'
import Cache from '../../sys/Cache'
import {Row,Col} from 'antd'

class MyHeader extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            uid: Cache.getUid(),
            username: Cache.getUsername()
        }
    }

    logout = () => {
        Cache.removeUser();
        this.props.history.push("/login");
    };

    render(){
        let {username, uid} = this.state;
        return (
            <Row type="flex" align="middle" style={{height:"100%"}}>
                <Col span="2" />
                <Col span="10" style={{fontSize: "3vh"}}>
                    欢迎您: {username}
                </Col>
                <Col span="10">
                    <Row type="flex" justify="end" style={{fontSize: "2vh"}}>
                        uid: {uid}
                        <a style={{marginLeft:"10px"}} onClick={this.logout}>退出</a>
                    </Row>
                </Col>
                <Col span="2" />
            </Row>
        )
    }
}

export default withRouter(MyHeader)