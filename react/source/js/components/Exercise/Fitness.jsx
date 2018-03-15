import React,{Component} from 'react';

export default class Fitness extends Component{
    render(){
        return(
            <div className="body-content d-flex row justify-content-start profilephoto-content">
                <div className="col-md-4">
                    <div className="white-box space-btm-20">
                        <div className="whitebox-head">
                            <h3 className="title-h3">Strength</h3>
                        </div>
                        <div className="whitebox-body">
                            <div className="fitness-wrap">
                                <h4>Upper Body</h4>
                                <div className="fitness-test-box dropdown">
                                    <div className="fitness-test" id="test-01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        <a href="">
                                            <i className="icon-play_arrow"></i>
                                        </a>
                                        <h5>Bench Press</h5>
                                        <span>
                                            <img src="images/img-13.jpg" alt="" />
                                        </span>
                                    </div>
                                    <div className="dropdown-menu" aria-labelledby="test-01" className="testmore-01">
                                        <p>Please enter your rep max - or nearest approximation - on the bench press. If you are
                                            unfamiliar with the bench press skip this test for now - retest when you have learned
                                            the movement for an accurate assessment. Do not test this exercise without a spotter.</p>
                                        <div className="grey-white">
                                            <label>One Rep Max</label>
                                            <h5>68Kg</h5>
                                        </div>
                                        <div className="grey-white">
                                            <label>Five Rep Max</label>
                                            <h5>60Kg</h5>
                                        </div>
                                        <div className="grey-white">
                                            <label>Ten Rep Max</label>
                                            <h5>48Kg</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="fitness-test-box">
                                    <div className="fitness-test" id="test-01">
                                        <a href="">
                                            <i className="icon-play_arrow"></i>
                                        </a>
                                        <h5>Suppoted Row</h5>
                                        <span>
                                            <img src="images/img-13.jpg" alt="" />
                                        </span>
                                    </div>
                                </div>
                                <div className="fitness-test-box">
                                    <div className="fitness-test" id="test-01">
                                        <a href="">
                                            <i className="icon-play_arrow"></i>
                                        </a>
                                        <h5>Suppoted Row</h5>
                                        <span>
                                            <img src="images/img-13.jpg" alt="" />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="fitness-wrap">
                                <h4>Lower Body</h4>
                                <div className="fitness-test-box dropdown">
                                    <div className="fitness-test" id="test-02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        <a href="">
                                            <i className="icon-play_arrow"></i>
                                        </a>
                                        <h5>Push Ups</h5>
                                        <span>
                                            <img src="images/img-13.jpg" alt="" />
                                        </span>
                                    </div>
                                    <div className="dropdown-menu" aria-labelledby="test-02" className="testmore-02">
                                        <div className="push-ups">
                                            <h5>Kneeling Inclined</h5>
                                            <span>
                                                <img src="images/img-13.jpg" alt="" />
                                            </span>
                                        </div>
                                        <div className="push-ups">
                                            <h5>Kneeling Inclined</h5>
                                            <span>
                                                <img src="images/img-13.jpg" alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="white-box space-btm-20">
                        <div className="whitebox-head">
                            <h3 className="title-h3">Flexibility</h3>
                        </div>
                        <div className="whitebox-body">
                            <div className="fitness-wrap">
                                <h4>Upper Body</h4>
                                <div className="fitness-test-box dropdown">
                                    <div className="fitness-test" id="test-03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        <a href="">
                                            <i className="icon-play_arrow"></i>
                                        </a>
                                        <h5>Push Ups</h5>
                                        <span>
                                            <img src="images/img-13.jpg" alt="" />
                                        </span>
                                    </div>
                                    <div className="dropdown-menu" aria-labelledby="test-03" className="testmore-03">
                                        <div className="vertical-drop">
                                            <ul>
                                                <li>
                                                    <div className="verticaldrop-img">
                                                        <img src="images/img-13.jpg" alt="" />
                                                    </div>
                                                    <h6>Slight Bend</h6>
                                                </li>
                                                <li>
                                                    <div className="verticaldrop-img">
                                                        <img src="images/img-13.jpg" alt="" />
                                                    </div>
                                                    <h6>Slight Bend</h6>
                                                    <span>
                                                        <i className="icon-check"></i>
                                                    </span>
                                                </li>
                                            </ul>
                                            <p>Stand in a natural position in front of a mirror or get a friend to check the angle
                                                of your knee. </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="fitness-test-box">
                                    <div className="fitness-test" id="test-01">
                                        <a href="">
                                            <i className="icon-play_arrow"></i>
                                        </a>
                                        <h5>Suppoted Row</h5>
                                        <span>
                                            <img src="images/img-13.jpg" alt="" />
                                        </span>
                                    </div>
                                </div>
                                <div className="fitness-test-box">
                                    <div className="fitness-test" id="test-01">
                                        <a href="">
                                            <i className="icon-play_arrow"></i>
                                        </a>
                                        <h5>Suppoted Row</h5>
                                        <span>
                                            <img src="images/img-13.jpg" alt="" />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="fitness-wrap">
                                <h4>Lower Body</h4>
                                <div className="fitness-test-box">
                                    <div className="fitness-test" id="test-01">
                                        <a href="">
                                            <i className="icon-play_arrow"></i>
                                        </a>
                                        <h5>Suppoted Row</h5>
                                        <span>
                                            <img src="images/img-13.jpg" alt="" />
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="white-box space-btm-20">
                        <div className="whitebox-head">
                            <h3 className="title-h3">Posture</h3>
                        </div>
                        <div className="whitebox-body">
                            <div className="fitness-wrap">
                                <h4>Side</h4>
                                <div className="fitness-test-box dropdown">
                                    <div className="fitness-test" id="test-04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        <a href="">
                                            <i className="icon-play_arrow"></i>
                                        </a>
                                        <h5>Push Ups</h5>
                                        <span>
                                            <img src="images/img-13.jpg" alt="" />
                                        </span>
                                    </div>
                                    <div className="dropdown-menu" aria-labelledby="test-04" className="testmore-02">
                                        <div className="push-ups">
                                            <h5>Kneeling Inclined</h5>
                                            <span>
                                                <img src="images/img-13.jpg" alt="" />
                                            </span>
                                        </div>
                                        <div className="push-ups">
                                            <h5>Kneeling Inclined</h5>
                                            <span>
                                                <img src="images/img-13.jpg" alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="fitness-test-box">
                                    <div className="fitness-test">
                                        <a href="">
                                            <i className="icon-play_arrow"></i>
                                        </a>
                                        <h5>Suppoted Row</h5>
                                        <span>
                                            <img src="images/img-13.jpg" alt="" />
                                        </span>
                                    </div>
                                </div>
                                <div className="fitness-test-box">
                                    <div className="fitness-test">
                                        <a href="">
                                            <i className="icon-play_arrow"></i>
                                        </a>
                                        <h5>Suppoted Row</h5>
                                        <span>
                                            <img src="images/img-13.jpg" alt="" />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="fitness-wrap">
                                <h4>Lower Body</h4>
                                <div className="fitness-test-box">
                                    <div className="fitness-test">
                                        <a href="">
                                            <i className="icon-play_arrow"></i>
                                        </a>
                                        <h5>Suppoted Row</h5>
                                        <span>
                                            <img src="images/img-13.jpg" alt="" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}