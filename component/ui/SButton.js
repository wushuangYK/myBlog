/**
 * Created by wushuang on 2018/8/1.
 */
import React from 'react'
import {Button} from 'antd'
import PropTypes from 'prop-types'
import classnames from 'classnames'
require("../../css/component/button.css");

const BTN_TYPE = {
    edit: "edit",
    modal: "modal",
    panel: "panel",
    other: "other",
};
class SButton extends React.Component {
    static props = {
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        icon: PropTypes.string,
        type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        size: PropTypes.string,
        className: PropTypes.string,
    };

    static defaultProps = {
        onClick: () => {},
        disabled: false,
        icon: "",
        type: "edit",
        size: "small",
        className: "",
    };

    constructor(props) {
        super(props);
    }

    render() {
        let {size, type, icon, disabled, className, onClick} = this.props;
        className = classnames(className, "sbtn");
        switch (type){
            case BTN_TYPE.edit:case 0: className = classnames(className, "sbtn-edit"); break;
            case BTN_TYPE.modal:case 1: className = classnames(className, "sbtn-modal"); break;
            case BTN_TYPE.panel:case 2: className = classnames(className, "sbtn-panel"); break;
            default: className = classnames(className, "sbtn-other"); break;
        }
        return (
            <Button
                className={className}
                size={size}
                type={type}
                icon={icon}
                disabled={disabled}
                onClick={onClick}
            >{this.props.children}</Button>
        )
    }
}

export default SButton