import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import EquipmentListing from '../../components/Admin/Equipments/EquipmentListing';
import EquipmentSave from '../../components/Admin/Equipments/EquipmentSave';
import AddMetaDescription from '../../components/global/AddMetaDescription';

class Equipments extends Component {

    render() {
        return (
            <div className="admin-dashboard-wrapper">
                <AddMetaDescription>
                    <title>Equipments | Fitly</title>
                </AddMetaDescription>
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <Switch>
                        <Route exact path={adminRouteCodes.EQUIPMENTS} component={EquipmentListing} />
                        <Route path={`${adminRouteCodes.EQUIPMENTS_SAVE}/:id?`} component={EquipmentSave} />
                    </Switch>
                </section>
            </div>
        );
    }
}

export default Equipments;