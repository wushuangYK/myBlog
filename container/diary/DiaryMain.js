/**
 * Created by wushuang on 2018/8/11.
 */
import React from 'react'
import {Row,Col,Input,Button,message} from 'antd'
import {Panel} from '../../component/ui/UiComponent'
import moment from 'moment'
import {Post,URL} from '../../sys/Post'

const TextArea = Input.TextArea;
export default class DiaryMain extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: [],
            selectItem: {}
        }
    }

    componentWillMount(){
        this.getData();
    }

    //获取数据
    getData = () => {
        Post(URL.DIARY_GET).then(
            data => {
                let selectItem = {};
                if(data.length > 0)
                    selectItem = data[0];
                this.setState({data, selectItem})
            }
        )
    };

    onClick = selectItem => {
        this.setState({selectItem});
        this.refs.textarea.focus();
    };

    writeToday = () => {
        this.setState({
            selectItem: {
                diary_date: moment().format("YYYY-MM-DD"),
                create_time: moment().format("YYYY-MM-DD hh:mm:ss")
            }
        });
        this.refs.textarea.focus();
    };

    onChange = e => {
        let {value} = e.target;
        let {selectItem} = this.state;
        selectItem.data = value;
        this.setState({selectItem});
    };

    save = () => {
        let {selectItem} = this.state;
        Post(URL.DIARY_SAVE, selectItem).then(
            () => {
                message.success("保存成功!");
                this.getData();
            }
        )
    };

    render(){
        let {data, selectItem} = this.state;
        const list = data.map((item, key) => (
            <Row key={key} type="flex" style={{marginTop:"10px"}}>
                <a onClick={this.onClick.bind(this, item)}>{item.diary_date}</a>
            </Row>
        ));
        const list_title = (
            <Row type="flex">
                <Col span="12">列表</Col>
                <Col span="12">
                    <Row type="flex" justify="end">
                        <Button
                            disabled={data.length !== 0 && moment(data[0].diary_date).isSame(moment().format("YYYY-MM-DD"))}
                            type="primary"
                            icon="plus"
                            size="small"
                            shape="circle"
                            onClick={this.writeToday}
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
        return (
            <Row gutter={10}>
                <Col span="6">
                    <Panel title={list_title} height="65vh">
                        <div style={{margin: "10px 0 0 10px"}}>
                            {list}
                        </div>
                    </Panel>
                </Col>
                <Col span="18">
                    <Panel title={data_title} height="65vh">
                        <TextArea
                            ref="textarea"
                            autosize={{minRows: 24, maxRows: 24}}
                            style={{width:"100%"}}
                            value={selectItem.data}
                            onChange={this.onChange}
                        />
                    </Panel>
                </Col>
            </Row>
        )
    }
}