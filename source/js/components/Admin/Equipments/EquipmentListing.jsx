import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaPencil, FaTrash } from 'react-icons/lib/fa'
import { adminRouteCodes } from '../../../constants/adminRoutes';
import DeleteConfirmation from '../Common/DeleteConfirmation';
import { showPageLoader } from '../../../actions/pageLoader';
import { equipmentDeleteRequest, equipmentListRequest } from '../../../actions/admin/equipments';
import { equipmentCategoryListRequest } from '../../../actions/admin/equipmentCategories';
import DTable from '../Common/DTable';
import { SERVER_BASE_URL } from '../../../constants/consts';
import _ from 'lodash';
import moment from 'moment';
import noImg from 'img/common/no-img.png'

const statusOptions = [
    { value: '', label: 'All' },
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
];

class EquipmentListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null,
            showDeleteModal: false,
            deleteActionInit: false
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(equipmentCategoryListRequest());
    }

    render() {
        const { showDeleteModal } = this.state;
        const { loading, equipments, equipmentCategories, filteredTotalPages } = this.props;
        return (
            <div className="equipment-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Equipments</h2>
                    </div>
                    <div className="body-head-r">
                        <NavLink to={adminRouteCodes.EQUIPMENTS_SAVE} className="pink-btn">Add Equipment</NavLink>
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
                                                }
                                            },
                                            {
                                                Header: "Created Date",
                                                accessor: "createdAt",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return moment(row.value).format('MM/DD/YYYY');
                                                }
                                            },
                                            {
                                                Header: "Name",
                                                accessor: "name"
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
                                                }
                                            },
                                            {
                                                Header: "Status",
                                                accessor: "status",
                                                filterEqual: true,
                                                convertBoolean: true,
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
                                                }
                                            },
                                            {
                                                Header: "Actions",
                                                accessor: "_id",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="actions-wrapper">
                                                            <NavLink to={`${adminRouteCodes.EQUIPMENTS_SAVE}/${row.value}`} className="btn btn-primary"><FaPencil /></NavLink>
                                                            <a href="javascript:void(0)" onClick={() => this.confirmDelete(row.value)} className="btn btn-danger"><FaTrash /></a>
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
        const { loading } = this.props;
        const { deleteActionInit } = this.state;
        if (deleteActionInit && !loading) {
            this.setState({ deleteActionInit: false });
            this.closeDeleteModal();
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