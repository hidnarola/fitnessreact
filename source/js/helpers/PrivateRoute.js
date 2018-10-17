import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { LOCALSTORAGE_ROLE_KEY, USER_ROLE, LOCALSTORAGE_ACCESS_TOKEN_KEY, ADMIN_ROLE } from '../constants/consts';
import { publicPath } from '../constants/routes';
import { adminRootRoute } from '../constants/adminRoutes';

class PrivateRoute extends Component {
    render() {
        const { component: Component, socket, ...rest } = this.props;
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
                    } else {
                        socket.emit('request_make_user_offline');
                    }
                    return (
                        <Redirect to={{ pathname: publicPath, state: { from: props.location } }} />
                    )
                }
            } />
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return {
        socket: user.get('socket'),
    }
}

export default connect(mapStateToProps)(PrivateRoute);