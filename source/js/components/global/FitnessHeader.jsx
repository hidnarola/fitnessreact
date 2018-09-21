import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import FaSearch from 'react-icons/lib/fa/search';
import FaNoti from 'react-icons/lib/md/notifications-none';
import FaMenu from 'react-icons/lib/md/menu';
import FaMail from 'react-icons/lib/md/markunread';
import FaFrnd from 'react-icons/lib/fa/user-plus';
import { withRouter } from 'react-router-dom';
import Auth from '../../auth/Auth';
import { setLoggedUserFromLocalStorage } from '../../actions/user';
import noProfileImg from 'img/common/no-profile-img.png';
import Autosuggest from "react-autosuggest";
import _ from "lodash";
import { getUserSearchRequest, resetUserSearch, handleChangeUserSearchFor } from '../../actions/userSearch';
import { toggleSideMenu, getToken } from '../../helpers/funs';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import cns from "classnames";
import { getUserUnreadNotificationsRequest } from '../../actions/userNotifications';
import { getUserMessageChannelRequest } from '../../actions/userMessages';
import logo from 'img/common/logo.png';
import { publicPath } from '../../constants/routes';
import { getApprovedFriendsMessengerRequest } from '../../actions/friends';

const auth = new Auth();

class FitnessHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchSuggestions: [],
            searchIsLoading: false,
        }
        this.searchDebounce = _.debounce(this.searchUsers, 1000);
    }

    componentWillMount() {
        const { dispatch, socket } = this.props;
        dispatch(setLoggedUserFromLocalStorage());
        if (socket) {
            socket.emit('user_notifications_count', getToken());
            socket.emit('user_messages_count', getToken());
            socket.emit('user_friends_count', getToken());
        }
    }

    render() {
        const {
            loggedUserData,
            searchValue,
            notificationCount,
            messagesCount,
            pendingRequestsCount,
            dispatch,
        } = this.props;
        const {
            searchSuggestions,
        } = this.state;
        var loggedUserImage = '';
        if (loggedUserData && loggedUserData.avatar) {
            loggedUserImage = loggedUserData.avatar;
            if (loggedUserData.userDetails && loggedUserData.userDetails.avatar) {
                loggedUserImage = loggedUserData.userDetails.avatar;
            }
        }
        return (
            <div className="header">
                <header className="header d-flex justify-content-start">
                    <div className="logo">
                        <Link to={publicPath}>
                            <img src={logo} />
                        </Link>
                    </div>
                    <div className="search">
                        <div className="search-form header-search-form">
                            <span className="search-icon">
                                <FaSearch size={22} />
                            </span>
                            <Autosuggest
                                suggestions={searchSuggestions}
                                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSearchSuggestion}
                                inputProps={{
                                    id: 'header_search_users',
                                    name: 'header_search_users',
                                    value: searchValue,
                                    onChange: this.handleSearchChange,
                                    placeholder: 'Search',
                                }}
                            />

                        </div>
                    </div>
                    <div className="header-r d-flex">
                        <div className="header-user">
                            {loggedUserData &&
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    exact
                                    to={routeCodes.PROFILE + '/' + loggedUserData.username}
                                >
                                    <span>
                                        <img
                                            src={loggedUserImage}
                                            alt="Avatar"
                                            className="avatar"
                                            onError={(e) => {
                                                e.target.src = noProfileImg
                                            }}
                                        />
                                    </span>
                                    {loggedUserData.name}
                                </NavLink>
                            }
                        </div>
                        <div className="header-friend-requests">
                            {loggedUserData && loggedUserData.username &&
                                <NavLink to={routeCodes.PROFILEFRIENDS.replace('{username}', loggedUserData.username)}>
                                    <FaFrnd />
                                    {(typeof pendingRequestsCount !== 'undefined' && pendingRequestsCount > 0) &&
                                        <span>{(pendingRequestsCount) ? pendingRequestsCount : ''}</span>
                                    }
                                </NavLink>
                            }
                            {!(loggedUserData && loggedUserData.username) &&
                                <NavLink to={routeCodes.HOME}>
                                    <FaFrnd />
                                    {(typeof pendingRequestsCount !== 'undefined' && pendingRequestsCount > 0) &&
                                        <span>{(pendingRequestsCount) ? pendingRequestsCount : ''}</span>
                                    }
                                </NavLink>
                            }
                        </div>
                        <div className="header-alert">
                            <a href="javascript:void(0)" onClick={() => {
                                dispatch(getUserUnreadNotificationsRequest());
                                toggleSideMenu('user-notification-panel', true);
                            }}>
                                <FaNoti />
                                {(typeof notificationCount !== 'undefined' && notificationCount > 0) &&
                                    <span>{(notificationCount) ? notificationCount : ''}</span>
                                }
                            </a>
                        </div>
                        <div className="header-email">
                            <a href="javascript:void(0)" onClick={this.handleMessagePanel}>
                                <FaMail />
                                {(typeof messagesCount !== 'undefined' && messagesCount > 0) &&
                                    < span > {(messagesCount) ? messagesCount : ''}</span>
                                }
                            </a>
                        </div>
                        <div className="header-nav">
                            <a href="javascript:void(0)" onClick={() => toggleSideMenu('user-right-menu', true)}>
                                <FaMenu size={24} />
                            </a>
                        </div>
                    </div>
                </header>
            </div >
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            searchSuggestions,
            userSearchLoading,
        } = this.props;
        const {
            searchIsLoading,
        } = this.state;
        if (searchIsLoading && !userSearchLoading && searchSuggestions !== prevProps.searchSuggestions) {
            var suggestedUsers = searchSuggestions;
            if (suggestedUsers.length > 0) {
                suggestedUsers.push({
                    _id: 'view_all',
                    text: 'View All',
                });
            }
            this.setState({
                searchIsLoading: true,
                searchSuggestions,
            });
        }
    }

    componentWillUnmount() {
        const {
            searchSuggestions,
            dispatch,
        } = this.props;
        if (searchSuggestions && searchSuggestions.length > 0) {
            var resetSearchUserState = {
                loading: false,
                users: [],
                error: [],
            }
            dispatch(resetUserSearch(resetSearchUserState));
        }
    }


    //#region Common functions
    handleSearchChange = (event, { newValue, method }) => {
        const { dispatch } = this.props;
        dispatch(handleChangeUserSearchFor('searchValue', newValue));
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.searchDebounce.cancel;
        this.searchDebounce(value);
    };

    searchUsers = (value) => {
        const { dispatch } = this.props;
        var requestData = {
            name: value,
            start: 0,
            offset: 5,
        }
        this.setState({ searchIsLoading: true });
        dispatch(getUserSearchRequest(requestData));
    }

    handleSuggestionsClearRequested = () => {
        this.setState({
            searchSuggestions: []
        });
    };

    getSuggestionValue = (suggestion) => {
        if (suggestion._id === "view_all") {
            return this.props.searchValue;
        }
        var fullName = suggestion.firstName;
        if (suggestion.lastName) {
            fullName += ' ' + suggestion.lastName;
        }
        return fullName;
    }

    renderSearchSuggestion = (suggestion, { query }) => {
        if (suggestion._id === 'view_all') {
            return (
                <NavLink to={`${routeCodes.USERS}`}>
                    <span>{suggestion.text}</span>
                </NavLink>
            );
        } else {
            var fullName = suggestion.firstName;
            if (suggestion.lastName) {
                fullName += ' ' + suggestion.lastName;
            }
            const matches = AutosuggestHighlightMatch(fullName, query);
            const parts = AutosuggestHighlightParse(fullName, matches);
            return (
                <NavLink to={`${routeCodes.PROFILE}/${suggestion.username}`}>
                    <img
                        src={suggestion.avatar}
                        onError={(e) => {
                            e.target.src = noProfileImg
                        }}
                    />
                    <span>
                        {parts.map((part, i) => {
                            return (
                                <span key={i} className={cns({ 'search-word-highlight': part.highlight })}>{part.text}</span>
                            )
                        })}
                    </span>
                </NavLink>
            );
        }
    }

    handleMessagePanel = () => {
        const { socket, dispatch } = this.props;
        if (socket) {
            var requestData = {
                token: getToken(),
                start: 0,
                limit: 10,
            }
            dispatch(getUserMessageChannelRequest(requestData));
            dispatch(getApprovedFriendsMessengerRequest(requestData));
            socket.emit('request_users_conversation_channels', requestData);
            socket.emit('request_logged_user_friends', requestData);
        }
        toggleSideMenu('user-message-panel', true);
    }
    //#endregion
}

const mapStateToProps = (state) => {
    const { user, userSearch, userNotifications, userMessages, friends } = state;
    return {
        loggedUserData: user.get('loggedUserData'),
        socket: user.get('socket'),
        userSearchLoading: userSearch.get('loading'),
        searchValue: userSearch.get('searchValue'),
        searchSuggestions: userSearch.get('users'),
        notificationCount: userNotifications.get('count'),
        messagesCount: userMessages.get('unreadMessagesCount'),
        pendingRequestsCount: friends.get('pendingRequestsCount'),
        panelChannelStart: userMessages.get('panelChannelStart'),
        panelChannelLimit: userMessages.get('panelChannelLimit'),
    }
}

export default connect(mapStateToProps)(withRouter(FitnessHeader));