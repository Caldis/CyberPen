// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Immutable from 'immutable';
// Init Libs
injectTapEventPlugin(); // For MaterialUI
// MaterialUI Themes
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Init MaterialUI Themes
let defaultTheme = getMuiTheme();
// Components
import LeftSide  from './components/LeftSide/app.js';
// import RightSide from './components/RightSide/app.js';

//For Debug
const debug = (process.env.NODE_ENV == 'dev');

// Main Container
class Main extends React.Component {
    constructor(props) {
        super(props);

        this.iconGroupEventListenerNeedRefresh = true;

        this.state = {
            appData: Immutable.fromJS([
                 {
                    name     : '未分类',
                    listData : [],
                    optData  : {
                        maxUnicodeNum: 58880
                    }
                 }
            ])
        };
        
        this.handleOpenProj                   = this.handleOpenProj.bind(this);
        this.handleGetIconAttrs               = this.handleGetIconAttrs.bind(this);
        this.handleSetIconAttrs               = this.handleSetIconAttrs.bind(this);
        this.handleAddIcons                   = this.handleAddIcons.bind(this);
        this.handleDeleteIcon                 = this.handleDeleteIcon.bind(this);
        this.handleChangeIcons                = this.handleChangeIcons.bind(this);
        this.handleChangeIconGroup            = this.handleChangeIconGroup.bind(this);
        this.handleAddGroup                   = this.handleAddGroup.bind(this);
        this.handleDeleteGroup                = this.handleDeleteGroup.bind(this);
        this.handleSetGroupAttrs              = this.handleSetGroupAttrs.bind(this);
        this.handleExport                     = this.handleExport.bind(this);
        this.saveProjectData                  = this.saveProjectData.bind(this);
        this.saveDemoPage                     = this.saveDemoPage.bind(this);
        this.saveFontClass                    = this.saveFontClass.bind(this);
        this.saveSVGIcons                     = this.saveSVGIcons.bind(this);
        this.strPad                           = this.strPad.bind(this);
        this.getUnicode                       = this.getUnicode.bind(this);
        this.updateMaxUnicodeNum              = this.updateMaxUnicodeNum.bind(this);
        this.updateJSMaxUnicodeNum            = this.updateJSMaxUnicodeNum.bind(this);
        this.getFileName                      = this.getFileName.bind(this);
        this.getFileExt                       = this.getFileExt.bind(this);
        this.getFileNameWithExt               = this.getFileNameWithExt.bind(this);
        this.initIconGroupDropZone            = this.initIconGroupDropZone.bind(this);
        this.refreshIconGroupDropZoneListener = this.refreshIconGroupDropZoneListener.bind(this);
        this.enableIconGroupDropZone          = this.enableIconGroupDropZone.bind(this);
        this.disableIconGroupDropZone         = this.disableIconGroupDropZone.bind(this);
        this.disableIconGroupDropZoneWithLag  = this.disableIconGroupDropZoneWithLag.bind(this);
        this.setNodesPointerEvents            = this.setNodesPointerEvents.bind(this);
        this.preventDropWithChildById         = this.preventDropWithChildById.bind(this);
        this.preventDropById                  = this.preventDropById.bind(this);
        this.preventDropForAll                = this.preventDropForAll.bind(this);
    }

    componentWillMount() {}

    componentDidMount() {
        this.initIconGroupDropZone();
        this.preventDropForAll();
    }



    // Debug
    renderCountDebug() {
        if(debug) {
            if (!this.renderCount) this.renderCount = 1;
            console.log(`Main Render count: ${this.renderCount}`);
            console.log('Render State:');
            console.log(this.state.appData.toJS());
            this.renderCount++;
        }
    }



    // 打开项目文件
    handleOpenProj(projFile) {
        try {
            let newProjData = JSON.parse(fs.readFileSync(projFile[0].path).toString());
            newProjData[newProjData.length-1].optData.maxUnicodeNum = this.updateJSMaxUnicodeNum(newProjData);
            console.log(newProjData[newProjData.length-1].optData.maxUnicodeNum);
            this.setState({ appData:Immutable.fromJS(newProjData) }, () => {
                if(debug) console.log('SetState - handleOpenProj');
            });
            this.refs.leftSide.handleSnackBarOpen('已打开项目文件');
        } catch(err) {
            this.refs.leftSide.handleSnackBarOpen('项目文件解析错误, 原因: ' + err);
        }
    }



    // 读取图标属性
    handleGetIconAttrs(srcGroupIndex, srcListIndex) {
        return this.state.appData.getIn([srcGroupIndex, 'listData', srcListIndex]);
    }
    // 设置图标属性
    handleSetIconAttrs(srcGroupIndex, srcIconIndex, data) {
        let self = this;
        let dataIsCorrect = true;
        if(!data.name) {
            dataIsCorrect = false;
            self.refs.leftSide.handleEditIconDataErrorHint('name', '请填写图标名称');
        }
        if(data.name.length > 20){
            dataIsCorrect = false;
            self.refs.leftSide.handleEditIconDataErrorHint('name', '图标名称过长');
        }
        if(!data.unicodeNum) {
            dataIsCorrect = false;
            self.refs.leftSide.handleEditIconDataErrorHint('unicode', '请填写Unicode, 使用 0000 ~ FFFF 内的16进制数');
        }
        if(data.unicodeNum.length > 4){
            dataIsCorrect = false;
            self.refs.leftSide.handleEditIconDataErrorHint('unicode', 'Unicode 过长');
        }
        // 判断Unicode是否超出范围
        if(dataIsCorrect) {
            let unicodeNum = parseInt(data.unicodeNum, 16);
            if(!unicodeNum || !(unicodeNum>=0 && unicodeNum<=65535)) {
                dataIsCorrect = false;
                self.refs.leftSide.handleEditIconDataErrorHint('unicode', 'Unicode 超出范围, 请使用 0000 ~ FFFF 内的16进制数');
            }
        }
        // 判断Unicode是否重复
        if(dataIsCorrect) {
            let destIntUnicodeNum = parseInt(data.unicodeNum, 16);
            if (destIntUnicodeNum < 65535 && destIntUnicodeNum > 0 && dataIsCorrect) {
                this.state.appData.forEach((groupData, groupIndex) => {
                    groupData.get('listData').forEach((iconData, iconIndex) => {
                        let srcIntUnicodeNum = parseInt(iconData.get('unicodeNum'), 16);
                        if (srcIntUnicodeNum == destIntUnicodeNum) {
                            if ((groupIndex == srcGroupIndex) && (iconIndex == srcIconIndex)) {
                                // 找到自己
                            } else {
                                dataIsCorrect = false;
                                self.refs.leftSide.handleEditIconDataErrorHint('unicode', 'Unicode 重复');
                            }
                        }
                    });
                });
            }
        }
        // 完全正确
        if (dataIsCorrect) {
            let shortUnicodeNum = this.strPad(data.unicodeNum, 4);
            let shortUnicodeNum10 = parseInt(shortUnicodeNum, 16);
            let appData = this.state.appData.updateIn([srcGroupIndex, 'listData', srcIconIndex], (iconData) => {
                return iconData.mergeDeep({
                    name: data.name,
                    unicode: '&#x' + shortUnicodeNum + ';',
                    unicodeNum: shortUnicodeNum
                });
            });
            if(shortUnicodeNum10 >= this.state.appData.getIn([-1, 'optData', 'maxUnicodeNum'])) {
                appData = appData.updateIn([-1, 'optData', 'maxUnicodeNum'], () => shortUnicodeNum10);
            }
            this.setState({ appData: appData }, () => {
                if(debug) console.log('SetState - handleSetIconAttrs');
            });
            this.refs.leftSide.handleEditIconAttrDialogClose();
            this.refs.leftSide.handleSnackBarOpen('图标属性已修改');
            this.refs.leftSide.handleEditIconDataErrorHint('unicode', null);
        }
    }



    // 添加图标
    handleAddIcons(iconDataSet, groupIndex){
        let self = this;
        let newIconCount = 0;
        let appData = this.state.appData;
        let unicode = this.getUnicode();
        console.log(unicode);
        let newUnicode10, newUnicode16 = null;
        let destGroup = groupIndex!=undefined ? groupIndex : -1;
        let destGroupHint = groupIndex!=undefined ? `到${this.state.appData.getIn([destGroup, 'name'])}` : '';
        iconDataSet.forEach((iconData, index) => {
            if (iconData.name.replace(/.+\./,"").toLowerCase() == 'svg') {
                newUnicode10 = unicode.code10 + index;
                newUnicode16 = this.strPad(newUnicode10.toString(16), 4);
                // 默认加入最后一个组(未分类组)
                appData = appData.updateIn([destGroup, 'listData'], (iconListData) => {
                    return iconListData.unshift(Immutable.Map({
                        name: self.getFileName(iconData.path),
                        unicode: '&#x' + newUnicode16 + ';',
                        unicodeNum: newUnicode16,
                        glyph: fs.readFileSync(iconData.path).toString(),
                        size: (iconData.size / 1024).toFixed(2)
                    }));
                });
                newIconCount ++;
            }
        });
        appData = appData.updateIn([-1, 'optData', 'maxUnicodeNum'], () => newUnicode10);
        this.setState({ appData: appData }, () => {
            if(debug) console.log('SetState - handleAddIcons');
        });
        this.refs.leftSide.handleSnackBarOpen(`已添加${newIconCount}个图标${destGroupHint}`);
    }
    // 删除图标
    handleDeleteIcon(groupIndex, ListIndex){
        let appData = this.state.appData;
        appData = appData.updateIn([groupIndex, 'listData'], (iconListData) => {
            return iconListData.delete(ListIndex);
        });
        this.setState({ appData: appData }, () => {
            if(debug) console.log('SetState - handleDeleteIcon');
        });
        this.refs.leftSide.handleSnackBarOpen('图标已删除');
    }
    // 替换图标
    handleChangeIcons(groupIndex, listIndex){
        let self = this;
        let appData = this.state.appData;
        let openOptions = {
            filters: [{ name: 'Images', extensions: ['svg'] }]
        };
        dialog.showOpenDialog(openOptions, (fileNames) => {
            // fileNames is an array that contains all the selected
            if(fileNames === undefined) {
                console.warn("未选择文件");
            } else {
                appData = appData.updateIn([groupIndex, 'listData', listIndex], (iconData) => {
                    return iconData.merge({
                        name: self.getFileName(fileNames[0]),
                        glyph: fs.readFileSync(fileNames[0]).toString(),
                        size: (fs.statSync(fileNames[0]).size / 1024).toFixed(2)
                    });
                });
                self.setState({ appData: appData }, () => {
                    if(debug) console.log('SetState - handleChangeIcons');
                });
                self.refs.leftSide.handleSnackBarOpen('图标已替换');
            }
        });
    }
    // 改变图标所属组
    handleChangeIconGroup(srcGroupIndex, srcListIndex, destGroupIndex) {
        let appData = this.state.appData;
        appData = appData.updateIn([destGroupIndex, 'listData'], (iconListData) => {
            return iconListData.unshift(appData.getIn([srcGroupIndex, 'listData', srcListIndex]));
        });
        appData = appData.updateIn([srcGroupIndex, 'listData'], (iconListData) => {
            return iconListData.delete(srcListIndex);
        });
        this.setState({ appData: appData }, () => {
            if(debug) console.log('SetState - handleChangeIconGroup');
        });
        this.refs.leftSide.handleSnackBarOpen('已移动分组');
    }



    // 添加新组
    handleAddGroup(newGroupName){
        let appData = this.state.appData;
        appData = appData.unshift(
            Immutable.fromJS({
                name: newGroupName,
                listData: []
            })
        );
        this.setState({ appData: appData }, () => {
            if(debug) console.log('SetState - handleAddGroup');
        });
        this.refs.leftSide.handleSnackBarOpen('新分组已添加');
        this.iconGroupEventListenerNeedRefresh = true;
    }
    // 删除组
    handleDeleteGroup(groupIndex) {
        if (this.state.appData.getIn([groupIndex, 'name']) == '未分类'){
            this.refs.leftSide.handleSnackBarOpen('默认分组不允许删除');
        } else {
            this.setState({ appData:this.state.appData.delete(groupIndex) }, () => {
                if(debug) console.log('SetState - handleDeleteGroup');
            });
            this.refs.leftSide.handleSnackBarOpen('分组已删除');
            this.iconGroupEventListenerNeedRefresh = true;
        }
    }
    // 修改组名
    handleSetGroupAttrs(newGroupName, groupIndex) {
        if (this.state.appData.getIn([groupIndex, 'name']) == '未分类'){
            this.refs.leftSide.handleSnackBarOpen('默认分组名称不允许修改');
        } else {
            this.setState({ appData:this.state.appData.updateIn([groupIndex, 'name'], (oldGroupName) => newGroupName) }, () => {
                if(debug) console.log('SetState - handleSetGroupAttrs');
            });
            this.refs.leftSide.handleSnackBarOpen('分组名称已更新');
        }
    }



    // 导出数据
    handleExport(type){
        let self = this;
        let saveIconOptions = {
            title: '保存'
        };
        let saveProjOptions = {
            title  : '保存',
            filters: [
                { name: 'Custom File Type', extensions: ['json'] }
            ]
        };
        let saveBundleOptions = {
            title  : '保存'
        };
        let font = fontCarrier.create();
        let fontClass = '';
        for (let groupIndex=0; groupIndex<this.state.appData.count(); groupIndex++) {
            for(let iconIndex = 0; iconIndex < this.state.appData.getIn([groupIndex, 'listData']).count(); iconIndex++) {
                font.setSvg(this.state.appData.getIn([groupIndex, 'listData', iconIndex, 'unicode']), this.state.appData.getIn([groupIndex, 'listData', iconIndex, 'glyph']));
                let unicodeNum = this.state.appData.getIn([groupIndex, 'listData', iconIndex, 'unicodeNum']);
                fontClass = fontClass + `.iconfont-${unicodeNum}:before{content:"\\${unicodeNum}";}`;
            }
        }
        let appData = JSON.stringify(this.state.appData.toJS());
        switch(type) {
            case 'iconFiles':
                dialog.showSaveDialog(saveIconOptions, (fileName) => {
                    if (fileName === undefined){
                         self.refs.leftSide.handleSnackBarOpen('导出已取消');
                        return;
                    }
                    font.output({ path: fileName });
                    self.saveDemoPage(fileName);
                    self.saveFontClass(fileName, fontClass);
                    self.refs.leftSide.setState({ exportDataDialogState: false }, () => {
                        if(debug) console.log('SetChildState - handleExport');
                    });
                    self.refs.leftSide.handleSnackBarOpen('图标字体文件已导出');
                });
                break;
            case 'projFiles':
                dialog.showSaveDialog(saveProjOptions, (fileName) => {
                    if (fileName === undefined){
                        self.refs.leftSide.handleSnackBarOpen('导出已取消');
                        return;
                    }
                    self.saveProjectData(fileName, appData, '项目文件已导出');
                });
                break;
            case 'bundleFiles':
                dialog.showSaveDialog(saveBundleOptions, (fileName) => {
                    if (fileName === undefined){
                        self.refs.leftSide.handleSnackBarOpen('导出已取消');
                        return;
                    }
                    font.output({ path: fileName });
                    self.saveDemoPage(fileName);
                    self.saveFontClass(fileName, fontClass);
                    self.saveProjectData(fileName, appData, '所有文件已导出');
                });
                break;
        }
    }
    // 保存项目文件
    saveProjectData(fileName, appData, hintText) {
        let self = this;
        fs.writeFile(fileName+'.json', appData, (err) => {
            if(err){
                self.refs.leftSide.handleSnackBarOpen('导出项目数据错误, 原因: ' + err.message);
                return;
            }
            self.refs.leftSide.setState({ exportDataDialogState: false }, () => {
                if(debug) console.log('SetChildState - saveProjectData');
            });
            self.refs.leftSide.handleSnackBarOpen(hintText);
        });
    }
    // 保存Demo页面
    saveDemoPage(path) {
        let htmlHead, htmlHead2, htmlTail = '';
        // For debug
        if (debug){
            htmlHead = fs.readFileSync('app/resource/htmlHead.txt').toString();
            htmlHead2 = fs.readFileSync('app/resource/htmlHead2.txt').toString();
        } else {
            htmlHead = fs.readFileSync('resources/app/app/resource/htmlHead.txt').toString();
            htmlHead2 = fs.readFileSync('resources/app/app/resource/htmlHead2.txt').toString();
        }
        let fontName = this.getFileName(path);
        let iconfontStyle = '@font-face {font-family: "iconfont";src: url("' + fontName + '.eot");src: url("' + fontName + '.eot?#iefix") format("embedded-opentype"), url("' + fontName + '.woff") format("woff"),url("' + fontName + '.ttf") format("truetype"),url("' + fontName + '.svg#iconfont") format("svg");}';
        // For debug
        if (debug){
            htmlTail = fs.readFileSync('app/resource/htmlTail.txt').toString();
        } else {
            htmlTail = fs.readFileSync('resources/app/app/resource/htmlTail.txt').toString();
        }
        let groupDataAll = '';
        this.state.appData.forEach((data, listIndex) => {
            data = data.toJS();
            let groupData = '<div class="iconGroup"><div class="groupName">' + data.name + '</div><div class="groupIcons">';
            for (let i = 0; i < data.listData.length; i++) {
                groupData += '<div class="iconInfoWrapper"><i class="iconfont">' + data.listData[i].unicode + '</i><div class="iconName">' + data.listData[i].name + '</div><div class="iconCode">&amp;#x' + data.listData[i].unicodeNum + ';</div></div>';
            }
            groupData += '</div></div>';
            if (listIndex < this.state.appData.count()-1) {
                groupData += '<div class="groupHr"></div>';
            }
            groupDataAll += groupData;
        });
        let htmlText =  htmlHead + iconfontStyle + htmlHead2 + groupDataAll + htmlTail;
        fs.writeFile(path+'.html', htmlText, (err) => {
            if(err){
                this.refs.leftSide.handleSnackBarOpen('导出图标示例页面错误, 原因: ' + err.message);
            }
        });
    }
    // 保存图标应用的类
    saveFontClass(path, fontClass) {
        fs.writeFile(path+'.css', fontClass, (err) => {
            if(err){
                this.refs.leftSide.handleSnackBarOpen('导出图标关联CSS文件错误, 原因: ' + err.message);
            }
        });
    }
    // 保存单个SVG图标
    saveSVGIcons(groupIndex, iconIndex) {
        let self = this;
        let iconData = this.handleGetIconAttrs(groupIndex, iconIndex).get('glyph');
        let saveBundleOptions = { title: '导出' };
        dialog.showSaveDialog(saveBundleOptions, (fileName) => {
            if(fileName === undefined){
                self.refs.leftSide.handleSnackBarOpen('导出已取消');
                return;
            }
            fs.writeFile(fileName+'.svg', iconData, (err) => {
                if(err){
                    self.refs.leftSide.handleSnackBarOpen('导出SVG图标错误, 原因: ' + err.message);
                    return;
                }
                self.refs.leftSide.handleSnackBarOpen('SVG图标已导出');
            });
        });
    }




    // 补全位数
    strPad(hex, fullLength) {
        let zero = '';
        let length = fullLength - hex.length;
        for (let i = 0; i < length; i++) {
            zero += '0';
        }
        return zero + hex;
    }
    // 生成Unicode (16进制), 记得要在应用的位置更新State
    getUnicode() {
        let unicode = this.state.appData.getIn([-1, 'optData', 'maxUnicodeNum']) + 1;
        return {
            code10: unicode,
            code16: this.strPad(unicode.toString(16), 4)
        }
    }
    // 更新最大Unicode计数
    updateMaxUnicodeNum() {
        let maxUnicodeNum = this.state.appData.getIn([-1, 'optData', 'maxUnicodeNum']);
        for(let groupIndex=0; groupIndex<this.state.appData.count(); groupIndex++) {
            for(let iconIndex = 0; iconIndex < this.state.appData.getIn([groupIndex, 'listData']).count(); iconIndex++) {
                let unicodeNum = this.state.appData.getIn([groupIndex, 'listData', iconIndex, 'unicodeNum']);
                let unicodeNum10 = parseInt(unicodeNum, 16);
                if(unicodeNum10 > maxUnicodeNum) {
                    maxUnicodeNum = unicodeNum10;
                }
            }
        }
        return maxUnicodeNum;
    }
    updateJSMaxUnicodeNum(appData) {
        const appDataLength = appData.length;
        let maxUnicodeNum = 0;
        for(let groupIndex=0; groupIndex<appDataLength; groupIndex++) {
            for(let iconIndex = 0; iconIndex < appData[groupIndex].listData.length; iconIndex++) {
                let unicodeNum = appData[groupIndex].listData[iconIndex].unicodeNum;
                let unicodeNum10 = parseInt(unicodeNum, 16);
                if(unicodeNum10 > maxUnicodeNum) {
                    maxUnicodeNum = unicodeNum10;
                }
                console.log(maxUnicodeNum);
            }
        }
        return maxUnicodeNum;
    }
    // 从完整路径获取文件名, 不带后缀
    getFileName(path) {
        return path.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");
    }
    // 从完整路径获取后缀
    getFileExt(path) {
        return path.replace(/.+\./,"");
    }
    // 从完整路径获取完整文件名, 带后缀
    getFileNameWithExt(path) {
        return this.getFileName(path) + '.' + this.getFileExt(path);
    }
    // 初始化图标组上的拖拽处理区域
    initIconGroupDropZone() {
        let self = this;
        this.iconGroupDropZoneTimaCapsule = null;
        this.iconGroupDropZoneEnabled = false;
        this.iconGroupDropZoneOnOver = false;
        window.addEventListener("dragover", (e) => {
            e.preventDefault();
            self.enableIconGroupDropZone();
        }, false);
        window.addEventListener("drop", (e) => {
            e.preventDefault();
            self.disableIconGroupDropZone();
        }, false);
        window.addEventListener("dragleave", (e) =>{
            e.preventDefault();
            self.disableIconGroupDropZoneWithLag();
        }, false);
    }
    // 启用图标组上的拖拽处理区域
    enableIconGroupDropZone() {
        if(!this.iconGroupDropZoneEnabled) {
            this.iconGroupDropZoneEnabled = true;
            let iconGroupDropHandlerNodes = document.getElementsByClassName('iconGroupDropHandler');
            if (iconGroupDropHandlerNodes) {
                this.setNodesPointerEvents(iconGroupDropHandlerNodes, '');
                this.refreshIconGroupDropZoneListener(iconGroupDropHandlerNodes);
            }
        }
    }
    // 禁用图标组上的拖拽处理区域
    disableIconGroupDropZone() {
        if(this.iconGroupDropZoneEnabled) {
            this.iconGroupDropZoneEnabled = false;
            let iconGroupDropHandlerNodes = document.getElementsByClassName('iconGroupDropHandler');
            if (iconGroupDropHandlerNodes) {
                this.setNodesPointerEvents(iconGroupDropHandlerNodes, 'none');
            }
        }
    }
    // 延迟禁用图标组上的拖拽处理区域
    disableIconGroupDropZoneWithLag() {
        clearTimeout(this.iconGroupDropZoneTimaCapsule);
        this.iconGroupDropZoneTimaCapsule = setTimeout(() => {
            if(!this.iconGroupDropZoneOnOver) this.disableIconGroupDropZone();
        }, 200);
    }
    // 刷新图标组上的事件标记处理处理器
    refreshIconGroupDropZoneListener(nodes) {
        if (this.iconGroupEventListenerNeedRefresh) {
            let arrayNodes = Array.prototype.slice.call(nodes);
            this.iconGroupEventListenerNeedRefresh = false;
            arrayNodes.forEach((node) => {
                node.addEventListener("dragover", (e) => {
                    this.iconGroupDropZoneOnOver = true;
                }, false);
                node.addEventListener("dragleave", (e) => {
                    this.iconGroupDropZoneOnOver = false;
                }, false);
            });
        }
    }
    // 设置节点上的PointerEvents
    setNodesPointerEvents(nodes, state) {
        let arrayNodes = Array.prototype.slice.call(nodes);
        arrayNodes.forEach((node) => {
            node.style.pointerEvents = state;
        });
    }
    // 防止多余拖拽动作
    preventDropWithChildById(id) {
        document.getElementById(id).addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, false);
        document.getElementById(id).addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, false);
    }
    preventDropById(id) {
        document.getElementById(id).addEventListener('dragover', (e) => {
            e.preventDefault();
            return false;
        }, false);
        document.getElementById(id).addEventListener('drop', (e) => {
            e.preventDefault();
            return false;
        }, false);
    }
    preventDropForAll() {
        window.addEventListener("dragover", (e) => {
            e.preventDefault();
        }, false);
        window.addEventListener("drop", (e) => {
            e.preventDefault();
        }, false);
    }



    render() {

        //Debug
        this.renderCountDebug();

        return (
            <div className="app">
                <LeftSide
                    ref="leftSide"
                    debug={debug}
                    appData={this.state.appData}
                    openProj={this.handleOpenProj}
                    addGroup={this.handleAddGroup}
                    addIcons={this.handleAddIcons}
                    delIcons={this.handleDeleteIcon}
                    chgIcons={this.handleChangeIcons}
                    savIcons={this.saveSVGIcons}
                    chgGroup={this.handleChangeIconGroup}
                    edtGName={this.handleSetGroupAttrs}
                    delGroup={this.handleDeleteGroup}
                    getAttrs={this.handleGetIconAttrs}
                    setAttrs={this.handleSetIconAttrs}
                    export={this.handleExport}
                />
                {/* <RightSide/>*/}
            </div>
        );
    }
}

// Render
ReactDOM.render((
    <MuiThemeProvider muiTheme={defaultTheme}>
        <Main/>
    </MuiThemeProvider>
), document.getElementById('main'));

// TODO
// BUGS
// 偶尔有横向滚动条的BUG     //Done
// 替换图标的时候Size未更新  //Done
// 图标拖入-不放下再拖出BUG  //Done
// 图标多的时候更新缓慢      //70%， 添加组的时候仍然缓慢
// 组超过9个无法在编辑页显示  //Done
// NewFeature
// 图标导出                //Done
// 图标搜索/过滤
// 类引用图标
// AI模板下载
// 关于
// 相关帮助
// 中英文
