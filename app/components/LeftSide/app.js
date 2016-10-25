// Libs
import React    from 'react';
import Dropzone from 'react-dropzone';
// Styles
import jsStyles from './appStyles.js';
// Material-UI Components
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Snackbar from 'material-ui/Snackbar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// Material-UI SVG ICONS
import AddFile from 'material-ui/svg-icons/av/library-add';
import AddGroup from 'material-ui/svg-icons/content/add';
import EditGroup from 'material-ui/svg-icons/editor/format-paint';
import DeleteGroup from 'material-ui/svg-icons/content/delete-sweep';
import Renew from 'material-ui/svg-icons/action/autorenew';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Move from 'material-ui/svg-icons/action/compare-arrows';
import Delete from 'material-ui/svg-icons/action/delete';
import ExportIcon from 'material-ui/svg-icons/action/launch';
import IconFiles from 'material-ui/svg-icons/action/perm-media';
import ProjFiles from 'material-ui/svg-icons/action/extension';
import BundleFiles from 'material-ui/svg-icons/action/rowing';
// Material-UI Colors
// import {grey500, darkBlack, lightBlack} from 'material-ui/styles/colors';
// Private Components
import ListData from './iconList.js';

class LeftSide extends React.Component{
    constructor(props) {
        super(props);

        this.keyEvent = null;
        this.keyTrigger = null;
        this.listData = null;
        this.projFilesData = null;
        this.changeGroupListData = null;
        this.groupEditTableData  = null;
        this.targetIconAttr = null;
        this.srcGroupIndex  = null;
        this.srcListIndex   = null;
        this.destGroupIndex = null;
        this.buildedDialogButtons = false;

        this.state = {
            newIconNameDefaultValue    : null,
            newIconUnicodeDefaultValue : null,
            editGroupNameDefaultValue  : null,
            newIconNameErrorHint       : null,
            newIconUnicodeErrorHint    : null,
            editIconAttrDialogState    : false,
            addGroupDialogState        : false,
            editGroupDialogState       : false,
            changeGroupDialogState     : false,
            deleteIconDialogState      : false,
            exportDataDialogState      : false,
            openProjFileDialogState    : false,
            editGroupNameDialogState   : false,
            editGroupNameErrorHint     : null,
            deleteGroupDialogState     : false,
            snackBarState              : false,
            snackBarText               : '',
            groupNameErrorHint         : null
        };

        this.renderCountDebug               = this.renderCountDebug.bind(this);
        this.onDropIconFiles                = this.onDropIconFiles.bind(this);
        this.onDropIconFilesToGroup         = this.onDropIconFilesToGroup.bind(this);
        this.switchToWithFileState          = this.switchToWithFileState.bind(this);
        this.handleEditGroupDialogOpen      = this.handleEditGroupDialogOpen.bind(this);
        this.handleSureEditGroup            = this.handleSureEditGroup.bind(this);
        this.handleEditGroupDialogClose     = this.handleEditGroupDialogClose.bind(this);
        this.handleAddGroupDialogOpen       = this.handleAddGroupDialogOpen.bind(this);
        this.handleDestGroupSelect          = this.handleDestGroupSelect.bind(this);
        this.handleSureAddGroupDialog       = this.handleSureAddGroupDialog.bind(this);
        this.handleAddGroupDialogClose      = this.handleAddGroupDialogClose.bind(this);
        this.handleEditIconAttrDialogOpen   = this.handleEditIconAttrDialogOpen.bind(this);
        this.handleSureEditIconAttr         = this.handleSureEditIconAttr.bind(this);
        this.handleEditIconDataErrorHint    = this.handleEditIconDataErrorHint.bind(this);
        this.handleEditIconAttrDialogClose  = this.handleEditIconAttrDialogClose.bind(this);
        this.handleChangeGroupDialogOpen    = this.handleChangeGroupDialogOpen.bind(this);
        this.handleSureChangeGroup          = this.handleSureChangeGroup.bind(this);
        this.handleChangeGroupDialogClose   = this.handleChangeGroupDialogClose.bind(this);
        this.handleRenewIconFile            = this.handleRenewIconFile.bind(this);
        this.handleDeleteIconDialogOpen     = this.handleDeleteIconDialogOpen.bind(this);
        this.handleSureDeleteIconDialog     = this.handleSureDeleteIconDialog.bind(this);
        this.handleDeleteIconDialogClose    = this.handleDeleteIconDialogClose.bind(this);
        this.handleExportIconDialogOpen     = this.handleExportIconDialogOpen.bind(this);
        this.handleExportTypeSelect         = this.handleExportTypeSelect.bind(this);
        this.handleExportIconDialogClose    = this.handleExportIconDialogClose.bind(this);
        this.handleOpenProjFileDialogOpen   = this.handleOpenProjFileDialogOpen.bind(this);
        this.handleSureOpenProjFile         = this.handleSureOpenProjFile.bind(this);
        this.handleOpenProjFileDialogClose  = this.handleOpenProjFileDialogClose.bind(this);
        this.handleSnackBarOpen             = this.handleSnackBarOpen.bind(this);
        this.handleSnackbarClose            = this.handleSnackbarClose.bind(this);
        this.handleEditGroupNameDialogOpen  = this.handleEditGroupNameDialogOpen.bind(this);
        this.handleSureEditGroupName        = this.handleSureEditGroupName.bind(this);
        this.handleEditGroupNameDialogClose = this.handleEditGroupNameDialogClose.bind(this);
        this.handleDeleteGroupDialogOpen    = this.handleDeleteGroupDialogOpen.bind(this);
        this.handleSureDeleteGroup          = this.handleSureDeleteGroup.bind(this);
        this.handleDeleteGroupDialogClose   = this.handleDeleteGroupDialogClose.bind(this);
        this.buildDialogButtons             = this.buildDialogButtons.bind(this);
        this.buildChangeGroupListData       = this.buildChangeGroupListData.bind(this);
        this.buildEditGroupTableData        = this.buildEditGroupTableData.bind(this);
        this.iconNameRepeat                 = this.iconNameRepeat.bind(this);
        this.groupNameRepeat                = this.groupNameRepeat.bind(this);
        this.addEvent                       = this.addEvent.bind(this);
        this.listenKeyDown                  = this.listenKeyDown.bind(this);
        this.unListenKeyDown                = this.unListenKeyDown.bind(this);
        this.handleKeyDown                  = this.handleKeyDown.bind(this);
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
        return true;
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



    // Debug
    renderCountDebug() {
        if(this.props.debug) {
            if (!this.renderCount) this.renderCount = 1;
            console.log(`LeftSide Render count: ${this.renderCount}`);
            console.log('Render State:');
            console.log(this.state);
            this.renderCount++;
        }
    }



    // 拖拽添加图标
    onDropIconFiles(files) {
        if(files.length == 1 && files[0].name.replace(/.+\./,"").toLowerCase() == 'json') {
            this.handleOpenProjFileDialogOpen(files);
        } else if(files.length >= 1 && files[0].name.replace(/.+\./,"").toLowerCase() == 'svg'){
            this.props.addIcons(files);
            this.switchToWithFileState();
        } else {
            this.handleSnackBarOpen('请打开文件后缀为SVG\/JSON的图标文件或图标项目文件');
        }
    }
    // 拖拽添加图标到组
    onDropIconFilesToGroup(files, groupIndex) {
        if(files.length >= 1 && files[0].name.replace(/.+\./,"").toLowerCase() == 'svg'){
            this.props.addIcons(files, groupIndex);
        } else {
            this.handleSnackBarOpen('请拖放打开文件后缀为SVG的图标文件');
        }
    }
    // 切换到有文件的界面形态
    switchToWithFileState() {
        document.getElementById('iconActionHandlerWrapper').className += ' withFiles';
        document.getElementById('iconFontListContainer').className += ' withFiles';
    }



    // 点击添加分组模态框弹出
    handleAddGroupDialogOpen() {
        this.setState({ addGroupDialogState: true }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleAddGroupDialogOpen');
        });
        this.listenKeyDown(this.handleSureAddGroupDialog);
    }
    // 确认添加分组
    handleSureAddGroupDialog() {
        const newGroupName = this.refs.newGroupText.getValue();
        if (newGroupName != '') {
            if(this.groupNameRepeat(newGroupName)) {
                this.setState({ groupNameErrorHint: '组名已经存在' }, () => {
                    if(this.props.debug) console.log('LeftSide SetState - handleSureAddGroupDialog');
                });
                return;
            }
            this.props.addGroup(newGroupName);
            this.handleAddGroupDialogClose();
        } else {
            this.setState({ groupNameErrorHint: '组名不能为空' }, () => {
                if(this.props.debug) console.log('LeftSide SetState - handleSureAddGroupDialog');
            });
        }
    }
    // 关闭添加分组模态框
    handleAddGroupDialogClose() {
        this.setState({
            addGroupDialogState: false,
            groupNameErrorHint: null
        }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleAddGroupDialogClose');
        });
        this.unListenKeyDown();
    }



    // 点击编辑分组模态框弹出
    handleEditGroupDialogOpen() {
        this.setState({ editGroupDialogState: true }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleEditGroupDialogOpen');
        });
        this.listenKeyDown(this.handleSureEditGroup);
    }
    handleSureEditGroup() {
        this.handleEditGroupDialogClose();
    }
    // 点击编辑分组模态框关闭
    handleEditGroupDialogClose() {
        this.setState({ editGroupDialogState: false }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleEditGroupDialogClose');
        });
        this.unListenKeyDown();
    }



    // 编辑图标属性模态框弹出
    handleEditIconAttrDialogOpen(groupIndex, listIndex) {
        this.srcGroupIndex = groupIndex;
        this.srcListIndex = listIndex;
        this.targetIconAttr = this.props.getAttrs(groupIndex, listIndex);
        this.setState({
            newIconNameErrorHint: null,
            newIconUnicodeErrorHint: null,
            editIconAttrDialogState: true,
            newIconNameDefaultValue: this.targetIconAttr.get('name'),
            newIconUnicodeDefaultValue : this.targetIconAttr.get('unicodeNum')
        }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleEditIconAttrDialogOpen');
        });
        this.listenKeyDown(this.handleSureEditIconAttr);
    }
    // 确认编辑图标属性
    handleSureEditIconAttr() {
        let data = {
            name      : this.refs.newIconName.getValue(),
            unicodeNum: this.refs.newIconUnicode.getValue()
        };
        this.props.setAttrs(this.srcGroupIndex, this.srcListIndex, data);
    }
    // 提示信息设置
    handleEditIconDataErrorHint(target, hint) {
        switch (target) {
            case 'name':
                this.setState({ newIconNameErrorHint: hint }, () => {
                    if(this.props.debug) console.log('LeftSide SetState - handleEditIconDataErrorHint');
                });
                break;
            case 'unicode':
                this.setState({ newIconUnicodeErrorHint: hint }, () => {
                    if(this.props.debug) console.log('LeftSide SetState - handleEditIconDataErrorHint');
                });
                break;
        }
    }
    // 编辑图标属性模态框关闭
    handleEditIconAttrDialogClose() {
        this.setState({ editIconAttrDialogState: false }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleEditIconAttrDialogClose');
        });
        this.unListenKeyDown();
    }



    // 改变分组模态框弹出
    handleChangeGroupDialogOpen(groupIndex, listIndex) {
        this.srcGroupIndex = groupIndex;
        this.srcListIndex = listIndex;
        this.destGroupIndex = null;
        this.setState({ changeGroupDialogState: true }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleChangeGroupDialogOpen');
        });
        this.listenKeyDown(this.handleSureChangeGroup);
    }
    // 选择分组
    handleDestGroupSelect(event, value) {
        this.destGroupIndex = value - 1;
    }
    // 确认改变分组
    handleSureChangeGroup() {
        if(this.destGroupIndex != null && this.destGroupIndex != this.srcGroupIndex) {
            this.props.chgGroup(this.srcGroupIndex, this.srcListIndex, this.destGroupIndex);
        } else {
            this.handleSnackBarOpen('分组未更改');
        }
        this.handleChangeGroupDialogClose();
    }
    // 改变分组模态框关闭
    handleChangeGroupDialogClose() {
        this.setState({ changeGroupDialogState: false }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleChangeGroupDialogClose');
        });
        this.unListenKeyDown();
    }



    // 替换图标
    handleRenewIconFile(groupIndex, listIndex) {
        this.props.chgIcons(groupIndex, listIndex);
    }



    // 确认删除图标模态框弹出
    handleDeleteIconDialogOpen(groupIndex, ListIndex) {
        this.srcGroupIndex = groupIndex;
        this.srcListIndex = ListIndex;
        this.setState({ deleteIconDialogState: true }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleDeleteIconDialogOpen');
        });
        this.listenKeyDown(this.handleSureDeleteIconDialog);
    }
    // 确认删除图标
    handleSureDeleteIconDialog() {
        this.props.delIcons(this.srcGroupIndex, this.srcListIndex);
        this.handleDeleteIconDialogClose();
    }
    // 确认删除图标模态框关闭
    handleDeleteIconDialogClose() {
        this.setState({ deleteIconDialogState: false }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleDeleteIconDialogClose');
        });
        this.unListenKeyDown();
    }



    // 确认修改分组名模态框弹出
    handleEditGroupNameDialogOpen(groupIndex) {
        this.srcGroupIndex = groupIndex;
        if(this.srcGroupIndex != this.props.appData.count()-1) {
            this.setState({
                editGroupNameDefaultValue: this.props.appData.getIn([groupIndex, 'name']),
                editGroupNameDialogState: true
            }, () => {
                if(this.props.debug) console.log('LeftSide SetState - handleEditGroupNameDialogOpen');
            });
            this.listenKeyDown(this.handleSureEditGroupName);
        } else {
            this.handleSnackBarOpen('默认分组名称不允许编辑');
        }
    }
    // 修改分组名
    handleSureEditGroupName() {
        let newGroupName = this.refs.editGroupNameText.getValue();
        if (newGroupName != '') {
            if(this.groupNameRepeat(newGroupName, this.srcGroupIndex)) {
                this.setState({ editGroupNameErrorHint: '组名已经存在' }, () => {
                    if(this.props.debug) console.log('LeftSide SetState - handleSureEditGroupName');
                });
                return;
            }
            this.props.edtGName(newGroupName, this.srcGroupIndex);
            this.handleEditGroupNameDialogClose();
        } else {
            this.setState({ editGroupNameErrorHint: '组名不能为空' }, () => {
                if(this.props.debug) console.log('LeftSide SetState - handleSureEditGroupName');
            });
        }
    }
    // 确认修改分组名模态框关闭
    handleEditGroupNameDialogClose() {
        this.setState({ editGroupNameDialogState: false }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleEditGroupNameDialogClose');
        });
        this.unListenKeyDown();
    }



    // 确认删除分组模态框弹出
    handleDeleteGroupDialogOpen(groupIndex) {
        this.srcGroupIndex = groupIndex;
        if(this.srcGroupIndex != this.props.appData.count()-1) {
            this.setState({deleteGroupDialogState: true}, () => {
                if(this.props.debug) console.log('LeftSide SetState - handleDeleteGroupDialogOpen');
            });
            this.listenKeyDown(this.handleSureDeleteGroup);
        } else {
            this.handleSnackBarOpen('默认分组名称不允许删除');
        }
    }
    // 删除分组
    handleSureDeleteGroup() {
        this.props.delGroup(this.srcGroupIndex);
        this.handleDeleteGroupDialogClose();
    }
    // 确认删除分组模态框关闭
    handleDeleteGroupDialogClose() {
        this.setState({ deleteGroupDialogState: false }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleDeleteGroupDialogClose');
        });
        this.unListenKeyDown();
    }



    // 导出类型选择模态框弹出
    handleExportIconDialogOpen() {
        this.setState({ exportDataDialogState: true }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleExportIconDialogOpen');
        });
        document.onkeydown = this.keyDown;
    }
    // 选择导出类型
    handleExportTypeSelect(expType) {
        try {
            if (this.props.appData.count() == 0){
                this.handleSnackBarOpen('没有可供导出的数据, 尝试添加一个图标, 或建立新分组');
            } else {
                this.props.export(expType);
            }
        } catch(err) {
            console.warn(err);
            this.handleSnackBarOpen('没有可供导出的数据, 尝试添加一个图标, 或建立新分组');
        }

    }
    // 导出类型选择模态框关闭
    handleExportIconDialogClose() {
        this.setState({ exportDataDialogState: false }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleExportIconDialogClose');
        });
    }



    // 打开项目文件模态框关闭
    handleOpenProjFileDialogOpen(files) {
        this.setState({ openProjFileDialogState: true }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleOpenProjFileDialogOpen');
        });
        this.projFilesData = files;
        this.listenKeyDown(this.handleSureOpenProjFile);
    }
    handleSureOpenProjFile() {
        this.props.openProj(this.projFilesData);
        this.setState({ openProjFileDialogState: false }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleSureOpenProjFile');
        });
        this.switchToWithFileState();
    }
    handleOpenProjFileDialogClose() {
        this.setState({ openProjFileDialogState: false }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleOpenProjFileDialogClose');
        });
        this.unListenKeyDown();
    }



    // 提示框打开
    handleSnackBarOpen(hintText) {
        this.setState({
            snackBarText: hintText,
            snackBarState: true
        }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleSnackBarOpen');
        });
    }
    // 提示框关闭
    handleSnackbarClose() {
        this.setState({ snackBarState: false }, () => {
            if(this.props.debug) console.log('LeftSide SetState - handleSnackbarClose');
        });
    }



    // 构建模态框按钮对象
    buildDialogButtons() {
        if(!this.buildedDialogButtons) {
            this.buildedDialogButtons = true;
            // 编辑图标属性按钮
            this.editIconAttrActions = [
                <FlatButton
                    label="取消"
                    onTouchTap={this.handleEditIconAttrDialogClose}
                />,
                <FlatButton
                    label="确认修改"
                    primary={true}
                    onTouchTap={this.handleSureEditIconAttr}
                />
            ];
            // 添加新分组按钮
            this.addGroupActions = [
                <FlatButton
                    label="取消"
                    onTouchTap={this.handleAddGroupDialogClose}
                />,
                <FlatButton
                    label="确认添加"
                    primary={true}
                    onTouchTap={this.handleSureAddGroupDialog}
                />
            ];
            // 编辑分组按钮
            this.editGroupActions = [
                <FlatButton
                    label="离开"
                    primary={true}
                    onTouchTap={this.handleEditGroupDialogClose}
                />
            ];
            // 修改分组名按钮
            this.editGroupNameActions = [
                <FlatButton
                    label="取消"
                    onTouchTap={this.handleEditGroupNameDialogClose}
                />,
                <FlatButton
                    label="确认修改"
                    primary={true}
                    onTouchTap={this.handleSureEditGroupName}
                />
            ];
            // 删除分组按钮
            this.deleteGroupActions = [
                <FlatButton
                    label="取消"
                    onTouchTap={this.handleDeleteGroupDialogClose}
                />,
                <FlatButton
                    label="确认删除"
                    primary={true}
                    onTouchTap={this.handleSureDeleteGroup}
                />
            ];
            // 改变分组按钮
            this.changeGroupActions = [
                <FlatButton
                    label="取消"
                    onTouchTap={this.handleChangeGroupDialogClose}
                />,
                <FlatButton
                    label="确认更改"
                    primary={true}
                    onTouchTap={this.handleSureChangeGroup}
                />
            ];
            // 删除图标按钮
            this.deleteIconActions = [
                <FlatButton
                    label="取消"
                    onTouchTap={this.handleDeleteIconDialogClose}
                />,
                <FlatButton
                    label="确认删除"
                    primary={true}
                    onTouchTap={this.handleSureDeleteIconDialog}
                />
            ];
            // 导出选择按钮
            this.exportIconActions = [
                <FlatButton
                    label="取消导出"
                    primary={true}
                    onTouchTap={this.handleExportIconDialogClose}
                />
            ];
            // 打开项目文件提示框按钮
            this.openProjFileActions = [
                <FlatButton
                    label="取消"
                    onTouchTap={this.handleOpenProjFileDialogClose}
                />,
                <FlatButton
                    label="清空当前数据并打开"
                    primary={true}
                    onTouchTap={this.handleSureOpenProjFile}
                />
            ];
        }
    }
    //  构建更改分组模态框列表数据
    buildChangeGroupListData() {
        let defaultSelectedGroup = null;
        if(this.srcGroupIndex != null) {
            defaultSelectedGroup = this.srcGroupIndex + 1;
        }
        let groupListData = this.props.appData.map((groupData, groupIndex) => {
            return (
                <RadioButton
                    labelStyle={jsStyles.radioButtonStyle}
                    key={groupIndex + 1}
                    value={groupIndex + 1}
                    label={groupData.get('name')}
                />
            );
        });
        this.changeGroupListData = (
            <RadioButtonGroup className="changeGroupSelectorWrapper"
                              name="destGroup"
                              defaultSelected={defaultSelectedGroup}
                              onChange={this.handleDestGroupSelect}
            >
                {groupListData}
            </RadioButtonGroup>
        );
    }
    // 构建编辑分组模态框列表数据
    buildEditGroupTableData() {
        this.groupEditTableData = (
            <Table height={'450px'} fixedHeader={true} selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>组名</TableHeaderColumn>
                        <TableHeaderColumn>图标</TableHeaderColumn>
                        <TableHeaderColumn>&nbsp;&nbsp;&nbsp;&nbsp;操作</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody showRowHover={true} displayRowCheckbox={false}>
                    {
                        this.props.appData.map((groupData, groupIndex) => {
                            return (
                            <TableRow key={groupData.get('name')}>
                                <TableRowColumn>{groupData.get('name')}</TableRowColumn>
                                <TableRowColumn>{groupData.get('listData').count()}</TableRowColumn>
                                <TableRowColumn>
                                    <IconButton onClickCapture={() => this.handleEditGroupNameDialogOpen(groupIndex)}>
                                        <Edit/>
                                    </IconButton>
                                    <IconButton onClickCapture={() => this.handleDeleteGroupDialogOpen(groupIndex)}>
                                        <DeleteGroup/>
                                    </IconButton>
                                </TableRowColumn>
                            </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        );
    }



    // 检查图标名称重复
    iconNameRepeat(newGroupName) {
    }
    // 检查组名重复
    groupNameRepeat(newGroupName, srcGroupIndex) {
        for(let groupIndex = 0; groupIndex<this.props.appData.count(); groupIndex++) {
            if(newGroupName == this.props.appData.getIn([groupIndex, 'name'])) {
                if(srcGroupIndex !== undefined){
                    if(groupIndex !== srcGroupIndex) return true;
                } else {
                    return true;
                }
            }
        }
        return false;
    }




    addEvent(object, type, callback) {
        if (object == null || typeof(object) == 'undefined') return;
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
        } else if (object.attachEvent) {
            object.attachEvent("on" + type, callback);
        } else {
            object["on"+type] = callback;
        }
    }
    // 监听键盘事件
    listenKeyDown(cb) {
        if(!this.keyEvent) {
            this.keyEvent = document.onkeydown;
            document.onkeydown = this.handleKeyDown;
        } else {
            document.onkeydown = this.handleKeyDown;
        }
        this.keyTrigger = cb;
    }
    unListenKeyDown() {
        if(this.keyEvent) {
            document.onkeydown = this.keyEvent;
            this.keyEvent = null;
        } else {
            document.onkeydown = null;
        }
        this.keyTrigger = null;
    }
    handleKeyDown(e){
        //13 = Enter Key
        let keyCode = 13;
        if (e.keyCode == keyCode) {
            this.keyTrigger();
        }
    }


    render() {

        // 构建数据
        this.buildChangeGroupListData();
        this.buildEditGroupTableData();
        this.buildDialogButtons();

        //Debug
        this.renderCountDebug();

        return (
            <div className="leftSide" id="leftSide">

                <div className="iconActionHandlerWrapper" id="iconActionHandlerWrapper">
                    <Dropzone className="iconDragHandler" activeClassName="iconDragHandlerOnDrop" onDrop={this.onDropIconFiles}>
                        <div className="iconDragHandlerBorder">
                            <div className="iconDragInfo">
                                <AddFile/>
                                <br/>
                                <span>点击此处添加SVG格式图标文件或项目文件</span>
                                <br/>
                                <span>或直接将文件拖拽到此处</span>
                            </div>
                        </div>
                    </Dropzone>
                    <div className="iconActionWrapper" id="iconActionWrapper">
                        <div className="addGroupButton">
                            <RaisedButton
                                label="添加新分组"
                                secondary={true}
                                icon={<AddGroup/>}
                                fullWidth={true}
                                onClickCapture={this.handleAddGroupDialogOpen}
                            />
                        </div>
                        <div className="editGroupButton">
                            <RaisedButton
                                label="编辑分组"
                                secondary={true}
                                icon={<EditGroup/>}
                                fullWidth={true}
                                onTouchTap={this.handleEditGroupDialogOpen}
                            />
                        </div>
                        <RaisedButton
                            className="exportIconButton"
                            label="导出"
                            primary={true}
                            icon={<ExportIcon/>}
                            onTouchTap={this.handleExportIconDialogOpen}
                        />
                    </div>
                </div>

                <div className="iconFontListContainer" id="iconFontListContainer">
                    <List className="iconFontList">
                        <Subheader className="iconFontListHeader">图标列表</Subheader>
                        {/*{this.listData}*/}
                        <ListData
                            debug={this.props.debug}
                            appData={this.props.appData}
                            editIconAttr={this.handleEditIconAttrDialogOpen}
                            changeIconGroup={this.handleChangeGroupDialogOpen}
                            renewIcon={this.handleRenewIconFile}
                            deleteIcon={this.handleDeleteIconDialogOpen}
                            savIcons={this.props.savIcons}
                            onIconDrop={this.onDropIconFilesToGroup}
                        />
                    </List>
                </div>

                <div className="dialogWrapper" id="dialogWrapper">
                    <Dialog
                        title="编辑属性"
                        actions={this.editIconAttrActions}
                        modal={false}
                        open={this.state.editIconAttrDialogState}
                        onRequestClose={this.handleEditIconAttrDialogClose}
                    >
                        <div className="editIconAttrTextFieldWrapper">
                            <TextField
                                style={jsStyles.textFieldStyle}
                                hintText="尽量使用简短的名称"
                                floatingLabelText="图标名称"
                                defaultValue={this.state.newIconNameDefaultValue}
                                fullWidth={true}
                                ref="newIconName"
                                errorText={this.state.newIconNameErrorHint}
                                autoFocus
                            />
                            <TextField
                                style={jsStyles.textFieldStyle}
                                hintText="范围: 0000 ~ FFFF 内的16进制数, 请勿重复"
                                floatingLabelText="Unicode"
                                defaultValue={this.state.newIconUnicodeDefaultValue}
                                fullWidth={true}
                                ref="newIconUnicode"
                                errorText={this.state.newIconUnicodeErrorHint}
                                autoFocus
                            />
                        </div>
                    </Dialog>
                    <Dialog
                        title="添加新分组"
                        actions={this.addGroupActions}
                        modal={false}
                        open={this.state.addGroupDialogState}
                        onRequestClose={this.handleAddGroupDialogClose}
                    >
                        <span className="dialogInfo">分组不会影响字体文件的输出以及使用</span>
                        <span className="dialogInfo">仅用于控制示例Demo中的图标分组展示</span>
                        <div className="addGroupTextFieldWrapper">
                            <TextField
                                style={jsStyles.textFieldStyle}
                                hintText="尽量使用简短的名称"
                                floatingLabelText="新分组名称"
                                fullWidth={true}
                                ref="newGroupText"
                                errorText={this.state.groupNameErrorHint}
                                autoFocus
                            />
                        </div>
                    </Dialog>
                    <Dialog
                        title="编辑分组"
                        actions={this.editGroupActions}
                        modal={false}
                        open={this.state.editGroupDialogState}
                        onRequestClose={this.handleEditGroupDialogClose}
                        bodyStyle={{padding: '0'}}
                    >
                        {this.groupEditTableData}
                    </Dialog>
                    <Dialog
                        title="修改分组名称"
                        actions={this.editGroupNameActions}
                        modal={false}
                        open={this.state.editGroupNameDialogState}
                        onRequestClose={this.handleEditGroupDialogClose}
                    >
                        <TextField
                            style={jsStyles.textFieldStyle}
                            hintText="尽量使用简短的名称"
                            floatingLabelText="新分组名称"
                            fullWidth={true}
                            defaultValue={this.state.editGroupNameDefaultValue}
                            errorText={this.state.editGroupNameErrorHint}
                            ref="editGroupNameText"
                            autoFocus
                        />
                    </Dialog>
                    <Dialog
                        title="删除分组"
                        actions={this.deleteGroupActions}
                        modal={false}
                        open={this.state.deleteGroupDialogState}
                        onRequestClose={this.handleEditGroupDialogClose}
                    >
                        <span className="dialogInfo">确认要删除该分组吗 ?</span>
                        <span className="dialogInfo">分组内的所有图标也会被一并删除 !</span>
                    </Dialog>
                    <Dialog
                        title="删除图标"
                        actions={this.deleteIconActions}
                        modal={false}
                        open={this.state.deleteIconDialogState}
                        onRequestClose={this.handleDeleteIconDialogClose}
                    >
                        <span>确认删除图标吗?</span>
                    </Dialog>
                    <Dialog
                        title="选择目标分组"
                        actions={this.changeGroupActions}
                        modal={false}
                        open={this.state.changeGroupDialogState}
                        onRequestClose={this.handleChangeGroupDialogClose}
                        autoScrollBodyContent={true}
                    >
                        {this.changeGroupListData}
                    </Dialog>
                    <Dialog
                        title="选择导出类型"
                        actions={this.exportIconActions}
                        modal={false}
                        open={this.state.exportDataDialogState}
                        onRequestClose={this.handleExportIconDialogClose}
                        autoScrollBodyContent={true}
                    >
                        <div className="dialogInfoWrapper">
                            <span className="dialogInfo exportDialogInfo">图标字体文件可直接用于项目开发</span>
                            <span className="dialogInfo exportDialogInfo">项目文件用于保存图标项目整体信息, 用于下次添加或修改字体文件</span>
                        </div>
                        <RaisedButton
                            className="exportTypeButton exportIconFonts"
                            label="图标字体"
                            primary={true}
                            icon={<IconFiles/>}
                            onTouchTap={() => this.handleExportTypeSelect('iconFiles')}
                        />
                        <RaisedButton
                            className="exportTypeButton exportProjFiles"
                            label="项目文件"
                            primary={true}
                            icon={<ProjFiles/>}
                            onTouchTap={() => this.handleExportTypeSelect('projFiles')}
                        />
                        <RaisedButton
                            className="exportTypeButton exportAllFiles"
                            label="所有文件"
                            primary={true}
                            icon={<BundleFiles/>}
                            onTouchTap={() => this.handleExportTypeSelect('bundleFiles')}
                        />
                    </Dialog>
                    <Dialog
                        title="正在打开项目文件"
                        actions={this.openProjFileActions}
                        modal={false}
                        open={this.state.openProjFileDialogState}
                        onRequestClose={this.handleOpenProjFileDialogClose}
                        autoScrollBodyContent={true}
                    >
                        <span className="dialogInfo openProjDialogInfo">打开项目文件会清空当前正在编辑的数据, 确定打开吗?</span>
                    </Dialog>
                </div>
                <div className="snackbarWrapper" id="snackbarWrapper">
                    <Snackbar
                        open={this.state.snackBarState}
                        message={this.state.snackBarText}
                        autoHideDuration={3000}
                        onRequestClose={this.handleSnackbarClose}
                    />
                </div>
            </div>
        );
    }
}

export default LeftSide;
