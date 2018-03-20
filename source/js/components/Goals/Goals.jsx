import React,{ Component } from 'react';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';

export default class Goals extends Component{

    render(){
        return(
            <div className="fitness-goals">
                <FitnessHeader/>
                <FitnessNav/>
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Your Goals</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that
                                you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you
                                on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                        <div className="body-head-r">
                            <a href="" className="white-btn">Add Secondary Goal
                                <i className="icon-control_point"></i>
                            </a>
                            <a href="" className="green-blue-btn">Add Personal Goal
                                <i className="icon-control_point"></i>
                            </a>
                        </div>
                    </div>
                    <div className="body-content">
                        <div className="white-box space-btm-20">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Your Primary Goal</h3>
                            </div>
                            <div className="whitebox-body goal-content d-flex">
                                <div className="part-l">
                                    <div className="goal-head d-flex">
                                        <h3>Lose Fat</h3>
                                        <a href="" className="ml-auto">
                                            <span>Edit Goal</span>
                                            <i className="icon-settings"></i>
                                        </a>
                                    </div>
                                    <div className="goal-body">
                                        <ul className="d-flex goal-info">
                                            <li>
                                                <h4>At start</h4>
                                                <p>20%
                                                    <small>Body Fat</small>
                                                </p>
                                            </li>
                                            <li>
                                                <h4>Current</h4>
                                                <p>16%
                                                    <small>Body Fat</small>
                                                </p>
                                            </li>
                                            <li>
                                                <h4>Target</h4>
                                                <p>12%
                                                    <small>Body Fat</small>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="part-r">
                                    <div className="goal-head d-flex">
                                        <h3>Your Body Fat</h3>
                                    </div>
                                    <div className="goal-body">
                                        <img src="images/bodyfat-graph.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="white-box space-btm-20">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Your Secondary Goal</h3>
                            </div>
                            <div className="whitebox-body goal-content d-flex">
                                <div className="part-l">
                                    <div className="goal-head d-flex">
                                        <h3>Be Healthy</h3>
                                        <a href="" className="ml-auto">
                                            <span>Edit Goal</span>
                                            <i className="icon-settings"></i>
                                        </a>
                                    </div>
                                    <div className="goal-body">
                                        <ul className="d-flex goal-info">
                                            <li>
                                                <h4>At start</h4>
                                                <p>60</p>
                                            </li>
                                            <li>
                                                <h4>Current</h4>
                                                <p>65</p>
                                            </li>
                                            <li>
                                                <h4>Target</h4>
                                                <p>80</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="part-r">
                                    <div className="goal-head d-flex">
                                        <h3>Your Health Score</h3>
                                    </div>
                                    <div className="goal-body">
                                        <img src="images/bodyfat-graph.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="white-box space-btm-20">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Your Personal Goal</h3>
                            </div>
                            <div className="whitebox-body personal-goal d-flex">
                                <div className="personal-goal-l d-flex">
                                    <div className="personal-goal-1">
                                        <strong>I’m going to run 1000 Kilometers</strong>
                                        <small>500 Kilometers Run</small>
                                    </div>
                                    <div className="personal-goal-2">
                                        <img src="images/goal-progress.png" alt="" />
                                    </div>
                                </div>
                                <div className="personal-goal-l d-flex ml-auto">
                                    <div className="personal-goal-1">
                                        <strong>I’m going to Complete 100 workouts</strong>
                                        <small>50 Workouts complete</small>
                                    </div>
                                    <div className="personal-goal-2">
                                        <img src="images/goal-progress.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}