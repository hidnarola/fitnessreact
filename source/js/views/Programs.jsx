import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { getUserProgramsRequest, deleteUserProgramRequest } from '../actions/userPrograms';
import {
    DropdownButton,
    ButtonToolbar,
    MenuItem
} from "react-bootstrap";
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import SweetAlert from "react-bootstrap-sweetalert";
import AddProgramMasterForm from '../components/Program/AddProgramMasterForm';
import { routeCodes } from '../constants/routes';
import { te, ts } from '../helpers/funs';
import { addUserProgramMasterRequest } from '../actions/userPrograms_backup';

class Programs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddProgramAlert: false,
            showDeleteProgramAlert: false,
            deleteActionInit: false,
            selectedProgramId: null,
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
            showDeleteProgramAlert,
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
                                                <th>Workouts</th>
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
                                                                <td>{program.totalWorkouts}</td>
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
                                                                            <MenuItem
                                                                                eventKey="2"
                                                                                onClick={() => this.handleShowDeleteAlert(program._id)}
                                                                            >
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
                                        {programs && programs.length <= 0 &&
                                            <tbody>
                                                <tr>
                                                    <td colSpan="4">No programs found</td>
                                                </tr>
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
                    onConfirm={() => { }}
                    btnSize="sm"
                    cancelBtnBsStyle="danger"
                    confirmBtnBsStyle="success"
                    show={showAddProgramAlert}
                    showConfirm={false}
                    showCancel={false}
                    closeOnClickOutside={false}
                >
                    <AddProgramMasterForm
                        onSubmit={this.handleAddProgramSubmit}
                        onCancel={this.handleAddProgramCancel}
                    />
                </SweetAlert>

                <SweetAlert
                    show={showDeleteProgramAlert}
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleDeleteProgram}
                    onCancel={this.handleCancelDelete}
                >
                    You will not be able to recover this file!
                </SweetAlert>

            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            loading,
            error,
            dispatch,
            loadingMaster,
            programMaster,
            errorMaster,
            history,
        } = this.props;
        const {
            deleteActionInit,
        } = this.state;
        if (!loading && deleteActionInit) {
            this.setState({ deleteActionInit: false });
            this.handleCancelDelete();
            if (error && error.length <= 0) {
                ts('Program deleted successfully!');
                dispatch(getUserProgramsRequest());
            } else {
                te(error[0]);
            }
        }
        if (!loadingMaster && programMaster && prevProps.programMaster !== programMaster) {
            if (errorMaster && errorMaster.length <= 0) {
                var _id = programMaster._id;
                history.push(`${routeCodes.PROGRAM_SAVE}/${_id}`);
            } else {
                te(errorMaster[0]);
            }
        }
    }


    handleShowAddProgramAlert = () => {
        this.setState({ showAddProgramAlert: true });
    }

    handleAddProgramCancel = () => {
        this.setState({ showAddProgramAlert: false });
    }

    handleAddProgramSubmit = (data) => {
        const { dispatch } = this.props;
        var requestData = {
            name: data.title,
            description: (data.description) ? data.description : '',
            type: 'user',
        }
        dispatch(addUserProgramMasterRequest(requestData));
    }

    handleEditNavigation = (e, href) => {
        const { history } = this.props;
        e.preventDefault();
        history.push(href);
    }

    handleShowDeleteAlert = (_id) => {
        this.setState({
            showDeleteProgramAlert: true,
            selectedProgramId: _id,
        });
    }

    handleCancelDelete = () => {
        this.setState({
            showDeleteProgramAlert: false,
            selectedProgramId: null,
        });
    }

    handleDeleteProgram = () => {
        const { dispatch } = this.props;
        const { selectedProgramId } = this.state;
        dispatch(deleteUserProgramRequest(selectedProgramId));
        this.setState({ deleteActionInit: true });
    }
}

const mapStateToProps = (state) => {
    const { userPrograms } = state;
    return {
        loading: userPrograms.get('loading'),
        programs: userPrograms.get('programs'),
        error: userPrograms.get('error'),
        loadingMaster: userPrograms.get('loadingMaster'),
        programMaster: userPrograms.get('programMaster'),
        errorMaster: userPrograms.get('errorMaster'),
    };
}

export default connect(
    mapStateToProps,
)(Programs);