// Libs
import React from 'react';
import { is } from 'immutable';
// Material-UI Components
import {List, ListItem} from 'material-ui/List';
import IconListItemMenu from './iconListItemMenu.js';

const debug = false;

// Main Components
class IconListItem extends React.Component {
    constructor(props) {
        super(props);
        this.renderCountDebug            = this.renderCountDebug.bind(this);
        this.buildIconListItemMenuInItem = this.buildIconListItemMenuInItem.bind(this);
    }

    // Debug
    renderCountDebug() {
        if(this.props.debug || debug) {
            console.log(`IconListItem Rendered`);
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



    // 构建图标列表菜单
    buildIconListItemMenuInItem() {
        return (
            <IconListItemMenu
                debug={this.props.debug}
                className="iconItemMenuWrapper"
                groupIndex={this.props.groupIndex}
                iconIndex={this.props.iconIndex}
                editIconAttr={this.props.editIconAttr}
                changeIconGroup={this.props.changeIconGroup}
                renewIcon={this.props.renewIcon}
                savIcons={this.props.savIcons}
                deleteIcon={this.props.deleteIcon}
            />
        );
    }



    render() {

        //Debug
        this.renderCountDebug();

        return (
            <ListItem
                className="iconItem"
                innerDivStyle={{ paddingLeft: 92 }}
                leftAvatar={<div className="iconFontPreviewImg" dangerouslySetInnerHTML={{__html: this.props.iconData.get('glyph')}}/>}
                rightIconButton={this.buildIconListItemMenuInItem()}
                primaryText={this.props.iconData.get('name')}
                secondaryText={
                    <p>
                        <span className="iconSubInfo">{this.props.iconUnicode}</span>
                        <br/>
                        <span className="iconSubInfo">{this.props.iconSize}</span>
                    </p>
                }
                secondaryTextLines={2}
            />
        );
    }
}

export default IconListItem;