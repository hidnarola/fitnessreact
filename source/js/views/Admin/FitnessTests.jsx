import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import FitnessTestListing from '../../components/Admin/FitnessTests/FitnessTestListing';
import FitnessTestSave from '../../components/Admin/FitnessTests/FitnessTestSave';

class FitnessTests extends Component {
    render() {
        const { error } = this.props;
        return (
            <div className="admin-dashboard-wrapper">
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <div id="validation_errors_wrapper">
                        {error && error.length > 0 &&
                            <div className="alert alert-danger" role="alert">
                                {
                                    error.map((err, index) => (
                                        <p key={index}>{err}</p>
                                    ))
                                }
                            </div>
                        }
                    </div>
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
    const { adminFitnessTests } = state;
    return {
        error: adminFitnessTests.get('error'),
    }
}

export default connect(mapStateToProps)(FitnessTests);