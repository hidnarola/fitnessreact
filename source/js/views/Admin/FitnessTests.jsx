import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import FitnessTestListing from '../../components/Admin/FitnessTests/FitnessTestListing';
import FitnessTestSave from '../../components/Admin/FitnessTests/FitnessTestSave';

class FitnessTests extends Component {
    render() {
        return (
            <div className="admin-dashboard-wrapper">
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <Switch>
                        <Route exact path={adminRouteCodes.FITNESS_TESTS} component={FitnessTestListing} />
                        <Route exact path={adminRouteCodes.FITNESS_TESTS_SAVE} component={FitnessTestSave} />
                    </Switch>
                </section>
            </div>
        );
    }
}

export default FitnessTests;