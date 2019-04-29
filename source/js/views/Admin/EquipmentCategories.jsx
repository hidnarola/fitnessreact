import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import AdminHeader from '../../components/Admin/Template/AdminHeader';
import AdminNav from '../../components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import EquipmentCategoriesListing from '../../components/Admin/EquipmentCategories/EquipmentCategoriesListing';
import AddMetaDescription from '../../components/global/AddMetaDescription';

class EquipmentCategories extends Component {

    render() {
        return (
            <div className="admin-dashboard-wrapper">
                <AddMetaDescription>
                    <title>Equipment categories | Fitly</title>
                </AddMetaDescription>
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