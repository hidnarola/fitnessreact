import React, { Component } from 'react';

import { Helmet } from "react-helmet";

class AddMetaDescription extends Component {
    render() {
        const { children } = this.props

        return (
            <Helmet>
                {children}
            </Helmet>
        );
    }
}

export default AddMetaDescription;