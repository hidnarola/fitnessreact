import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import FitnessTestListing from '../../components/Admin/FitnessTests/FitnessTestListing';
import FitnessTestSave from '../../components/Admin/FitnessTests/FitnessTestSave';
import AddMetaDescription from '../../components/global/AddMetaDescription';

class FitnessTests extends Component {

    render() {
        return (
            <div className="admin-dashboard-wrapper">
                <AddMetaDescription>
                    <title>Fitness Test | Fitly</title>
                </AddMetaDescription>
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