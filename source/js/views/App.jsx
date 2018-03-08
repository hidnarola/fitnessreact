import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch, withRouter } from "react-router-dom"; 
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import ScrollToTop from 'components/global/ScrollToTop';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import Stats from 'components/Stats/Stats';

import FitnessBody from 'components/Body/FitnessBody';
import Nutrition from 'components/Nutrition/Nutrition';
import Goals from 'components/Goals/Goals';

import Home from 'views/Home';
import People from 'views/People';
import NotFound from 'views/NotFound';
import StatsPage from 'views/StatsPage';
import Badges from 'views/Badges';
import Exercise from 'views/Exercise';
import Dashboard from 'views/Dashboard';
import ProfilePage from 'views/Profile';
import RegisterUser from 'views/RegisterUser';

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    }
};

const AuthButton = withRouter(
    ({ history }) =>
        fakeAuth.isAuthenticated ? (
            <p>
            Welcome!{" "}
            <button
                onClick={() => {
                fakeAuth.signout(() => history.push("/"));
                }}
            >
                Sign out
            </button>
            </p>
        ) : (
            <p>You are not logged in.</p>
        )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
        render={props =>
            fakeAuth.isAuthenticated ? (
                <Component {...props} />
                    ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: props.location }
                    }}
                />
            )
        }
    />
);

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;
  

class App extends Component {

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <ScrollToTop>                            
                            <Route exact path={ routeCodes.HOME } component={ Home } />
                            <Route path={ routeCodes.PEOPLE } component={ People }  />                            

                            <Route path={ routeCodes.DASHBOARD } component={ Dashboard } />
                            <Route path={ routeCodes.STATSPAGE } component={ StatsPage }  />
                            
                            <Route path={ routeCodes.PROFILE } component={ ProfilePage }  />

                            
                            <Route path={ routeCodes.FITNESSBODY } component={ FitnessBody } />
                            <Route path={ routeCodes.EXERCISE } component={ Exercise } />
                            <Route path={ routeCodes.NUTRITION } component={ Nutrition } />

                            <Route path={ routeCodes.REGISTERUSER } component={ RegisterUser } />

                            <Route path={ routeCodes.BADGES } component={Badges}/>                            
                            

                            <Route path={ routeCodes.GOALS } component={ Goals } />


                            {/* <Route path='*' component={ NotFound } /> */}
                        </ScrollToTop>
                    </div>
                </Router>                
            </div>            
        );
    }
}

export default hot(module)(App);
