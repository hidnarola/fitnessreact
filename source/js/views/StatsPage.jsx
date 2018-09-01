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

class StatsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: false,
        }
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
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>{(loggedUserData && loggedUserData.name) ? loggedUserData.name : 'Your Statistics'}</h2>
                            <div className="body-head-l-btm">

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={`${routeCodes.STATSPAGE}/${STATS_STRENGTH}`}
                                >
                                    Strength
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={`${routeCodes.STATSPAGE}/${STATS_CARDIO}`}
                                >
                                    Cardio
                                </NavLink>
                            </div>
                        </div>
                        {dateRange &&
                            <div className="body-head-r">
                                <a href="javascript:void(0)" onClick={() => this.setState({ showSearch: !showSearch })} className="pink-btn">{`${dateRange.start.format('DD/MM/YYYY')} - ${dateRange.end.format('DD/MM/YYYY')}`}<i className="icon-date_range"></i></a>
                            </div>
                        }
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

                    <Switch>
                        <Route path={`${routeCodes.STATSPAGE}/:type(${STATS_STRENGTH}|${STATS_CARDIO})`} component={StatsContent} />
                    </Switch>
                </section>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { match, history } = this.props;
        if (match.isExact) {
            let url = `${routeCodes.STATSPAGE}/${STATS_STRENGTH}`;
            history.push(url);
        }
    }

    handleTimeDateRange = (range, state) => {
        const { dispatch } = this.props;
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