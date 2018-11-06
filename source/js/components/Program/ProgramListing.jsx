import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { routeCodes } from "../../constants/routes";
import { DropdownButton, ButtonToolbar, MenuItem } from "react-bootstrap";
import { FaPencil, FaTrash, FaSearch, FaCircleONotch } from 'react-icons/lib/fa';
import { getUserProgramsRequest, deleteUserProgramRequest } from "../../actions/userPrograms";
import { SECONDARY_GOALS, PROGRAM_DIFFICULTY_LEVEL_OBJ } from "../../constants/consts";
import { Pager } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { ts, te } from "../../helpers/funs";
import { hidePageLoader, showPageLoader } from "../../actions/pageLoader";
import RatingStarsDisplay from '../Common/RatingStarsDisplay';
import _ from "lodash";
import ProgramRatingModal from './ProgramRatingModal';
import { initialize, reset } from "redux-form";
import { saveUserProgramsRatingRequest } from '../../actions/userProgramsRating';
import unitize from "unitize";

class ProgramListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteProgramAlert: false,
            deleteActionInit: false,
            selectedProgramId: null,
            showRating: false,
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
    }

    componentWillMount() {
        this.getFilterPrograms();
    }

    render() {
        const { loggedUserData, programs, totalRecords, loading, showRatingInList } = this.props;
        const { filterData, showDeleteProgramAlert, showRating } = this.state;
        return (
            <div className="body-content d-flex row justify-content-start profilephoto-content">
                <div className="col-md-12">
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
                                                                <a href="javascript:void(0)" onClick={() => this.showRatingForm(program._id)}>
                                                                    <RatingStarsDisplay rating={program.rating} name={program._id} />
                                                                </a>
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
                                                            }
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {!loading && !(programs && programs.length > 0) &&
                                        <tr>
                                            <td colSpan="7"><span>No records found.</span></td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
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
                <ProgramRatingModal
                    show={showRating}
                    onSubmit={this.handleSaveRating}
                    handleClose={this.hideRatingForm}
                />
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, error, dispatch, saveRatingLoading, saveRatingError } = this.props;
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
        if (!saveRatingLoading && prevProps.saveRatingLoading !== saveRatingLoading) {
            if (saveRatingError && saveRatingError.length > 0) {
                te('Something went wrong! Please try again later.');
            } else {
                ts('Thank you for your feedback');
            }
            dispatch(hidePageLoader());
            this.getFilterPrograms();
        }
    }

    handleSearch = (e) => {
        const { value } = e.target;
        const { filterData } = this.state;
        let _filterData = Object.assign({}, filterData);
        _filterData.search = value;
        this.setState({ filterData: _filterData });
        this.getFilterPrograms(_filterData);
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
        this.changePage('next');
    }

    handleTurnPrevPage = () => {
        this.changePage('prev');
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
        dispatch(getUserProgramsRequest(filterData));
    }

    handleEditNavigation = (e, href) => {
        const { history } = this.props;
        e.preventDefault();
        history.push(href);
    }

    handleShowDeleteAlert = (_id) => {
        this.setState({ showDeleteProgramAlert: true, selectedProgramId: _id, });
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

    showRatingForm = (programId) => {
        const { programs, dispatch, loggedUserData } = this.props;
        if (programId) {
            let selectedProgram = _.find(programs, ['_id', programId]);
            if (selectedProgram) {
                let ratingArr = selectedProgram['programsRating'];
                let loggedUserRating = { userId: loggedUserData.authId, programId: programId };
                if (ratingArr && ratingArr.length > 0) {
                    loggedUserRating.userId = ratingArr[0].userId ? ratingArr[0].userId : "";
                    loggedUserRating.programId = ratingArr[0].programId ? ratingArr[0].programId : "";
                    loggedUserRating.rating = ratingArr[0].rating ? ratingArr[0].rating : 0;
                    loggedUserRating.comment = ratingArr[0].comment ? ratingArr[0].comment : "";
                }
                dispatch(initialize('program_rating_form', loggedUserRating));
                this.setState({ showRating: true });
            } else {
                te('Something went wrong! Please try again later.');
            }
        }
    }

    hideRatingForm = () => {
        const { dispatch } = this.props;
        dispatch(reset('program_rating_form'));
        this.setState({ showRating: false });
    }

    handleSaveRating = (data) => {
        const { dispatch } = this.props;
        if (data && data.userId && data.programId) {
            dispatch(showPageLoader());
            dispatch(saveUserProgramsRatingRequest(data));
        } else {
            te("Something went wrong! Please try again later.");
        }
        this.hideRatingForm();
    }
}

const mapStateToProps = (state) => {
    const { userPrograms, userProgramsRating, user } = state;
    return {
        loading: userPrograms.get('loading'),
        programs: userPrograms.get('programs'),
        totalRecords: userPrograms.get('totalRecords'),
        error: userPrograms.get('error'),
        loggedUserData: user.get('loggedUserData'),
        saveRatingLoading: userProgramsRating.get('saveLoading'),
        saveRatingError: userProgramsRating.get('saveError'),
    };
}

ProgramListing = withRouter(ProgramListing);

export default connect(
    mapStateToProps,
)(ProgramListing);