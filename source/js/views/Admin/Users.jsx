import React, { Component } from 'react';
import ReactTable from 'react-table';
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';

class Users extends Component {
    render() {
        const data = [
            {
                name: 'Sahil Bhojani',
                age: 25,
                friends: {
                    name: 'Sonal Maniya',
                    age: 24
                },
            },
            {
                name: 'Sonal Maniya',
                age: 24,
                friends: {
                    name: 'Sahil Bhojani',
                    age: 24
                },
            }
        ];

        const columns = [
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Age',
                accessor: 'age',
                Cell: (props) => (<span className="number">{props.value}</span>)
            },
            {
                id: 'friendName',
                Header: 'Friend Name',
                accessor: (d) => d.friends.name
            },
            {
                Header: (props) => (<span>Friend age</span>),
                accessor: 'friends.age'
            },
        ];
        return (
            <div className="users-wrapper">
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Users</h2>
                        </div>
                    </div>

                    <div className="body-content row d-flex">
                        <div className="col-md-12">
                            <div className="white-box">
                                <div className="whitebox-head">
                                    <h3 className="title-h3">Users list</h3>
                                </div>
                                <div className="row d-flex whitebox-body">
                                    <div className="col-md-12">
                                        <ReactTable
                                            data={data}
                                            columns={columns}
                                        />
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

export default Users;