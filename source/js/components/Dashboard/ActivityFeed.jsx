import React, { Component } from 'react';
import { connect } from 'react-redux';

class ActivityFeed extends Component {
    render() {
        return (
            <div class="white-box space-btm-30">
                <div class="whitebox-head d-flex">
                    <h3 class="title-h3">Activity Feed</h3>
                    <div class="whitebox-head-r">
                        <a href="" class="icon-settings"></a>
                    </div>
                </div>
                <div class="whitebox-body activityfeed-box">
                    <ul class="activity-ul">
                        <li>
                            <div class="activity-li">
                                <div class="activity-li-head">
                                    <span>
                                        <img src="images/download.jpg" alt="" />
                                    </span>
                                    <h3>Jane Jackson</h3>
                                </div>
                                <div class="activity-li-text-kg">
                                    <p>Jane just set a new bench press
                                            <br /> personal best</p>
                                    <h6>
                                        <span>84kg</span>
                                    </h6>
                                </div>
                                <div class="activity-li-btm d-flex">
                                    <a href="" class="icon-thumb_up"></a>
                                    <a href="" class="icon-chat"></a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="activity-li">
                                <div class="activity-li-head">
                                    <span>
                                        <img src="images/download.jpg" alt="" />
                                    </span>
                                    <h3>Jane Jackson</h3>
                                </div>
                                <div class="activity-li-img">
                                    <img src="images/01.jpg" alt="" />
                                </div>
                                <div class="activity-li-onlytext">
                                    <p>Out cyling with
                                            <a href="">@John</a>, feeling fit!</p>
                                </div>
                                <div class="activity-li-btm d-flex">
                                    <a href="" class="icon-thumb_up"></a>
                                    <a href="" class="icon-chat"></a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="activity-li">
                                <div class="activity-li-head">
                                    <span>
                                        <img src="images/download.jpg" alt="" />
                                    </span>
                                    <h3>Jane Jackson</h3>
                                </div>
                                <div class="activity-li-onlytext">
                                    <p>Jane completed her workout for the day</p>
                                </div>
                                <div class="activity-li-btm d-flex">
                                    <a href="" class="icon-thumb_up"></a>
                                    <a href="" class="icon-chat"></a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="activity-li">
                                <div class="activity-li-head">
                                    <span>
                                        <img src="images/download.jpg" alt="" />
                                    </span>
                                    <h3>Jane Jackson</h3>
                                </div>
                                <div class="activity-li-text-kg">
                                    <p>Jeremiah just levelled up!</p>
                                    <h6>
                                        <span>84kg</span>
                                    </h6>
                                </div>
                                <div class="activity-li-btm d-flex">
                                    <a href="" class="icon-thumb_up"></a>
                                    <a href="" class="icon-chat"></a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="activity-li">
                                <div class="activity-li-head">
                                    <span>
                                        <img src="images/download.jpg" alt="" />
                                    </span>
                                    <h3>Jane Jackson</h3>
                                </div>
                                <div class="activity-li-onlytext">
                                    <p>Jeremiah earned a new badge</p>
                                </div>
                                <div class="activity-li-btm d-flex">
                                    <a href="" class="icon-thumb_up"></a>
                                    <a href="" class="icon-chat"></a>
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