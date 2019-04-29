import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import ExerciseListing from '../../components/Admin/Exercises/ExerciseListing';
import ExerciseSave from '../../components/Admin/Exercises/ExerciseSave';
import AddMetaDescription from '../../components/global/AddMetaDescription';

class Exercises extends Component {
   
    render() {
        return (
            <div className="admin-dashboard-wrapper">
                <AddMetaDescription>
                    <title>Exercise | Fitly</title>
                </AddMetaDescription>
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <Switch>
                        <Route exact path={adminRouteCodes.EXERCISE} component={ExerciseListing} />
                        <Route exact path={`${adminRouteCodes.EXERCISE_SAVE}/:id?`} component={ExerciseSave} />
                    </Switch>
                </section>
            </div>
        );
    }
}

export default Exercises;