import React,{ Component } from 'react';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';

export default class FitnessBody extends Component{

    render(){
        return(
            <div className="fitness-body">
                <FitnessHeader/>
                <FitnessNav/>
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>YOur Body</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that
                                you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you
                                on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                        <div className="body-head-r">
                            <a href="" className="white-btn">Enter Body Fat</a>
                            <a href="" className="pink-btn">Add Progress Photo</a>
                        </div>
                    </div>
                    <div className="body-content">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Body measurements</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-4">
                                    <ul className="common-ul">
                                        <li>
                                            <div className="grey-white">
                                                <label>Neck</label>
                                                <input type="text" name="" placeholder="30cm" readOnly />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label>Shoulders</label>
                                                <input type="text" name="" placeholder="78cm" readOnly />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label>Chest</label>
                                                <input type="text" name="" placeholder="60cm" readOnly />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label>Upper Arm</label>
                                                <input type="text" name="" placeholder="20cm" readOnly />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label>Waist</label>
                                                <input type="text" name="" placeholder="55cm" readOnly />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label>Forearm</label>
                                                <input type="text" name="" placeholder="12cm" readOnly />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label>Hips</label>
                                                <input type="text" name="" placeholder="65cm" readOnly />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label>Thigh</label>
                                                <input type="text" name="" placeholder="4cm" readOnly />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label>Calf</label>
                                                <input type="text" name="" placeholder="26cm" readOnly />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-4">
                                    <div className="whitebody-graph">
                                        <img src="images/body-graph.png" alt="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <ul className="common-ul">
                                        <li>
                                            <div className="grey-white">
                                                <label>Weight</label>
                                                <input type="text" name="" placeholder="60Kg" readOnly />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label>Height</label>
                                                <input type="text" name="" placeholder="150cm" readOnly />
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="log-date">
                                        <div className="log-date-head d-flex">
                                            <h4>Log Date</h4>
                                            <a href="" className="ml-auto">October</a>
                                        </div>
                                        <div className="log-date-wrap">
                                            <img src="images/calendar.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="add-log d-flex">
                                        <a href="" className="ml-auto">Add Log
                                            <i className="icon-control_point"></i>
                                        </a>
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