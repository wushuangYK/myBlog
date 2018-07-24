/**
 * Created by wushuang on 2018/2/8.
 */
import React from 'react'
require('../../css/panel.css');

class Panel extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        const title_div = (
            <div className="rct-panel-header" style={{height:'auto',color:"black"}}>
                {this.props.title}
            </div>
        );
        const foot = (
            <div className="rct-panel-header" style={{color:"black"}}>
                {this.props.foot}
            </div>
        );
        return (
            <div className="rct-panel" style={this.props.style}>
                {this.props.title ? title_div : ""}
                <div className="rct-panel-content"  style={this.props.bodyStyle}>
                    {this.props.children}
                </div>
                {this.props.foot ? foot : ""}
            </div>
        )
    }
}

export default Panel