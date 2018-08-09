/**
 * Created by wushuang on 2018/7/24.
 */
import React from 'react'
import { Chart, Geom, Axis, Coord, Label } from 'bizcharts';
import { Row, Col, List, Avatar, Table, Form, Button, Input, Icon } from 'antd'
import { DataSet } from '@antv/data-set';
import {TextColor} from '../../config/color.config'
import {Post,URL} from '../../sys/Post'
import {keyCount} from '../../util/cmnf'
import {Panel, renderFormItem} from '../../component/ui/UiComponent'

const { DataView } = DataSet;
const FormItem = Form.Item;

const taskCountColStyle = color => {
    return {
        span: 8,
        style: {
            fontSize: "20px",
            color: color,
            fontWeight: "bold",
        }
    }
};

class TaskCountCard extends React.Component{
    render(){
        let {data} = this.props;
        const count_data = [];
        if(keyCount(data, "state", "正在进行") !== 0){
            count_data.push({
                item: "正在进行",
                count: keyCount(data, "state", "正在进行")
            })
        }
        if(keyCount(data, "state", "未开始") !== 0){
            count_data.push({
                item: "未开始",
                count: keyCount(data, "state", "未开始")
            })
        }
        if(keyCount(data, "state", "已完成") !== 0){
            count_data.push({
                item: "已完成",
                count: keyCount(data, "state", "已完成")
            })
        }
        const chart_cols = {
            percent: {
                formatter: val => {
                    val = (val * 100) + '%';
                    return val;
                }
            }
        };
        const dv = new DataView();
        dv.source(count_data).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        return (
            <Panel>
                <Row gutter={15}>
                    <Col {...taskCountColStyle(TextColor.light)}>
                        正在进行: {keyCount(data, "state", "正在进行")}
                    </Col>
                    <Col {...taskCountColStyle(TextColor.medium)}>
                        已完成: {keyCount(data, "state", "已完成")}
                    </Col>
                    <Col {...taskCountColStyle(TextColor.dark)}>
                        未开始: {keyCount(data, "state", "未开始")}
                    </Col>
                </Row>
                <Row type="flex" justify="center" >
                    <Chart style={{width:"300px"}} height={250} data={dv} scale={chart_cols} forceFit padding={10}>
                        <Coord type='theta' />
                        <Axis name="percent" />
                        <Geom
                            type="intervalStack"
                            position="percent"
                            color='item'
                            tooltip={['item*percent',(item, percent) => {
                                percent = percent * 100 + '%';
                                return {
                                    name: item,
                                    value: percent
                                };
                            }]}
                            style={{lineWidth: 1,stroke: '#fff'}}
                        >
                            <Label
                                content='percent'
                                offset={-50}
                                textStyle={{
                                    rotate: 0,
                                    textAlign: 'center',
                                    shadowBlur: 2,
                                    shadowColor: 'rgba(0, 0, 0, .45)',
                                    fontSize: '12', // 文本大小
                                    fontWeight: 'bold', // 文本粗细
                                }}
                                formatter={(val, item) => {
                                    return item.point.item + ': ' + item.point.count;
                                }}
                            />
                        </Geom>
                    </Chart>
                </Row>
            </Panel>
        )
    }
}

const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
};
class TaskHomePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            member_list: [],
            task_list: []
        };
    }

    componentWillMount(){
        this.getMemberList();
        this.getTaskList();
    }

    getMemberList = () => {
        Post(URL.MEMBER_GETALL).then(
            data => {
                this.setState({member_list: data})
            }
        )
    };

    getTaskList = () => {
        Post(URL.TASK_GETALL).then(
            data => {
                this.setState({task_list: data});
            }
        )
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const formConfig = [
            {
                itemProps: {
                    validateStatus: userNameError ? 'error' : '',
                    help: userNameError || ''
                },
                id: "userName",
                rules: [{ required: true, message: 'Please input your username!' }],
                component: Input,
                props: {
                    prefix: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />,
                    placeholder: "Username"
                }
            },
            {
                itemProps: {
                    validateStatus: passwordError ? 'error' : '',
                    help: passwordError || ''
                },
                id: "password",
                rules: [{ required: true, message: 'Please input your Password!' }],
                component: Input,
                props: {
                    prefix: <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />,
                    placeholder: "Password",
                    type: "password"
                }
            }
        ];
        let {member_list, task_list} = this.state;
        //成员列表
        const Member_list = (
            <Panel title="Team Member">
                <List
                    itemLayout="horizontal"
                    dataSource={member_list}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </Panel>
        );
        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }];

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        }];
        return (
            <div>
                <Row>
                    <Table dataSource={dataSource} columns={columns} size="small" bordered />
                </Row>
                <Row>
                    <Table dataSource={dataSource} columns={columns} size="default" bordered />
                </Row>
                <Row gutter={20}>
                    <Col span="12">
                        <TaskCountCard data={task_list}/>
                    </Col>
                    <Col span="12">
                        {Member_list}
                    </Col>
                </Row>
                <Row style={{margin:20}}>
                    <Panel title="Task List">
                        <List
                            itemLayout="horizontal"
                            dataSource={task_list}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.title}
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </Panel>
                </Row>
                <Row style={{margin:20}}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        {formConfig.map((item, key) => renderFormItem(key, getFieldDecorator, item))}
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={hasErrors(getFieldsError())}
                            >
                                Log in
                            </Button>
                        </FormItem>
                    </Form>
                </Row>
            </div>
        )
    }
}

export default Form.create()(TaskHomePage);