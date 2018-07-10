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
import SweetAlert from "react-bootstrap-sweetalert";
import AddProgramMasterForm from '../components/Program/AddProgramMasterForm';
import { submit } from "redux-form";
import { routeCodes } from '../constants/routes';

class Programs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddProgramAlert: false,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getUserProgramsRequest());
    }

    render() {
        const { programs } = this.props;
        const {
            showAddProgramAlert,
        } = this.state;
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
                        <div className="body-head-r">
                            <a href="javascript:void(0)" onClick={this.handleShowAddProgramAlert} className="pink-btn">
                                <span>Add Program</span>
                                <i className="icon-add_circle"></i>
                            </a>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-body profile-body programs-table-wrapper">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Length</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        {programs && programs.length > 0 &&
                                            <tbody>
                                                {
                                                    programs.map((program, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{program.name}</td>
                                                                <td>{program.description}</td>
                                                                <td>0</td>
                                                                <td>
                                                                    <ButtonToolbar>
                                                                        <DropdownButton title="Actions" pullRight id="dropdown-size-medium">
                                                                            <MenuItem
                                                                                href={`${routeCodes.PROGRAM_SAVE}/${program._id}`}
                                                                                eventKey="1"
                                                                                onClick={(e) => this.handleEditNavigation(e, `${routeCodes.PROGRAM_SAVE}/${program._id}`)}
                                                                            >
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
                                            </tbody>
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <SweetAlert
                    type="default"
                    title={'Add Program'}
                    onCancel={this.handleAddProgramCancel}
                    onConfirm={this.handleAddProgramSubmit}
                    btnSize="sm"
                    cancelBtnBsStyle="danger"
                    confirmBtnBsStyle="success"
                    show={showAddProgramAlert}
                    showConfirm={true}
                    showCancel={true}
                    closeOnClickOutside={false}
                >
                    <AddProgramMasterForm />
                </SweetAlert>

            </div>
        );
    }

    handleShowAddProgramAlert = () => {
        this.setState({ showAddProgramAlert: true });
    }

    handleAddProgramCancel = () => {
        this.setState({ showAddProgramAlert: false });
    }

    handleAddProgramSubmit = () => {
        const { dispatch } = this.props;
        dispatch(submit('add_program_master_form'));
    }

    handleEditNavigation = (e, href) => {
        const { history } = this.props;
        e.preventDefault();
        history.push(href);
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