import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import Menu from 'components/global/Menu';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import Dashboard from 'components/Dashboard/Dashboard';
import Stats from 'components/Stats/Stats';

import FitnessBody from 'components/Body/FitnessBody';
import Exercise from 'components/Exercise/Exercise';
import Nutrition from 'components/Nutrition/Nutrition';
import Goals from 'components/Goals/Goals';

import Home from 'views/Home';
import People from 'views/People';
import NotFound from 'views/NotFound';
import StatsPage from 'views/StatsPage';
import RegisterUser from 'views/RegisterUser';

class App extends Component {

    

    render() {
        return (
            <div>

                <FitnessHeader/>

                <FitnessNav/>

                {/* <Menu /> */}

                <Switch>
                    <Route exact path={ routeCodes.HOME } component={ Home } />
                    <Route path={ routeCodes.DASHBOARD } component={ Dashboard } />
                    <Route path={ routeCodes.STATSPAGE } component={ StatsPage }  />
                    <Route path={ routeCodes.FITNESSBODY } component={ FitnessBody } />
                    <Route path={ routeCodes.EXERCISE } component={ Exercise } />
                    <Route path={ routeCodes.NUTRITION } component={ Nutrition } />

                    <Route path={ routeCodes.REGISTERUSER } component={ RegisterUser } />                    

                    <Route path={ routeCodes.GOALS } component={ Goals } />
                    <Route path='*' component={ NotFound } />
                    <Route path={ routeCodes.PEOPLE } component={ People }  />
                </Switch>
            </div>            
        );
    }
}

export default hot(module)(App);
