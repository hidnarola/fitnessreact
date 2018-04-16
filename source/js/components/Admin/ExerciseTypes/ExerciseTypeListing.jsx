import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaPencil } from 'react-icons/lib/fa';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import ReactTable from 'react-table';
import { reset, initialize } from 'redux-form';
import {
    exerciseTypeFilterRequest,
    exerciseTypeAddRequest,
    exerciseTypeUpdateRequest,
    exerciseTypeSelectOneRequest
} from '../../../actions/admin/exerciseTypes';
import { generateDTTableFilterObj } from '../../../helpers/funs';
import ExerciseTypeSaveForm from './ExerciseTypeSaveForm';
import { showPageLoader } from '../../../actions/pageLoader';
import {
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_ACTIVE_STR,
    STATUS_INACTIVE_STR
} from '../../../constants/consts';
import moment from 'moment';

const statusOptions = [
    { value: '', label: 'All' },
    { value: STATUS_ACTIVE, label: STATUS_ACTIVE_STR },
    { value: STATUS_INACTIVE, label: STATUS_INACTIVE_STR },
];

class ExerciseTypeListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseTypes: [],
            pages: 0,
            dtLoading: false,
            filterData: null,
            saveModalShow: false,
            selectedId: null,
            selectActionInit: false,
            saveActionInit: false,
        }
    }

    render() {
        const { exerciseType } = this.props;
        const {
            dtLoading,
            pages,
            exerciseTypes,
            saveModalShow
        } = this.state;
        return (
            <div className="exercise-type-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Exercise Types</h2>
                    </div>
                    <div className="body-head-r">
                        <a href="javascript:void(0)" onClick={() => this.handleShowSaveModal()} className="pink-btn">Add Exercise Type</a>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Exercise Types List</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <ReactTable
                                        manual
                                        data={exerciseTypes}
                                        noDataText={"No records found..."}
                                        columns={[
                                            {
                                                id: 'createdAt',
                                                Header: 'Created At',
                                                accessor: 'createdAt',
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
                                                }
                                            },
                                            {
                                                id: 'name',
                                                Header: 'Name',
                                                accessor: 'name',
                                            },
                                            {
                                                id: 'status',
                                                Header: 'Status',
                                                accessor: 'status',
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
                                                }
                                            },
                                            {
                                                id: "_id",
                                                Header: "Actions",
                                                accessor: "_id",
                                                Cell: (row) => {
                                                    return (
                                                        <div className="actions-wrapper">
                                                            <a href="javascript:void(0)" onClick={() => this.handleShowSaveModal(row.value)} className="btn btn-primary"><FaPencil /></a>
                                                        </div>
                                                    );
                                                }
                                            },
                                        ]}
                                        pages={pages}
                                        loading={dtLoading}
                                        onFetchData={this.fetchData}
                                        filterable
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                        showPaginationTop={true}
                                        showPaginationBottom={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ExerciseTypeSaveForm
                    show={saveModalShow}
                    // data={exerciseType}
                    handleClose={this.handleHideSaveModal}
                    onSubmit={this.handleSubmit}
                />

            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, filteredExerciseTypes, filteredTotalPages, exerciseType, dispatch } = this.props;
        const { dtLoading, saveActionInit, selectActionInit } = this.state;
        if (dtLoading && !loading) {
            this.setState({
                dtLoading: false,
                exerciseTypes: filteredExerciseTypes,
                pages: filteredTotalPages,
            });
        }
        if (saveActionInit && !loading) {
            this.setState({
                saveActionInit: false,
                selectedId: null,
                saveModalShow: false,
                selectActionInit: false,
            });
            this.refreshDTData();
        } else if (selectActionInit && !loading) {
            const formData = {
                name: exerciseType.name,
                description: exerciseType.description,
                status: _.find(statusOptions, (o) => { return (o.value === exerciseType.status) })
            }
            dispatch(initialize('exerciseTypeSave', formData));
        }
    }

    // Start Funs
    fetchData = (state, instance) => {
        const { dispatch } = this.props;
        this.setState({
            dtLoading: true,
        });
        let filterData = generateDTTableFilterObj(state, instance);
        this.setState({ filterData: filterData });
        dispatch(exerciseTypeFilterRequest(filterData));
    }

    refreshDTData = () => {
        const { dispatch } = this.props;
        const { filterData } = this.state;
        this.setState({
            dtLoading: true,
        });
        dispatch(exerciseTypeFilterRequest(filterData));
    }

    handleShowSaveModal = (id = null) => {
        const { dispatch } = this.props;
        const formData = {
            name: '',
            status: '',
            description: '',
        }
        dispatch(initialize('exerciseTypeSave', formData));
        dispatch(reset('exerciseTypeSave'));
        if (id) {
            this.setState({ selectedId: id, selectActionInit: true });
            dispatch(exerciseTypeSelectOneRequest(id));
        }
        this.setState({ saveModalShow: true });
    }

    handleHideSaveModal = () => {
        const { dispatch } = this.props;
        dispatch(reset('exerciseTypeSave'));
        this.setState({
            saveModalShow: false,
            selectedId: null,
            selectActionInit: false
        });
    }

    handleSubmit = (data) => {
        const { selectedId } = this.state;
        const { dispatch } = this.props;
        let exerciseType = {
            name: data.name,
            status: data.status.value,
            description: data.description,
        }
        this.setState({
            saveActionInit: true,
        });
        dispatch(showPageLoader());
        if (selectedId) {
            dispatch(exerciseTypeUpdateRequest(selectedId, exerciseType));
        } else {
            dispatch(exerciseTypeAddRequest(exerciseType));
        }
    }
    // End Funs
}

const mapStateToProps = (state) => {
    const { adminExerciseTypes } = state;
    return {
        loading: adminExerciseTypes.get('loading'),
        filteredExerciseTypes: adminExerciseTypes.get('filteredExerciseTypes'),
        filteredTotalPages: adminExerciseTypes.get('filteredTotalPages'),
        exerciseType: adminExerciseTypes.get('exerciseType'),
    };
}

export default connect(mapStateToProps)(ExerciseTypeListing);