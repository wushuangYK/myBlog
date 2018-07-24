/**
 * Created by wushuang on 2018/7/24.
 */
import React from 'react'
import { Chart, Geom, Axis, Coord, Label } from 'bizcharts';
import { Row, Col, List, Avatar, Card } from 'antd'
import { DataSet } from '@antv/data-set';
import {TextColor} from '../../config/color.config'

const { DataView } = DataSet;

const chart_data = [
    { item: '正在进行', count: 4 },
    { item: '已完成', count: 8 },
    { item: '未开始', count: 6 },
];
const chart_cols = {
    percent: {
        formatter: val => {
            val = (val * 100) + '%';
            return val;
        }
    }
};
const dv = new DataView();
dv.source(chart_data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
});
const MyChart = () => (
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
);

const getCardStyle = color => {
    return {
        fontSize: "20px",
        color: color,
        fontWeight: "bold",
    }
};
const MyCard = () => (
    <Card>
        <Row gutter={15}>
            <Col span="8" style={getCardStyle(TextColor.light)}>正在进行: 4</Col>
            <Col span="8" style={getCardStyle(TextColor.medium)}>已完成: 8</Col>
            <Col span="8" style={getCardStyle(TextColor.dark)}>未开始: 6</Col>
        </Row>
        <Row type="flex" justify="center" >
            <MyChart />
        </Row>
    </Card>
);

const list_data = [
    {
        title: '张逸凡',
        description: "菜比一个"
    },
    {
        title: '杨炜威',
        description: "太胖,滚"
    },
    {
        title: '王宁',
        description: "太矮不看"
    },
    {
        title: '吴双',
        description: "帅哥一枚"
    }
];
const MyList = () => (
    <Card title="Team Member">
        <List
            itemLayout="horizontal"
            dataSource={list_data}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
    </Card>
);



export default class TaskHomePage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Row gutter={20}>
                    <Col span="10">
                        <MyCard />
                    </Col>
                    <Col span="2"/>
                    <Col span="10">
                        <MyList />
                    </Col>
                </Row>
            </div>
        )
    }
}