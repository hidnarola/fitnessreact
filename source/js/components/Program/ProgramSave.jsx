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
            totalDays: 7,
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
        const { program, totalDays } = this.state;
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>{(program && program.name) ? program.name : ''}</h2>
                            <p>{(program && program.description) ? program.description : ''}</p>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start">
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-body profile-body programs-table-wrapper">
                                    <CustomDaysCalendarView
                                        totalDays={totalDays}
                                    />
                                    <a href="javascript:void(0)" onClick={this.handleAddWeek}>Add Week</a>
                                    {totalDays > 7 &&
                                        <div>
                                            | <a href="javascript:void(0)" onClick={this.handleDeleteWeek}>Delete Week</a>
                                        </div>
                                    }
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
            history.push(routeCodes.PROGRAMS);
        }
        if (!loading && program && prevProps.program !== program) {
            var prog = (program.programDetails) ? program.programDetails : null;
            var works = (program.workouts) ? program.workouts : [];
            if (prog) {
                this.setState({
                    program: prog,
                    workouts: works,
                });
            } else {
                te('Something went wrong! please try again later.');
                history.push(routeCodes.PROGRAMS);
            }
        }
    }

    handleAddWeek = () => {
        this.setState({
            totalDays: (this.state.totalDays + 7)
        });
    }

    handleDeleteWeek = () => {
        this.setState({
            totalDays: (this.state.totalDays - 7)
        });
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

class CustomDaysCalendarView extends Component {
    render() {
        const { totalDays } = this.props;
        var rows = (totalDays / 7);
        var rowsObj = [];
        for (let index = 1; index <= rows; index++) {
            rowsObj.push(<CustomDaysCalendarRow rowNumber={index} key={index} />)
        }
        return (
            <div className="program-save-custom-days-wrapper">
                {rowsObj}
            </div>
        );
    }
}

class CustomDaysCalendarRow extends Component {
    render() {
        const { rowNumber } = this.props;
        var end = rowNumber * 7;
        var start = end - (7 - 1);
        var blockObj = [];
        for (let index = start; index <= end; index++) {
            blockObj.push(<CustomDaysCalendarBlock blockNumber={index} key={index} />)
        }
        return (
            <div className="program-save-custom-days-row">
                {blockObj}
            </div>
        );
    }
}

class CustomDaysCalendarBlock extends Component {
    render() {
        const { blockNumber } = this.props;
        return (
            <div className="program-save-custom-days-block" onClick={() => console.log('blockNumber => ', blockNumber)}>
                <div className="program-save-custom-days-block-title">
                    Day {blockNumber}
                </div>
                <div className="program-save-custom-days-block-content">
                    Content {blockNumber}
                </div>
            </div>
        );
    }
}