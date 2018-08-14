/**
 * Created by wushuang on 2018/8/14.
 */
import React from 'react'
import {Panel,DataPanel} from '../component/ui/UiComponent'
import {Row,Col,Input,Button,message} from 'antd'
import {Post,URL} from '../sys/Post'
import Cache from '../sys/Cache'
import {withRouter} from 'react-router-dom'
import {Md5} from '../util/md5'

class LoginContainer extends React.Component{
    constructor(props){
        super(props);
    }

    signup = () => {
        if(!this.username || !this.password){
            message.error("请输入用户名和密码");
            return;
        }
        let param = {
            username: this.username,
            password: Md5(this.password)
        };
        Post(URL.USER_SIGNUP, param).then(
            data => this.success(data),
            error => message.error(error)
        )
    };

    login = () => {
        if(!this.username || !this.password){
            message.error("请输入用户名和密码");
            return;
        }
        let param = {
            username: this.username,
            password: Md5(this.password)
        };
        Post(URL.USER_LOGIN, param).then(
            data => this.success(data),
            error => message.error(error)
        )
    };

    success = user_data => {
        Cache.setUser(user_data);
        this.props.history.push("/");
    };

    render(){
        const columns = [
            [
                {
                    title: "用户名",
                    component: Input,
                    props: {
                        onChange: e => this.username = e.target.value
                    }
                },
            ],
            [
                {
                    title: "密码",
                    component: Input,
                    props: {
                        type: "password",
                        onChange: e => this.password = e.target.value,
                        onPressEnter: this.login
                    }
                }
            ]
        ];
        return (
            <Row type="flex" justify="center" style={{marginTop:"30vh"}}>
                <Col span="8">
                    <Panel>
                        <Row type="flex" justify="center">
                            <Col span="16">
                                <DataPanel
                                    labelCol={6}
                                    wrapperCol={18}
                                    columns={columns}
                                />
                            </Col>
                        </Row>
                        <Row type="flex" justify="center">
                            <Button onClick={this.login}>登录</Button>
                            <Button onClick={this.signup} style={{marginLeft:"10px"}}>注册</Button>
                        </Row>
                    </Panel>
                </Col>
            </Row>
        )
    }
}

export default withRouter(LoginContainer)