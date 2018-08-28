import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import DTable from '../Common/DTable';
import { userFilterRequest, userDeleteRequest } from '../../../actions/admin/users';
import {
    GENDER_MALE,
    GENDER_FEMALE,
    USER_STATUS_ACTIVE,
    USER_STATUS_ACTIVE_STR,
    USER_STATUS_INACTIVE,
    USER_STATUS_INACTIVE_STR
} from '../../../constants/consts';
import { capitalizeFirstLetter, ts } from '../../../helpers/funs';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import DeleteConfirmation from '../Common/DeleteConfirmation';
import { showPageLoader } from '../../../actions/pageLoader';
import moment from 'moment';
import noProfileImg from 'img/common/no-profile-img.png';
import { DropdownButton, ButtonToolbar, MenuItem } from "react-bootstrap";

const genderOptions = [
    { value: '', label: 'All' },
    { value: GENDER_MALE, label: capitalizeFirstLetter(GENDER_MALE) },
    { value: GENDER_FEMALE, label: capitalizeFirstLetter(GENDER_FEMALE) },
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
            dtFilter: {},
            dtManualForceReload: false,
        }
    }

    dispatchUsersFilter = (filterData) => {
        const { dispatch } = this.props;
        dispatch(userFilterRequest(filterData));
    }

    filterDTable = (filterData) => {
        this.setState({ dtFilter: filterData });
        this.dispatchUsersFilter(filterData);
    }

    render() {
        const { loading, filteredUsers, filteredTotalPages } = this.props;
        const { showDeleteModal, dtManualForceReload } = this.state;
        return (
            <div className="user-listing-wrapper">
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
                                                        <div className="avatar-wrapper text-center">
                                                            <img
                                                                src={row.value}
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
                                                minWidth: 200,
                                            },
                                            {
                                                id: 'lastName',
                                                Header: 'Last Name',
                                                accessor: 'lastName',
                                                minWidth: 200,
                                            },
                                            {
                                                id: 'email',
                                                Header: 'Email',
                                                accessor: 'email',
                                                minWidth: 300,
                                            },
                                            {
                                                id: 'mobileNumber',
                                                Header: 'Mobile No.',
                                                accessor: 'mobileNumber',
                                                minWidth: 100,
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
                                                },
                                                minWidth: 100,
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
                                                },
                                                minWidth: 100,
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
                                                },
                                                minWidth: 100,
                                            },
                                            {
                                                Header: "Actions",
                                                accessor: "authUserId",
                                                id: "authUserId",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="actions-wrapper">
                                                            <ButtonToolbar>
                                                                <DropdownButton title="Actions" pullRight id="dropdown-size-medium">
                                                                    <MenuItem
                                                                        eventKey="1"
                                                                        href={`${adminRouteCodes.USERS_SAVE}/${row.value}`}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            this.props.history.push(`${adminRouteCodes.USERS_SAVE}/${row.value}`);
                                                                        }}
                                                                    >
                                                                        <FaPencil className="v-align-sub" /> Edit
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        eventKey="2"
                                                                        href="javascript:void(0)"
                                                                        onClick={() => this.confirmDelete(row.value)}
                                                                    >
                                                                        <FaTrash className="v-align-sub" /> Delete
                                                                    </MenuItem>
                                                                </DropdownButton>
                                                            </ButtonToolbar>
                                                        </div>
                                                    );
                                                }
                                            },
                                        ]}
                                        pages={filteredTotalPages}
                                        serverloading={loading}
                                        filterDTable={this.filterDTable}
                                        manualReload={dtManualForceReload}
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
        const { deleteActionInit, dtFilter, dtManualForceReload } = this.state;
        if (deleteActionInit && !loading) {
            this.setState({
                selectedId: null,
                showDeleteModal: false,
                deleteActionInit: false,
                // dtManualForceReload: false,
            });
            ts('User deleted successfully');
            this.dispatchUsersFilter(dtFilter);
            // history.push(adminRouteCodes.USERS);
        }
        if (dtManualForceReload && !loading) {
            this.setState({
                dtManualForceReload: false,
            });
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
            deleteActionInit: true,
            dtManualForceReload: true,
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