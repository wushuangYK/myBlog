/**
 * Created by wushuang on 2018/8/8.
 */
import React from 'react'
import {TreeSelect} from 'antd'
import {Post,URL} from '../../sys/Post'
import PropTypes from 'prop-types'

const recursionData = arr => {
    return arr.map(item => {
        if(item.children && item.children.length !== 0){
            item.children = recursionData(item.children);
        }
        return Object.assign({
            key: item.id,
            value: item.id,
            isLeaf: item.is_leaf === '1'
        }, item);
    });
};
export default class BlogTypeSelect extends React.Component{
    static props = {
        onSelect: PropTypes.func,
    };

    static defaultProps = {
        onSelect: () => {}
    };

    constructor(props){
        super(props);

        this.state = {
            data: [],
            value: ""
        }
    }

    componentWillMount(){
        this.getData();
    }

    getData = () => {
        Post(URL.BLOGTYPE_GETALL).then(
            data => {
                //处理data
                this.setState({
                    data: recursionData(data)
                })
            }
        )
    };

    onSelect = (value, node) => {
        if(!node.props.isLeaf)
            return;
        this.setState({value});
        this.props.onSelect(value, node.props)
    };

    render(){
        return (
            <TreeSelect
                {...this.props}
                treeData={this.state.data}
                onSelect={this.onSelect}
                value={this.state.value}
            />
        )
    }
}