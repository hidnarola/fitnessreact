import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { Alert } from "react-bootstrap";
import SaveProgramMasterPageForm from './SaveProgramMasterPageForm';
import { PROGRAM_PRIVATE, PROGRAM_PRIVATE_STR, PROGRAM_PUBLIC, PROGRAM_PUBLIC_STR, SECONDARY_GOALS, PROGRAM_DIFFICULTY_LEVEL_OBJ, PROGRAM_DIFFICULTY_BEGINNER } from '../../constants/consts';
import { capitalizeFirstLetter, te, focusToControl } from '../../helpers/funs';
import { addUserProgramMasterRequest, getUserProgramMasterRequest, setUserProgramState, updateUserProgramMasterRequest } from '../../actions/userPrograms';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { routeCodes } from '../../constants/routes';
import { initialize } from "redux-form";

const privacyOptions = [
    { value: PROGRAM_PRIVATE, label: PROGRAM_PRIVATE_STR },
    { value: PROGRAM_PUBLIC, label: PROGRAM_PUBLIC_STR }
];

class SaveProgramMasterPage extends Component {

    componentWillMount() {
        const { match, dispatch } = this.props;
        if (match && match.params && match.params.id) {
            dispatch(showPageLoader());
            dispatch(getUserProgramMasterRequest(match.params.id));
        }
    }

    render() {
        const { errorMaster, match } = this.props;
        let backUrl = routeCodes.PROGRAMS;
        if (match && match.params && match.params.id) {
            backUrl = `${routeCodes.PROGRAM_SAVE}/${match.params.id}`;
        }
        return (
            <div className="fitness-body save-program-master-wrapper">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start front-white-header">
                        <div className="body-head-l">
                            <h2>Save Program</h2>
                        </div>
                    </div>
                    <div className="body-content">
                        <div className="white-box">
                            <div className="whitebox-body validation_errors_wrapper">
                                {errorMaster && errorMaster.length > 0 &&
                                    <Alert bsStyle="danger">
                                        {
                                            errorMaster.map((e, i) => {
                                                return <p key={i}>{e}</p>
                                            })
                                        }
                                    </Alert>
                                }
                                <SaveProgramMasterPageForm
                                    onSubmit={this.handleSubmit}
                                    privacyOptions={privacyOptions}
                                    goalOptions={SECONDARY_GOALS}
                                    levelOptions={PROGRAM_DIFFICULTY_LEVEL_OBJ}
                                    backUrl={backUrl}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            loadingMaster,
            errorMaster,
            programMaster,
            loadingMasterData,
            programMasterData,
            history,
            dispatch
        } = this.props;
        if (!loadingMasterData && prevProps.loadingMasterData !== loadingMasterData) {
            if (programMasterData) {
                let formData = {
                    title: (programMasterData.name) ? programMasterData.name : undefined,
                    privacy: (typeof programMasterData.privacy !== 'undefined') ? _.find(privacyOptions, ['value', programMasterData.privacy]) : undefined,
                    goal: (programMasterData.goal) ? _.find(SECONDARY_GOALS, ['value', programMasterData.goal]) : undefined,
                    level: (programMasterData.level) ? _.find(PROGRAM_DIFFICULTY_LEVEL_OBJ, ['value', programMasterData.level]) : undefined,
                    description: (programMasterData.description) ? programMasterData.description : undefined,
                };
                dispatch(initialize('save_program_master_form', formData));
            } else {
                te('Something went wrong! please try again later.');
                history.push(`${routeCodes.PROGRAMS}`);
            }
            dispatch(hidePageLoader());
        }
        if (!loadingMaster && prevProps.loadingMaster !== loadingMaster) {
            if (errorMaster && errorMaster.length <= 0) {
                var _id = programMaster._id;
                history.push(`${routeCodes.PROGRAM_SAVE}/${_id}`);
            } else {
                focusToControl('.validation_errors_wrapper');
            }
            dispatch(hidePageLoader());
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        let newState = {
            errorMaster: [],
        };
        dispatch(setUserProgramState(newState));
    }


    handleSubmit = (data) => {
        const { dispatch, match } = this.props;
        var requestData = {
            name: (data.title && data.title.trim()) ? capitalizeFirstLetter(data.title.trim()) : '',
            description: (data.description) ? data.description : '',
            level: (data && data.level) ? data.level.value : '',
            goal: (data && data.goal) ? data.goal.value : '',
            privacy: (data && data.privacy) ? data.privacy.value : '',
            type: 'user',
        }
        dispatch(showPageLoader());
        if (match && match.params && match.params.id) {
            dispatch(updateUserProgramMasterRequest(match.params.id, requestData));
        } else {
            dispatch(addUserProgramMasterRequest(requestData));
        }
    }
}

const mapStateToProps = (state) => {
    const { userPrograms } = state;
    return {
        loadingMaster: userPrograms.get('loadingMaster'),
        programMaster: userPrograms.get('programMaster'),
        errorMaster: userPrograms.get('errorMaster'),
        loadingMasterData: userPrograms.get('loadingMasterData'),
        programMasterData: userPrograms.get('programMasterData'),
    };
}

export default connect(
    mapStateToProps,
)(SaveProgramMasterPage);