import React, { Component } from 'react';
import { Picker, Emoji } from 'emoji-mart';
import cns from "classnames";

class Emos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openEmosArea: false
        }
    }

    render() {
        const { openEmosArea } = this.state;
        const {
            id,
            emosWrapClass,
            positionClass,
            pickerProps,
            emojiBtnSize
        } = this.props;
        let emojiBtnIcon = <Emoji emoji='blush' set='emojione' size={emojiBtnSize ? emojiBtnSize : 24} />;
        if (openEmosArea) {
            emojiBtnIcon = <Emoji emoji='smiley' set='emojione' size={emojiBtnSize ? emojiBtnSize : 24} />;
        }
        return (
            <div id={id} className={cns("emos-wrap", (emosWrapClass ? emosWrapClass : ""))}>
                <div className="emos-launcher-wrap">
                    <button type="button" className="emos-launcher-btn" onClick={this.toggleEmosArea}>
                        {emojiBtnIcon}
                    </button>
                    {openEmosArea &&
                        <div className={cns("emos-area-wrap", (positionClass ? positionClass : "top-right"))}>
                            <Picker
                                color="#f00"
                                emoji=""
                                emojiSize={24}
                                set="emojione"
                                showPreview={false}
                                showSkinTones={false}
                                title="Pick your emoji"
                                {...pickerProps}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener('keyup', this.handleKeyUp, true);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleKeyUp, true);
    }

    handleKeyUp = (e) => {
        if (e && typeof e.keyCode !== 'undefined' && e.keyCode === 27) {
            const { openEmosArea } = this.state;
            if (openEmosArea) {
                this.toggleEmosArea();
            }
        }
    }

    toggleEmosArea = () => {
        this.setState((prevState) => {
            return {
                openEmosArea: !prevState.openEmosArea
            }
        });
    }

    forceOpenClose = (flag = false) => {
        this.setState({ openEmosArea: flag });
    }
}

export default Emos;