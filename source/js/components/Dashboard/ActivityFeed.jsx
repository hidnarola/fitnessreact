import React, { Component } from 'react';
import { connect } from 'react-redux';

class ActivityFeed extends Component {
    render() {
        return (
            <div className="white-box space-btm-30">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Activity Feed</h3>
                    <div className="whitebox-head-r">
                        <a href="" className="icon-settings"></a>
                    </div>
                </div>
                <div className="whitebox-body activityfeed-box">
                    <ul className="activity-ul">
                        <li>
                            <div className="activity-li">
                                <div className="activity-li-head">
                                    <span>
                                        <img src="images/download.jpg" alt="" />
                                    </span>
                                    <h3>Jane Jackson</h3>
                                </div>
                                <div className="activity-li-text-kg">
                                    <p>Jane just set a new bench press
                                            <br /> personal best</p>
                                    <h6>
                                        <span>84kg</span>
                                    </h6>
                                </div>
                                <div className="activity-li-btm d-flex">
                                    <a href="" className="icon-thumb_up"></a>
                                    <a href="" className="icon-chat"></a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="activity-li">
                                <div className="activity-li-head">
                                    <span>
                                        <img src="images/download.jpg" alt="" />
                                    </span>
                                    <h3>Jane Jackson</h3>
                                </div>
                                <div className="activity-li-img">
                                    <img src="images/01.jpg" alt="" />
                                </div>
                                <div className="activity-li-onlytext">
                                    <p>Out cyling with
                                            <a href="">@John</a>, feeling fit!</p>
                                </div>
                                <div className="activity-li-btm d-flex">
                                    <a href="" className="icon-thumb_up"></a>
                                    <a href="" className="icon-chat"></a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="activity-li">
                                <div className="activity-li-head">
                                    <span>
                                        <img src="images/download.jpg" alt="" />
                                    </span>
                                    <h3>Jane Jackson</h3>
                                </div>
                                <div className="activity-li-onlytext">
                                    <p>Jane completed her workout for the day</p>
                                </div>
                                <div className="activity-li-btm d-flex">
                                    <a href="" className="icon-thumb_up"></a>
                                    <a href="" className="icon-chat"></a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="activity-li">
                                <div className="activity-li-head">
                                    <span>
                                        <img src="images/download.jpg" alt="" />
                                    </span>
                                    <h3>Jane Jackson</h3>
                                </div>
                                <div className="activity-li-text-kg">
                                    <p>Jeremiah just levelled up!</p>
                                    <h6>
                                        <span>84kg</span>
                                    </h6>
                                </div>
                                <div className="activity-li-btm d-flex">
                                    <a href="" className="icon-thumb_up"></a>
                                    <a href="" className="icon-chat"></a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="activity-li">
                                <div className="activity-li-head">
                                    <span>
                                        <img src="images/download.jpg" alt="" />
                                    </span>
                                    <h3>Jane Jackson</h3>
                                </div>
                                <div className="activity-li-onlytext">
                                    <p>Jeremiah earned a new badge</p>
                                </div>
                                <div className="activity-li-btm d-flex">
                                    <a href="" className="icon-thumb_up"></a>
                                    <a href="" className="icon-chat"></a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(
    mapStateToProps,
)(ActivityFeed);