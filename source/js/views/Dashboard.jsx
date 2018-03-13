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

import {Button,Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getPeopleNew } from 'actions/people';
import { getPeopleNew2 } from 'actions/dashboard';

class ModalPopUp extends Component {
    constructor(props, context) {
        super(props, context);
  
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
  
        this.state = {
            show: false
        };
    }
  
    handleClose() {
        this.setState({ show: false });
    }
  
    handleShow() {
        this.setState({ show: true });
    }

    render() {      
  
        return (
            <div>    
                <Modal show={this.state.show} onHide={this.handleClose} className="widget-popup">            
                    <Modal.Body>
                        <button type="button" className="close-round" onClick={this.handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className="title-h3">Add A Widget</h3>
                        <div className="choose-widget">
                            <ul>
                                <li>
                                    <div className="choosewidget-box">
                                        <i className="icon-pie_chart"></i>
                                        <big>Graph</big>
                                    </div>
                                </li>
                                <li>
                                    <div className="choosewidget-box">
                                        <i className="icon-donut_large"></i>
                                        <big>Stats</big>
                                    </div>
                                </li>
                                <li>
                                    <div className="choosewidget-box">
                                        <i className="icon-security"></i>
                                        <big>Badges</big>
                                    </div>
                                </li>
                                <li>
                                    <div className="choosewidget-box">
                                        <i className="icon-photo_library "></i>
                                        <big>Progress</big>
                                    </div>
                                </li>
                                <li>
                                    <div className="choosewidget-box">
                                        <i className="icon-av_timer"></i>
                                        <big>Goal</big>
                                    </div>
                                </li>
                                <li>
                                    <div className="choosewidget-box">
                                        <i className="icon-photo"></i>
                                        <big>Gallery</big>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Modal.Body>                
                </Modal>
            </div>
        );
    }
}

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            allWidgets : []
        }
    }

    componentDidMount() {
        
    }

    componentWillMount() {
        const {
            dispatch,
            people,
        } = this.props;

        if (!people) {
            dispatch(getPeopleNew2());
        }
    }   

    render(){

        const {
            loading,
            error,
            people,
        } = this.props;

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
                            <a onClick={() => this.refs.child.handleShow()} className="white-btn for_cursor">
                                Add Widget
                            </a>
                            <a href="" className="pink-btn">Profile Completion</a>
                        </div>
                    </div>                    

                    <div className="body-content row d-flex">
                        <div className="col-md-4">
                            <TodaysWorkout/>

                            <GoalProgress  />

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
                
                <ModalPopUp ref="child"/>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.people.get('error'),
    loading: state.people.get('loading'),
    people: state.people.get('people')
})

export default connect(mapStateToProps)(Dashboard);