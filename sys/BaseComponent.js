/**
 * Created by wushuang on 2018/8/8.
 */
import React from 'react'

export default class BaseComponent extends React.Component{
    constructor(props){
        super(props);
    }

    //当一个页面的弹出框过多时, 使用这部分的方法来控制弹出框的显示
    setVisible = (key, v = true) => {
        let {visible} = this.state;
        visible = visible || {};
        visible[key] = v;
        this.setState({visible});
    };

    getVisible = key => {
        let {visible} = this.state;
        visible = visible || {};
        return visible[key] || false;
    };
}