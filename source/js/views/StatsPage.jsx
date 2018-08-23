import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Strength from 'components/Stats/Strength';
import Cardio from 'components/Stats/Cardio';
import { routeCodes } from 'constants/routes';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';

export default class StatsPage extends Component {
    componentWillMount() {
        const { match, history } = this.props;
        if (match.isExact) {
            history.push(routeCodes.STATSTRENGTH);
        }
    }

    render() {
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap starts-body">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Cecilia Brown</h2>
                            <div className="body-head-l-btm">

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.STATSTRENGTH}
                                >
                                    Strength
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.STATSCARDIO}
                                >
                                    Cardio
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <Switch>
                        <Route exact path={routeCodes.STATSTRENGTH} component={Strength} />
                        <Route exact path={routeCodes.STATSCARDIO} component={Cardio} />
                    </Switch>
                </section>
            </div>
        );
    }
}
