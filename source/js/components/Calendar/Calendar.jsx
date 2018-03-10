import React,{Component} from 'react';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
// import CalendarNew from 'react-calendar';
import CalendarNew from 'react-calendar/dist/entry.nostyle';

export default class Calendar extends Component{
    state = {
        date: new Date(),
    }
    
    onChange = date => this.setState({ date })

    render(){
        return(
            <div className='stat-page'>
                <FitnessHeader/>
                <FitnessNav/>
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Calendar</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important
                                that you set goals which are achieveable. Keep updating your profile and your fitness assistant will
                                keep you on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                        <div className="body-head-r">
                            <a href="" className="white-btn">Reset
                                <i className="icon-settings_backup_restore"></i>
                            </a>
                            <a href="" className="green-blue-btn">Update Changes
                                <i className="icon-restore"></i>
                            </a>
                        </div>
                    </div>
                    <div className="body-content row prefferences d-flex">
                        <div className="col-md-4 ">
                            <div className="white-box space-btm-20 padding-20">
                                <div className="whitebox-head d-flex">
                                    <h3 className="title-h3">Workout</h3>
                                    <div className="switch-wrap ml-auto">
                                        <small>Completed</small>
                                        <div className="material-switch">
                                            <input id="someSwitchOptionDefault" name="someSwitchOption001" type="checkbox" />
                                            <label for="someSwitchOptionDefault" className="label-default"></label>
                                        </div>
                                    </div>
                                </div>

                                <div className="whitebox-body">
                                    <div className="fitness-wrap">
                                        <h4>Upper Body</h4>
                                        <div className="fitness-test-box">
                                            <div className="fitness-test">
                                                <a href="">
                                                    <i className="icon-play_arrow"></i>
                                                </a>
                                                <h5>
                                                    <big>Bench Press</big>
                                                    <small>25kg for 6 sets of 6 reps</small>
                                                </h5>
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
                                                <h5>
                                                    <big>Bench Press</big>
                                                    <small>25kg for 6 sets of 6 reps</small>
                                                </h5>
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
                                                <h5>
                                                    <big>Bench Press</big>
                                                    <small>25kg for 6 sets of 6 reps</small>
                                                </h5>
                                                <span>
                                                    <img src="images/img-13.jpg" alt="" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fitness-wrap">
                                        <h4>Upper Body</h4>
                                        <div className="fitness-test-box">
                                            <div className="fitness-test">
                                                <a href="">
                                                    <i className="icon-play_arrow"></i>
                                                </a>
                                                <h5>
                                                    <big>Bench Press</big>
                                                    <small>25kg for 6 sets of 6 reps</small>
                                                </h5>
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
                                                <h5>
                                                    <big>Bench Press</big>
                                                    <small>25kg for 6 sets of 6 reps</small>
                                                </h5>
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
                                                <h5>
                                                    <big>Bench Press</big>
                                                    <small>25kg for 6 sets of 6 reps</small>
                                                </h5>
                                                <span>
                                                    <img src="images/img-13.jpg" alt="" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fitness-wrap">
                                        <h4>Upper Body</h4>
                                        <div className="fitness-test-box">
                                            <div className="fitness-test">
                                                <a href="">
                                                    <i className="icon-play_arrow"></i>
                                                </a>
                                                <h5>
                                                    <big>Bench Press</big>
                                                    <small>25kg for 6 sets of 6 reps</small>
                                                </h5>
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
                                                <h5>
                                                    <big>Bench Press</big>
                                                    <small>25kg for 6 sets of 6 reps</small>
                                                </h5>
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
                                                <h5>
                                                    <big>Bench Press</big>
                                                    <small>25kg for 6 sets of 6 reps</small>
                                                </h5>
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
                            <div className="white-box padding-20">
                                <div className="whitebox-head d-flex">
                                    <h3 className="title-h3">Meal Plan</h3>
                                    <div className="whitebox-head-r">
                                        <a href="">
                                            <i className="icon-settings"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="whitebox-body">
                                    <div className="meal-box">
                                        <h3>Breackfast</h3>
                                        <div className="meal-box-inr">
                                            <span>
                                                <img src="images/img-02.jpg" alt="" />
                                            </span>
                                            <h4>Bulletproof butter
                                                <br/> coffee with cream</h4>
                                        </div>
                                    </div>
                                    <div className="meal-box">
                                        <h3>Breackfast</h3>
                                        <div className="meal-box-inr">
                                            <span>
                                                <img src="images/img-02.jpg" alt="" />
                                            </span>
                                            <h4>Bulletproof butter
                                                <br/> coffee with cream</h4>
                                        </div>
                                    </div>
                                    <div className="meal-box">
                                        <h3>Breackfast</h3>
                                        <div className="meal-box-inr">
                                            <span>
                                                <img src="images/img-02.jpg" alt="" />
                                            </span>
                                            <h4>Bulletproof butter
                                                <br/> coffee with cream</h4>
                                        </div>
                                    </div>
                                    <div className="meal-box">
                                        <h3>Breackfast</h3>
                                        <div className="meal-box-inr">
                                            <span>
                                                <img src="images/img-02.jpg" alt="" />
                                            </span>
                                            <h4>Bulletproof butter
                                                <br/> coffee with cream</h4>
                                        </div>
                                    </div>
                                    <div className="meal-box">
                                        <h3>Breackfast</h3>
                                        <div className="meal-box-inr">
                                            <span>
                                                <img src="images/img-02.jpg" alt="" />
                                            </span>
                                            <h4>Bulletproof butter
                                                <br/> coffee with cream</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="white-box space-btm-30 text-c">
                                <CalendarNew/>
                            </div>
                            <div className="white-box space-btm-30">
                                <div className="whitebox-head">
                                    <h3 className="title-h3">Meal Stats</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="workout-status">
                                        <div className="workoutstatus-top">
                                            <h4>Total Calories</h4>
                                            <h5>510Kcal</h5>
                                        </div>
                                    </div>
                                    <div className="workout-status">
                                        <div className="workoutstatus-top">
                                            <h4>Total Protein</h4>
                                            <h5>36g</h5>
                                        </div>
                                    </div>
                                    <div className="workout-status">
                                        <div className="workoutstatus-top">
                                            <h4>Total Fat</h4>
                                            <h5>98g</h5>
                                        </div>
                                    </div>
                                    <div className="workout-status">
                                        <div className="workoutstatus-top">
                                            <h4>Total Carbs</h4>
                                            <h5>50g</h5>
                                        </div>
                                    </div>
                                    <div className="workout-status">
                                        <div className="workoutstatus-top">
                                            <h4>Cooking Time</h4>
                                            <h5>60 mins</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="white-box space-btm-30">
                                <div className="whitebox-head">
                                    <h3 className="title-h3">Work Stats</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="workout-status">
                                        <div className="workoutstatus-top">
                                            <h4>Total Exercise</h4>
                                            <h5>510</h5>
                                        </div>
                                    </div>
                                    <div className="workout-status">
                                        <div className="workoutstatus-top">
                                            <h4>Muscles Workout</h4>
                                            <h5>12</h5>
                                        </div>
                                        <div className="workoutstatus-btm">
                                            <p>Biceps, Triceps, Lats, Deltoids, Hamstrings, Forearms, Calves, Quads, Abdominals, Lower Back</p>
                                        </div>
                                    </div>
                                    <div className="workout-status">
                                        <div className="workoutstatus-top">
                                            <h4>Weight Lifted</h4>
                                            <h5>986kg</h5>
                                        </div>
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