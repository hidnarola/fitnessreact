import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import DTable from '../Common/DTable';
import { ingredientFilterRequest, ingredientDeleteRequest } from '../../../actions/admin/ingredients';
import { showPageLoader } from '../../../actions/pageLoader';
import DeleteConfirmation from '../Common/DeleteConfirmation';
import { SERVER_BASE_URL } from '../../../constants/consts';

class IngredientsListing extends Component {
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
        dispatch(ingredientFilterRequest(filterData));
    }

    render() {
        const { loading, filteredTotalPages, filteredIngredients } = this.props;
        const { showDeleteModal } = this.state;
        return (
            <div className="recipes-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Ingredients</h2>
                    </div>
                    <div className="body-head-r">
                        <NavLink to={adminRouteCodes.INGREDIENTS_SAVE} className="pink-btn">Add Ingredients</NavLink>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Ingredients</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <DTable
                                        data={filteredIngredients}
                                        columns={[
                                            {
                                                id: 'image',
                                                Header: 'Image',
                                                accessor: 'image',
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="avatar-wrapper">
                                                            <img src={SERVER_BASE_URL + row.value} alt="Image" className="img-responsive img-rounded" />
                                                        </div>
                                                    );
                                                }
                                            },
                                            {
                                                id: 'name',
                                                Header: 'Name',
                                                accessor: 'name',
                                            },
                                            {
                                                id: 'description',
                                                Header: 'Description',
                                                accessor: 'description',
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
                                                            <NavLink className="btn btn-primary" to={`${adminRouteCodes.INGREDIENTS_SAVE}/${row.value}`}><FaPencil /></NavLink>
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
            history.push(adminRouteCodes.INGREDIENTS);
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
        dispatch(ingredientDeleteRequest(selectedId));
    }
    // ----END funs -----
}

const mapStateToProps = (state) => {
    const { adminIngredients } = state;
    return {
        loading: adminIngredients.get('loading'),
        error: adminIngredients.get('error'),
        filteredIngredients: adminIngredients.get('filteredIngredients'),
        filteredTotalPages: adminIngredients.get('filteredTotalPages'),
    }
}

export default connect(mapStateToProps)(IngredientsListing);