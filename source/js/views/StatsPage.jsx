import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import { routeCodes } from '../constants/routes';
import { STATS_STRENGTH, STATS_CARDIO } from '../constants/consts';
import StatsContent from '../components/Stats/StatsContent';
import DateRangePicker from 'react-daterange-picker';
import { setUserStatsState } from '../actions/userStats';
import DateRangePickerCustomPeriod from '../components/Common/DateRangePickerCustomPeriod';
import moment from "moment";
import { tw, isOnline } from '../helpers/funs';

class StatsPage extends Component {
    constructor(props) {
        super(props);
        this.state = { showSearch: false }
    }

    componentWillMount() {

        const { match, history } = this.props;
        if (match.isExact) {
            let url = `${routeCodes.STATSPAGE}/${STATS_STRENGTH}`;
            history.push(url);
        }
    }

    render() {
        const { loggedUserData, dateRange } = this.props;
        const { showSearch } = this.state;
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap starts-body">
                    <div className="body-head d-flex justify-content-start front-white-header with-tabs">
                        <div className="body-head-l">
                            <h2>{(loggedUserData && loggedUserData.name) ? loggedUserData.name : 'Your Statistics'}</h2>
                        </div>
                        {dateRange &&
                            <div className="body-head-r">
                                <a href="javascript:void(0)" onClick={() => this.setState({ showSearch: !showSearch })} className="pink-btn">{`${dateRange.start.local().format('DD/MM/YYYY')} - ${dateRange.end.local().format('DD/MM/YYYY')}`}<i className="icon-date_range"></i></a>
                            </div>
                        }
                    </div>
                    <div className="body-head-l-btm profile-new-menu">
                        <NavLink activeClassName='pink-btn-new' exact to={`${routeCodes.STATSPAGE}/${STATS_STRENGTH}`}>Strength</NavLink>
                        <NavLink activeClassName='pink-btn-new' exact to={`${routeCodes.STATSPAGE}/${STATS_CARDIO}`}>Cardio</NavLink>
                    </div>

                    {showSearch &&
                        <div className="progress-date-range-picker custom_date_pdl">
                            <DateRangePickerCustomPeriod
                                dateRange={dateRange}
                                changeCallback={this.handleCustomDateRange}
                            />
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

                    <Switch>
                        <Route path={`${routeCodes.STATSPAGE}/:type(${STATS_STRENGTH}|${STATS_CARDIO})`} component={StatsContent} />
                    </Switch>
                </section>
            </div>
        );
    }

    componentDidMount() {
        // change title 
        document.title = 'Stats';
    }


    componentDidUpdate(prevProps, prevState) {
        const { match, history } = this.props;
        if (match.isExact) {
            let url = `${routeCodes.STATSPAGE}/${STATS_STRENGTH}`;
            history.push(url);
        }
    }

    handleTimeDateRange = (range, state) => {
        if (isOnline()) {
            const { dispatch } = this.props;
            let stateData = {
                dateRange: range,
                regetStats: true
            };
            dispatch(setUserStatsState(stateData));
            this.setState({ showSearch: false });
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleCustomDateRange = (start, end) => {
        const { dispatch } = this.props;
        let range = moment.range(start, end);
        let stateData = {
            dateRange: range,
            regetStats: true
        };
        dispatch(setUserStatsState(stateData));
        this.setState({ showSearch: false });
    }

}

const mapStateToProps = (state) => {
    const { user, userStats } = state;
    return {
        loggedUserData: user.get('loggedUserData'),
        dateRange: userStats.get('dateRange'),
    }
}

export default connect(
    mapStateToProps,
)(StatsPage);