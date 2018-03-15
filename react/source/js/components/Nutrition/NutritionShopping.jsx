import React,{ Component } from 'react';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';

export default class NutritionShopping extends Component{

    render(){
        return(
            <div className="fitness-nutrition">
                <FitnessHeader/>
                <FitnessNav/>
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Shopping List</h2>
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
                        <div className="col-md-8">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-head d-flex">
                                    <h3 className="title-h3 size-14">Edit Your Nutrition Targets</h3>
                                    <div className="whitebox-head-r nutrition-track">
                                        Add a nutrition to track
                                        <a href="" className="pink-btn">
                                            <i className="icon-control_point"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="whitebox-body nutrition-target">
                                    <ul className="common-ul">
                                        <li>
                                            <div className="grey-white">
                                                <h6>
                                                    <big>Calories</big>
                                                    <small>Kcal</small>
                                                </h6>
                                                <div className="target-process"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <h6>
                                                    <big>Protein</big>
                                                    <small>Grams</small>
                                                </h6>
                                                <div className="target-process"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <h6>
                                                    <big>Fat</big>
                                                    <small>Grams</small>
                                                </h6>
                                                <div className="target-process"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <h6>
                                                    <big>Carbs</big>
                                                    <small>Grams</small>
                                                </h6>
                                                <div className="target-process"></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="white-box dietary-restictions">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Dietary Restictions</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="row d-flex">
                                        <div className="col-md-6">
                                            <div className="restiction-box active">
                                                <h4>Vegetrain</h4>
                                                <span className="bg-green-blue">
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Coeliac</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Vegan</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Dairy-Free</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Paleo</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Kosher</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Pescaterian</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Islam</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="white-box maximum-recipe space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Maximum Recipe Time</h3>
                                </div>
                                <div className="whitebox-body">
                                    <ul className="common-ul">
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-middle-c">Breakfast</label>
                                                <div className="selectpicker-wrap bg-none vertical-middle-c">
                                                    <select className="selectpicker">
                                                        <option>00:15</option>
                                                        <option>00:25</option>
                                                        <option>00:35</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-middle-c">Lunch</label>
                                                <div className="selectpicker-wrap bg-none vertical-middle-c">
                                                    <select className="selectpicker">
                                                        <option>00:25</option>
                                                        <option>00:15</option>
                                                        <option>00:05</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-middle-c">Dinner</label>
                                                <div className="selectpicker-wrap bg-none vertical-middle-c">
                                                    <select className="selectpicker">
                                                        <option>00:15</option>
                                                        <option>00:25</option>
                                                        <option>00:35</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-middle-c">Snacks</label>
                                                <div className="selectpicker-wrap bg-none vertical-middle-c">
                                                    <select className="selectpicker">
                                                        <option>00:35</option>
                                                        <option>00:15</option>
                                                        <option>00:05</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="white-box maximum-recipe space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Maximum Recipe Time</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="restiction-box active">
                                        <h4>Easy</h4>
                                        <span className="bg-green-blue">
                                            <i className="icon-check"></i>
                                        </span>
                                    </div>
                                    <div className="restiction-box active">
                                        <h4>Medium</h4>
                                        <span className="bg-green-blue">
                                            <i className="icon-check"></i>
                                        </span>
                                    </div>
                                    <div className="restiction-box active">
                                        <h4>Hard</h4>
                                        <span className="bg-green-blue">
                                            <i className="icon-check"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="white-box maximum-recipe">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Eclude Ingredient</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="ingredient-srh d-flex">
                                        <input type="text" name="" placeholder="Start typing ingredient…" />
                                        <button type="submit">
                                            <i className="icon-search"></i>
                                        </button>
                                    </div>
                                    <div className="exclude-box">
                                        <span>
                                            <img src="images/img-02.jpg" alt="" />
                                        </span>
                                        <h5>Chilli</h5>
                                        <h6>
                                            <i className="icon-close"></i>
                                        </h6>
                                    </div>
                                    <div className="exclude-box">
                                        <span>
                                            <img src="images/img-02.jpg" alt="" />
                                        </span>
                                        <h5>Chocolate</h5>
                                        <h6>
                                            <i className="icon-close"></i>
                                        </h6>
                                    </div>
                                    <div className="exclude-box">
                                        <span>
                                            <img src="images/img-02.jpg" alt="" />
                                        </span>
                                        <h5>Bananas</h5>
                                        <h6>
                                            <i className="icon-close"></i>
                                        </h6>
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