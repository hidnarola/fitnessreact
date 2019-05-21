import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { routeCodes } from "../../constants/routes";
import { DropdownButton, ButtonToolbar, MenuItem } from "react-bootstrap";
import { FaPencil, FaTrash, FaSearch, FaCircleONotch, FaEye } from 'react-icons/lib/fa';
import { getUserProgramsRequest, deleteUserProgramRequest, setUserProgramState } from "../../actions/userPrograms";
import { SECONDARY_GOALS, PROGRAM_DIFFICULTY_LEVEL_OBJ, MY_PROGRAMS } from "../../constants/consts";
import { Pager } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { ts, te, tw, isOnline, connectIDB } from "../../helpers/funs";
import { hidePageLoader, showPageLoader } from "../../actions/pageLoader";
import RatingStarsDisplay from '../Common/RatingStarsDisplay';
import _ from "lodash";
import unitize from "unitize";
import { IDB_TBL_USER_PROGRAM, IDB_READ_WRITE, IDB_READ } from '../../constants/idb';

class ProgramListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteProgramAlert: false,
            deleteActionInit: false,
            selectedProgramId: null,
            filterData: {
                search: "",
                searchColumns: [
                    'name'
                ],
                sort: {},
                noOfRecords: 10,
                startFrom: 0,
                condition: props.condition
            }
        };
        this.iDB;
    }

    render() {
        const { loggedUserData, programs, totalRecords, loading, showRatingInList } = this.props;
        const { filterData, showDeleteProgramAlert } = this.state;
        return (
            <div className="body-content d-flex justify-content-start profilephoto-content">
                <div className="custome-table">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="white-box space-btm-20">
                            <div className="program-search">
                                <div className="div_search_program">
                                    <span className="search-icon">
                                        <FaSearch size={22} />
                                    </span>
                                    <input type="text" id="search" name="search" value={filterData.search} onChange={this.handleSearch} />
                                </div>
                            </div>
                            <div className="whitebox-body profile-body programs-table-wrapper">
                                {loading &&
                                    <div className="program-tbl-loader">
                                        <span>
                                            <FaCircleONotch className="loader-spinner fs-25" />
                                        </span>
                                    </div>
                                }
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="cursor-pointer" onClick={() => this.handleSort('name')}>
                                                    <span><p>Name</p></span>
                                                    {filterData && filterData.sort && typeof filterData.sort.name !== 'undefined' && filterData.sort.name === 1 &&
                                                        <i className="icon-arrow_upward"></i>
                                                    }
                                                    {filterData && filterData.sort && typeof filterData.sort.name !== 'undefined' && filterData.sort.name === -1 &&
                                                        <i className="icon-arrow_downward"></i>
                                                    }
                                                </th>
                                                <th className="cursor-pointer" onClick={() => this.handleSort('totalWorkouts')}>
                                                    <span>Workouts</span>
                                                    {filterData && filterData.sort && typeof filterData.sort.totalWorkouts !== 'undefined' && filterData.sort.totalWorkouts === 1 &&
                                                        <i className="icon-arrow_upward"></i>
                                                    }
                                                    {filterData && filterData.sort && typeof filterData.sort.totalWorkouts !== 'undefined' && filterData.sort.totalWorkouts === -1 &&
                                                        <i className="icon-arrow_downward"></i>
                                                    }
                                                </th>
                                                <th>
                                                    <span>Frequency</span>
                                                </th>
                                                <th className="cursor-pointer" onClick={() => this.handleSort('type')}>
                                                    <span>Type</span>
                                                    {filterData && filterData.sort && typeof filterData.sort.type !== 'undefined' && filterData.sort.type === 1 &&
                                                        <i className="icon-arrow_upward"></i>
                                                    }
                                                    {filterData && filterData.sort && typeof filterData.sort.type !== 'undefined' && filterData.sort.type === -1 &&
                                                        <i className="icon-arrow_downward"></i>
                                                    }
                                                </th>
                                                <th className="cursor-pointer" onClick={() => this.handleSort('difficulty')}>
                                                    <span>Difficulty</span>
                                                    {filterData && filterData.sort && typeof filterData.sort.difficulty !== 'undefined' && filterData.sort.difficulty === 1 &&
                                                        <i className="icon-arrow_upward"></i>
                                                    }
                                                    {filterData && filterData.sort && typeof filterData.sort.difficulty !== 'undefined' && filterData.sort.difficulty === -1 &&
                                                        <i className="icon-arrow_downward"></i>
                                                    }
                                                </th>
                                                {showRatingInList &&
                                                    <th className="cursor-pointer" onClick={() => this.handleSort('rating')}>
                                                        <span>Rating</span>
                                                        {filterData && filterData.sort && typeof filterData.sort.rating !== 'undefined' && filterData.sort.rating === 1 &&
                                                            <i className="icon-arrow_upward"></i>
                                                        }
                                                        {filterData && filterData.sort && typeof filterData.sort.rating !== 'undefined' && filterData.sort.rating === -1 &&
                                                            <i className="icon-arrow_downward"></i>
                                                        }
                                                    </th>
                                                }
                                                <th><span>Actions</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!loading && programs && programs.length > 0 &&
                                                programs.map((program, index) => {
                                                    let selectedGoalOption = _.find(SECONDARY_GOALS, ['value', program.goal]);
                                                    let selectedLevelOption = _.find(PROGRAM_DIFFICULTY_LEVEL_OBJ, ['value', program.level]);
                                                    let goalLabel = (selectedGoalOption) ? selectedGoalOption.label : '-----';
                                                    let levelLabel = (selectedLevelOption) ? selectedLevelOption.label : '-----';
                                                    let frequencyLabel = '';
                                                    frequencyLabel += (program.minWorkoutsCount) ? program.minWorkoutsCount : 0;
                                                    if (program.maxWorkoutsCount && program.maxWorkoutsCount > program.minWorkoutsCount) {
                                                        frequencyLabel += ' - ' + program.maxWorkoutsCount;
                                                    }
                                                    return (
                                                        <tr key={index}>
                                                            <td><span><p>{program.name}</p></span></td>
                                                            <td><span>{program.totalWorkouts}</span></td>
                                                            <td><span>{frequencyLabel}</span></td>
                                                            <td><span>{goalLabel}</span></td>
                                                            <td><span>{levelLabel}</span></td>
                                                            {showRatingInList &&
                                                                <td>
                                                                    <span className="prog-rating-span-warp">
                                                                        <Link to={`${routeCodes.PROGRAMS_RATING_VIEW}/${program._id}`}>
                                                                            <RatingStarsDisplay rating={program.rating} name={program._id} />
                                                                        </Link>
                                                                        <span>{program.programsRatingCount ? `${unitize(program.programsRatingCount).capitalize().precision(0).toString(false)} reviews` : ''}</span>
                                                                    </span>
                                                                </td>
                                                            }
                                                            <td>
                                                                <span>
                                                                    {program.userId && program.userId === loggedUserData.authId &&
                                                                        <ButtonToolbar>
                                                                            <DropdownButton title="Actions" pullRight id="dropdown-size-medium">
                                                                                <MenuItem
                                                                                    href={`${routeCodes.PROGRAM_SAVE}/${program._id}`}
                                                                                    eventKey="1"
                                                                                    onClick={(e) => this.handleNavigation(e, `${routeCodes.PROGRAM_SAVE}/${program._id}`)}
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
                                                                    }
                                                                    {program.userId && program.userId !== loggedUserData.authId &&
                                                                        <ButtonToolbar>
                                                                            <DropdownButton title="Actions" pullRight id="public-program-actions">
                                                                                <MenuItem
                                                                                    href={`${routeCodes.PROGRAM_VIEW}/${program._id}`}
                                                                                    eventKey="1"
                                                                                    onClick={(e) => this.handleNavigation(e, `${routeCodes.PROGRAM_VIEW}/${program._id}`)}
                                                                                >
                                                                                    <FaEye className="v-align-sub" /> View
                                                                        </MenuItem>
                                                                            </DropdownButton>
                                                                        </ButtonToolbar>
                                                                    }
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {!loading && !(programs && programs.length > 0) &&
                                                <tr>
                                                    <td colSpan={(showRatingInList) ? '7' : '6'}><span>No records found.</span></td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Pager className="program-pager-wrap">
                                <Pager.Item
                                    previous
                                    href="javascript:void(0)"
                                    onClick={this.handleTurnPrevPage}
                                    disabled={(filterData.startFrom <= 0)}
                                >Prev.</Pager.Item>
                                <Pager.Item
                                    next
                                    href="javascript:void(0)"
                                    onClick={this.handleTurnNextPage}
                                    disabled={((filterData.startFrom + (filterData.noOfRecords - 1)) >= totalRecords)}
                                >Next</Pager.Item>
                            </Pager>
                        </div>
                    </div>
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
            </div>
        )
    }

    componentDidMount() {
        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });
    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        console.log('this.iDB in codm => ', this.iDB);
        this.getFilterPrograms();
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, error, dispatch } = this.props;
        const { deleteActionInit } = this.state;

        if (!loading && deleteActionInit) {
            this.setState({ deleteActionInit: false });
            this.handleCancelDelete();
            if (error && error.length <= 0) {
                ts('Program deleted successfully!');
                this.getFilterPrograms();
            } else {
                te(error[0]);
            }
            dispatch(hidePageLoader());
        }
        if (!loading && prevProps.loading !== loading) {
            // alert("new data here set in db")
            this.storeProgramInIDB()
        }
    }

    storeProgramInIDB = () => {
        const { programs, totalRecords } = this.props;
        try {
            const idbData = { type: MY_PROGRAMS, data: { programs: programs, totalRecords: totalRecords } };
            const transaction = this.iDB.transaction([IDB_TBL_USER_PROGRAM], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_USER_PROGRAM);
            const iDBGetReq = objectStore.get(MY_PROGRAMS);
            iDBGetReq.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbData);
                } else {
                    objectStore.add(idbData);
                }
            }
        } catch (error) { }
    }

    handleSearch = (e) => {
        e.preventDefault();
        if (isOnline()) {
            const { value } = e.target;
            const { filterData } = this.state;
            let _filterData = Object.assign({}, filterData);
            _filterData.search = value;
            this.setState({ filterData: _filterData });
            this.getFilterPrograms(_filterData);
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleSort = (column) => {
        const { filterData } = this.state;
        let _filterData = Object.assign({}, filterData);
        let prevSort = _filterData.sort;
        if (prevSort.hasOwnProperty(column)) {
            if (prevSort[column] === 1) {
                prevSort[column] = -1;
            } else if (prevSort[column] === -1) {
                delete prevSort[column];
            } else {
                prevSort[column] = 1;
            }
        } else {
            prevSort[column] = 1;
        }
        this.setState({ filterData: _filterData });
        this.getFilterPrograms(_filterData);
    }

    handleTurnNextPage = () => {
        if (isOnline()) {
            this.changePage('next');
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleTurnPrevPage = () => {
        if (isOnline()) {
            this.changePage('prev');
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    changePage = (direction) => {
        const { filterData } = this.state;
        let _filterData = Object.assign({}, filterData);
        if (direction === 'next') {
            _filterData.startFrom = (_filterData.startFrom + _filterData.noOfRecords);
        } else {
            _filterData.startFrom = (_filterData.startFrom - _filterData.noOfRecords);
        }
        this.setState({ filterData: _filterData });
        this.getFilterPrograms(_filterData);
    }

    getFilterPrograms = (_filterData = null) => {
        const { dispatch } = this.props;
        let filterData = this.state.filterData;
        if (_filterData) {
            filterData = _filterData;
        }
        if (isOnline()) {
            dispatch(getUserProgramsRequest(filterData));
        } else {
            // set props data from iDB
            console.log("get data from Idb");
            this.getDataFromIDB()
        }
    }

    getDataFromIDB = () => {
        const { dispatch } = this.props;
        const idbTbls = [IDB_TBL_USER_PROGRAM];
        console.log('this.iDB => ', this.iDB);
        try {
            const transaction = this.iDB.transaction(idbTbls, IDB_READ);
            console.log('transaction => ', transaction);
            if (transaction) {
                const osProgram = transaction.objectStore(IDB_TBL_USER_PROGRAM);
                const iDBGetReq = osProgram.get(MY_PROGRAMS);
                iDBGetReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        const resultObj = result.data;
                        const data = { programs: resultObj.programs, totalRecords: resultObj.totalRecords }
                        dispatch(setUserProgramState(data));
                    } else {
                        const data = { programs: [], totalRecords: 0 }
                        dispatch(setUserProgramState(data));
                    }
                }
            }
        } catch (error) {
            console.log("error =>", error);
            const data = { programs: [], totalRecords: 0 }
            dispatch(setUserProgramState(data));
        }
    }

    handleNavigation = (e, href) => {
        console.log("in handleNavigation")
        e.preventDefault();
        if (isOnline()) {
            console.log("here")
            const { history } = this.props;
            history.push(href);
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleShowDeleteAlert = (_id) => {
        if (isOnline()) {
            this.setState({ showDeleteProgramAlert: true, selectedProgramId: _id, });
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleCancelDelete = () => {
        this.setState({ showDeleteProgramAlert: false, selectedProgramId: null, });
    }

    handleDeleteProgram = () => {
        const { dispatch } = this.props;
        const { selectedProgramId } = this.state;
        dispatch(showPageLoader());
        dispatch(deleteUserProgramRequest(selectedProgramId));
        this.setState({ deleteActionInit: true });
    }

    componentWillUnmount() {
        try {
            this.iDB.close();
        } catch (error) { }
    }

}

const mapStateToProps = (state) => {
    const { userPrograms, user } = state;
    return {
        loading: userPrograms.get('loading'),
        programs: userPrograms.get('programs'),
        totalRecords: userPrograms.get('totalRecords'),
        error: userPrograms.get('error'),
        loggedUserData: user.get('loggedUserData'),
    };
}

ProgramListing = withRouter(ProgramListing);

export default connect(
    mapStateToProps,
)(ProgramListing);