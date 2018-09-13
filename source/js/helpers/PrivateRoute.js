import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOCALSTORAGE_ROLE_KEY, USER_ROLE, LOCALSTORAGE_ACCESS_TOKEN_KEY, ADMIN_ROLE } from '../constants/consts';
import { publicPath } from '../constants/routes';
import { adminRootRoute } from '../constants/adminRoutes';

export default class PrivateRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={
                (props) => {
                    let token = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
                    let role = localStorage.getItem(LOCALSTORAGE_ROLE_KEY);
                    let decodedRole = window.atob(role)
                    if (decodedRole === USER_ROLE) {
                        return (
                            (token && role) ? <Component {...props} /> : <Redirect to={{ pathname: publicPath, state: { from: props.location } }} />
                        )
                    } else if (decodedRole === ADMIN_ROLE) {
                        return (
                            (token && role) ? <Component {...props} /> : <Redirect to={{ pathname: adminRootRoute, state: { from: props.location } }} />
                        )
                    }
                    return (
                        <Redirect to={{ pathname: publicPath, state: { from: props.location } }} />
                    )
                }
            } />
        );
    }
}