/**
 * Created by wushuang on 2018/8/8.
 */
import React from 'react'
import BaseComponent from '../../sys/BaseComponent'
import {isEmpty, generateTreeNode} from '../../util/cmnf'
import {Tree} from "antd"
import {Post,URL} from '../../sys/Post'
import PropTypes from 'prop-types'

export default class BlogTypeList extends BaseComponent{
    static props = {
        onSelectType: PropTypes.func
    };

    static defaultProps = {
        onSelectType: () => {}
    };

    constructor(props){
        super(props);

        this.state = {
            typeList: [],
        }
    }

    componentWillMount(){
        this.getData();
    }

    getData = () => {
        Post(URL.BLOGTYPE_GETALL).then(
            typeList => this.setState({typeList})
        )
    };

    onSelectType = selectedKeys => {
        let selectedType = isEmpty(selectedKeys) ? "" : selectedKeys[0];
        this.props.onSelectType(selectedType);
    };

    render(){
        let {typeList} = this.state;
        return (
            <Tree onSelect={this.onSelectType}>
                {generateTreeNode(typeList)}
            </Tree>
        )
    }
}