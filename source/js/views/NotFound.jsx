import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import $ from "jquery";
import { Link } from "react-router-dom";
import { routeCodes } from '../constants/routes';
import AddMetaDescription from '../components/global/AddMetaDescription';

// This component is used for Server rendering
// When you want to return 40x http statuses
const RouteStatus = ({ code, children }) => (
    <Route
        render={
            ({ staticContext }) => {
                if (staticContext) {
                    staticContext.status = code; // eslint-disable-line no-param-reassign
                }

                return children;
            }
        }
    />
);

export default class NotFound extends Component {
    render() {
        return (
            <RouteStatus code={404}>
                <div className="not-found-page-wrapper step-wrap">
                    <AddMetaDescription>
                        <title>Not found | Fitly</title>
                    </AddMetaDescription>
                    <div className="step-box step-box-not-found">
                        <div className="content-wrapper">
                            <h1>404</h1>
                            <h3>Oops! Page not found</h3>
                            <p>Sorry but the page you are looking for is not found. Please, make sure you have typed correct URL.</p>
                            <Link to={routeCodes.HOME}>
                                <i className="icon-arrow_back"></i>
                                <span>Go To Home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </RouteStatus>
        );
    }

    componentDidMount() {
        $('body').addClass('no-padding');
    }

    componentWillUnmount() {
        $('body').removeClass('no-padding');
    }
}
