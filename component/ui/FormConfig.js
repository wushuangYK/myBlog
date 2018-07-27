/**
 * Created by wushuang on 2018/7/27.
 */
import React from 'react'
import { Row, Col, Form } from 'antd'

const FormItem = Form.Item;

const renderFormItem = (key, getFieldDecorator, cfg) => (
    <FormItem {...cfg.itemProps} key={key}>
        {getFieldDecorator(cfg.id, {
            rules: cfg.rules,
        })(
            <cfg.component {...cfg.props}>
                {cfg.children}
            </cfg.component>
        )}
    </FormItem>
);

const renderFormWithGrid = (getFieldDecorator, configData, rowProps, colProps) => (
    <Row {...rowProps}>
        {configData.map((item, key) => {
            return (
                <Col {...colProps}>
                    {renderFormItem(key, getFieldDecorator, item)}
                </Col>
            );
        })}
    </Row>
);

module.exports = {renderFormItem, renderFormWithGrid};