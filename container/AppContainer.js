/**
 * Created by wushuang on 2018/8/14.
 */
import React from 'react'
import { Breadcrumb, Layout } from 'antd';
import SideMenu from '../component/interface/SideMenu'
import MyHeader from '../component/interface/MyHeader'
import {RouteWithSubRoutes, noMatchRoute} from '../config/router.config'
import {Route, Switch, withRouter} from 'react-router-dom'
import {isEmpty} from '../util/cmnf'
import Cache from '../sys/Cache'

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
class AppContainer extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        if(!Cache.getUser())
            this.props.history.push("/login")
    }

    render(){
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible>
                    <SideMenu />
                </Sider>
                <Layout style={{overflowY:"auto", height:"100vh"}}>
                    <Header style={{ background: '#fff', padding: 0, height:'10vh' }}>
                        <MyHeader />
                    </Header>
                    <Content style={{ margin: '1vh 16px 1vh', position:"relative"}}>
                        <Route path="/" component={Bread} />
                        <div style={{ padding: 24, background: '#fff', height:'75vh', overflow:"auto" }}>
                            <Switch>
                                {this.props.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                                <RouteWithSubRoutes {...noMatchRoute} />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', height:'5vh',position:"relative"}}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(AppContainer)