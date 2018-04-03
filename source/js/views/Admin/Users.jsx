import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import UserListing from '../../components/Admin/Users/UserListing';

class Users extends Component {
    render() {
        return (
            <div className="users-wrapper">
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <Switch>
                        <Route exact path={adminRouteCodes.USERS} component={UserListing} />
                    </Switch>
                </section>
            </div>
        );
    }
}

export default Users;