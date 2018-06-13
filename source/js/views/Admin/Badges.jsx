import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import BadgeListing from '../../components/Admin/Badges/BadgeListing';
import BadgeSave from '../../components/Admin/Badges/BadgeSave';

class Badges extends Component {
    render() {
        const { error } = this.props;
        return (
            <div className="admin-dashboard-wrapper">
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
                        <Route exact path={adminRouteCodes.BADGES} component={BadgeListing} />
                        <Route exact path={`${adminRouteCodes.BADGES_SAVE}/:id?`} component={BadgeSave} />
                    </Switch>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { adminBadges } = state;
    return {
        error: adminBadges.get('error'),
    };
}
export default connect(mapStateToProps)(Badges);