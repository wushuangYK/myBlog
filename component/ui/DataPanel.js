/**
 * Created by wushuang on 2018/8/9.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Row,Col,Form} from 'antd'

const FormItem = Form.Item;
export default class DataPanel extends React.Component{
    static props = {
        colSpan: PropTypes.number,
        labelCol: PropTypes.number,
        wrapperCol: PropTypes.number,
        columns: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
        onChange: PropTypes.func
    };

    static defaultProps = {
        colSpan: 24,
        labelCol: 12,
        wrapperCol: 12,
        columns: [],
        onChange: () => {}
    };

    constructor(props){
        super(props);
    }

    render(){
        let {columns, colSpan, labelCol, wrapperCol} = this.props;
        return (
            <div>
                {columns.map( (row, i) => (
                    <Row key={i}>
                        {row.map( (col, j) => (
                            <Col key={j} span={col.span ? col.span : colSpan}>
                                <Form>
                                    <FormItem
                                        labelCol={{span: col.labelCol ? col.labelCol : labelCol}}
                                        wrapperCol={{span: col.wrapperCol ? col.wrapperCol : wrapperCol}}
                                        label={col.title}
                                    >
                                        <col.component
                                            {...col.props}
                                        />
                                    </FormItem>
                                </Form>
                            </Col>
                        ))}
                    </Row>
                ))}
            </div>
        )
    }
}