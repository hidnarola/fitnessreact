import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';

class Notifications extends Component {
    constructor(props) {
        super(props);        
    }

    componentWillMount() {
        
    }
    
    render() {
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Notifications</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                    </div>
                    <div className="body-content row prefferences d-flex">

                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(
    mapStateToProps,
)(Notifications);