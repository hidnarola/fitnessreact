import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { getUserProgramRequest } from '../../actions/userPrograms';
import { routeCodes } from '../../constants/routes';
import { te } from '../../helpers/funs';

class ProgramSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            program: null,
            workouts: [],
        }
    }

    componentWillMount() {
        const { match, dispatch } = this.props;
        if (match && match.params && match.params.id) {
            var _id = match.params.id;
            dispatch(getUserProgramRequest(_id));
        }
    }

    render() {
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
                    <div className="body-content d-flex row justify-content-start">
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-body profile-body programs-table-wrapper">

                                    <div className="program-save-custom-days-wrapper">
                                        <div className="program-save-custom-days-row">
                                            <div className="program-save-custom-days-block">
                                                <div className="program-save-custom-days-block-title">
                                                    Title 1
                                                </div>
                                                <div className="program-save-custom-days-block-content">
                                                    Content
                                                </div>
                                            </div>
                                            <div className="program-save-custom-days-block">
                                                <div className="program-save-custom-days-block-title">
                                                    Title 2
                                                </div>
                                                <div className="program-save-custom-days-block-content">
                                                    Content
                                                </div>
                                            </div>
                                            <div className="program-save-custom-days-block">
                                                <div className="program-save-custom-days-block-title">
                                                    Title 3
                                                </div>
                                                <div className="program-save-custom-days-block-content">
                                                    Content
                                                </div>
                                            </div>
                                            <div className="program-save-custom-days-block">
                                                <div className="program-save-custom-days-block-title">
                                                    Title 4
                                                </div>
                                                <div className="program-save-custom-days-block-content">
                                                    Content
                                                </div>
                                            </div>
                                            <div className="program-save-custom-days-block">
                                                <div className="program-save-custom-days-block-title">
                                                    Title 5
                                                </div>
                                                <div className="program-save-custom-days-block-content">
                                                    Content
                                                </div>
                                            </div>
                                            <div className="program-save-custom-days-block">
                                                <div className="program-save-custom-days-block-title">
                                                    Title 6
                                                </div>
                                                <div className="program-save-custom-days-block-content">
                                                    Content
                                                </div>
                                            </div>
                                            <div className="program-save-custom-days-block">
                                                <div className="program-save-custom-days-block-title">
                                                    Title 7
                                                </div>
                                                <div className="program-save-custom-days-block-content">
                                                    Content
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, program, error, history } = this.props;
        if (!loading && error && error.length > 0) {
            te(error[0]);
            // history.push(routeCodes.PROGRAMS);
        }
        if (!loading && program && prevProps.program !== program) {
            var prog = (program.program) ? program.program : null;
            var works = (program.workouts) ? program.workouts : [];
            if (prog) {
                this.setState({
                    program: prog,
                    workouts: works,
                });
            } else {
                te('Something went wrong! please try again later.');
                // history.push(routeCodes.PROGRAMS);
            }
        }
    }

}

const mapStateToProps = (state) => {
    const { userPrograms } = state;
    return {
        loading: userPrograms.get('loading'),
        program: userPrograms.get('program'),
        error: userPrograms.get('error'),
    };
}

export default connect(
    mapStateToProps,
)(ProgramSave);