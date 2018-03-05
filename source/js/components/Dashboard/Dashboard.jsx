import React,{ Component } from 'react';

import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';

export default class Dashboard extends Component{

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render(){
        return(
            <div className="fitness-dashboard">
                <FitnessHeader/>
                <FitnessNav/>
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Dashboard</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that
                                you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you
                                on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                        <div className="body-head-r space-btm-20">
                            <a href="" className="white-btn">Add Widget</a>
                            <a href="" className="pink-btn">Profile Completion</a>
                        </div>
                    </div>

                    <div className="body-content row d-flex">
                        <div className="col-md-4">
                            <div className="white-box space-btm-30">
                                <div className="whitebox-head d-flex">
                                    <h3 className="title-h3">Today's Workout</h3>
                                    <div className="whitebox-head-r">
                                        <a href="" className="icon-print"></a>
                                        <a href="" className="icon-settings"></a>
                                    </div>
                                </div>
                                <div className="today-link d-flex">
                                    <a href="">Warm Up</a>
                                    <a href="">Workout</a>
                                    <a href="">Cool Down</a>
                                </div>
                                <div className="whitebox-body today-box">
                                    <ul>
                                        <li>
                                            <div className="today-box-inr">
                                                <span>
                                                    <img src="images/img-01.jpg" alt="" />
                                                </span>
                                                <h4>Bench Press</h4>
                                                <h5>25kg for 6 sets of 6 reps</h5>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="today-box-inr">
                                                <span>
                                                    <img src="images/img-01.jpg" alt="" />
                                                </span>
                                                <h4>Bent Over Row</h4>
                                                <h5>10kg for 5 sets of 12 reps</h5>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="today-box-inr">
                                                <span>
                                                    <img src="images/img-01.jpg" alt="" />
                                                </span>
                                                <h4>Shoulder Press</h4>
                                                <h5>10kg for 5 sets of 12 reps</h5>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="white-box space-btm-30">
                                <div className="whitebox-head d-flex">
                                    <h3 className="title-h3">Goal Progress</h3>
                                    <div className="whitebox-head-r">
                                        <a href="" className="icon-settings"></a>
                                    </div>
                                </div>
                                <div className="whitebox-body goal-progress">
                                    <img src="images/goal-progress.png" alt="" />
                                </div>
                            </div>
                            <div className="white-box space-btm-30">
                                <div className="whitebox-head d-flex">
                                    <h3 className="title-h3">Badges</h3>
                                    <div className="whitebox-head-r">
                                        <a href="" className="icon-settings"></a>
                                    </div>
                                </div>
                                <div className="whitebox-body today-badges">
                                    <div className="customiser-box">
                                        <h3>
                                            <strong>Achievement - </strong> Profile</h3>
                                        <h5>Customiser</h5>
                                        <p>You’ve filled out your entire Fitassist profile, now everything will fit you even better.</p>
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
                                            <img src="images/achievment-graph.png" alt="" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="white-box space-btm-30">
                                <div className="whitebox-head d-flex">
                                    <h3 className="title-h3">Your next meal</h3>
                                    <div className="whitebox-head-r">
                                        <a href="" className="icon-settings"></a>
                                    </div>
                                </div>
                                <div className="whitebox-body next-meal">
                                    <div className="nextmeal-img"></div>
                                    <div className="meal-breakfast">
                                        <small>Breakfast</small>
                                        <h4>Boiled eggs & avocado on rye toast</h4>
                                        <ul className="d-flex">
                                            <li>
                                                <h5>Cals</h5>
                                                <h6>400</h6>
                                            </li>
                                            <li>
                                                <h5>Protein</h5>
                                                <h6>26
                                                    <sub>g</sub>
                                                </h6>
                                            </li>
                                            <li>
                                                <h5>Fat</h5>
                                                <h6>1
                                                    <sub>g</sub>
                                                </h6>
                                            </li>
                                            <li>
                                                <h5>Carbs</h5>
                                                <h6>6
                                                    <sub>g</sub>
                                                </h6>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="white-box space-btm-30">
                                <div className="whitebox-head d-flex">
                                    <h3 className="title-h3">Body Fat Loss</h3>
                                    <div className="whitebox-head-r">
                                        <a href="" className="icon-settings"></a>
                                    </div>
                                </div>
                                <div className="whitebox-body bodyfat-graph">
                                    <img src="images/bodyfat-graph.png" alt="" />
                                </div>
                            </div>
                            <div className="white-box space-btm-30">
                                <div className="whitebox-head">
                                    <h3 className="title-h3">Week's Calories</h3>
                                </div>
                                <div className="whitebox-body weeks-calories">
                                    <h4>60978</h4>
                                    <h5>Kcal</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
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
                                                        <br/> personal best</p>
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
                                                <div className="activity-award-text">
                                                    <h4>Getting Heavy</h4>
                                                    <p>Lift a total of 1000Kg overall.</p>
                                                    <span>
                                                        
                                                    </span>
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
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}