import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import FitnessTestListing from '../../components/Admin/FitnessTests/FitnessTestListing';
import FitnessTestSave from '../../components/Admin/FitnessTests/FitnessTestSave';

class FitnessTests extends Component {

    componentWillMount() {
        // change title 
        document.title = "Fitness Tests";
    }

    render() {
        return (
            <div className="admin-dashboard-wrapper">
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <Switch>
                        <Route exact path={adminRouteCodes.FITNESS_TESTS} component={FitnessTestListing} />
                        <Route exact path={`${adminRouteCodes.FITNESS_TESTS_SAVE}/:id?`} component={FitnessTestSave} />
                    </Switch>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps)(FitnessTests);