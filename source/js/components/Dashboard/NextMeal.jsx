import React,{Component} from 'react';
import BreakfastImg from 'img/dashboard/breakfashimage.jpg';

export default class NextMeal extends Component {
    render(){
        return(
            <div className="white-box space-btm-30">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Your next meal</h3>
                    <div className="whitebox-head-r">
                        <a href="" className="icon-settings"></a>
                    </div>
                </div>
                <div className="whitebox-body next-meal">
                    <div className="nextmeal-img">
                        
                    </div>
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

        );
    }
}