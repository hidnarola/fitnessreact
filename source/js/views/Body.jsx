import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { routeCodes } from '../constants/routes';
import BodyMeasurement from '../components/BodyMeasurement/BodyMeasurement';

class Body extends Component {
    render() {
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <Switch>
                        <Route exact path={routeCodes.BODY} component={BodyMeasurement} />
                    </Switch>
                </section>
            </div>
        );
    }
}

export default Body;