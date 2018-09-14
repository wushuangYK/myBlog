/**
 * Created by wushuang on 2018/8/13.
 */
import React from 'react'
import {Row,Col,Table,Button,Input,message} from 'antd'
import {Panel} from '../../component/ui/UiComponent'
import moment from 'moment'
import {PostUid,URL} from '../../sys/Post'
import {json_decode} from '../../util/cmnf'

const ButtonGroup = Button.Group;
const TextArea = Input.TextArea;
const state_colors = {
    0: "#FF0000",
    1: "#00FF00",
    2: "#0000FF",
    3: "#AA00FF"
};
const state_texts = {
    0: "WAITING",
    1: "DOING",
    2: "DONE",
    3: "TBD"
};
export default class DailyTaskMain extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            listData: [],
            selectItem: {}
        };
    }

    componentWillMount(){
        this.getData();
    }

    getData = () => {
        PostUid(URL.DAILYTASK_GET).then(
            listData => {
                let selectItem = {};
                if(listData.length > 0){
                    selectItem = listData[0];
                    listData = listData.map(item => {
                        item.data = json_decode(item.data, []), item;
                        return item
                    })
                }
                this.setState({listData, selectItem})
            }
        )
    };

    onSelect = selectItem => {
        this.setState({selectItem});
    };

    addToday = () => {
        this.setState({
            selectItem: {
                daily_task_date: moment().format("YYYY-MM-DD"),
                data: [],
                create_time: moment().format("YYYY-MM-DD hh:mm:ss")
            }
        })
    };

    save = () => {
        PostUid(URL.DAILYTASK_SAVE, this.state.selectItem).then(
            () => {
                message.success("保存成功!");
                this.getData();
            }
        )
    };

    //table操作
    addRow = () => {
        let {selectItem} = this.state;
        selectItem.data.push({state: 0});
        this.setState({selectItem});
    };

    delRow = i => {
        let {selectItem} = this.state;
        selectItem.data.splice(i, 1);
        this.setState({selectItem});
    };

    onChangeTable = (key, val, i) => {
        let {selectItem} = this.state;
        selectItem.data[i][key] = val;
        this.setState({selectItem});
    };

    render(){
        let {listData, selectItem} = this.state;
        const list = listData.map((item, key) => (
            <Row key={key} type="flex" style={{marginTop:"10px"}}>
                <a onClick={this.onSelect.bind(this, item)}>{item.daily_task_date}</a>
            </Row>
        ));
        const list_title = (
            <Row type="flex">
                <Col span="12">列表</Col>
                <Col span="12">
                    <Row type="flex" justify="end">
                        <Button
                            disabled={listData.length !== 0 && moment(listData[0].daily_task_date).isSame(moment().format("YYYY-MM-DD"))}
                            type="primary"
                            icon="plus"
                            size="small"
                            shape="circle"
                            onClick={this.addToday}
                        />
                    </Row>
                </Col>
            </Row>
        );
        const data_title = (
            <Row type="flex">
                <Col span="12">
                    <Button
                        disabled={!selectItem || !selectItem.data}
                        type="primary"
                        icon="save"
                        size="small"
                        shape="circle"
                        onClick={this.save}
                    />
                </Col>
                <Col span="12">
                    <Row type="flex" justify="end">
                        {"创建时间: "+(selectItem.create_time ? selectItem.create_time : "")}
                    </Row>
                </Col>
            </Row>
        );
        //表格
        const stateBtn = (state, cur_state, i) => (
            <Button
                key={state}
                disabled={state === cur_state}
                style={{color: state_colors[state], fontWeight: "bold"}}
                onClick={this.onChangeTable.bind(this, "state", state, i)}
            >{state_texts[state]}</Button>
        );
        const columns = [
            {
                title: "",
                dataIndex: "minus",
                key: "minus",
                width:"5%",
                render: (t,r,i) => (
                    <Button
                        type="primary"
                        icon="minus"
                        size="small"
                        shape="circle"
                        onClick={this.delRow.bind(this, i)}
                    />
                )
            },
            {
                title: "内容",
                width:"30%",
                dataIndex: "task",
                key: "task",
                render: (t,r,i) => (
                    <TextArea
                        autosize={{minRows:1, maxRows:20}}
                        value={t}
                        onChange={e => this.onChangeTable("task", e.target.value, i)}
                    />
                )
            },
            {
                title: "预计用时",
                width:"10%",
                dataIndex: "expected",
                key: "expected",
                render: (t,r,i) => (
                    <Input
                        value={t}
                        onChange={e => this.onChangeTable("expected", e.target.value, i)}
                    />
                )
            },
            {
                title: "实际用时",
                width:"10%",
                dataIndex: "actual",
                key: "actual",
                render: (t,r,i) => (
                    <Input
                        value={t}
                        onChange={e => this.onChangeTable("actual", e.target.value, i)}
                    />
                )
            },
            {
                title: "状态",
                width:"10%",
                dataIndex: "state",
                key: "state",
                render: t => (
                    <div style={{fontWeight:"bold", color: state_colors[t]}}>
                        {state_texts[t] ? state_texts[t] : ""}
                    </div>
                )
            },
            {
                title: "修改状态",
                width:"40%",
                dataIndex: "state_btn",
                key: "state_btn",
                render: (t,r,i) => (
                    <Row type="flex" justify="center">
                        <ButtonGroup size="small">
                            {[0, 1, 2, 3].map(state => stateBtn(state, r.state, i))}
                        </ButtonGroup>
                    </Row>
                )
            }
        ];
        const table_foot = () => (
            <Button
                disabled={!selectItem || !selectItem.data}
                type="primary"
                icon="plus"
                size="small"
                shape="circle"
                onClick={this.addRow}
            />
        );
        return (
            <Row type="flex" gutter={10}>
                <Col span="6">
                    <Panel title={list_title} height="64vh">
                        <div style={{margin:"10px 0 10 10px",overflowY:"auto",height:"100%"}}>
                            {list}
                        </div>
                    </Panel>
                </Col>
                <Col span="18">
                    <Panel title={data_title} height="64vh">
                        <Table
                            size="small"
                            footer={table_foot}
                            bordered
                            bodyStyle={{height:"45vh"}}
                            columns={columns}
                            pagination={false}
                            scroll={{y:true}}
                            dataSource={selectItem.data ? selectItem.data : []}
                        />
                    </Panel>
                </Col>
            </Row>
        )
    }
}
