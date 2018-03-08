import React,{Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import TodaysWarmUp from './TodaysWarmUp';
import TodaysWorkOutSchedule from './TodaysWorkOutSchedule';
import TodaysCoolDown from './TodaysCoolDown';

import { routeCodes } from 'constants/routes';

import WorkoutImg from 'img/dashboard/img-01.jpg';

import {Tabs,Tab} from 'react-bootstrap';
 


export default class TodaysWorkout extends Component{

    render(){
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
                        <TodaysWarmUp/>
                    </Tab>
                    <Tab eventKey={2} title="Workout">
                        <TodaysWorkOutSchedule/>
                    </Tab>
                    <Tab eventKey={3} title="Cool Down" >
                        <TodaysCoolDown/>
                    </Tab>
                </Tabs>                              
                
            </div>
        );
    }
}