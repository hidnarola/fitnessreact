import React, { Component } from 'react';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';

class Exercises extends Component {
    render() {
        return (
            <div className="admin-dashboard-wrapper">
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Exercises</h2>
                        </div>
                    </div>

                    <div className="body-content row d-flex">
                        <div className="col-md-12">
                            <div className="white-box">
                                <div className="whitebox-head">
                                    <h3 className="title-h3">Exercises</h3>
                                </div>
                                <div className="row d-flex whitebox-body">
                                    <div className="col-md-12">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Exercises;