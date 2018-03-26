import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from '../../components/Admin/Template/AdminHeader';
import AdminNav from '../../components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import NutritionsListing from '../../components/Admin/Nutritions/NutritionsListing';

class Nutritions extends Component {
    render() {
        return (
            <div className="nutritions-container-wrapper">
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <Switch>
                        <Route exact path={adminRouteCodes.NUTRITIONS} component={NutritionsListing} />
                    </Switch>
                </section>
            </div>
        );
    }
}

export default Nutritions;