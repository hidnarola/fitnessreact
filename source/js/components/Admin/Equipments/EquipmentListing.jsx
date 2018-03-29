import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { showPageLoader } from '../../../actions/pageLoader';
import { equipmentListRequest, equipmentDeleteRequest, equipmentSelectOneRequest } from '../../../actions/admin/equipments';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import ReactTable from 'react-table';
import dateFormat from 'dateformat';
import { FaPencil, FaTrash } from 'react-icons/lib/fa'
import { SERVER_BASE_URL } from '../../../constants/consts';
import DeleteConfirmation from '../Common/DeleteConfirmation';
import _ from 'lodash';
import { equipmentCategoryListRequest } from '../../../actions/admin/equipmentCategories';

class EquipmentListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null,
            showDeleteModal: false,
            deleteActionInit: false,
        }
    }

    updateList = () => {
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        dispatch(equipmentListRequest());
    }

    confirmDelete = (_id) => {
        this.setState({
            selectedId: _id,
            showDeleteModal: true
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

    closeDeleteModal = () => {
        this.setState({
            selectedId: null,
            showDeleteModal: false
        });
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        dispatch(equipmentCategoryListRequest());
        this.updateList();
    }

    render() {
        const { equipments, equipmentCategories } = this.props;
        const { showDeleteModal } = this.state;
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
                                    {equipments && equipments.length > 0 &&
                                        <ReactTable
                                            data={equipments}
                                            columns={[
                                                {
                                                    Header: "Image",
                                                    accessor: "image",
                                                    Cell: (row) => {
                                                        return (
                                                            <div className="table-listing-image-view-wrapper">
                                                                <span>
                                                                    <img src={SERVER_BASE_URL + row.value} alt="image" />
                                                                </span>
                                                            </div>
                                                        );
                                                    }
                                                },
                                                {
                                                    Header: "Created Date",
                                                    accessor: "createdAt",
                                                    Cell: (row) => {
                                                        return (
                                                            <div>
                                                                {dateFormat(row.value, 'mm/dd/yyyy')}
                                                            </div>
                                                        );
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
                                                    Cell: (row) => {
                                                        return (
                                                            <div className="table-listing-status-view-wrapper">
                                                                <span>
                                                                    {row.value ? 'Active' : 'Inactive'}
                                                                </span>
                                                            </div>
                                                        );
                                                    }
                                                },
                                                {
                                                    Header: "Actions",
                                                    accessor: "_id",
                                                    Cell: (row) => {
                                                        return (
                                                            <div className="actions-wrapper">
                                                                <NavLink to={`${adminRouteCodes.EQUIPMENTS_SAVE}/${row.value}`}><FaPencil /></NavLink>
                                                                <a href="javascript:void(0)" onClick={() => this.confirmDelete(row.value)}><FaTrash /></a>
                                                            </div>
                                                        );
                                                    }
                                                },
                                            ]}
                                            defaultPageSize={10}
                                            className="-striped -highlight"
                                        />
                                    }
                                    {!equipments &&
                                        <span>No records found</span>
                                    }
                                    {equipments && equipments.length <= 0 &&
                                        <span>No records found</span>
                                    }
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
            </div >
        );
    }

    componentDidUpdate() {
        const { loading } = this.props;
        const { deleteActionInit } = this.state;
        if (deleteActionInit && !loading) {
            this.setState({
                selectedId: null,
                showDeleteModal: false,
                deleteActionInit: false
            });
            this.updateList();
        }
    }
}

const mapStateToPros = (state) => {
    const { adminEquipments, adminEquipmentCategories } = state;
    return {
        loading: adminEquipments.get('loading'),
        error: adminEquipments.get('error'),
        equipments: adminEquipments.get('equipments'),
        equipment: adminEquipments.get('equipment'),
        equipmentCategories: adminEquipmentCategories.get('equipmentCategories'),
    };
}

export default connect(mapStateToPros)(EquipmentListing);