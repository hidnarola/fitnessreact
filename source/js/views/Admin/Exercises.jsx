import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import ExerciseListing from '../../components/Admin/Exercises/ExerciseListing';
import ExerciseSave from '../../components/Admin/Exercises/ExerciseSave';

class Exercises extends Component {
    componentWillMount() {
      // change title 
      document.title = "Exercise";
    }
    
    render() {
        return (
            <div className="admin-dashboard-wrapper">
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