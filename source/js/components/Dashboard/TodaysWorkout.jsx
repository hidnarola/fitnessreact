import React,{Component} from 'react';

export default class TodaysWorkout extends Component{

    render(){
        return(
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
        );
    }
}