import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';

export default class NutritionMeal extends Component{

    constructor(props){
        super(props);

    }

    

    render(){
        return(
            <div className="fitness-nutrition">
                <FitnessHeader/>
                <FitnessNav/>
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>nutrition</h2>
                            <p>Your meal plan is balanced and tailored to provide the right mix for your goal. For your fitness assistant
                                to provide the best meal plans make sure you rate recipies you like. You can further fine tune the meals
                                selected for you by changing your nutrition settings. </p>
                        </div>
                        <div className="body-head-r ml-auto">                            

                            <NavLink
                                activeClassName='active'
                                className='pink-btn'
                                exact
                                to={ routeCodes.NUTRITIONSHOP }
                            >
                                <span>Shopping List</span>
                                <i className="icon-shopping_cart"></i>
                            </NavLink>
                            
                            <a href="" className="white-btn">Nutrition Settings
                                <i className="icon-settings"></i>
                            </a>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start">
                        <div className="col-md-8">
                            <div className="white-box">
                                <div className="whitebox-head d-flex profile-head">
                                    <h3 className="title-h3 size-14">Today's Meals</h3>
                                    <div className="whitebox-head-r">
                                        <a href="" className="green-blue">Add meal
                                            <i className="icon-control_point"></i>
                                        </a>
                                    </div>
                                </div>

                                <div className="whitebox-body">
                                    <div className="meal-wrap d-flex">
                                        <div className="meal-img">
                                            <img src="images/img-07.jpg" alt="" />
                                        </div>
                                        <div className="meal-name">
                                            <small>Breakfast</small>
                                            <h5>Bulletproof butter coffee with cream</h5>
                                        </div>
                                        <div className="meal-info">
                                            <small>Cals</small>
                                            <big>400</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Protein</small>
                                            <big>26g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Fat</small>
                                            <big>23g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Carbs</small>
                                            <big>6g</big>
                                        </div>
                                        <div className="meal-info">
                                            <a href="">
                                                <i className="icon-more_horiz"></i>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="meal-wrap d-flex">
                                        <div className="meal-img">
                                            <img src="images/img-07.jpg" alt="" />
                                        </div>
                                        <div className="meal-name">
                                            <small>Breakfast</small>
                                            <h5>Bulletproof butter coffee with cream</h5>
                                        </div>
                                        <div className="meal-info">
                                            <small>Cals</small>
                                            <big>400</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Protein</small>
                                            <big>26g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Fat</small>
                                            <big>23g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Carbs</small>
                                            <big>6g</big>
                                        </div>
                                        <div className="meal-info">
                                            <a href="">
                                                <i className="icon-more_horiz"></i>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="meal-wrap d-flex">
                                        <div className="meal-img">
                                            <img src="images/img-07.jpg" alt="" />
                                        </div>
                                        <div className="meal-name">
                                            <small>Breakfast</small>
                                            <h5>Bulletproof butter coffee with cream</h5>
                                        </div>
                                        <div className="meal-info">
                                            <small>Cals</small>
                                            <big>400</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Protein</small>
                                            <big>26g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Fat</small>
                                            <big>23g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Carbs</small>
                                            <big>6g</big>
                                        </div>
                                        <div className="meal-info">
                                            <a href="">
                                                <i className="icon-more_horiz"></i>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="meal-wrap d-flex">
                                        <div className="meal-img">
                                            <img src="images/img-07.jpg" alt="" />
                                        </div>
                                        <div className="meal-name">
                                            <small>Breakfast</small>
                                            <h5>Bulletproof butter coffee with cream</h5>
                                        </div>
                                        <div className="meal-info">
                                            <small>Cals</small>
                                            <big>400</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Protein</small>
                                            <big>26g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Fat</small>
                                            <big>23g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Carbs</small>
                                            <big>6g</big>
                                        </div>
                                        <div className="meal-info">
                                            <a href="">
                                                <i className="icon-more_horiz"></i>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="meal-wrap d-flex">
                                        <div className="meal-img">
                                            <img src="images/img-07.jpg" alt="" />
                                        </div>
                                        <div className="meal-name">
                                            <small>Breakfast</small>
                                            <h5>Bulletproof butter coffee with cream</h5>
                                        </div>
                                        <div className="meal-info">
                                            <small>Cals</small>
                                            <big>400</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Protein</small>
                                            <big>26g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Fat</small>
                                            <big>23g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Carbs</small>
                                            <big>6g</big>
                                        </div>
                                        <div className="meal-info">
                                            <a href="">
                                                <i className="icon-more_horiz"></i>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="meal-wrap d-flex">
                                        <div className="meal-img">
                                            <img src="images/img-07.jpg" alt="" />
                                        </div>
                                        <div className="meal-name">
                                            <small>Breakfast</small>
                                            <h5>Bulletproof butter coffee with cream</h5>
                                        </div>
                                        <div className="meal-info">
                                            <small>Cals</small>
                                            <big>400</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Protein</small>
                                            <big>26g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Fat</small>
                                            <big>23g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Carbs</small>
                                            <big>6g</big>
                                        </div>
                                        <div className="meal-info">
                                            <a href="">
                                                <i className="icon-more_horiz"></i>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="meal-wrap d-flex">
                                        <div className="meal-img">
                                            <img src="images/img-07.jpg" alt="" />
                                        </div>
                                        <div className="meal-name">
                                            <small>Breakfast</small>
                                            <h5>Bulletproof butter coffee with cream</h5>
                                        </div>
                                        <div className="meal-info">
                                            <small>Cals</small>
                                            <big>400</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Protein</small>
                                            <big>26g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Fat</small>
                                            <big>23g</big>
                                        </div>
                                        <div className="meal-info">
                                            <small>Carbs</small>
                                            <big>6g</big>
                                        </div>
                                        <div className="meal-info">
                                            <a href="">
                                                <i className="icon-more_horiz"></i>
                                            </a>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="recipe-nutrition white-box">
                                <div className="whitebox-head meal-paln">
                                    <h3 className="title-h3 size-14">Meal Plan Stats</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="dtl-div">
                                        <ul className="common-ul">
                                            <li>
                                                <div className="grey-white">
                                                    <h4>Total Calories</h4>
                                                    <h5>2510</h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="grey-white">
                                                    <h4>Total Protein</h4>
                                                    <h5>36
                                                        <sub>g</sub>
                                                    </h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="grey-white">
                                                    <h4>Total Fat</h4>
                                                    <h5>40
                                                        <sub>g</sub>
                                                    </h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="grey-white">
                                                    <h4>Total Carbs</h4>
                                                    <h5>80
                                                        <sub>g</sub>
                                                    </h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="grey-white">
                                                    <h4>Total Time</h4>
                                                    <h5>80 min</h5>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="nutrition-chart">
                                        <img src="images/nutrition-chart.jpg" alt=""/>
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