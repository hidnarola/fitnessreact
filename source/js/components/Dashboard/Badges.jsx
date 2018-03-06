import React,{Component} from 'react';


export default class Badges extends Component{

    render(){
        return(
            <div className="white-box space-btm-30">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Badges</h3>
                    <div className="whitebox-head-r">
                        <a href="" className="icon-settings"></a>
                    </div>
                </div>
                <div className="whitebox-body today-badges">
                    <div className="customiser-box">
                        <h3>
                            <strong>Achievement - </strong> Profile</h3>
                        <h5>Customiser</h5>
                        <p>You’ve filled out your entire Fitassist profile, now everything will fit you even better.</p>
                        <h4>
                            <span>
                                <i className="icon-check"></i>
                            </span>
                            <strong>Completed</strong>
                            <small>June 8, 2017</small>
                        </h4>
                        <div className="tropy-icon-box">

                        </div>
                    </div>
                    <div className="achivement-box">
                        <h4>
                            <strong>Achievement -</strong>Strength</h4>
                        <h5>Getting Heavy</h5>
                        <p>Lift a total of 1000Kg overall.</p>
                        <h6>500/1000Kg</h6>
                        <span>
                            <img src="images/achievment-graph.png" alt="" />
                        </span>
                    </div>
                </div>
            </div>
        );
    }

}