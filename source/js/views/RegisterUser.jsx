import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeCodes } from 'constants/routes';
import { Values } from "redux-form-website-template";

import ContactForm from 'components/Registration/WizardForm';
import showResults from "components/Registration/ShowResults";

export default class RegisterUser extends Component {
    
 
    render() {        
        return (
            <div className='register-user'>
                <h1>Registration User</h1>

                <ContactForm onSubmit={showResults} />
                <Values form="wizard" />
            </div>
        );
    }
}
