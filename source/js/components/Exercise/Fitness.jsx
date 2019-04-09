import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getUserFitnessTestsRequest,
    userFitnessTestsTextField,
    userFitnessTestsMaxRep,
    userFitnessTestsMultiselect,
    userFitnessTestsAOrB,
    saveUserFitnessTestsRequest,
    setFitnessTestData,
} from '../../actions/userFitnessTests';
import { capitalizeFirstLetter, ts, tw, isOnline, connectIDB } from '../../helpers/funs';
import FitnessItem from './FitnessItem';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import moment from "moment";
import Scrollbars from "react-custom-scrollbars";
import { FITNESS_TEST } from '../../constants/consts';
import { IDB_TBL_FITNESS, IDB_READ_WRITE, IDB_READ } from '../../constants/idb';

class Fitness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fitnessTests: {},
            syncedUserFitnessTests: {},
            selectActionInit: false,
        }
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

    componentDidMount() {
        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });
        if (isOnline()) {
            const { dispatch } = this.props;
            this.setState({ selectActionInit: true });
            var today = moment().startOf('day').utc();
            dispatch(showPageLoader());
            dispatch(getUserFitnessTestsRequest(today));
        } else {
            // get data from db
            this.getDataFromIDB()
        }
    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
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
            this.setDataInIDB();
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

    getDataFromIDB = () => {
        const { dispatch } = this.props;
        const idbTbls = [IDB_TBL_FITNESS];
        try {
            const transaction = this.iDB.transaction(idbTbls, IDB_READ);
            if (transaction) {
                const osProgram = transaction.objectStore(IDB_TBL_FITNESS);
                const iDBGetReq = osProgram.get(FITNESS_TEST);
                iDBGetReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        const resultObj = result.data;
                        const data = { fitnessTests: resultObj.fitnessTests, userFitnessTests: resultObj.userFitnessTests, syncedUserFitnessTests: resultObj.syncedUserFitnessTests }
                        dispatch(setFitnessTestData(data));
                    } else {
                        const data = { fitnessTests: {}, userFitnessTests: [], syncedUserFitnessTests: [] }
                        dispatch(setFitnessTestData(data));
                    }
                }
            }
        } catch (error) {
            const data = { fitnessTests: {}, userFitnessTests: [], syncedUserFitnessTests: []} 
            dispatch(setFitnessTestData(data));
        }
        }

    setDataInIDB = () => {
        const { fitnessTests, userFitnessTests, syncedUserFitnessTests } = this.props;
        try {
            const idbData = { type: FITNESS_TEST, data: { fitnessTests: fitnessTests, userFitnessTests: userFitnessTests, syncedUserFitnessTests: syncedUserFitnessTests } };
            const transaction = this.iDB.transaction([IDB_TBL_FITNESS], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_FITNESS);
            const iDBGetReq = objectStore.get(FITNESS_TEST);
            iDBGetReq.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbData);
                } else {
                    objectStore.add(idbData);
                }
            }
        } catch (error) {
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