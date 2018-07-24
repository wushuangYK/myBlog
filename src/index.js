import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import SideMenu from './SideMenu'
import { Breadcrumb } from 'antd';
import NoMatch from './NoMatch'
import { Layout } from 'antd';
import ToolsContainer from '../container/ToolsContainer'
import TaskContainer from '../container/TaskContainer'
import {isEmpty} from '../util/cmnf'
require('../css/app.css');

const { Header, Content, Footer, Sider } = Layout;

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const Welcome = () => (
    <div>
        <h2>Welcome!</h2>
    </div>
);

const Me = () => (
    <div>
        <h2>Hey!</h2>
    </div>
);

const generateBreadItem = pathname => {
    let ret = [];
    let arr = pathname.split("/");
    let i = 0;
    arr.map(item => {
        if(!isEmpty(item)){
            ret.push(<Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>)
            i++;
        }
    });
    return ret;
}

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
                <div style={{ padding: 24, background: '#fff', minHeight:'75vh', height:"auto" }}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/welcome" component={Welcome} />
                        <Route exact path="/me" component={Me} />
                        <Route path="/tools" component={ToolsContainer} />
                        <Route path="/task" component={TaskContainer} />
                        <Route component={NoMatch} />
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