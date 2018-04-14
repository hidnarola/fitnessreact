import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import ExerciseTypeListing from '../../components/Admin/ExerciseTypes/ExerciseTypeListing';

class ExerciseTypes extends Component {
    render() {
        return (
            <div className="admin-dashboard-wrapper">
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <Switch>
                        <Route exact path={adminRouteCodes.EXERCISE_TYPE} component={ExerciseTypeListing} />
                        {/* <Route exact path={`${adminRouteCodes.EXERCISE_SAVE}/:id?`} component={ExerciseSave} /> */}
                    </Switch>
                </section>
            </div>
        );
    }
}

export default ExerciseTypes;