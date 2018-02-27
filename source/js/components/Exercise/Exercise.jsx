import React,{ Component } from 'react';

export default class Exercise extends Component{

    render(){
        return(
            <div className="fitness-exercise">
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Shopping List</h2>
                            <div className="body-head-l-btm space-btm-20">
                                <a href="" className="white-btn">Fitness tests</a>
                                <a href="" className="white-btn">Equipment</a>
                                <a href="" className="white-btn active">Preferences</a>
                            </div>
                            <p>Each fitness test feeds directly into our algorithm - every test is used to identify the most efficient and effective
                                structure of your training plan. Each test is designed to identify imbalances and weaknesses that may lead
                                to increased risk of injury or decreased performance - now and in the future. This may also allow us to identify
                                opportunities for rapid improvement.</p>
                        </div>
                        <div className="body-head-r">
                            <a href="" className="white-btn">Reset
                                <i className="icon-print"></i>
                            </a>
                            <a href="" className="green-blue-btn">Update
                                <i className="icon-control_point"></i>
                            </a>
                        </div>
                    </div>

                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-4">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Workout Intensity</h3>
                                </div>
                                <div className="whitebox-body text-c">
                                    <img src="images/intensity.jpg" alt="" />
                                </div>
                            </div>

                            <div className="white-box space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Existing Injuries</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="restiction-box">
                                        <h4>Back</h4>
                                        <span>
                                            <i className="icon-check"></i>
                                        </span>
                                    </div>
                                    <div className="restiction-box">
                                        <h4>Kness</h4>
                                        <span>
                                            <i className="icon-check"></i>
                                        </span>
                                    </div>
                                    <div className="restiction-box active">
                                        <h4>Shoulders</h4>
                                        <span className="bg-green-blue">
                                            <i className="icon-check"></i>
                                        </span>
                                    </div>
                                    <div className="restiction-box">
                                        <h4>Ankles</h4>
                                        <span>
                                            <i className="icon-check"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-4">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Workout Intensity</h3>
                                </div>
                                <div className="whitebox-body text-c">
                                    <img src="images/intensity.jpg" alt="" />
                                </div>
                            </div>

                            <div className="white-box space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Exclude Exercise Type</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="restiction-box">
                                        <h4>Cardio</h4>
                                        <span className="bg-pink">
                                            <i className="icon-block"></i>
                                        </span>
                                    </div>
                                    <div className="restiction-box active">
                                        <h4>Flexibility</h4>
                                        <span className="bg-pink">
                                            <i className="icon-block"></i>
                                        </span>
                                    </div>
                                    <div className="restiction-box">
                                        <h4>Mobility</h4>
                                        <span className="bg-pink">
                                            <i className="icon-block"></i>
                                        </span>
                                    </div>
                                    <div className="restiction-box active">
                                        <h4>Strength</h4>
                                        <span className="bg-pink">
                                            <i className="icon-block"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-4">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Exclude Exercise</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="exclude-srh d-flex">
                                        <input type="text" name="" placeholder="" />
                                        <button type="submit">
                                            <i className="icon-search"></i>
                                        </button>
                                    </div>
                                    <div className="restiction-box active">
                                        <h4>Shoulder Press</h4>
                                        <span>
                                            <i className="icon-delete_forever"></i>
                                        </span>
                                    </div>
                                    <div className="restiction-box active">
                                        <h4>Reverse Fly</h4>
                                        <span>
                                            <i className="icon-delete_forever"></i>
                                        </span>
                                    </div>
                                    <div className="restiction-box active">
                                        <h4>Single Leg Squat</h4>
                                        <span>
                                            <i className="icon-delete_forever"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="white-box space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Exclude Exercise</h3>
                                </div>
                                <div className="whitebox-body workout-schedule">
                                    <div className="d-flex view-schedule">
                                        <a href="" className="active">Manual</a>
                                        <a href="">Automatic</a>
                                    </div>
                                    <ul className="common-ul">
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Monday</label>
                                                <div className="selectpicker-wrap vertical-middle-c">
                                                    <select className="selectpicker bg-none">
                                                        <option>00:40</option>
                                                        <option>00:20</option>
                                                        <option>00:20</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Tuesday</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Wednesday</label>
                                                <div className="selectpicker-wrap vertical-middle-c">
                                                    <select className="selectpicker bg-none">
                                                        <option>00:40</option>
                                                        <option>00:20</option>
                                                        <option>00:20</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Thursday</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Friday</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Saturday</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Sunday</label>
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