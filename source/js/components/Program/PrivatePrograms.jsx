import React, { Component } from "react";
import { connect } from "react-redux";
import ProgramListing from "./ProgramListing";
import { PROGRAM_PRIVATE } from "../../constants/consts";

class PrivatePrograms extends Component {
    render() {
        const { loggedUserData } = this.props;
        return (
            <ProgramListing
                condition={{
                    privacy: PROGRAM_PRIVATE,
                    userId: loggedUserData.authId
                }}
                showRatingInList={false}
            />
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return {
        loggedUserData: user.get('loggedUserData'),
    };
}

export default connect(mapStateToProps)(PrivatePrograms);