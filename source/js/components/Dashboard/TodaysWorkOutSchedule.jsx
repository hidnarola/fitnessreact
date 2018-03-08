import React,{Component} from 'react';
import WorkoutImg from 'img/dashboard/img-01.jpg';

export default class TodaysWorkOutSchedule extends Component{

    render(){
        return(
            <div className="whitebox-body today-box">
                <ul>
                    <li>
                        <div className="today-box-inr">
                            <span>
                                <img src={WorkoutImg} alt="" />
                            </span>
                            <h4>Bench Press</h4>
                            <h5>25kg for 6 sets of 6 reps</h5>
                        </div>
                    </li>
                    <li>
                        <div className="today-box-inr">
                            <span>
                                <img src={WorkoutImg} alt="" />
                            </span>
                            <h4>Bent Over Row</h4>
                            <h5>10kg for 5 sets of 12 reps</h5>
                        </div>
                    </li>
                    <li>
                        <div className="today-box-inr">
                            <span>
                                <img src={WorkoutImg} alt="" />
                            </span>
                            <h4>Shoulder Press</h4>
                            <h5>10kg for 5 sets of 12 reps</h5>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}