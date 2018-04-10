import React, { Component } from 'react';
import ReactTable from 'react-table';
import _ from 'lodash';

class DTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            pages: 0,
        }
    }

    fetchData = (state, instance) => {
        this.setState({ loading: true });
        const { pageSize, page, filtered, sorted, columns } = state;
        const { filterDTable } = this.props;
        let columnFilter = [];
        let columnSort = [];
        _.forEach(columns, (column) => {
            if (typeof column.id !== 'undefined') {
                if (filtered && filtered.length > 0) {
                    let filterObj = _.find(filtered, (o) => {
                        return o.id === column.id;
                    });
                    if (typeof filterObj !== 'undefined') {
                        if (column.filterEqual) {
                            filterObj['isEqualFlag'] = true;
                        } else if (column.filterDigit) {
                            filterObj['isDigitFlag'] = true;
                        }

                        if (column.convertBoolean) {
                            filterObj.value = (filterObj.value == 'true');
                        }
                        columnFilter.push(filterObj);
                    }
                }
            }
        });

        if (sorted && sorted.length > 0) {
            _.forEach(sorted, (sort) => {
                columnSort.push(sort);
            });
        }

        const filterData = {
            pageSize,
            page,
            columnFilter,
            columnSort,
        }

        filterDTable(filterData);
    }

    render() {
        const { data, loading, pages } = this.state;
        const {
            columns,
            defaultPageSize,
            showPaginationTop,
            showPaginationBottom,
            noDataText,
            className,
            defaultSorted
        } = this.props;
        return (
            <div className="d-table-main-wrapper">
                <ReactTable
                    manual
                    data={data}
                    noDataText={(noDataText) ? noDataText : "No records found..."}
                    columns={columns}
                    pages={pages}
                    loading={loading}
                    onFetchData={this.fetchData}
                    filterable
                    defaultPageSize={(defaultPageSize) ? defaultPageSize : 10}
                    className={(className) ? className : "-striped -highlight"}
                    showPaginationTop={(showPaginationTop) ? showPaginationTop : true}
                    showPaginationBottom={(showPaginationBottom) ? showPaginationBottom : true}
                    defaultSorted={defaultSorted}
                />
            </div>
        );
    }

    componentDidUpdate() {
        const { serverloading, data, pages, manualReload } = this.props;
        const { loading } = this.state;
        if ((!serverloading && loading) || (!serverloading && manualReload)) {
            this.setState({
                loading: false,
                data: data,
                pages: pages,
            });
        }
    }
}

export default DTable;