import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Switch, Route } from "react-router-dom";
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { routeCodes } from '../constants/routes';
import BodyFat from '../components/Progress/BodyFat';
import Mobility from '../components/Progress/Mobility';
import Muscle from '../components/Progress/Muscle';
import Strength from '../components/Progress/Strength';
import Endurance from '../components/Progress/Endurance';
import DateRangePicker from 'react-daterange-picker';
import moment from "moment";
import { setUserProgresDateRange } from '../actions/userProgress';

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: false,
        }
    }

    componentWillMount() {
        const { dispatch, match, history } = this.props;
        if (match.isExact) {
            history.push(routeCodes.PROGRESS_BODY_FAT);
        } else {
            var dateRange = moment.range(
                moment().subtract(1, 'month').startOf('day').utc(),
                moment().startOf('day').utc(),
            )
            dispatch(setUserProgresDateRange(dateRange));
        }
    }

    render() {
        const { showSearch } = this.state;
        const { dateRange } = this.props;
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap starts-body">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Your Progress</h2>
                            <div className="body-head-l-btm">
                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROGRESS_BODY_FAT}
                                >
                                    Body Fat
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROGRESS_MOBILITY}
                                >
                                    Mobility
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROGRESS_MUSCLE}
                                >
                                    Muscle
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROGRESS_STRENGTH}
                                >
                                    Strength
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROGRESS_ENDURANCE}
                                >
                                    Endurance
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
                        <Route exact path={routeCodes.PROGRESS_BODY_FAT} component={BodyFat} />
                        <Route exact path={routeCodes.PROGRESS_MOBILITY} component={Mobility} />
                        <Route exact path={routeCodes.PROGRESS_MUSCLE} component={Muscle} />
                        <Route exact path={routeCodes.PROGRESS_STRENGTH} component={Strength} />
                        <Route exact path={routeCodes.PROGRESS_ENDURANCE} component={Endurance} />
                    </Switch>
                </section>
            </div >
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { match, history } = this.props;
        if (match.isExact) {
            history.push(routeCodes.PROGRESS_BODY_FAT);
        }
    }

    handleTimeDateRange = (range, state) => {
        const { dispatch } = this.props;
        dispatch(setUserProgresDateRange(range));
        this.setState({ showSearch: false });
    }
}

const mapStateToProps = (state) => {
    const { userProgress } = state;
    return {
        dateRange: userProgress.get('dateRange'),
    };
}

export default connect(
    mapStateToProps,
)(Progress);