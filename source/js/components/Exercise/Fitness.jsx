import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getUserFitnessTestsRequest,
    userFitnessTestsTextField,
    userFitnessTestsMaxRep,
    userFitnessTestsMultiselect,
    userFitnessTestsAOrB,
    saveUserFitnessTestsRequest
} from '../../actions/userFitnessTests';
import { capitalizeFirstLetter, ts } from '../../helpers/funs';
import FitnessItem from './FitnessItem';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import moment from "moment";
import Scrollbars from "react-custom-scrollbars";

class Fitness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fitnessTests: {},
            syncedUserFitnessTests: {},
            selectActionInit: false,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.setState({ selectActionInit: true });
        var today = moment().startOf('day').utc();
        dispatch(showPageLoader());
        dispatch(getUserFitnessTestsRequest(today));
    }

    render() {
        const {
            fitnessTests,
            syncedUserFitnessTests,
        } = this.state;
        const { loading } = this.props;
        var fitnessTestsKeys = Object.keys(fitnessTests);
        return (
            <div className="body-content d-flex row justify-content-start profilephoto-content fitness-tests-wrapper">
                {fitnessTests && fitnessTestsKeys.length > 0 &&
                    fitnessTestsKeys.map((category, catIndex) => {
                        var fitnessTestSubKeys = Object.keys(fitnessTests[category]);
                        return (
                            <div className="col-md-6" key={catIndex}>
                                <div className="white-box space-btm-20">
                                    <div className="whitebox-head">
                                        <h3 className="title-h3">{category}</h3>
                                    </div>
                                    <div className="whitebox-body fitness-test-sub-category-block">
                                        <Scrollbars autoHide>
                                            {fitnessTestSubKeys.length > 0 &&
                                                fitnessTestSubKeys.map((subCategory, subCatIndex) => {
                                                    return (

                                                        <div className="fitness-wrap" key={subCatIndex}>
                                                            <h4>{capitalizeFirstLetter(subCategory).replace('_', ' ')}</h4>
                                                            {
                                                                fitnessTests[category][subCategory].map((item, index) => {
                                                                    var userValue = syncedUserFitnessTests[item._id];
                                                                    return (
                                                                        <FitnessItem
                                                                            item={item}
                                                                            key={index}
                                                                            userValue={userValue}
                                                                            handleTextFieldChange={this.handleTextFieldChange}
                                                                            handleMaxRepChange={this.handleMaxRepChange}
                                                                            handleMultiselectChange={this.handleMultiselectChange}
                                                                            handleAOrBChange={this.handleAOrBChange}
                                                                        />
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Scrollbars>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {fitnessTests && fitnessTests.length <= 0 && !loading &&
                    <div className="col-md-12">
                        <div className="white-box space-btm-20">
                            <div className="whitebox-body">
                                No records found...
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }

    componentDidUpdate() {
        const {
            selectActionInit,
        } = this.state;
        const {
            loading,
            fitnessTests,
            syncedUserFitnessTests,
            saveActionInit,
            setSaveAction,
            dispatch,
            resetActionInit,
            setResetAction,
            date,
        } = this.props;
        if (selectActionInit && !loading) {
            this.setState({
                selectActionInit: false,
                fitnessTests,
                syncedUserFitnessTests,
            });
            dispatch(hidePageLoader());
        } else if (saveActionInit && !loading) {
            var _date = date;
            if (!_date) {
                _date = moment().startOf('day').utc();
            }
            dispatch(getUserFitnessTestsRequest(_date));
            ts('Fitness test updated successfully!');
            this.setState({ selectActionInit: true });
            setSaveAction(false);
        } else if (resetActionInit && !loading) {
            var _date = date;
            if (!_date) {
                _date = moment().startOf('day').utc();
            }
            dispatch(getUserFitnessTestsRequest(_date));
            ts('Fitness test reset successfully!');
            this.setState({ selectActionInit: true });
            setResetAction(false);
        }
    }

    handleSave = () => {
        const {
            dispatch,
            syncedUserFitnessTests,
            setSaveAction,
            date,
        } = this.props;
        var requestObj = {
            date: date,
            user_test_exercises: syncedUserFitnessTests
        }
        dispatch(saveUserFitnessTestsRequest(requestObj));
        setSaveAction(true);
    }

    handleTextFieldChange = (_id, e) => {
        const { dispatch } = this.props;
        var val = e.target.value;
        if (val > 9999) {
            val = 9999;
        }
        dispatch(userFitnessTestsTextField(_id, val));
    }

    handleMaxRepChange = (_id, e, rep) => {
        const { dispatch } = this.props;
        var val = e.target.value;
        if (val > 9999) {
            val = 9999;
        }
        dispatch(userFitnessTestsMaxRep(_id, val, rep));
    }

    handleMultiselectChange = (_id, e) => {
        const { dispatch } = this.props;
        var val = e.target.value;
        dispatch(userFitnessTestsMultiselect(_id, val));
    }

    handleAOrBChange = (_id, e) => {
        const { dispatch } = this.props;
        var val = e.target.value;
        dispatch(userFitnessTestsAOrB(_id, val));
    }

}

const mapStateToProps = (state) => {
    const { userFitnessTests } = state;
    return {
        loading: userFitnessTests.get('loading'),
        date: userFitnessTests.get('date'),
        fitnessTests: userFitnessTests.get('fitnessTests'),
        userFitnessTests: userFitnessTests.get('userFitnessTests'),
        syncedUserFitnessTests: userFitnessTests.get('syncedUserFitnessTests'),
        error: userFitnessTests.get('error'),
    }
}

export default connect(mapStateToProps, null, null, { withRef: true })(Fitness);