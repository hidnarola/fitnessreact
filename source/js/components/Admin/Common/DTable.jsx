import React, { Component } from 'react';
import ReactTable from 'react-table';
import _ from 'lodash';

class DTable extends Component {
    fetchData = (state, instance) => {
        const { pageSize, page, filtered, sorted, columns } = state;
        const { filterDTable } = this.props;
        let columnFilter = [];
        let columnFilterEqual = [];
        let columnSort = [];
        _.forEach(columns, (column) => {
            if (typeof column.id !== 'undefined') {
                if (filtered && filtered.length > 0) {
                    let filterObj = _.find(filtered, (o) => {
                        return o.id === column.id;
                    });
                    if (typeof filterObj !== 'undefined') {
                        if (column.filterEqual) {
                            columnFilterEqual.push(filterObj);
                        } else {
                            columnFilter.push(filterObj);
                        }
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
            columnFilterEqual,
            columnSort,
        }

        filterDTable(filterData);
    }

    render() {
        const { data, columns } = this.props;
        return (
            <div className="d-table-main-wrapper">
                <ReactTable
                    manual
                    data={data}
                    columns={columns}
                    // pages={pages}
                    // loading={loading}
                    onFetchData={this.fetchData}
                    filterable
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default DTable;