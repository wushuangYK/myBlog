import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import SideMenu from './SideMenu'
import { Breadcrumb } from 'antd';
import { Layout } from 'antd';
import {isEmpty} from '../util/cmnf'
import {routes, RouteWithSubRoutes} from '../config/router.config'
require('../css/app.css');

const { Header, Content, Footer, Sider } = Layout;


const generateBreadItem = pathname => {
    let ret = [];
    let arr = pathname.split("/");
    let i = 0;
    arr.map(item => {
        if(!isEmpty(item)){
            ret.push(<Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>);
            i++;
        }
    });
    return ret;
};

const Bread = ({location}) => (
    <Breadcrumb style={{ margin: '16px 0' }}>
        {generateBreadItem(location.pathname)}
    </Breadcrumb>
);

const MyLayout = ({location}) => (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider
            collapsible
        >
            <SideMenu />
        </Sider>
        <Layout style={{overflowY:"auto", height:"100vh"}}>
            <Header style={{ background: '#fff', padding: 0, height:'10vh' }} />
            <Content style={{ margin: '1vh 16px 1vh', position:"relative"}}>
                <Route path="/" component={Bread} />
                <div style={{ padding: 24, background: '#fff', height:'75vh', overflow:"auto" }}>
                    <Switch>
                        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                    </Switch>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', height:'5vh',position:"relative"}}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
        </Layout>
    </Layout>
);


const App = () => (
    <Router>
        <div>
            <MyLayout />
        </div>
    </Router>
);


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);