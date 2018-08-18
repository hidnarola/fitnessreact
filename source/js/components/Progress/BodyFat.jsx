import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserProgressByCategoryAndDateRequest } from '../../actions/userProgress';
import { PROGRESS_BODY_FAT } from '../../constants/consts';
import moment from "moment";

class BodyFat extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(
    mapStateToProps,
)(BodyFat);