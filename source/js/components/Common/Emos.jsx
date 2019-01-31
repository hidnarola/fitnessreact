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
            positionClass,
            pickerProps
        } = this.props;
        return (
            <div className="emos-wrap">
                <div className="emos-launcher-wrap">
                    <button type="button" className="emos-launcher-btn" onClick={this.toggleEmosArea}>
                        <Emoji emoji='blush' set='emojione' size={24} />
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

    toggleEmosArea = () => {
        this.setState((prevState) => {
            return {
                openEmosArea: !prevState.openEmosArea
            }
        });
    }
}

export default Emos;