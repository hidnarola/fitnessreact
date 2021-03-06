import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import UserListing from '../../components/Admin/Users/UserListing';
import UserSave from '../../components/Admin/Users/UserSave';
import AddMetaDescription from '../../components/global/AddMetaDescription';

class Users extends Component {

    render() {
        var error = this.props.error;
        return (
            <div className="users-wrapper">
                <AddMetaDescription>
                    <title>Users | Fitly</title>
                </AddMetaDescription>
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <Switch>
                        <Route exact path={adminRouteCodes.USERS} component={UserListing} />
                        <Route path={`${adminRouteCodes.USERS_SAVE}/:id`} component={UserSave} />
                    </Switch>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { adminUsers } = state;
    return {
        error: adminUsers.get('error'),
    }
}

export default connect(mapStateToProps)(Users);