import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { getUserProgramsRequest } from '../actions/userPrograms';
import {
    DropdownButton,
    ButtonToolbar,
    MenuItem
} from "react-bootstrap";
import { FaPencil, FaTrash } from 'react-icons/lib/fa';

class Programs extends Component {

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getUserProgramsRequest());
    }

    render() {
        const { programs } = this.props;
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Programs</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-body profile-body">
                                    <table>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Length</th>
                                            <th>Actions</th>
                                        </tr>
                                        {programs && programs.length > 0 &&
                                            programs.map((program, index) => {
                                                return (
                                                    <tr>
                                                        <td>{program.name}</td>
                                                        <td>{program.description}</td>
                                                        <td>0</td>
                                                        <td>
                                                            <ButtonToolbar>
                                                                <DropdownButton title="Actions" pullRight id="dropdown-size-medium">
                                                                    <MenuItem eventKey="1">
                                                                        <FaPencil className="v-align-sub" /> Edit
                                                                    </MenuItem>
                                                                    <MenuItem eventKey="2">
                                                                        <FaTrash className="v-align-sub" /> Delete
                                                                    </MenuItem>
                                                                </DropdownButton>
                                                            </ButtonToolbar>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userPrograms } = state;
    return {
        programs: userPrograms.get('programs'),
    };
}

export default connect(
    mapStateToProps,
)(Programs);