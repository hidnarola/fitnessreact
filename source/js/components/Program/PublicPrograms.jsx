import React, { Component } from "react";
import ProgramListing from "./ProgramListing";
import { PROGRAM_PUBLIC } from "../../constants/consts";

class PublicPrograms extends Component {
    render() {
        return (
            <ProgramListing
                privacy={PROGRAM_PUBLIC}
            />
        )
    };
}

export default PublicPrograms;