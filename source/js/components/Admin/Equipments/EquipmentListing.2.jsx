import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaPencil, FaTrash } from 'react-icons/lib/fa'
import { adminRouteCodes } from '../../../constants/adminRoutes';
import DeleteConfirmation from '../Common/DeleteConfirmation';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { equipmentDeleteRequest, equipmentListRequest, equipmentRecoverRequest } from '../../../actions/admin/equipments';
import { equipmentCategoryListRequest } from '../../../actions/admin/equipmentCategories';
import DTable from '../Common/DTable';
import { SERVER_BASE_URL } from '../../../constants/consts';
import _ from 'lodash';
import moment from 'moment';
import noImg from 'img/common/no-img.png'
import { DropdownButton, ButtonToolbar, MenuItem } from "react-bootstrap";

const statusOptions = [
    { value: '', label: 'All' },
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
];

const deletedOptions = [
    { value: '', label: 'All' },
    { value: 0, label: 'Not Deleted' },
    { value: 1, label: 'Deleted' },
];

class EquipmentListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null,
            showDeleteModal: false,
            deleteActionInit: false,
            showRecoverModal: false,
            recoverActionInit: false,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(equipmentCategoryListRequest());
    }

    render() {
        const { showDeleteModal, showRecoverModal } = this.state;
        const { loading, equipments, equipmentCategories, filteredTotalPages } = this.props;
        return (
            <div className="equipment-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Equipments</h2>
                    </div>
                    <div className="body-head-r">
                        <NavLink to={adminRouteCodes.EQUIPMENTS_SAVE} className="pink-btn"><i className="icon-add_circle"></i> Add Equipment</NavLink>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Equipments List</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <DTable
                                        data={equipments}
                                        columns={[
                                            {
                                                Header: "Image",
                                                accessor: "image",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="avatar-wrapper text-center">
                                                            <img
                                                                src={SERVER_BASE_URL + row.value}
                                                                alt="Avatar"
                                                                className="avatar"
                                                                onError={(e) => {
                                                                    e.target.src = noImg
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                },
                                                maxWidth: 100,
                                            },
                                            {
                                                Header: "Created Date",
                                                accessor: "createdAt",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return moment(row.value).format('MM/DD/YYYY');
                                                },
                                                maxWidth: 100,
                                            },
                                            {
                                                Header: "Name",
                                                accessor: "name",
                                                minWidth: 300,
                                            },
                                            {
                                                Header: "Category",
                                                accessor: "category_id",
                                                Cell: (row) => {
                                                    let cat = _.find(equipmentCategories, (o) => { return o._id === row.value })
                                                    let catName = (cat && cat.name) ? cat.name : '-----';
                                                    return (
                                                        <div>
                                                            {catName}
                                                        </div>
                                                    );
                                                },
                                                minWidth: 250,
                                            },
                                            {
                                                Header: "Status",
                                                accessor: "status",
                                                filterEqual: true,
                                                filterDigit: true,
                                                Cell: (row) => {
                                                    let dataObj = _.find(statusOptions, (o) => {
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
                                                            {statusOptions && statusOptions.length > 0 &&
                                                                statusOptions.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                },
                                                minWidth: 100,
                                            },
                                            {
                                                Header: "Deleted",
                                                accessor: "isDeleted",
                                                filterEqual: true,
                                                filterDigit: true,
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
                                                accessor: "_id",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="actions-wrapper">
                                                            <ButtonToolbar>
                                                                <DropdownButton title="Actions" pullRight id="dropdown-size-medium">
                                                                    <MenuItem
                                                                        eventKey="1"
                                                                        href={`${adminRouteCodes.EQUIPMENTS_SAVE}/${row.value}`}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            this.props.history.push(`${adminRouteCodes.EQUIPMENTS_SAVE}/${row.value}`);
                                                                        }}
                                                                    >
                                                                        <FaPencil className="v-align-sub" /> Edit
                                                                    </MenuItem>
                                                                    {row && row.original && typeof row.original.isDeleted !== 'undefined' && row.original.isDeleted === 0 &&
                                                                        <MenuItem eventKey="2" href="javascript:void(0)" onClick={() => this.confirmDelete(row.value)}>
                                                                            <FaTrash className="v-align-sub" /> Delete
                                                                        </MenuItem>
                                                                    }
                                                                    {row && row.original && typeof row.original.isDeleted !== 'undefined' && row.original.isDeleted === 1 &&
                                                                        <MenuItem eventKey="3" href="javascript:void(0)" onClick={() => this.openRecoverModal(row.value)}>
                                                                            <FaTrash className="v-align-sub" /> Recover
                                                                        </MenuItem>
                                                                    }
                                                                </DropdownButton>
                                                            </ButtonToolbar>
                                                        </div>
                                                    );
                                                },
                                                minWidth: 100,
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

                <DeleteConfirmation
                    show={showRecoverModal}
                    handleClose={this.closeRecoverModal}
                    handleYes={this.handleRecover}
                />
            </div>
        );
    }

    componentDidUpdate() {
        const { loading, dispatch } = this.props;
        const { deleteActionInit, recoverActionInit } = this.state;
        if (deleteActionInit && !loading) {
            this.setState({ deleteActionInit: false });
            this.closeDeleteModal();
            dispatch(hidePageLoader());
        }
        if (recoverActionInit && !loading) {
            this.setState({ recoverActionInit: false });
            this.closeRecoverModal();
            dispatch(hidePageLoader());
        }
    }


    // Start Funs
    filterDTable = (filterData) => {
        const { dispatch } = this.props;
        dispatch(equipmentListRequest(filterData));
    }

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
        dispatch(equipmentDeleteRequest(selectedId));
    }

    openRecoverModal = (_id) => {
        this.setState({
            selectedId: _id,
            showRecoverModal: true
        });
    }

    closeRecoverModal = () => {
        this.setState({
            selectedId: null,
            showRecoverModal: false
        });
    }

    handleRecover = () => {
        const { selectedId } = this.state;
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        this.setState({
            recoverActionInit: true
        });
        dispatch(equipmentRecoverRequest(selectedId));
    }
    // End Funs
}

const mapStateToPros = (state) => {
    const { adminEquipments, adminEquipmentCategories } = state;
    return {
        loading: adminEquipments.get('loading'),
        error: adminEquipments.get('error'),
        equipments: adminEquipments.get('equipments'),
        equipmentCategories: adminEquipmentCategories.get('equipmentCategories'),
    };
}

export default connect(mapStateToPros)(EquipmentListing);