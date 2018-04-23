import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import BadgeListing from '../../components/Admin/Badges/BadgeListing';
import BadgeSave from '../../components/Admin/Badges/BadgeSave';

class Badges extends Component {
    render() {
        return (
            <div className="admin-dashboard-wrapper">
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <Switch>
                        <Route exact path={adminRouteCodes.BADGES} component={BadgeListing} />
                        <Route exact path={adminRouteCodes.BADGES_SAVE} component={BadgeSave} />
                    </Switch>
                </section>
            </div>
        );
    }
}

export default Badges;