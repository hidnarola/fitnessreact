import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOCALSTORAGE_ROLE_KEY, ADMIN_ROLE, LOCALSTORAGE_ACCESS_TOKEN_KEY } from '../constants/consts';
import { publicPath } from '../constants/routes';

export default class AdminPrivateRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={
                (props) => {
                    let token = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
                    let role = localStorage.getItem(LOCALSTORAGE_ROLE_KEY);
                    if (token && role) {
                        let decodedRole = window.atob(role);
                        if (decodedRole === ADMIN_ROLE) {
                            return (
                                <Component {...props} />
                            )
                        }
                    }
                    return (
                        <Redirect to={{ pathname: publicPath, state: { from: props.location } }} />
                    )
                }
            } />
        );
    }
}