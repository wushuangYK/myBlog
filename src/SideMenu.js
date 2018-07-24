/**
 * Created by wushuang on 2018/7/23.
 */
import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import {withRouter} from 'react-router-dom'

const { Sider } = Layout;

const menu_list = [
    {
        icon: "user",
        title: "Welcome",
        path: "/welcome"
    },
    {
        icon: "user",
        title: "Blog",
        path: "/blog"
    },
    {
        icon: "user",
        title: "About Me",
        path: "/me"
    },
    {
        icon: "user",
        title: "TOOLS",
        path: "/tools"
    }
];

//目前仅生成一级菜单
const generateMenu = list => {
    let items = [];
    let i = 0;
    list.map(item => {
        i++;
        items.push(
            <Menu.Item key={item.path}>
                <Icon type={item.icon} />
                <span className="nav-text">
                    {item.title}
                </span>
            </Menu.Item>
        )
    });
    return items;
};

class SideMenu extends React.Component{
    constructor(props){
        super(props);
    }

    onClickMenu = ({item, key, path}) => {
        this.props.history.push(key);
    };

    render(){
        return (
            <Sider
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
            >
                <Menu theme="dark" mode="inline" onClick={this.onClickMenu}>
                    {generateMenu(menu_list)}
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(SideMenu)