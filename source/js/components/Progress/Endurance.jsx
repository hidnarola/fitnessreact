import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { PROGRESS_ENDURANCE } from '../../constants/consts';
import { getUserProgressByCategoryAndDateRequest } from '../../actions/userProgress';
import { FaCircleONotch } from "react-icons/lib/fa";
import NoDataFoundImg from "img/common/no_datafound.png";
import ErrorCloud from "svg/error-cloud.svg";
import { capitalizeFirstLetter } from '../../helpers/funs';

class Endurance extends Component {
    componentWillMount() {
        const { dispatch, dateRange } = this.props;
        var requestDate = dateRange;
        if (!requestDate) {
            requestDate = moment.range(
                moment().subtract(1, 'month').startOf('day').utc(),
                moment().startOf('day').utc()
            )
        }
        var requestData = {
            dateRange: requestDate,
            start: requestDate.start,
            end: requestDate.end,
            category: PROGRESS_ENDURANCE,
        }
        dispatch(getUserProgressByCategoryAndDateRequest(requestData));
    }

    render() {
        const { loading, error, progress, selectedType } = this.props;
        if (loading) {
            return (
                <div className="no-content-loader">
                    <FaCircleONotch className="loader-spinner fs-100" />
                </div>
            );
        }
        return (
            <div className="progress-wrapper progress-endurance">
                {!loading && typeof progress !== 'undefined' && progress && typeof progress.data !== 'undefined' && progress.data && selectedType === PROGRESS_ENDURANCE &&
                    <div className="tab-wrap">
                        <div className="tab-div"></div>
                        <div className="tab-wrap-body">
                            <div className="tab-wrap-body-inr">
                                <table className="table head-table-data">
                                    <tbody>
                                        <tr>
                                            <td>Endurance</td>
                                            <td>At Start <span className="icon-with-circle color-white"><i className="icon-event_note"></i></span></td>
                                            <td>Current <span className="icon-with-circle color-white"><i className="icon-event_note"></i></span></td>
                                            <td>Change</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {progress.data.map((o, i) => {
                                    return <EnduranceCard key={i} data={o} />;
                                })}
                            </div>
                        </div>
                    </div>
                }

                {!loading && (typeof progress === 'undefined' || !progress) && typeof error !== 'undefined' && error && error.length <= 0 &&
                    <div className="no-record-found-wrapper">
                        <img src={NoDataFoundImg} />
                    </div>
                }

                {!loading && typeof error !== 'undefined' && error && error.length > 0 &&
                    <div className="server-error-wrapper">
                        <ErrorCloud />
                        <h4>Something went wrong! please try again.</h4>
                    </div>
                }
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { dateRange, dispatch } = this.props;
        if (dateRange && prevProps.dateRange !== dateRange) {
            var requestData = {
                dateRange: dateRange,
                start: dateRange.start,
                end: dateRange.end,
                category: PROGRESS_ENDURANCE,
            }
            dispatch(getUserProgressByCategoryAndDateRequest(requestData));
        }
    }
}

const mapStateToProps = (state) => {
    const { userProgress } = state;
    return {
        loading: userProgress.get('loading'),
        selectedType: userProgress.get('selectedType'),
        progress: userProgress.get('progress'),
        dateRange: userProgress.get('dateRange'),
        error: userProgress.get('error'),
    };
}

export default connect(
    mapStateToProps,
)(Endurance);

class EnduranceCard extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="toggl-tab-div-body">
                <table className="table progress-muscle-body-table">
                    <tbody>
                        <tr>
                            <td>
                                <span className="icon-with-circle-left gradient-color-1 color-white"><i className="icon-equalizer ml-5"></i></span>
                                {(data.name) ? capitalizeFirstLetter(data.name.replace(/([a-z])([A-Z])/g, '$1 $2')) : 'Endurance'}
                            </td>
                            <td>{(data.start) ? data.start : '0'}</td>
                            <td>{(data.current) ? data.current : '0'}</td>
                            <td className="muscle-strength-last-td">
                                <span>{(data.difference) ? data.difference : '0'}</span>
                                {typeof data.percentageChange !== 'undefined' && data.percentageChange > 0 &&
                                    <span className="btn-change-span"><i className="icon-arrow_upward"></i> {data.percentageChange}%</span>
                                }
                                {typeof data.percentageChange !== 'undefined' && data.percentageChange < 0 &&
                                    <span className="btn-change-span gradient-color-2"><i className="icon-arrow_downward"></i> {data.percentageChange}%</span>
                                }
                                {typeof data.percentageChange !== 'undefined' && (data.percentageChange == 0 || data.percentageChange == null) &&
                                    <span className="btn-change-span gradient-color-1">0%</span>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}