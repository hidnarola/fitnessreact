import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import moment from "moment";
import { generateDTTableFilterObj, ts, te, capitalizeFirstLetter } from '../../../helpers/funs';
import { filterEquipmentCategoriesRequest, equipmentCategoryAddRequest, setEquipmentCategoriesState, equipmentCategoryUpdateRequest, equipmentCategoryDeleteRequest, equipmentCategoryRecoverRequest } from '../../../actions/admin/equipmentCategories';
import EquipmentCategoriesSave from './EquipmentCategoriesSave';
import { initialize, reset } from "redux-form";
import { DropdownButton, ButtonToolbar, MenuItem } from "react-bootstrap";
import { FaPencil, FaTrash, FaRotateLeft } from "react-icons/lib/fa";
import SweetAlert from "react-bootstrap-sweetalert";

const deletedOptions = [
    { value: '', label: 'All' },
    { value: 0, label: 'Not Deleted' },
    { value: 1, label: 'Deleted' },
];

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
            showRecoverModal: false,
        };
    }

    render() {
        const { dtData, dtPages, dtLoading, showSaveModal, showDeleteModal, showRecoverModal } = this.state;
        return (
            <div className="exercise-listing-wrapper">
                <div className="body-content row d-flex my-panel-body">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Equipment Categories List</h3>
                                <button className="add-new-btn" onClick={this.handleShowSaveModal}>
                                    <span>Add Equipment Category</span>
                                    <i className="icon-add_circle"></i>
                                </button>
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
                                                sortable: true,
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
                                                Filter: ({ column, filter, onChange }) => {
                                                    return (
                                                        <input
                                                            type="text"
                                                            className="width-100-per"
                                                            value={filter ? filter.value : ''}
                                                            onChange={event => onChange(event.target.value)}
                                                            placeholder={(column && column.Header) ? `${column.Header}` : 'Search'}
                                                        />
                                                    );
                                                },
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
                                                            <button onClick={() => this.handleShowSaveModal(row.original)} className="dt-act-btn dt-act-btn-edit">
                                                                <FaPencil />
                                                            </button>
                                                            {row.original.isDeleted === 0 &&
                                                                <button className="dt-act-btn dt-act-btn-delete" onClick={() => this.handleShowDeleteModal(row.value)}>
                                                                    <FaTrash />
                                                                </button>
                                                            }
                                                            {row.original.isDeleted === 1 &&
                                                                <button className="dt-act-btn dt-act-btn-restore" onClick={() => this.openRecoverModal(row.value)}>
                                                                    <FaRotateLeft />
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
        const { dispatch, deleteLoading, deleteFlag, deleteError, filteredLoading, filteredCategories, filteredTotalPages, saveLoading, saveEquipmentCategory, recoverLoading, recoverFlag, recoverError } = this.props;
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
        if (!recoverLoading && recoverFlag && prevProps.recoverLoading !== recoverLoading && prevProps.recoverFlag !== recoverFlag) {
            let stateData = { recoverLoading: false, recoverFlag: false, recoverError: [] };
            dispatch(setEquipmentCategoriesState(stateData));
            ts('Category recovered!');
            this.refreshDtData();
        } else if (!recoverLoading && prevProps.recoverLoading !== recoverLoading && recoverError && recoverError.length > 0) {
            let stateData = { recoverLoading: false, recoverFlag: false, recoverError: [] };
            dispatch(setEquipmentCategoriesState(stateData));
            te(recoverError[0]);
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
            name: (data && data.name && data.name.trim()) ? capitalizeFirstLetter(data.name).trim() : '',
            description: (data && data.description && data.description.trim()) ? capitalizeFirstLetter(data.description).trim() : '',
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

    openRecoverModal = (_id) => {
        this.setState({ selectedId: _id, showRecoverModal: true });
    }

    closeRecoverModal = () => {
        this.setState({ selectedId: null, showRecoverModal: false });
    }

    handleRecover = () => {
        const { selectedId } = this.state;
        const { dispatch } = this.props;
        dispatch(equipmentCategoryRecoverRequest(selectedId));
        this.closeRecoverModal();
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
        recoverLoading: adminEquipmentCategories.get('recoverLoading'),
        recoverFlag: adminEquipmentCategories.get('recoverFlag'),
        recoverError: adminEquipmentCategories.get('recoverError'),
    };
}

export default connect(
    mapStateToProps,
)(EquipmentCategoriesListing);