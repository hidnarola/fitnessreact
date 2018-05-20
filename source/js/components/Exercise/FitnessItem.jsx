import React, { Component } from 'react';
import {
    SERVER_BASE_URL,
    FITNESS_TEST_FORMAT_MAX_REP,
    FITNESS_TEST_FORMAT_MULTISELECT,
    FITNESS_TEST_FORMAT_A_OR_B,
    FITNESS_TEST_FORMAT_TEXT_FIELD
} from '../../constants/consts';
import noProfileImg from 'img/common/no-profile-img.png';
import cns from "classnames";
import ReactHtmlParser from "react-html-parser";

class FitnessItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    render() {
        const {
            item,
            userValue,
            handleTextFieldChange,
            handleMaxRepChange,
            handleMultiselectChange,
            handleAOrBChange,
        } = this.props;
        const { open } = this.state;
        return (
            <div className={cns("fitness-item-wrapper fitness-test-box dropdown", { open: open })}>
                <div className="fitness-test" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <a href="javascript:void(0)" onClick={() => this.setState({ open: !this.state.open })}>
                        <i className="icon-play_arrow"></i>
                    </a>
                    <h5>{item.name}</h5>
                    <span>
                        <img
                            src={SERVER_BASE_URL + item.featureImage}
                            alt="Image"
                            onError={(e) => {
                                e.target.src = noProfileImg
                            }}
                        />
                    </span>
                </div>

                {item && item.format && item.format === FITNESS_TEST_FORMAT_MAX_REP &&
                    <div className="dropdown-menu" aria-labelledby="test-01">
                        {ReactHtmlParser(item.description)}
                        {item.max_rep && item.max_rep.length > 0 &&
                            item.max_rep.map((val, i) => {
                                var userVal = '';
                                if (userValue.value && userValue.value[val]) {
                                    userVal = userValue.value[val];
                                }
                                return (
                                    <div className={cns('grey-white remove-spinner')} key={i}>
                                        <label>Rep Max : {val}</label>
                                        <input
                                            type="number"
                                            id={`${item._id}_max_rep_${i}`}
                                            name={`${item._id}_max_rep_${i}`}
                                            value={userVal}
                                            onChange={(e) => handleMaxRepChange(item._id, e, val)}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                }

                {item && item.format && item.format === FITNESS_TEST_FORMAT_MULTISELECT &&
                    <div className="dropdown-menu" aria-labelledby="test-02">
                        <div className="horizontal-drop">
                            {item.multiselect && item.multiselect.length > 0 &&
                                item.multiselect.map((val, i) => {
                                    var userVal = false;
                                    if (userValue.value && userValue.value.indexOf(i) >= 0) {
                                        userVal = true;
                                    }
                                    return (
                                        <div className="push-ups" key={i}>
                                            <input
                                                type="checkbox"
                                                id={`${item._id}_multiselect_${i}`}
                                                name={`${item._id}_multiselect_${i}`}
                                                value={i}
                                                checked={userVal}
                                                onChange={(e) => handleMultiselectChange(item._id, e)}
                                            />
                                            <h5>{val.title}</h5>
                                            <span>
                                                <img
                                                    src={SERVER_BASE_URL + val.image}
                                                    alt="Image"
                                                    onError={(e) => {
                                                        e.target.src = noProfileImg
                                                    }}
                                                />
                                            </span>
                                        </div>
                                    )
                                })
                            }
                            {ReactHtmlParser(item.description)}
                        </div>
                    </div>
                }

                {item && item.format && item.format === FITNESS_TEST_FORMAT_A_OR_B &&
                    <div className="dropdown-menu" aria-labelledby="test-03">
                        <div className="vertical-drop">
                            <ul>
                                {item.a_or_b && item.a_or_b.length > 0 &&
                                    item.a_or_b.map((val, i) => {
                                        var userVal = false;
                                        if (userValue.value === i) {
                                            userVal = true;
                                        }
                                        return (
                                            <li key={i}>
                                                <input
                                                    type="radio"
                                                    id={`${item._id}_a_or_b`}
                                                    name={`${item._id}_a_or_b`}
                                                    value={i}
                                                    checked={userVal}
                                                    onChange={(e) => handleAOrBChange(item._id, e)}
                                                />
                                                <div className="verticaldrop-img">
                                                    <img
                                                        src={SERVER_BASE_URL + val.image}
                                                        alt="Image"
                                                        onError={(e) => {
                                                            e.target.src = noProfileImg
                                                        }}
                                                    />
                                                </div>
                                                <h6>{val.title}</h6>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            {ReactHtmlParser(item.description)}
                        </div>
                    </div>
                }

                {item && item.format && item.format === FITNESS_TEST_FORMAT_TEXT_FIELD &&
                    <div className="dropdown-menu" aria-labelledby="test-03">
                        {ReactHtmlParser(item.description)}
                        <div className={cns('grey-white remove-spinner')}>
                            <label>Value</label>
                            <input
                                type="number"
                                id={`${item._id}_text_field`}
                                name={`${item._id}_text_field`}
                                value={(userValue.value) ? userValue.value : ''}
                                onChange={(e) => handleTextFieldChange(item._id, e)}
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default FitnessItem;