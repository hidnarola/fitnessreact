import React, { Component } from 'react';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import noProfileImg from 'img/common/no-profile-img.png'
import { connect } from "react-redux";
import { handleChangeUserSearchFor, getUsersPageSearchRequest, setUserSearchState } from '../actions/userSearch';
import InfiniteScroll from 'react-infinite-scroller';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { routeCodes } from '../constants/routes';
import NoRecordFound from '../components/Common/NoRecordFound';
import { ts, connectIDB, isOnline, tw } from '../helpers/funs';
import { IDB_TBL_SEARCH_USER, IDB_READ_WRITE, IDB_READ } from '../constants/idb';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectActionInit: false,
            allUsers: [],
            hasMoreData: false,
            start: 0,
            offset: 20,
            isFirstReq: false,
        };
        this.iDB;
    }

    render() {
        const { allUsersSearchValue, allUsersError } = this.props;
        const { allUsers, hasMoreData, isFirstReq } = this.state;
        return (
            <div className="users-list-wrapper">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start front-white-header">
                        <div className="body-head-l">
                            <h2>Users</h2>
                            <p>Each fitness test feeds directly into our algorithm - every test is used to identify the most efficient and effective structure of your training plan. Each test is designed to identify imbalances and weaknesses that may lead to increased risk of injury or decreased performance - now and in the future. This may also allow us to identify opportunities for rapid improvement.</p>
                        </div>
                        <div className="body-head-r">
                            <form className="form_search" onSubmit={this.handleSubmit}>
                                <input className="" type="text" id="users_search_user" name="users_search_user" onChange={this.handleChange} value={allUsersSearchValue} placeholder="Search Users" autoComplete="off" />
                                <button type="submit"><i className="icon-search"></i></button>
                            </form>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-body profile-body">
                                    {isFirstReq &&
                                        <div className="text-c">
                                            <FaCircleONotch className="loader-spinner fs-50" />
                                        </div>
                                    }

                                    {!isFirstReq && (!allUsers || allUsers.length <= 0) && allUsersError && allUsersError.length <= 0 &&
                                        <NoRecordFound />
                                    }

                                    {!isFirstReq && (!allUsers || allUsers.length <= 0) && allUsersError && allUsersError.length > 0 &&
                                        <div className="server-error-wrapper">
                                            <ErrorCloud />
                                            <h4>Something went wrong! please try again.</h4>
                                        </div>
                                    }

                                    <InfiniteScroll
                                        pageStart={0}
                                        loadMore={this.loadMore}
                                        hasMore={hasMoreData}
                                        className="margin-top-30"
                                        loader={
                                            <div className="loader" key={0}>
                                                <FaCircleONotch className="loader-spinner loader-spinner-icon" /> Loading ...
                                            </div>
                                        }
                                    >
                                        <div className="row d-flex">
                                            {allUsers && allUsers.length > 0 &&
                                                allUsers.map((u, i) => {
                                                    return (
                                                        <div className="col-md-4" key={i}>
                                                            <div className="friend-box vertical-middle-r frd_fithub">
                                                                <div className="friend-box-img">
                                                                    <NavLink to={`${routeCodes.PROFILE}/${u.username}`}>
                                                                        <img
                                                                            src={u.avatar}
                                                                            alt="Avatar"
                                                                            onError={(e) => {
                                                                                e.target.src = noProfileImg
                                                                            }}
                                                                        />
                                                                    </NavLink>
                                                                </div>
                                                                <div className="friend-box-info">
                                                                    <NavLink to={`${routeCodes.PROFILE}/${u.username}`}>
                                                                        <h5 className="vertical-middle-c ml-20">
                                                                            {u.firstName} {(u.lastName) ? u.lastName : ''}
                                                                            {u.friendsCount > 0 &&
                                                                                <small>{u.friendsCount} Friends</small>
                                                                            }
                                                                        </h5>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </InfiniteScroll>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }


    componentDidMount() {

        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });
        this.setState({ selectActionInit: true })
        if (isOnline()) {
            const {
                searchValue,
                dispatch,
            } = this.props;
            const {
                start,
                offset,
            } = this.state;
            if (searchValue !== '') {
                var requestData = { name: searchValue, start, offset };
                this.setState({ isFirstReq: true });
                dispatch(handleChangeUserSearchFor('allUsersSearchValue', searchValue));
                dispatch(getUsersPageSearchRequest(requestData));
            } else {
                this.setState({ start: 0, allUsers: [], isFirstReq: true });
                var requestData = { name: '', start: 0, offset: offset };
                dispatch(getUsersPageSearchRequest(requestData));
            }
        }

    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        if (!isOnline()) {
            this.getDataFromIDB();
        }
    }

    getDataFromIDB = () => {
        const { dispatch } = this.props;
        const idbTbls = [IDB_TBL_SEARCH_USER];

        try {
            const transaction = this.iDB.transaction(idbTbls, IDB_READ);
            if (transaction) {
                const osSettings = transaction.objectStore(IDB_TBL_SEARCH_USER);
                const iDBGetReq = osSettings.get('settings');
                iDBGetReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        const resultObj = JSON.parse(result.data);
                        const data = { allUsers: resultObj };
                        this.setState({ hasMoreData: false });
                        dispatch(setUserSearchState(data));
                    } else {
                        const data = { allUsers: [] };
                        this.setState({ hasMoreData: false });
                        dispatch(setUserSearchState(data));
                    }
                }
            }
        } catch (error) {
            const data = { allUsers: [] };
            this.setState({ hasMoreData: false });
            dispatch(setUserSearchState(data));
        }

    }

    setDataInDb = (data) => {
        const { allUsers } = this.state;
        try {
            const idbData = { type: 'users', data: JSON.stringify(data) };
            const transaction = this.iDB.transaction([IDB_TBL_SEARCH_USER], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_SEARCH_USER);
            const iDBGetReq = objectStore.get('users');
            iDBGetReq.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbData);
                } else {
                    objectStore.add(idbData);
                }
            }
        } catch (error) {
            console.log("error => ", error);
        }
    }

    componentDidUpdate() {
        const { selectActionInit, start, offset } = this.state;
        const { allUsersLoading, allUsers } = this.props;
        if (selectActionInit && !allUsersLoading) {
            var hasMoreData = (allUsers && allUsers.length > 0);
            this.setState({
                selectActionInit: false,
                allUsers: _.concat(this.state.allUsers, allUsers),
                start: (start + offset),
                hasMoreData,
                isFirstReq: false,
            });
            // set data in DB
            this.setDataInDb(_.concat(this.state.allUsers, allUsers));
        }
    }

    handleChange = (e) => {
        const { dispatch } = this.props;
        var value = e.target.value;
        dispatch(handleChangeUserSearchFor('allUsersSearchValue', value));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { allUsersSearchValue, dispatch } = this.props;
        const { offset } = this.state;
        this.setState({ start: 0, selectActionInit: true, allUsers: [], isFirstReq: true });
        let searchTerm = allUsersSearchValue ? allUsersSearchValue.trim() : '';
        var requestData = {
            name: searchTerm,
            start: 0,
            offset: offset,
        };
        dispatch(getUsersPageSearchRequest(requestData));
    }

    loadMore = () => {
        const { dispatch, allUsersSearchValue } = this.props;
        const { start, offset, selectActionInit } = this.state;
        if (!selectActionInit) {
            var requestData = { name: allUsersSearchValue, start, offset };
            dispatch(getUsersPageSearchRequest(requestData));
            this.setState({ selectActionInit: true });
        }
    }

    componentWillUnmount() {
        try {
            const idbs = [IDB_TBL_SEARCH_USER];
            if (isOnline()) {
                const transaction = this.iDB.transaction(idbs, IDB_READ_WRITE);
                if (transaction) {
                    const osUsers = transaction.objectStore(IDB_TBL_SEARCH_USER);
                    osUsers.clear();
                }
            }
            this.iDB.close();
        } catch (error) { }
    }
}

const mapStateToProps = (state) => {
    const { userSearch } = state;
    return {
        searchValue: userSearch.get('searchValue'),
        allUsersSearchValue: userSearch.get('allUsersSearchValue'),
        allUsersLoading: userSearch.get('allUsersLoading'),
        allUsers: userSearch.get('allUsers'),
        allUsersError: userSearch.get('allUsersError'),
    }
}

export default connect(mapStateToProps)(Users);