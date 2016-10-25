// Libs
import React from 'react';
import { is } from 'immutable';
import Dropzone from 'react-dropzone';
// Material-UI Components
import {ListItem} from 'material-ui/List';
// Private Components
import IconListItem from './iconListItem.js';

const debug = false;

// Main Components
class IconList extends React.Component {
    constructor(props) {
        super(props);

        this.iconListData = {};
        this.iconList = {};
        this.iconListMenu = {};

        this.renderCountDebug         = this.renderCountDebug.bind(this);
        this.shouldListDataUpdate     = this.shouldListDataUpdate.bind(this);
        this.buildIconListItemInGroup = this.buildIconListItemInGroup.bind(this);
    }



    // Debug
    renderCountDebug() {
        if(this.props.debug || debug) {
            console.log(`IconList Rendered`);
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




    // 比较(有BUG)
    shouldListDataUpdate(groupData) {
        try {
            const thisListData = this.iconListData[groupData.get('name')].get('listData') || [];
            const nextListData = groupData.get('listData');
            if (thisListData.count() !== nextListData.count()) {
                return true;
            }
            for (const iconIndex in nextListData) {
                if (!is(thisListData.get(iconIndex), nextListData.get(iconIndex))) {
                    return true;
                }
            }
        } catch(err) {
            return true;
        }
        return false;
    }
    // 构建图标列表
    buildIconListItemInGroup(groupData, groupIndex) {
        let iconList = [];
        for(let iconIndex = 0; iconIndex<groupData.get('listData').count(); iconIndex++) {
            // 图标列表内容
            const iconData = groupData.getIn(['listData', iconIndex]);
            const iconUnicode  = 'Unicode: ' + iconData.get('unicode');
            const iconSize = '大小: ' + iconData.get('size') + 'KB';
            iconList.push(
                <IconListItem
                    debug={this.props.debug}
                    className="iconItemWrapper"
                    key={iconData.get('unicode')}
                    groupIndex={groupIndex}
                    iconIndex={iconIndex}
                    iconData={iconData}
                    iconUnicode={iconUnicode}
                    iconSize={iconSize}
                    editIconAttr={this.props.editIconAttr}
                    changeIconGroup={this.props.changeIconGroup}
                    renewIcon={this.props.renewIcon}
                    savIcons={this.props.savIcons}
                    deleteIcon={this.props.deleteIcon}
                />
            );
        }
        this.iconList[groupData.get('name')] = iconList;
        this.iconListData[groupData.get('name')] = groupData;
    }



    render() {

        //Debug
        this.renderCountDebug();

        return (
            <div className="iconListContainer">
                {
                    this.props.appData ?
                    this.props.appData.map((groupData, groupIndex) => {
                        const groupName = groupData.get('name');
                        const groupLength = groupData.get('listData').count();
                        const groupNameLabel = <span>{groupName}<span className="groupListNum">({groupLength})</span></span>;
                        this.buildIconListItemInGroup(groupData, groupIndex);
                        return (
                            <div key={groupIndex} className="iconGroupWrapper">
                                <Dropzone className="iconGroupDropHandler" activeClassName="iconGroupDropHandlerOnDrop"
                                          onDrop={(files) => this.props.onIconDrop(files, groupIndex)}
                                          style={{ pointerEvents: 'none' }}
                                          disableClick/>
                                <ListItem
                                    className="iconListItemWrapper"
                                    style={{backgroundColor: '#f3f3f3'}}
                                    primaryText={groupNameLabel}
                                    initiallyOpen={true}
                                    primaryTogglesNestedList={true}
                                    nestedItems={this.iconList[groupName]}
                                />
                            </div>
                        );
                    }) : null
                }
            </div>
        );
    }
}

export default IconList;