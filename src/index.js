import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";
import NoMatch from './NoMatch'
import { Layout, Menu, Icon } from 'antd';
require('../css/app.css');

const { Header, Content, Footer, Sider } = Layout;

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
    </div>
);

const MySider = () => (
    <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
    >
        <div className="logo" />
        <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text">
                    <Link to="/">Home</Link>
                </span>
            </Menu.Item>
            <Menu.Item key="2">
                <Icon type="video-camera" />
                <span className="nav-text">
                    <Link to="/about">About</Link>
                </span>
            </Menu.Item>
            <Menu.Item key="3">
                <Icon type="upload" />
                <span className="nav-text">
                    <Link to="/topics">Topics</Link>
                </span>
            </Menu.Item>
            <Menu.Item key="4">
                <Icon type="user" />
                <span className="nav-text">
                    <Link to="/will-not-match">NoMatch</Link>
                </span>
            </Menu.Item>
        </Menu>
    </Sider>
);

const MyLayout = () => (
    <Layout>
        <MySider/>
        <Layout style={{marginLeft:'200px'}}>
            <Header style={{ background: '#fff', padding: 0, height:'10vh' }} />
            <Content style={{ margin: '2vh 16px 1vh', height:'80vh'}}>
                <div style={{ padding: 24, background: '#fff', height:'80vh'}}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/topics" component={Topics} />
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