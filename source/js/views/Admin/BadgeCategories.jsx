import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import BadgeCategoryListing from '../../components/Admin/BadgeCategories/BadgeCategoryListing';

class BadgeCategories extends Component {
    render() {
        return (
            <div className="admin-dashboard-wrapper">
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <Switch>
                        <Route exact path={adminRouteCodes.BADGE_CATEGORIES} component={BadgeCategoryListing} />
                    </Switch>
                </section>
            </div>
        );
    }
}

export default BadgeCategories;