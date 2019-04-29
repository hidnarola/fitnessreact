import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import AdminHeader from '../../components/Admin/Template/AdminHeader';
import AdminNav from '../../components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import EquipmentCategoriesListing from '../../components/Admin/EquipmentCategories/EquipmentCategoriesListing';

class EquipmentCategories extends Component {

    componentWillMount() {
        // change title 
        document.title = "Equipment Categories";

    }

    render() {
        return (
            <div className="admin-dashboard-wrapper">
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap equipment-categories-wrap">
                    <Switch>
                        <Route exact path={adminRouteCodes.EQUIPMENT_CATEGORIES} component={EquipmentCategoriesListing} />
                    </Switch>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(
    mapStateToProps,
)(EquipmentCategories);