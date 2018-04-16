import React, { Component } from 'react';
import Auth from '../Auth';

const auth = new Auth();

class Callback extends Component {
    constructor(props) {
        super(props);
    }


    componentWillMount() {
        this.handleAuthentication(this.props);
    }

    render() {
        console.log(this.props);
        return (
            <div className="auth0-callback-wrapper">
                <h1>Loading...</h1>
            </div>      
            );
    }

    // Start funs
    handleAuthentication = ({ location }) => {
        if (/access_token|id_token|error/.test(location.hash)) {
            auth.handleAuthentication();
        }
    }
    // End fund
}

export default Callback;