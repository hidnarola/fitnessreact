import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { adminRouteCodes } from '../../constants/adminRoutes';
import EquipmentListing from '../../components/Admin/Equipments/EquipmentListing';
import EquipmentSave from '../../components/Admin/Equipments/EquipmentSave';

class Equipments extends Component {

    componentWillMount() {
      // change title 
      document.title = "Equipments";
    }
    
    render() {
        return (
            <div className="admin-dashboard-wrapper">
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