import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOCALSTORAGE_ROLE_KEY, ADMIN_ROLE, LOCALSTORAGE_ACCESS_TOKEN_KEY } from '../constants/consts';
import { adminRootRoute } from '../constants/adminRoutes';

export default class AdminPrivateRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={
                (props) => {
                    let token = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
                    let role = localStorage.getItem(LOCALSTORAGE_ROLE_KEY);
                    let decodedRole = window.atob(role)
                    if (decodedRole === ADMIN_ROLE) {
                        return (
                            (token && role) ? <Component {...props} /> : <Redirect to={{ pathname: adminRootRoute, state: { from: props.location } }} />
                        )
                    }
                    return (
                        <Redirect to={{ pathname: adminRootRoute, state: { from: props.location } }} />
                    )
                }
            } />
        );
    }
}