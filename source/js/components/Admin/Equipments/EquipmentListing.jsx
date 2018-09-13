import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import SweetAlert from "react-bootstrap-sweetalert";
import { NavLink } from "react-router-dom";
import ReactTable from "react-table";
import { SERVER_BASE_URL } from '../../../constants/consts';
import noImg from 'img/common/no-img.png';
import moment from "moment";
import _ from "lodash";
import { DropdownButton, ButtonToolbar, MenuItem } from "react-bootstrap";
import { generateDTTableFilterObj } from '../../../helpers/funs';
import { equipmentCategoryListRequest } from '../../../actions/admin/equipmentCategories';
import { filterEquipmentsRequest, equipmentDeleteRequest, equipmentRecoverRequest } from '../../../actions/admin/equipments';
import { FaPencil, FaTrash, FaRotateLeft } from 'react-icons/lib/fa'
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';

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
            dtData: [],
            dtPages: 0,
            dtLoading: false,
            dtFilterData: null,
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
        const { showDeleteModal, showRecoverModal, dtData, dtPages, dtLoading } = this.state;
        const { equipmentCategories } = this.props;
        return (
            <div className="equipment-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Equipments</h2>
                    </div>
                    <div className="body-head-r">
                        <NavLink to={adminRouteCodes.EQUIPMENTS_SAVE} className="pink-btn">
                            <i className="icon-add_circle"></i> Add Equipment
                        </NavLink>
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
                                    <ReactTable
                                        manual
                                        data={dtData}
                                        noDataText={"No records found..."}
                                        columns={[
                                            {
                                                id: "image",
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
                                                id: "createdAt",
                                                Header: "Created Date",
                                                accessor: "createdAt",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return moment(row.value).format('DD/MM/YYYY');
                                                },
                                                maxWidth: 100,
                                            },
                                            {
                                                id: "name",
                                                Header: "Name",
                                                accessor: "name",
                                                minWidth: 300,
                                            },
                                            {
                                                id: "category_id",
                                                Header: "Category",
                                                accessor: "category_id",
                                                filterable: false,
                                                sortable: false,
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
                                                id: "status",
                                                Header: "Status",
                                                accessor: "status",
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
                                                id: "isDeleted",
                                                Header: "Deleted",
                                                accessor: "isDeleted",
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
                                                id: "_id",
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
                                                                    {row && row.original && (typeof row.original.isDeleted === 'undefined' || row.original.isDeleted === 0) &&
                                                                        <MenuItem eventKey="2" href="javascript:void(0)" onClick={() => this.confirmDelete(row.value)}>
                                                                            <FaTrash className="v-align-sub" /> Delete
                                                                        </MenuItem>
                                                                    }
                                                                    {row && row.original && typeof row.original.isDeleted !== 'undefined' && row.original.isDeleted === 1 &&
                                                                        <MenuItem eventKey="3" href="javascript:void(0)" onClick={() => this.openRecoverModal(row.value)}>
                                                                            <FaRotateLeft className="v-align-sub" /> Recover
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
                                        pages={dtPages}
                                        loading={dtLoading}
                                        onFetchData={this.fetchData}
                                        filterable
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                        showPaginationTop={true}
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
                    show={showDeleteModal}
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleDelete}
                    onCancel={this.closeDeleteModal}
                >
                    Record will be deleted!
                </SweetAlert>

                <SweetAlert
                    show={showRecoverModal}
                    success
                    showCancel
                    confirmBtnText="Yes, recover it!"
                    confirmBtnBsStyle="success"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleRecover}
                    onCancel={this.closeRecoverModal}
                >
                    Record will be recovered back!
                </SweetAlert>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { dtLoading, deleteActionInit, recoverActionInit } = this.state;
        const { loading, filteredLoading, filteredEquipments, filteredTotalPages, dispatch } = this.props;
        if (dtLoading && !filteredLoading) {
            this.setState({ dtLoading: filteredLoading, dtData: filteredEquipments, dtPages: filteredTotalPages });
        }
        if (deleteActionInit && !loading) {
            this.setState({ deleteActionInit: false });
            this.closeDeleteModal();
            dispatch(hidePageLoader());
            this.refreshDtData();
        }
        if (recoverActionInit && !loading) {
            this.setState({ recoverActionInit: false });
            this.closeRecoverModal();
            dispatch(hidePageLoader());
            this.refreshDtData();
        }
    }

    //#region functions to fetch data for datatable
    fetchData = (state, instance) => {
        const { dispatch } = this.props;
        let filterData = generateDTTableFilterObj(state, instance);
        this.setState({ dtLoading: true, dtFilterData: filterData });
        dispatch(filterEquipmentsRequest(filterData));
    }

    refreshDtData = () => {
        const { dispatch } = this.props;
        const { dtFilterData } = this.state;
        this.setState({ dtLoading: true });
        dispatch(filterEquipmentsRequest(dtFilterData));
    }
    //#endregion

    confirmDelete = (_id) => {
        this.setState({ selectedId: _id, showDeleteModal: true });
    }

    closeDeleteModal = () => {
        this.setState({ selectedId: null, showDeleteModal: false });
    }

    handleDelete = () => {
        const { selectedId } = this.state;
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        this.setState({ deleteActionInit: true });
        dispatch(equipmentDeleteRequest(selectedId));
    }

    openRecoverModal = (_id) => {
        this.setState({ selectedId: _id, showRecoverModal: true });
    }

    closeRecoverModal = () => {
        this.setState({ selectedId: null, showRecoverModal: false });
    }

    handleRecover = () => {
        const { selectedId } = this.state;
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        this.setState({ recoverActionInit: true });
        dispatch(equipmentRecoverRequest(selectedId));
    }
}

const mapStateToProps = (state) => {
    const { adminEquipments, adminEquipmentCategories } = state;
    return {
        loading: adminEquipments.get('loading'),
        filteredLoading: adminEquipments.get('filteredLoading'),
        filteredEquipments: adminEquipments.get('filteredEquipments'),
        filteredTotalPages: adminEquipments.get('filteredTotalPages'),
        error: adminEquipments.get('error'),
        equipmentCategories: adminEquipmentCategories.get('equipmentCategories'),
    };
}

export default connect(
    mapStateToProps,
)(EquipmentListing);