import React, { Component } from 'react';
import { connect } from "react-redux";
import AdminHeader from 'components/Admin/Template/AdminHeader';
import AdminNav from 'components/Admin/Template/AdminNav';
import { getAdminDashboardRequest } from '../../actions/admin/dashboard';
import SmallBlock from '../../components/Admin/Dashboard/SmallBlock';
import moment from "moment";
import DateRangePicker from 'react-daterange-picker';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateRange: moment.range(
                moment().subtract(1, 'week'),
                moment(),
            ),
            showSearch: false,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        const { dateRange } = this.state;
        let requestData = {
            start: dateRange.start,
            end: dateRange.end
        }
        dispatch(getAdminDashboardRequest(requestData));
    }

    render() {
        const { dateRange, showSearch } = this.state;
        const { loading, data, error } = this.props;
        return (
            <div className="admin-dashboard-wrapper">
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Dashboard</h2>
                        </div>
                        <div className="body-head-r">
                            <a href="javascript:void(0)" onClick={() => this.setState({ showSearch: !showSearch })} className="pink-btn">{`${dateRange.start.format('DD/MM/YYYY')} - ${dateRange.end.format('DD/MM/YYYY')}`}<i className="icon-date_range"></i></a>
                        </div>
                    </div>
                    {showSearch &&
                        <div className="progress-date-range-picker">
                            <DateRangePicker
                                firstOfWeek={1}
                                numberOfCalendars={2}
                                selectionType='range'
                                value={dateRange}
                                onSelect={this.handleTimeDateRange}
                                className="progress-date-range"
                            />
                        </div>
                    }

                    {loading &&
                        <div className="no-content-loader">
                            <FaCircleONotch className="loader-spinner fs-100" />
                        </div>
                    }

                    {!loading && typeof data !== 'undefined' && data &&
                        <div className="body-content row d-flex">
                            <div className="col-md-12 d-flex">
                                {data && data.totalUsers &&
                                    <SmallBlock title="Users" data={data.totalUsers} />
                                }
                                {data && data.totalExercises &&
                                    <SmallBlock title="Exercises" data={data.totalExercises} />
                                }
                                {data && data.totalFitnessTest &&
                                    <SmallBlock title="Fitness Tests" data={data.totalFitnessTest} />
                                }
                                {data && data.totalProgram &&
                                    <SmallBlock title="Program" data={data.totalProgram} />
                                }
                                {data && data.completedExercises &&
                                    <SmallBlock title="Completed Exercises" data={data.completedExercises} />
                                }
                            </div>
                        </div>
                    }

                    {!loading && typeof error !== 'undefined' && error && error.length > 0 &&
                        <div className="server-error-wrapper">
                            <ErrorCloud />
                            <h4>Something went wrong! please try again.</h4>
                        </div>
                    }
                </section>
            </div>
        );
    }

    handleTimeDateRange = (dateRange) => {
        const { dispatch } = this.props;
        this.setState({ dateRange, showSearch: false });
        let requestData = {
            start: dateRange.start,
            end: dateRange.end
        }
        dispatch(getAdminDashboardRequest(requestData));
    }
}

const mapStateToProps = (state) => {
    const { adminDashboard } = state;
    return {
        loading: adminDashboard.get('loading'),
        data: adminDashboard.get('data'),
        error: adminDashboard.get('error'),
    }
}

export default connect(mapStateToProps)(AdminDashboard);