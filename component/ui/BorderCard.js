/**
 * Created by wushuang on 2018/7/26.
 */
import React from 'react'
import PropTypes from 'prop-types'

export default class BorderCard extends React.Component{
    static propTypes = {
        borderRadius: PropTypes.number,
        startColor: PropTypes.string,
        endColor: PropTypes.string,
        borderSize: PropTypes.number,
        boxShadow: PropTypes.string,
        background: PropTypes.string,
        padding: PropTypes.number
    };

    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    static defaultProps = {
        borderRadius: 8,
        startColor: "#FFF1EB",
        endColor: "#ACE0F9",
        borderSize: 2,
        boxShadow: "5px 5px 10px #B4B4B4",
        background: "#FFFFFF",
        padding: 5
    };

    constructor(props){
        super(props);
    }

    render(){
        let {props} = this;
        const containerStyle = {
            position: "relative",
            borderRadius: props.borderRadius + "px",
            background: "linear-gradient("+props.startColor+","+props.endColor+")",
            backgroundClip: "padding-box",
            boxShadow: props.boxShadow,
            padding: props.borderSize+"px"
        };
        const style = {
            background: props.background,
            borderRadius: (props.borderRadius - props.borderSize) + "px",
            padding: props.padding + "px"
        };
        return (
            <div style={containerStyle}>
                <div style={style}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}