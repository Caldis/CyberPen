import React from 'react';

class RightSide extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="rightSide">
                <div className="iconFontDetailRight">
                    <div className="iconFontInfoRight">
                        <div className="iconFontInfoRightContainer">
                            <span className="iconFontNamesRight">二级菜单-低速率分析</span>
                            <br/>
                            <span className="iconFontSizeRight">2kb</span>
                            <span className="iconFontUnicodeRight">xe6a7;</span>
                        </div>
                        <div className="iconFontActionRight">
                        </div>
                    </div>
                    <div className="iconFontPreviewRight">
                        <img className="iconFontPreviewImgRight" src="./app/resource/5.svg" alt="5"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default RightSide;
