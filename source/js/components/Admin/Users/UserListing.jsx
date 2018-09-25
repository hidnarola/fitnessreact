import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateDTTableFilterObj, capitalizeFirstLetter, ts, te } from '../../../helpers/funs';
import { userFilterRequest, userBlockRequest, userUnblockRequest } from '../../../actions/admin/users';
import { Link } from "react-router-dom";
import { FaPencil, FaUnlock, FaLock } from 'react-icons/lib/fa';
import ReactTable from "react-table";
import { GENDER_MALE, GENDER_FEMALE, USER_STATUS_ACTIVE_STR, USER_STATUS_INACTIVE_STR, USER_STATUS_ACTIVE, USER_STATUS_INACTIVE } from '../../../constants/consts';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import noProfileImg from 'img/common/no-profile-img.png';
import SweetAlert from "react-bootstrap-sweetalert";
import { Label } from "react-bootstrap";

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

class UserListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dtData: [],
            dtPages: 0,
            dtLoading: false,
            dtFilterData: null,

            showBlockModal: false,
            showUnblockModal: false,
            selectedAuthId: null,
        };
    }

    render() {
        const { dtData, dtPages, dtLoading, showBlockModal, showUnblockModal } = this.state;
        return (
            <div className="user-listing-wrapper">
                <div className="body-content row d-flex my-panel-body">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Users list</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <ReactTable
                                        manual
                                        data={dtData}
                                        noDataText={"No records found..."}
                                        columns={[
                                            {
                                                id: 'avatar',
                                                Header: 'Profile Image',
                                                accessor: 'avatar',
                                                maxWidth: 100,
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
                                                minWidth: 170,
                                            },
                                            {
                                                id: 'lastName',
                                                Header: 'Last Name',
                                                accessor: 'lastName',
                                                minWidth: 170,
                                            },
                                            {
                                                id: 'email',
                                                Header: 'Email',
                                                accessor: 'email',
                                                minWidth: 250,
                                            },
                                            {
                                                id: 'mobileNumber',
                                                Header: 'Mobile No.',
                                                accessor: 'mobileNumber',
                                                minWidth: 120,
                                                maxWidth: 150,
                                            },
                                            {
                                                id: 'gender',
                                                Header: 'Gender',
                                                accessor: 'gender',
                                                maxWidth: 120,
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
                                                id: 'status',
                                                Header: 'Status',
                                                accessor: 'status',
                                                maxWidth: 100,
                                                filterDigit: true,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="list-status-wrapper">
                                                            {row && row.original && typeof row.original.status !== 'undefined' && row.original.status === 1 &&
                                                                <Label bsStyle="success">Active</Label>
                                                            }
                                                            {row && row.original && typeof row.original.status !== 'undefined' && row.original.status === 0 &&
                                                                <Label bsStyle="danger">Blocked</Label>
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
                                                id: "authUserId",
                                                Header: "Actions",
                                                accessor: "authUserId",
                                                filterable: false,
                                                sortable: false,
                                                maxWidth: 70,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="actions-wrapper">
                                                            <Link to={`${adminRouteCodes.USERS_SAVE}/${row.value}`} className="dt-act-btn dt-act-btn-edit">
                                                                <FaPencil />
                                                            </Link>
                                                            {row && row.original && typeof row.original.status !== 'undefined' && row.original.status === 1 &&
                                                                <button className="dt-act-btn dt-act-btn-delete" onClick={() => this.handleShowBlockModal(row.value)}>
                                                                    <FaLock />
                                                                </button>
                                                            }
                                                            {row && row.original && typeof row.original.status !== 'undefined' && row.original.status === 0 &&
                                                                <button className="dt-act-btn dt-act-btn-restore" onClick={() => this.handleShowUnblockModal(row.value)}>
                                                                    <FaUnlock />
                                                                </button>
                                                            }
                                                        </div>
                                                    );
                                                }
                                            },
                                        ]}
                                        pages={dtPages}
                                        loading={dtLoading}
                                        onFetchData={this.fetchData}
                                        filterable
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                        showPaginationTop={false}
                                        showPaginationBottom={true}
                                        minRows={5}
                                        defaultSorted={[
                                            {
                                                id: "createdAt",
                                                desc: true
                                            }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SweetAlert
                    show={showBlockModal}
                    danger
                    showCancel
                    confirmBtnText="Yes, block it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleBlock}
                    onCancel={this.handleCloseBlockModal}
                >
                    User will be block and will not be able to login to application!
                </SweetAlert>

                <SweetAlert
                    show={showUnblockModal}
                    success
                    showCancel
                    confirmBtnText="Yes, active it!"
                    confirmBtnBsStyle="success"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleUnblock}
                    onCancel={this.handleCloseUnblockModal}
                >
                    User will be active and will able to login!
                </SweetAlert>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { dtLoading } = this.state;
        const {
            filteredLoading, filteredUsers, filteredTotalPages,
            blockLoading, blockUser, blockError,
            unblockLoading, unblockUser, unblockError
        } = this.props;
        if (dtLoading && !filteredLoading) {
            this.setState({ dtLoading: filteredLoading, dtData: filteredUsers, dtPages: filteredTotalPages });
        }
        if (!blockLoading && prevProps.blockLoading !== blockLoading) {
            if (blockUser && prevProps.blockUser !== blockUser) {
                ts('User blocked!');
            } else if (blockError && prevProps.blockError !== blockError && blockError.length > 0) {
                te('Something went wrong! please try again later.');
            }
            this.refreshDtData();
        }
        if (!unblockLoading && prevProps.unblockLoading !== unblockLoading) {
            if (unblockUser && prevProps.unblockUser !== unblockUser) {
                ts('User activated!');
            } else if (unblockError && prevProps.unblockError !== unblockError && unblockError.length > 0) {
                te('Something went wrong! please try again later.');
            }
            this.refreshDtData();
        }
    }

    //#region functions to fetch data for datatable
    fetchData = (state, instance) => {
        const { dispatch } = this.props;
        let filterData = generateDTTableFilterObj(state, instance);
        this.setState({ dtLoading: true, dtFilterData: filterData });
        dispatch(userFilterRequest(filterData));
    }

    refreshDtData = () => {
        const { dispatch } = this.props;
        const { dtFilterData } = this.state;
        this.setState({ dtLoading: true });
        dispatch(userFilterRequest(dtFilterData));
    }
    //#endregion

    handleShowBlockModal = (authId) => {
        this.setState({ showBlockModal: true, selectedAuthId: authId });
    }

    handleCloseBlockModal = () => {
        this.setState({ showBlockModal: false, selectedAuthId: null });
    }

    handleBlock = () => {
        const { dispatch } = this.props;
        const { selectedAuthId } = this.state;
        let requestData = { authUserId: selectedAuthId, status: USER_STATUS_INACTIVE };
        dispatch(userBlockRequest(requestData));
        this.handleCloseBlockModal();
    }

    handleShowUnblockModal = (authId) => {
        this.setState({ showUnblockModal: true, selectedAuthId: authId });
    }

    handleCloseUnblockModal = () => {
        this.setState({ showUnblockModal: false, selectedAuthId: null });
    }

    handleUnblock = () => {
        const { dispatch } = this.props;
        const { selectedAuthId } = this.state;
        let requestData = { authUserId: selectedAuthId, status: USER_STATUS_ACTIVE };
        dispatch(userUnblockRequest(requestData));
        this.handleCloseUnblockModal();
    }
}

const mapStateToProps = (state) => {
    const { adminUsers } = state;
    return {
        filteredLoading: adminUsers.get('filteredLoading'),
        filteredUsers: adminUsers.get('filteredUsers'),
        filteredTotalPages: adminUsers.get('filteredTotalPages'),
        filteredError: adminUsers.get('filteredError'),

        blockLoading: adminUsers.get('blockLoading'),
        blockUser: adminUsers.get('blockUser'),
        blockError: adminUsers.get('blockError'),

        unblockLoading: adminUsers.get('unblockLoading'),
        unblockUser: adminUsers.get('unblockUser'),
        unblockError: adminUsers.get('unblockError'),
    };
}

export default connect(
    mapStateToProps,
)(UserListing);