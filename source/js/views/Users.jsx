import React, { Component } from 'react';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import noProfileImg from 'img/common/no-profile-img.png'
import { connect } from "react-redux";
import { handleChangeUserSearchFor, getUsersPageSearchRequest } from '../actions/userSearch';
import InfiniteScroll from 'react-infinite-scroller';
import { FaCircleONotch } from "react-icons/lib/fa";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { routeCodes } from '../constants/routes';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectActionInit: false,
            allUsers: [],
            hasMoreData: false,
            start: 0,
            offset: 20,
        };
    }

    componentWillMount() {
        const {
            searchValue,
            dispatch,
        } = this.props;
        const {
            start,
            offset,
        } = this.state;
        if (searchValue !== '') {
            var requestData = {
                name: searchValue,
                start,
                offset,
            };
            this.setState({ selectActionInit: true });
            dispatch(handleChangeUserSearchFor('allUsersSearchValue', searchValue));
            dispatch(getUsersPageSearchRequest(requestData));
        }
    }

    render() {
        const {
            allUsersSearchValue,
        } = this.props;
        const {
            allUsers,
            hasMoreData,
        } = this.state;
        return (
            <div className="users-list-wrapper">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Users</h2>
                            <p>Each fitness test feeds directly into our algorithm - every test is used to identify the most efficient and effective structure of your training plan. Each test is designed to identify imbalances and weaknesses that may lead to increased risk of injury or decreased performance - now and in the future. This may also allow us to identify opportunities for rapid improvement.</p>
                        </div>
                        <div className="body-head-r">
                            <a href="javascript:void(0)" className="pink-btn">Search  <i className="icon-search"></i></a>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-head d-flex">
                                    <form onSubmit={this.handleSubmit}>
                                        <input
                                            type="text"
                                            id="users_search_user"
                                            name="users_search_user"
                                            value={allUsersSearchValue}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                        <button type="submit">Search</button>
                                    </form>
                                </div>
                                <div className="whitebox-body profile-body">
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
                                                            <div className="friend-box vertical-middle-r">
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
                                                                    <h5 className="vertical-middle-c ml-20">
                                                                        {u.firstName}
                                                                        {u.friendsCount > 0 &&
                                                                            <small>{u.friendsCount} Friends</small>
                                                                        }
                                                                    </h5>
                                                                </div>
                                                                <div className="friend-box-status"><h6 className="vertical-middle-c">Actions</h6></div>
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

    componentDidUpdate() {
        const {
            selectActionInit,
            start,
            offset,
            noOfRecs,
        } = this.state;
        const {
            allUsersLoading,
            allUsers,
        } = this.props;
        if (selectActionInit && !allUsersLoading) {
            var hasMoreData = (allUsers && allUsers.length > 0);
            this.setState({
                selectActionInit: false,
                allUsers: _.concat(this.state.allUsers, allUsers),
                start: (start + offset),
                hasMoreData,
            });
        }
    }

    handleChange = (e) => {
        const { dispatch } = this.props;
        var value = e.target.value;
        dispatch(handleChangeUserSearchFor('allUsersSearchValue', value));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {
            allUsersSearchValue,
            dispatch,
        } = this.props;
        const {
            offset,
        } = this.state;
        this.setState({
            start: 0,
            selectActionInit: true,
            allUsers: [],
        });
        var requestData = {
            name: allUsersSearchValue,
            start: 0,
            offset: offset,
        };
        dispatch(getUsersPageSearchRequest(requestData));
    }

    loadMore = () => {
        const {
            dispatch,
            allUsersSearchValue,
        } = this.props;
        const {
            start,
            offset,
            selectActionInit,
        } = this.state;
        if (!selectActionInit) {
            var requestData = {
                name: allUsersSearchValue,
                start,
                offset,
            };
            dispatch(getUsersPageSearchRequest(requestData));
            this.setState({ selectActionInit: true });
        }
    }
}

const mapStateToProps = (state) => {
    const { userSearch } = state;
    return {
        searchValue: userSearch.get('searchValue'),
        allUsersSearchValue: userSearch.get('allUsersSearchValue'),
        allUsersLoading: userSearch.get('allUsersLoading'),
        allUsers: userSearch.get('allUsers'),
    }
}

export default connect(mapStateToProps)(Users);