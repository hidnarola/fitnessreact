import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import moment from "moment";
import { generateDTTableFilterObj, ts, te, capitalizeFirstLetter } from '../../../helpers/funs';
import { filterEquipmentCategoriesRequest, equipmentCategoryAddRequest, setEquipmentCategoriesState, equipmentCategoryUpdateRequest, equipmentCategoryDeleteRequest } from '../../../actions/admin/equipmentCategories';
import EquipmentCategoriesSave from './EquipmentCategoriesSave';
import { initialize, reset } from "redux-form";
import { DropdownButton, ButtonToolbar, MenuItem } from "react-bootstrap";
import { FaPencil, FaTrash } from "react-icons/lib/fa";
import SweetAlert from "react-bootstrap-sweetalert";

class EquipmentCategoriesListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dtData: [],
            dtPages: 0,
            dtLoading: false,
            dtFilterData: null,
            showSaveModal: false,
            showDeleteModal: false,
            selectedId: null,
        };
    }

    render() {
        const { dtData, dtPages, dtLoading, showSaveModal, showDeleteModal } = this.state;
        return (
            <div className="exercise-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Equipment Categories</h2>
                    </div>
                    <div className="body-head-r">
                        <a href="javascript:void(0)" onClick={this.handleShowSaveModal} className="pink-btn">
                            <i className="icon-add_circle"></i>
                            Add Equipment Category
                        </a>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Equipment Categories</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <ReactTable
                                        manual
                                        data={dtData}
                                        noDataText={"No records found..."}
                                        columns={[
                                            {
                                                id: 'createdAt',
                                                Header: 'Created At',
                                                accessor: 'createdAt',
                                                filterable: false,
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
                                                id: 'name',
                                                Header: 'Category',
                                                accessor: 'name',
                                            },
                                            {
                                                id: 'description',
                                                Header: 'Description',
                                                accessor: 'description',
                                            },
                                            {
                                                id: '_id',
                                                Header: 'Action',
                                                accessor: '_id',
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="actions-wrapper">
                                                            <ButtonToolbar>
                                                                <DropdownButton title="Actions" pullRight id="dropdown-size-medium">
                                                                    <MenuItem
                                                                        eventKey="1"
                                                                        href="javascript:void(0)"
                                                                        onClick={() => this.handleShowSaveModal(row.original)}
                                                                    >
                                                                        <FaPencil className="v-align-sub" /> Edit
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        eventKey="2"
                                                                        href="javascript:void(0)"
                                                                        onClick={() => this.handleShowDeleteModal(row.value)}
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
                                        pages={dtPages}
                                        loading={dtLoading}
                                        onFetchData={this.fetchData}
                                        filterable
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                        showPaginationTop={true}
                                        showPaginationBottom={true}
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

                <EquipmentCategoriesSave
                    show={showSaveModal}
                    onSubmit={this.handleSubmit}
                    handleClose={this.handleCloseSaveModal}
                />

                <SweetAlert
                    show={showDeleteModal}
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleDelete}
                    onCancel={this.handleCloseDeleteModal}
                >
                    You will not be able to recover it!
                </SweetAlert>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { dispatch, deleteLoading, deleteFlag, deleteError, filteredLoading, filteredCategories, filteredTotalPages, saveLoading, saveEquipmentCategory } = this.props;
        const { dtLoading } = this.state;
        if (dtLoading && !filteredLoading) {
            this.setState({ dtLoading: filteredLoading, dtData: filteredCategories, dtPages: filteredTotalPages });
        }
        if (!saveLoading && saveEquipmentCategory && prevProps.saveLoading !== saveLoading && prevProps.saveEquipmentCategory !== saveEquipmentCategory) {
            this.handleCloseSaveModal();
            let stateData = { saveLoading: false, saveEquipmentCategory: null, saveError: [] };
            dispatch(setEquipmentCategoriesState(stateData));
            ts('Category saved!');
            this.refreshDtData();
        }
        if (!deleteLoading && deleteFlag && prevProps.deleteLoading !== deleteLoading && prevProps.deleteFlag !== deleteFlag) {
            let stateData = { deleteLoading: false, deleteFlag: false, deleteError: [] };
            dispatch(setEquipmentCategoriesState(stateData));
            ts('Category deleted!');
            this.refreshDtData();
        } else if (!deleteLoading && prevProps.deleteLoading !== deleteLoading && deleteError && deleteError.length > 0) {
            let stateData = { deleteLoading: false, deleteFlag: false, deleteError: [] };
            dispatch(setEquipmentCategoriesState(stateData));
            te(deleteError[0]);
            this.refreshDtData();
        }
    }

    //#region function for fetching data
    fetchData = (state, instance) => {
        const { dispatch } = this.props;
        let filterData = generateDTTableFilterObj(state, instance);
        this.setState({ dtLoading: true, dtFilterData: filterData });
        dispatch(filterEquipmentCategoriesRequest(filterData));
    }

    refreshDtData = () => {
        const { dispatch } = this.props;
        const { dtFilterData } = this.state;
        this.setState({ dtLoading: true });
        dispatch(filterEquipmentCategoriesRequest(dtFilterData));
    }
    //#endregion

    handleShowSaveModal = (data = null) => {
        const { dispatch } = this.props;
        let formData = {};
        if (data) {
            formData.name = data.name;
            formData.description = data.description;
            formData.id = data._id;
        }
        this.setState({ showSaveModal: true });
        dispatch(initialize('equipment_category_save_form', formData));
    }

    handleCloseSaveModal = () => {
        const { dispatch } = this.props;
        this.setState({ showSaveModal: false });
        dispatch(reset('equipment_category_save_form'));
        let stateData = { saveLoading: false, saveEquipmentCategory: null, saveError: [] };
        dispatch(setEquipmentCategoriesState(stateData));
    }

    handleSubmit = (data) => {
        const { dispatch } = this.props;
        var requestData = {
            name: (data && data.name) ? capitalizeFirstLetter(data.name.trim()) : '',
            description: (data && data.description) ? capitalizeFirstLetter(data.description.trim()) : '',
        };
        if (data && data.id) {
            dispatch(equipmentCategoryUpdateRequest(data.id, requestData));
        } else {
            dispatch(equipmentCategoryAddRequest(requestData));
        }
    }

    handleShowDeleteModal = (_id) => {
        this.setState({ showDeleteModal: true, selectedId: _id });
    }

    handleCloseDeleteModal = () => {
        this.setState({ showDeleteModal: false, selectedId: null });
    }

    handleDelete = () => {
        const { dispatch } = this.props;
        const { selectedId } = this.state;
        dispatch(equipmentCategoryDeleteRequest(selectedId));
        this.handleCloseDeleteModal();
    }
}

const mapStateToProps = (state) => {
    const { adminEquipmentCategories } = state;
    return {
        saveLoading: adminEquipmentCategories.get('saveLoading'),
        saveEquipmentCategory: adminEquipmentCategories.get('saveEquipmentCategory'),
        saveError: adminEquipmentCategories.get('saveError'),
        filteredLoading: adminEquipmentCategories.get('filteredLoading'),
        filteredCategories: adminEquipmentCategories.get('filteredCategories'),
        filteredTotalPages: adminEquipmentCategories.get('filteredTotalPages'),
        deleteLoading: adminEquipmentCategories.get('deleteLoading'),
        deleteFlag: adminEquipmentCategories.get('deleteFlag'),
        deleteError: adminEquipmentCategories.get('deleteError'),
    };
}

export default connect(
    mapStateToProps,
)(EquipmentCategoriesListing);