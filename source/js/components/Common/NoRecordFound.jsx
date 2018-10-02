import React, { Component } from 'react';

class NoRecordFound extends Component {
    render() {
        const {
            wrapper_class,
            icon_class,
            title,
            title_class,
        } = this.props;
        return (
            <div className={`no-record-found-wrapper ${wrapper_class ? wrapper_class : ''}`}>
                <i className={icon_class ? icon_class : 'icon-error_outline'}></i>
                <h4 className={`${title_class ? title_class : ''}`}>{title ? title : 'No data found!'}</h4>
            </div>
        );
    }
}

export default NoRecordFound;