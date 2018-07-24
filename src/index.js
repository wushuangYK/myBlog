import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import NoMatch from './NoMatch'
import { Layout } from 'antd';
import SideMenu from './SideMenu'
import ToolsContainer from '../container/ToolsContainer'
require('../css/app.css');

const { Header, Content, Footer } = Layout;

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

const MyLayout = () => (
    <Layout>
        <SideMenu />
        <Layout style={{marginLeft:'200px'}}>
            <Header style={{ background: '#fff', padding: 0, height:'10vh' }} />
            <Content style={{ margin: '2vh 16px 1vh', height:'80vh'}}>
                <div style={{ padding: 24, background: '#fff', height:'80vh'}}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/welcome" component={Welcome} />
                        <Route exact path="/me" component={Me} />
                        <Route path="/tools" component={ToolsContainer} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', height:'5vh' }}>
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