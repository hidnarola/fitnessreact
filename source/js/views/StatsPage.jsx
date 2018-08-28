import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import { routeCodes } from '../constants/routes';
import { STATS_STRENGTH, STATS_CARDIO } from '../constants/consts';
import StatsContent from '../components/Stats/StatsContent';

class StatsPage extends Component {
    componentWillMount() {
        const { match, history } = this.props;
        if (match.isExact) {
            let url = `${routeCodes.STATSPAGE}/${STATS_STRENGTH}`;
            history.push(url);
        }
    }

    render() {
        const { loggedUserData } = this.props;
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
                    </div>

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

}

const mapStateToProps = (state) => {
    const { user } = state;
    return {
        loggedUserData: user.get('loggedUserData'),
    }
}

export default connect(
    mapStateToProps,
)(StatsPage);