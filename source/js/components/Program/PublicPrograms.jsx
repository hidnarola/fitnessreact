import React, { Component } from "react";
import ProgramListing from "./ProgramListing";
import { PROGRAM_PUBLIC } from "../../constants/consts";

class PublicPrograms extends Component {
    render() {
        return (
            <ProgramListing
                condition={{
                    privacy: PROGRAM_PUBLIC,
                }}
                showRatingInList={true}
            />
        )
    };
}

export default PublicPrograms;