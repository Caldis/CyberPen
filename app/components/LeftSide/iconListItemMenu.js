// Libs
import React from 'react';
import { is } from 'immutable';
// Material-UI Components
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// Material-UI SVG ICONS
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Move from 'material-ui/svg-icons/action/swap-vert';
import Renew from 'material-ui/svg-icons/action/autorenew';
import Export from 'material-ui/svg-icons/editor/format-shapes';
import Delete from 'material-ui/svg-icons/action/delete';

const debug = false;

// Main Components
class IconListItemMenu extends React.Component {
    constructor(props) {
        super(props);
        this.renderCountDebug = this.renderCountDebug.bind(this);
    }

    // Debug
    renderCountDebug() {
        if(this.props.debug || debug) {
            console.log(`IconListItemMenu Rendered`);
        }
    }

    componentWillMount() {
        // This function will be called once before component mount
    }
    componentDidMount() {
        // This function will be called once after component mount
    }
    componentWillReceiveProps(nextProps) {
        // This function will be called before receive new props
        // Will not run when component first mount
    }
    shouldComponentUpdate(nextProps, nextState) {
        // This function will be called before need to update
        // Will not run when component first mount
        // Component will not updated when it return 'false'
        const thisProps = this.props || {};
        if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
            return true;
        }
        for (const key in nextProps) {
                if (!is(thisProps[key], nextProps[key])) {
                    return true;
                }
        }
        return false;
    }
    componentWillUpdate(nextProps, nextState) {
        // This function will be called before need to update
        // You can't use 'this.setState()' in here
    }
    componentDidUpdate(prevProps, prevState) {
        // This function will be called after component updated
    }
    componentWillUnmount() {
        // This function will be called before component unmount
        // Clean useless timer or listener in here
    }

    render() {

        //Debug
        this.renderCountDebug();

        return (
            <IconMenu
                className="iconItemMenu"
                iconButtonElement={<IconButton tooltip="操作"><MoreVertIcon/></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="编辑属性" leftIcon={<Edit/>} onClickCapture={() => this.props.editIconAttr(this.props.groupIndex, this.props.iconIndex)}/>
                <MenuItem primaryText="改变分组" leftIcon={<Move/>} onClickCapture={() => this.props.changeIconGroup(this.props.groupIndex, this.props.iconIndex)}/>
                <MenuItem primaryText="更新图标" leftIcon={<Renew/>} onClickCapture={() => this.props.renewIcon(this.props.groupIndex, this.props.iconIndex)}/>
                <MenuItem primaryText="导出图标" leftIcon={<Export/>} onClickCapture={() => this.props.savIcons(this.props.groupIndex, this.props.iconIndex)}/>
                <MenuItem primaryText="删除图标" leftIcon={<Delete/>} onClickCapture={() => this.props.deleteIcon(this.props.groupIndex, this.props.iconIndex)}/>
            </IconMenu>
        );
    }
}

export default IconListItemMenu;