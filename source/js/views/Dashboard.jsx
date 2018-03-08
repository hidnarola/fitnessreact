import React,{ Component } from 'react';

import ActivityFeed from 'components/Dashboard/ActivityFeed';

import TodaysWorkout from 'components/Dashboard/TodaysWorkout';
import GoalProgress from 'components/Dashboard/GoalProgress';
import Badges from 'components/Dashboard/Badges';

import NextMeal from 'components/Dashboard/NextMeal';
import BodyFatLoss from 'components/Dashboard/BodyFatLoss';
import WeeksCalories from 'components/Dashboard/WeeksCalories';

import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';

export default class Dashboard extends Component{

    constructor(props){
        super(props);
        
    }

    componentDidMount() {
        
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
                            <TodaysWorkout/>

                            <GoalProgress/>

                            <Badges/>                             
                        </div>
                        <div className="col-md-4">
                            <NextMeal/>
                            
                            <BodyFatLoss/>

                            <WeeksCalories/>                            
                        </div>
                        <div className="col-md-4">
                            <ActivityFeed/>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}