import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import DTable from '../Common/DTable';
import { userFilterRequest, userDeleteRequest } from '../../../actions/admin/users';
import {
    SERVER_BASE_URL,
    GENDER_MALE,
    GENDER_FEMALE,
    GENDER_TRANSGENDER,
    USER_STATUS_ACTIVE,
    USER_STATUS_ACTIVE_STR,
    USER_STATUS_INACTIVE,
    USER_STATUS_INACTIVE_STR
} from '../../../constants/consts';
import { capitalizeFirstLetter } from '../../../helpers/funs';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import DeleteConfirmation from '../Common/DeleteConfirmation';
import { showPageLoader } from '../../../actions/pageLoader';
import moment from 'moment';
import noProfileImg from 'img/common/no-profile-img.png'

const genderOptions = [
    { value: '', label: 'All' },
    { value: GENDER_MALE, label: capitalizeFirstLetter(GENDER_MALE) },
    { value: GENDER_FEMALE, label: capitalizeFirstLetter(GENDER_FEMALE) },
    { value: GENDER_TRANSGENDER, label: capitalizeFirstLetter(GENDER_TRANSGENDER) },
];
const userStatusOptions = [
    { value: '', label: 'All' },
    { value: USER_STATUS_ACTIVE, label: USER_STATUS_ACTIVE_STR },
    { value: USER_STATUS_INACTIVE, label: USER_STATUS_INACTIVE_STR },
];

const deletedOptions = [
    { value: '', label: 'All' },
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
];

class UserListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null,
            showDeleteModal: false,
            deleteActionInit: false,
        }
    }

    filterDTable = (filterData) => {
        const { dispatch } = this.props;
        dispatch(userFilterRequest(filterData));
    }

    render() {
        const { filteredUsers, loading, filteredTotalPages } = this.props;
        const { showDeleteModal } = this.state;
        return (
            <div className="user-listing-wrapper">
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
                                    <DTable
                                        data={filteredUsers}
                                        columns={[
                                            {
                                                id: 'avatar',
                                                Header: 'Profile Image',
                                                accessor: 'avatar',
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="avatar-wrapper">
                                                            <img
                                                                src={SERVER_BASE_URL + row.value}
                                                                alt="Avatar"
                                                                className="avatar"
                                                                onError={(e) => {
                                                                    e.target.src = noProfileImg
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                }
                                            },
                                            {
                                                id: 'firstName',
                                                Header: 'First Name',
                                                accessor: 'firstName',
                                            },
                                            {
                                                id: 'lastName',
                                                Header: 'Last Name',
                                                accessor: 'lastName',
                                            },
                                            {
                                                id: 'username',
                                                Header: 'Username',
                                                accessor: 'username',
                                            },
                                            {
                                                id: 'email',
                                                Header: 'Email',
                                                accessor: 'email',
                                            },
                                            {
                                                id: 'mobileNumber',
                                                Header: 'Mobile No.',
                                                accessor: 'mobileNumber',
                                            },
                                            {
                                                id: 'gender',
                                                Header: 'Gender',
                                                accessor: 'gender',
                                                filterEqual: true,
                                                Cell: (row) => {
                                                    let dataObj = _.find(genderOptions, (o) => {
                                                        return (o.value === row.value);
                                                    });
                                                    return (
                                                        <div className="list-gender-wrapper">
                                                            {dataObj && dataObj.value &&
                                                                <span>{dataObj.label}</span>
                                                            }
                                                        </div>
                                                    );
                                                },
                                                Filter: ({ filter, onChange }) => {
                                                    return (
                                                        <select
                                                            onChange={event => onChange(event.target.value)}
                                                            className="width-100-per"
                                                            value={filter ? filter.value : "all"}
                                                        >
                                                            {genderOptions && genderOptions.length > 0 &&
                                                                genderOptions.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                }
                                            },
                                            {
                                                id: 'dateOfBirth',
                                                Header: 'DOB',
                                                accessor: 'dateOfBirth',
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="list-dob-wrapper">
                                                            <span>
                                                                {row.value && moment(row.value).format('MM/DD/YYYY')}
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                            },
                                            {
                                                id: 'goal',
                                                Header: 'Goal',
                                                accessor: 'goal',
                                                Cell: (row) => {
                                                    return (
                                                        <div className="list-goal-wrapper">
                                                            <span>
                                                                {row.value.map((m, i) => (m)).join(',')}
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                            },
                                            {
                                                id: 'status',
                                                Header: 'Status',
                                                accessor: 'status',
                                                filterDigit: true,
                                                Cell: (row) => {
                                                    let dataObj = _.find(userStatusOptions, (o) => {
                                                        return (o.value === row.value);
                                                    });
                                                    return (
                                                        <div className="list-status-wrapper">
                                                            {dataObj &&
                                                                <span>{dataObj.label}</span>
                                                            }
                                                        </div>
                                                    );
                                                },
                                                Filter: ({ filter, onChange }) => {
                                                    return (
                                                        <select
                                                            onChange={event => onChange(event.target.value)}
                                                            className="width-100-per"
                                                            value={filter ? filter.value : "all"}
                                                        >
                                                            {userStatusOptions && userStatusOptions.length > 0 &&
                                                                userStatusOptions.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                }
                                            },
                                            {
                                                id: 'isDelete',
                                                Header: 'Deleted',
                                                accessor: 'isDelete',
                                                filterEqual: true,
                                                convertBoolean: true,
                                                Cell: (row) => {
                                                    let dataObj = _.find(deletedOptions, (o) => {
                                                        return (o.value === row.value);
                                                    });
                                                    return (
                                                        <div className="list-status-wrapper">
                                                            {dataObj &&
                                                                <span>{dataObj.label}</span>
                                                            }
                                                        </div>
                                                    );
                                                },
                                                Filter: ({ filter, onChange }) => {
                                                    return (
                                                        <select
                                                            onChange={event => onChange(event.target.value)}
                                                            className="width-100-per"
                                                            value={filter ? filter.value : "all"}
                                                        >
                                                            {deletedOptions && deletedOptions.length > 0 &&
                                                                deletedOptions.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                }
                                            },
                                            {
                                                Header: "Actions",
                                                accessor: "_id",
                                                id: "_id",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="actions-wrapper">
                                                            <NavLink className="btn btn-primary" to={`${adminRouteCodes.USERS_SAVE}/${row.value}`}><FaPencil /></NavLink>
                                                            <a className="btn btn-danger" href="javascript:void(0)" onClick={() => this.confirmDelete(row.value)}><FaTrash /></a>
                                                        </div>
                                                    );
                                                }
                                            },
                                        ]}
                                        pages={filteredTotalPages}
                                        serverloading={loading}
                                        filterDTable={this.filterDTable}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteConfirmation
                    show={showDeleteModal}
                    handleClose={this.closeDeleteModal}
                    handleYes={this.handleDelete}
                />
            </div>
        );
    }

    componentDidUpdate() {
        const { loading, history } = this.props;
        const { deleteActionInit } = this.state;
        if (deleteActionInit && !loading) {
            this.setState({
                selectedId: null,
                showDeleteModal: false,
                deleteActionInit: false
            });
            history.push(adminRouteCodes.USERS);
        }
    }

    // ----Start funs -----
    confirmDelete = (_id) => {
        this.setState({
            selectedId: _id,
            showDeleteModal: true
        });
    }

    closeDeleteModal = () => {
        this.setState({
            selectedId: null,
            showDeleteModal: false
        });
    }

    handleDelete = () => {
        const { selectedId } = this.state;
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        this.setState({
            deleteActionInit: true
        });
        dispatch(userDeleteRequest(selectedId));
    }
    // ----END funs -----

}

const mapStateToProps = (state) => {
    const { adminUsers } = state;
    return {
        loading: adminUsers.get('loading'),
        error: adminUsers.get('error'),
        filteredUsers: adminUsers.get('filteredUsers'),
        filteredTotalPages: adminUsers.get('filteredTotalPages'),
    }
}

export default connect(mapStateToProps)(UserListing);