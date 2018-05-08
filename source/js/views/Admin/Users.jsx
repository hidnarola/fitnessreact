import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import UserListing from '../../components/Admin/Users/UserListing';
import UserSave from '../../components/Admin/Users/UserSave';

class Users extends Component {
    render() {
        var error = this.props.error;
        return (
            <div className="users-wrapper">
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