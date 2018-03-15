import React,{Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import ExerciseListing from './ExerciseListing';

import { routeCodes } from 'constants/routes';

import WorkoutImg from 'img/dashboard/img-01.jpg';
import {Tabs,Tab} from 'react-bootstrap';
import { connect } from 'react-redux';
 


class TodaysWorkout extends Component{
    
    constructor(props){
        super(props);        
    }

    render(){
        const {
            loading,
            todayWorkOut
        } = this.props

        return(
            <div className="white-box space-btm-30">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Today's Workout</h3>
                    <div className="whitebox-head-r">
                        <a className="icon-print"></a>
                        <a className="icon-settings"></a>
                    </div>
                </div>                
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" className="tab_cstm">
                    <Tab eventKey={1} title="Warm Up">
                        { (this.props.loading === true)  ? 'Loading':<ExerciseListing exerList={todayWorkOut['warmUp']} />}
                    </Tab>
                    <Tab eventKey={2} title="Workout">
                        { (this.props.loading === true)  ? 'Loading':<ExerciseListing exerList={todayWorkOut['workOut']} />}
                    </Tab>
                    <Tab eventKey={3} title="Cool Down" >
                        { (this.props.loading === true)  ? 'Loading':<ExerciseListing exerList={todayWorkOut['coolDown']} />}
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.dashboardnew.get('error'),
    loading: state.dashboardnew.get('loading'),
    todayWorkOut: state.dashboardnew.get('todayWorkOut'),
})

export default connect(mapStateToProps)(TodaysWorkout);
