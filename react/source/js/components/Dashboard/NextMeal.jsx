import React,{Component} from 'react';
import BreakfastImg from 'img/dashboard/breakfashimage.jpg';
import {connect} from 'react-redux';

class NextMeal extends Component {
    
    constructor(props){
        super(props);
    }

    render(){
        
        const {nextMeal,loading} = this.props;

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
                        <small>{(loading)?  '':nextMeal['mealType']}</small>
                        <h4>{(loading)?  '':nextMeal['mealTitle']}</h4>
                        <ul className="d-flex">
                            <li>
                                <h5>Cals</h5>
                                <h6>{(loading)?  '':nextMeal['cals']}</h6>
                            </li>
                            <li>
                                <h5>Protein</h5>
                                <h6>{(loading)?  '':nextMeal['protein']}
                                    <sub>g</sub>
                                </h6>
                            </li>
                            <li>
                                <h5>Fat</h5>
                                <h6>{(loading)?  '':nextMeal['fat']}
                                    <sub>g</sub>
                                </h6>
                            </li>
                            <li>
                                <h5>Carbs</h5>
                                <h6>{(loading)?  '':nextMeal['carbs']}
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

const mapStateToProps = state => ({
    error: state.dashboardnew.get('error'),
    loading: state.dashboardnew.get('loading'),
    nextMeal: state.dashboardnew.get('nextMeal'),
})

export default connect(mapStateToProps)(NextMeal);