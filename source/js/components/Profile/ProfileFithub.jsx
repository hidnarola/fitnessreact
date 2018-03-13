import React,{ Component } from 'react';


export default class ProfileFithub extends Component{

    render(){
        return(
            <div className="fitness-stats">
                <div className="body-content d-flex row justify-content-start profilephoto-content">
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="add-widgets">
                                    <a href="javascript:void()" data-toggle="modal" data-target="#widget-popup">
                                        <span>Add Widgets</span>
                                        <i className="icon-widgets"></i>
                                    </a>
                                </div>
                                <div className="white-box space-btm-30">
                                    <div className="whitebox-head d-flex">
                                        <h3 className="title-h3">Progress Photos</h3>
                                        <div className="whitebox-head-r">
                                            <a href="" className="icon-more_horiz"></a>
                                        </div>
                                    </div>
                                    <div className="whitebox-body d-flex">
                                        <ul className="d-flex profile-list-ul profilelist-2">
                                            <li>
                                                <div className="profile-list">
                                                    <span>
                                                        <a href="">
                                                            <img src="images/img-02.jpg" alt=""/>
                                                        </a>
                                                    </span>
                                                    <h4>
                                                        <a href="">Current</a>
                                                    </h4>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="profile-list">
                                                    <span>
                                                        <a href="">
                                                            <img src="images/img-06.jpg" alt=""/>
                                                        </a>
                                                    </span>
                                                    <h4>
                                                        <a href="">Current</a>
                                                    </h4>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="white-box space-btm-30">
                                    <div className="whitebox-head d-flex">
                                        <h3 className="title-h3">Body Fat</h3>
                                        <div className="whitebox-head-r ">
                                            <a href="" className="icon-settings"></a>
                                        </div>
                                    </div>
                                    <div className="whitebox-body bodyfat-graph hyphen-30">
                                        <img src="images/bodyfat-graph.png" alt=""/>
                                    </div>
                                </div>

                                <div className="white-box space-btm-30">
                                    <div className="whitebox-head d-flex">
                                        <h3 className="title-h3">Badges</h3>
                                        <div className="whitebox-head-r ">
                                            <a href="" className="icon-settings"></a>
                                        </div>
                                    </div>
                                    <div className="whitebox-body today-badges">
                                        <div className="customiser-box">
                                            <h3>
                                                <strong>Achievement - </strong> Profile</h3>
                                            <h5>Customiser</h5>
                                            <p>You’ve filled out your entire Fitassist profile,
                                                <br/> now everything will fit you even better.</p>
                                            <h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                                <strong>Completed</strong>
                                                <small>June 8, 2017</small>
                                            </h4>
                                            <div className="tropy-icon-box">
                                                
                                            </div>
                                        </div>
                                        <div className="achivement-box">
                                            <h4>
                                                <strong>Achievement -</strong>Strength</h4>
                                            <h5>Getting Heavy</h5>
                                            <p>Lift a total of 1000Kg overall.</p>
                                            <h6>500/1000Kg</h6>
                                            <span>
                                                {/* <img src="images/achievment-graph.png" alt=""/> */}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="white-box space-btm-20">
                                    <div className="whitebox-head d-flex">
                                        <h3 className="title-h3">Timeline</h3>
                                        <div className="whitebox-head-r">
                                            <a href="">
                                                <i className="icon-settings"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="whitebox-body">
                                        <div className="how-training">
                                            <textarea></textarea>
                                            <div className="how-training-btm d-flex justify-content-end">
                                                <a href="">
                                                    <i className="icon-photo_size_select_actual vertical-middle-c"></i>
                                                </a>
                                                <a href="">
                                                    <i className="icon-settings vertical-middle-c"></i>
                                                </a>
                                                <button type="submit" className="vertical-middle-r">Post
                                                    <i className="icon-send"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="post-type">
                                            <div className="posttype-head d-flex justify-content-start">
                                                <span>
                                                    {/* <img src="images/download.jpg" alt=""/> */}
                                                </span>
                                                <h4 className="vertical-middle-c">
                                                    <big>Clifford Webster </big>
                                                    <small>added a new progress photo</small>
                                                </h4>
                                                <p className="vertical-middle-c">4 October at 13:56</p>
                                            </div>
                                            <div className="posttype-body">
                                                <div className="posttype-body-white">
                                                    <h4>Wow! Looks like you’re making great progress, do
                                                        <br/> you have any tips for me?</h4>
                                                </div>
                                                <div className="posttype-body-grey">
                                                    <p>Melvin Castro, Jack Thomas and 10 more like this </p>
                                                </div>
                                            </div>
                                            <div className="posttype-btm d-flex">
                                                <a href="" className="icon-thumb_up"></a>
                                                <a href="" className="icon-chat"></a>
                                            </div>
                                        </div>

                                        <div className="post-type">
                                            <div className="posttype-head d-flex justify-content-start">
                                                <span>
                                                    {/* <img src="images/download.jpg" alt=""/> */}
                                                </span>
                                                <h4 className="vertical-middle-c">
                                                    <big>Clifford Webster </big>
                                                    <small>added a new progress photo</small>
                                                </h4>
                                                <p className="vertical-middle-c">4 October at 13:56</p>
                                            </div>
                                            <div className="posttype-body">
                                                <div className="posttype-body-white">
                                                    <h4>Wow! Looks like you’re making great progress, do
                                                        <br/> you have any tips for me?</h4>
                                                </div>
                                                <div className="posttype-body-grey">
                                                    <span>
                                                        <img src="images/big-img-01.jpg" alt="" />
                                                    </span>
                                                    <p>Melvin Castro, Jack Thomas and 10 more like this </p>
                                                </div>
                                            </div>
                                            <div className="posttype-btm d-flex">
                                                <a href="" className="icon-thumb_up"></a>
                                                <a href="" className="icon-chat"></a>
                                            </div>
                                            <div className="post-comment d-flex">
                                                <span>
                                                    {/* <img src="images/download.jpg" alt=""/> */}
                                                </span>
                                                <div className="post-comment-r">
                                                    <h4>
                                                        <a href="">Dean Brock</a> Great Work! Looking so healthy at the moment, keep it up!</h4>
                                                    <div className="post-comment-r-btm d-flex">
                                                        <p>4 October at 16:24</p>
                                                        <h6>
                                                            <a href="">Like</a>
                                                            <small>|</small>
                                                            <a href="">Reply</a>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="post-type">
                                            <div className="posttype-head d-flex justify-content-start">
                                                <span>
                                                    {/* <img src="images/download.jpg" alt=""/> */}
                                                </span>
                                                <h4 className="vertical-middle-c">
                                                    <big>Clifford Webster </big>
                                                    <small>3 October at 19:20</small>
                                                </h4>
                                                <p className="vertical-middle-c">completed a workout</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 ml-auto">
                        <div className="lavel-img">
                            <span>
                                <img src="images/big-img.jpg" alt="" />
                                <a href="javascript:void()" data-toggle="modal" data-target="#widget-box">
                                    <i className="icon-add_a_photo"></i>
                                </a>
                            </span>
                            <a href="" data-toggle="modal" data-target="#level-gallery">Lavel 13</a>
                        </div>

                        <div className="white-box profile-about">
                            <div className="whitebox-head d-flex profile-about-head">
                                <h3 className="title-h3">About</h3>
                                <div className="whitebox-head-r">
                                    <a href="">Edit</a>
                                </div>
                            </div>
                            <div className="whitebox-body profile-about-body">
                                <a href="" className="purple-btn">Height:150 cm</a>
                                <a href="" className="green-blue-btn">Weight:62 kg</a>
                                <p>I’m doing my best to really get into my health and fitness, I’ve got my goals set to lose some body fat
                                    and generally get healthier. Wish me luck!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}