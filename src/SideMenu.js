/**
 * Created by wushuang on 2018/7/23.
 */
import React from 'react'
import { Menu, Icon } from 'antd';
import {withRouter} from 'react-router-dom'
import {isEmpty} from '../util/cmnf'

const menu_list = [
    {
        icon: "home",
        title: "Welcome",
        path: "/welcome"
    },
    {
        icon: "solution",
        title:"Diary",
        path: "/diary",
    },
    {
        icon: "solution",
        title:"DailyTask",
        path: "/dailyTask",
    },
    {
        icon: "file",
        title: "Blog",
        path: "/blog",
        sub: [
            {
                icon: "home",
                title: "Home",
                path: "/blog/home",
            },
            {
                icon: "file-add",
                title: "New",
                path: "/blog/new",
            },
            {
                icon: "bars",
                title: "Admin",
                path: "/blog/admin",
            }
        ]
    },
    {
        icon: "inbox",
        title: "TOOLS",
        path: "/tools"
    },
    {
        icon: "folder-open",
        title: "TASK",
        path: "/task",
        sub: [
            {
                icon: "bars",
                title: "Home",
                path: "/task/home",
            },
            {
                icon: "file-add",
                title: "New",
                path: "/task/new",
            },
            {
                icon: "team",
                title: "Team",
                path: "/task/team",
            }
        ]
    }
];

//目前仅生成一级菜单
const generateMenu = list => {
    let items = [];
    let i = 0;
    list.map(item => {
        i++;
        if(isEmpty(item.sub)){
            items.push(
                <Menu.Item key={item.path}>
                    <Icon type={item.icon} />
                    <span>
                        {item.title}
                    </span>
                </Menu.Item>
            )
        } else {
            items.push(
                <Menu.SubMenu
                    key={item.path}
                    title={<div><Icon type={item.icon} /><span>{item.title}</span></div>}
                >
                    {generateMenu(item.sub)}
                </Menu.SubMenu>
            )
        }

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
            <Menu theme="dark" mode="inline" onClick={this.onClickMenu}>
                {generateMenu(menu_list)}
            </Menu>
        )
    }
}

export default withRouter(SideMenu)