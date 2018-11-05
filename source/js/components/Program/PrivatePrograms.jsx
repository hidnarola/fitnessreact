import React, { Component } from "react";
import ProgramListing from "./ProgramListing";
import { PROGRAM_PRIVATE } from "../../constants/consts";

class PrivatePrograms extends Component {
    render() {
        return (
            <ProgramListing
                privacy={PROGRAM_PRIVATE}
            />
        )
    }
}

export default PrivatePrograms;