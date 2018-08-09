/**
 * Created by wushuang on 2018/7/26.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col} from "antd"
require("../../css/component/panel.css");

export default class Panel extends React.Component{
    static propTypes = {
        borderRadius: PropTypes.number,
        startColor: PropTypes.string,
        endColor: PropTypes.string,
        borderSize: PropTypes.number,
        title: PropTypes.node,
        foot: PropTypes.node,
        headHeight: PropTypes.number,
        footHeight: PropTypes.number,
        height: PropTypes.string
    };

    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    static defaultProps = {
        borderRadius: 8,
        startColor: "#FFF1EB",
        endColor: "#ACE0F9",
        borderSize: 2,
        title: "",
        foot: "",
        headHeight: 4,
        footHeight: 4,
    };

    constructor(props){
        super(props);
    }

    render(){
        let {borderRadius, borderSize, startColor, endColor} = this.props;
        let {title, foot, headHeight, footHeight} = this.props;
        const containerStyle = {
            borderRadius: borderRadius + "px",
            background: "linear-gradient("+startColor+","+endColor+")",
            padding: borderSize+"px"
        };
        const style = {
            borderRadius: (borderRadius - borderSize) + "px",
        };
        let title_div = "";
        if(title !== "") {
            title_div = (
                <Row
                    className="panel-header"
                    type="flex"
                    align="middle"
                    style={{height: headHeight+"vh"}}
                >
                    <Col span="24">
                        {title}
                    </Col>
                </Row>
            );
        }

        let foot_div = "";
        if(foot !== ""){
            foot_div = (
                <Row
                    className="panel-footer"
                    type="flex"
                    align="middle"
                    style={{height: footHeight+"vh"}}
                >
                    <Col span="24">
                        {foot}
                    </Col>
                </Row>
            );
        }

        let content_div = "";
        if(this.props.children){
            content_div = (
                <div
                    className="panel-content"
                    style={{height: this.props.height ? this.props.height : "auto"}}
                >
                    {this.props.children}
                </div>
            )
        }
        return (
            <div className="panel-container" style={containerStyle}>
                <div className="panel" style={style}>
                    {title_div}
                    {content_div}
                    {foot_div}
                </div>
            </div>
        )
    }
}