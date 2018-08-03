import React, { Component } from 'react';
import Auth from '../Auth';

const auth = new Auth();

class Callback extends Component {
    constructor(props) {
        super(props);
    }


    componentWillMount() {
        console.log('===========================================================================================');
        console.log('componentWillMount');
        console.log('props => ', this.props);
        console.log('===========================================================================================');
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('===========================================================================================');
        console.log('componentWillUpdate');
        console.log('props => ', this.props);
        console.log('===========================================================================================');
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log('===========================================================================================');
        console.log('componentDidUpdate');
        console.log('props => ', this.props);
        console.log('===========================================================================================');
        
    }
    
    


    // componentWillMount() {
    //     this.handleAuthentication(this.props);
    // }

    render() {
        // console.log(this.props);
        return (
            <div className="auth0-callback-wrapper">
                <h1>Loading...</h1>
            </div>
        );
    }

    // Start funs
    // handleAuthentication = ({ location }) => {
    //     if (/access_token|id_token|error/.test(location.hash)) {
    //         auth.handleAuthentication();
    //     }
    // }
    // End fund
}

export default Callback;