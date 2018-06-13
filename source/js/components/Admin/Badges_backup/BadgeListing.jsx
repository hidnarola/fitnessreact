import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import ReactTable from 'react-table';
import moment from 'moment';
import {
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_INACTIVE_STR,
    STATUS_ACTIVE_STR
} from '../../../constants/consts';
import _ from 'lodash';
import { generateDTTableFilterObj } from '../../../helpers/funs';
import { badgeFilterRequest } from '../../../actions/admin/badges';

const statusOptions = [
    { value: '', label: 'All' },
    { value: STATUS_ACTIVE, label: STATUS_ACTIVE_STR },
    { value: STATUS_INACTIVE, label: STATUS_INACTIVE_STR },
];

const isDeletedOptions = [
    { value: '', label: 'All' },
    { value: 1, label: 'Yes' },
    { value: 0, label: 'No' },
];

class BadgeListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badges: [],
            pages: 0,
            dtLoading: false,
            filterData: null,
            selectedId: null,
        }
    }

    render() {
        const { badge } = this.props;
        const {
            dtLoading,
            pages,
            badges,
        } = this.state;
        return (
            <div className="badge-category-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Badges</h2>
                    </div>
                    <div className="body-head-r">
                        <NavLink to={adminRouteCodes.BADGES_SAVE} className="pink-btn">Add Badge</NavLink>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Bagde List</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <ReactTable
                                        manual
                                        data={badges}
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
                                                id: 'isDeleted',
                                                Header: 'Deleted',
                                                accessor: 'isDeleted',
                                                filterDigit: true,
                                                Cell: (row) => {
                                                    let dataObj = _.find(isDeletedOptions, (o) => {
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
                                                            {isDeletedOptions && isDeletedOptions.length > 0 &&
                                                                isDeletedOptions.map((obj, index) => (
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
                                                filterable: false,
                                                sortable: false,
                                                // Cell: (row) => {
                                                //     return (
                                                //         <div className="actions-wrapper">
                                                //             <a href="javascript:void(0)" onClick={() => this.handleShowSaveModal(row.value)} className="btn btn-primary"><FaPencil /></a>
                                                //             {!row.original.isDeleted &&
                                                //                 <a href="javascript:void(0)" onClick={() => this.confirmDelete(row.value)} className="btn btn-danger"><FaTrash /></a>
                                                //             }
                                                //         </div>
                                                //     );
                                                // }
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

            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, filteredBadges, filteredTotalPages, badge } = this.props;
        const { dtLoading } = this.state;
        if (dtLoading && !loading) {
            this.setState({
                dtLoading: false,
                badges: filteredBadges,
                pages: filteredTotalPages,
            });
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
        dispatch(badgeFilterRequest(filterData));
    }

    refreshDTData = () => {
        const { dispatch } = this.props;
        const { filterData } = this.state;
        this.setState({
            dtLoading: true,
        });
        dispatch(badgeFilterRequest(filterData));
    }
    // End Funs
}

const mapStateToProps = (state) => {
    const { adminBadges } = state;
    return {
        loading: adminBadges.get('loading'),
        filteredBadges: adminBadges.get('filteredBadges'),
        filteredTotalPages: adminBadges.get('filteredTotalPages'),
        badge: adminBadges.get('badge'),
    };
}

export default connect(mapStateToProps)(BadgeListing);