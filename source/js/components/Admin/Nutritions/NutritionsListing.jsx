import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, initialize } from 'redux-form';
import ReactTable from 'react-table';
import NutritionsSaveForm from './NutritionsSaveForm';
import { nutritionAddRequest, nutritionListRequest, nutritionDeleteRequest, nutritionSelectOneRequest, nutritionUpdateRequest } from '../../../actions/admin/nutritions';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { FaPencil, FaTrash } from 'react-icons/lib/fa'
import dateFormat from 'dateformat';
import DeleteConfirmation from '../Common/DeleteConfirmation';

const initialState = {
    id: null,
    name: null,
    description: null,
}

class NutritionsListing extends Component {
    constructor(props) {
        super(props);
        let initialObj = Object.assign({}, initialState);
        this.state = {
            showModal: false,
            showDeleteModal: false,
            nutritionData: initialObj,
            addRequestInit: false,
            selectRequestInit: false,
            deleteRequestInit: false,
            selectedId: null,
            refreshList: true,
        }
    }

    handleShowModal = (doShow) => {
        const { dispatch } = this.props;
        this.setState({
            showModal: doShow,
        });
        if (!doShow) {
            let nutritionData = Object.assign({}, initialState);
            this.setState({
                nutritionData: nutritionData,
            });
            dispatch(reset('nutritionSave'));
        }
    }

    handleSubmit = (data) => {
        const { dispatch } = this.props;
        const { selectedId } = this.state;
        dispatch(showPageLoader());
        this.setState({
            addRequestInit: true,
        });
        if (selectedId) {
            dispatch(nutritionUpdateRequest(selectedId, data));
        } else {
            dispatch(nutritionAddRequest(data));
        }
    }

    getDataToUpdate = (_id) => {
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        this.setState({
            selectRequestInit: true,
            selectedId: _id,
        });
        dispatch(nutritionSelectOneRequest(_id));
    }

    confirmDelete = (_id) => {
        this.setState({
            showDeleteModal: true,
            selectedId: _id,
        });
    }

    closeDeleteModal = () => {
        this.setState({
            showDeleteModal: false,
            selectedId: null,
        });
    }

    handleDelete = () => {
        const { selectedId } = this.state;
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        this.setState({
            deleteRequestInit: true,
        });
        dispatch(nutritionDeleteRequest(selectedId))
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        dispatch(nutritionListRequest());
    }

    render() {
        const { showModal, nutritionData, showDeleteModal } = this.state;
        const { nutritions } = this.props;
        return (
            <div className="nutritions-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Nutritions</h2>
                    </div>
                    <div className="body-head-r">
                        <a href="javascript:void(0)" className="pink-btn" onClick={() => this.handleShowModal(true)}>Add Nutrition</a>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Nutritions List</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    {nutritions && nutritions.length > 0 &&
                                        <ReactTable
                                            data={nutritions}
                                            columns={[
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
                                                    Header: "Description",
                                                    accessor: "description"
                                                },
                                                {
                                                    Header: "Actions",
                                                    accessor: "_id",
                                                    Cell: (row) => {
                                                        return (
                                                            <div className="actions-wrapper">
                                                                <a href="javascript:void(0)" onClick={() => this.getDataToUpdate(row.value)}><FaPencil /></a>
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
                                    {!nutritions &&
                                        <span>No records found</span>
                                    }
                                    {nutritions && nutritions.length <= 0 &&
                                        <span>No records found</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <NutritionsSaveForm
                    showModal={showModal}
                    handleShowModal={this.handleShowModal}
                    onSubmit={this.handleSubmit}
                    nutritionData={nutritionData}
                />

                <DeleteConfirmation
                    show={showDeleteModal}
                    handleClose={this.closeDeleteModal}
                    handleYes={this.handleDelete}
                />

            </div>
        );
    }

    componentDidUpdate() {
        const { addRequestInit, deleteRequestInit, refreshList, selectRequestInit } = this.state;
        const { loading, dispatch, nutrition } = this.props;
        if (addRequestInit && !loading) {
            let nutritionData = Object.assign({}, initialState);
            this.setState({
                showModal: false,
                nutritionData: nutritionData,
                addRequestInit: false,
                refreshList: true,
                selectedId: null,
            });
            dispatch(hidePageLoader());
            dispatch(reset('nutritionSave'));
        }

        if (deleteRequestInit && !loading) {
            this.setState({
                showDeleteModal: false,
                selectedId: null,
                deleteRequestInit: false,
                refreshList: true,
            });
            dispatch(hidePageLoader());
        }

        if (selectRequestInit && !loading) {
            let nutritionData = Object.assign({}, nutrition);
            this.setState({
                showModal: true,
                selectRequestInit: false,
            });
            dispatch(hidePageLoader());
            dispatch(initialize('nutritionSave', nutritionData));
        }

        if (refreshList) {
            dispatch(showPageLoader());
            dispatch(nutritionListRequest());
            this.setState({
                refreshList: false
            });
        } else {
            if (!loading) {
                dispatch(hidePageLoader());
            }
        }
    }
}

const mapStateToProps = (state) => {
    const { adminNutritions } = state;
    return {
        loading: adminNutritions.get('loading'),
        error: adminNutritions.get('error'),
        nutritions: adminNutritions.get('nutritions'),
        nutrition: adminNutritions.get('nutrition'),
    }
}

export default connect(mapStateToProps)(NutritionsListing);