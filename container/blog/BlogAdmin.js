/**
 * Created by wushuang on 2018/8/9.
 */
import React from 'react'
import BaseComponent from '../../sys/BaseComponent'
import {isEmpty, generateTreeNode, json_decode} from '../../util/cmnf'
import {Panel, Button, DataPanel} from '../../component/ui/UiComponent'
import {Row,Col,Tree,Modal,Input,message,Table,Tag} from "antd"
import {Post,URL} from '../../sys/Post'

const table_columns = [
    {
        title: "标题",
        key: "name",
        dataIndex: "name"
    },
    {
        title: "标签",
        key: "tags",
        dataIndex: "tags",
        render: t => json_decode(t, []).map(item => (<Tag>{item}</Tag>))
    }
];
export default class BlogAdmin extends BaseComponent{
    constructor(props){
        super(props);

        this.state = {
            typeList: [],
            selectedType: "",
            isLeaf: false,
            typeName: "",
            data: []
        }
    }

    componentWillMount(){
        this.getData();
    }

    getData = () => {
        Post(URL.BLOGTYPE_GETALL).then(
            typeList => this.setState({typeList, selectedType: ""})
        )
    };

    onSelectType = selectedKeys => {
        let selectedType = isEmpty(selectedKeys) ? "" : selectedKeys[0];
        this.setState({selectedType});
        //获取列表数据
        Post(URL.BLOG_GETBYTYPE, {blog_type: selectedType}).then(
            data => {
                this.setState({data})
            }
        )
    };

    saveType = () => {
        let {typeName, selectedType, isLeaf} = this.state;
        let param = {
            title: typeName,
            is_leaf: isLeaf ? 1 : 0
        };
        if(!isEmpty(selectedType))
            param.parent_id = selectedType;
        Post(URL.BLOGTYPE_ADD, param).then(
            () => {
                message.success("添加成功!");
                this.getData();
                this.setVisible("modal", false);
            }
        );
    };

    delType = () => {
        Post(URL.BLOGTYPE_DEL, {id: this.state.selectedType}).then(
            () => {
                message.success("删除成功!");
                this.getData();
            }
        )
    };

    render(){
        let {typeList, selectedType, isLeaf, typeName, data} = this.state;
        const treeFoot = (
            <Row type="flex" justify="end">
                <Button onClick={() => {
                    this.setState({
                        isLeaf: false,
                        typeName: ""
                    });
                    this.setVisible("modal");
                }}>新增类别</Button>
                <Button onClick={() => {
                    this.setState({
                        isLeaf: true,
                        typeName: ""
                    });
                    this.setVisible("modal");
                }}>新增叶子类别</Button>
                <Button
                    disabled={isEmpty(selectedType)}
                    onClick={this.delType}
                >删除类别</Button>
            </Row>
        );
        const columns = [
            [
                {
                    title: "父类别:",
                    component: Input,
                    props: {
                        disabled: true,
                        value: selectedType
                    }
                }
            ],
            [
                {
                    title: "是否是叶子:",
                    component: Input,
                    props: {
                        disabled: true,
                        value: isLeaf
                    }
                }
            ],
            [
                {
                    title: "类别名称:",
                    component: Input,
                    props: {
                        value: typeName,
                        onChange: e => this.setState({typeName: e.target.value})
                    }
                }
            ]
        ];
        return (
            <Row type="flex" gutter={10}>
                <Col span="6">
                    <Panel title="分类" foot={treeFoot} height="60vh">
                        <Tree onSelect={this.onSelectType}>
                            {generateTreeNode(typeList)}
                        </Tree>
                    </Panel>
                </Col>
                <Col span="18">
                    <Panel title="分类" height="64vh">
                        <Table
                            dataSource={data}
                            columns={table_columns}
                        />
                    </Panel>
                </Col>
                <Modal
                    title="新增类别"
                    visible={this.getVisible("modal")}
                    onCancel={this.setVisible.bind(this, "modal", false)}
                    footer={null}
                >
                    <Row type="flex" justify="center">
                        <Col span="16">
                            <DataPanel
                                labelCol={6}
                                wrapperCol={18}
                                columns={columns}
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="end" style={{marginTop:"10px"}}>
                        <Button
                            type="primary"
                            onClick={this.saveType}
                        >保存</Button>
                    </Row>
                </Modal>
            </Row>
        )
    }
}