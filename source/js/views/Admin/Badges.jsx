import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import BadgeListing from '../../components/Admin/Badges/BadgeListing';
import BadgeSave from '../../components/Admin/Badges/BadgeSave';
import AddMetaDescription from '../../components/global/AddMetaDescription';

class Badges extends Component {

    render() {
        const { error } = this.props;
        return (
            <div className="admin-dashboard-wrapper">
                <AddMetaDescription>
                    <title>Badges | Fitly</title>
                </AddMetaDescription>
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
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