import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import FaSearch from 'react-icons/lib/fa/search';
import FaNoti from 'react-icons/lib/md/notifications-none';
import FaMenu from 'react-icons/lib/md/menu';
import FaMail from 'react-icons/lib/md/markunread';
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
        }
    }

    render() {
        const {
            loggedUserData,
            searchValue,
            notificationCount,
            messagesCount,
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
                        <a href="index.html">
                        </a>
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
                        <div className="header-alert">
                            <a href="javascript:void(0)" onClick={() => {
                                dispatch(getUserUnreadNotificationsRequest());
                                toggleSideMenu('user-notification-panel', true);
                            }}>
                                <FaNoti /> <span>{(notificationCount) ? notificationCount : ''}</span>
                            </a>
                        </div>
                        <div className="header-email">
                            <a href="javascript:void(0)" onClick={this.handleMessagePanel}>
                                <FaMail /> <span>{(messagesCount) ? messagesCount : ''}</span>
                            </a>
                        </div>
                        {/* <div className="header-logout header-icons">
                            <a href="javascript:void(0)" onClick={this.handleLogout} data-tip data-for='logout'>
                                <FaSignOut />
                                <ReactTooltip id='logout' place="bottom" type="dark" effect="solid">
                                    <span>Logout</span>
                                </ReactTooltip>
                            </a>
                        </div> */}
                        <div className="header-nav">
                            <a href="javascript:void(0)" onClick={() => toggleSideMenu('user-right-menu', true)}>
                                <FaMenu size={24} />
                            </a>
                        </div>
                    </div>
                </header>
            </div>
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
    handleLogout = () => {
        auth.logout();
    }

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
                limit: 5,
            }
            dispatch(getUserMessageChannelRequest('messages_panel'));
            socket.emit('request_users_conversation_channels', requestData);
        }
        toggleSideMenu('user-message-panel', true);
    }
    //#endregion
}

const mapStateToProps = (state) => {
    const { user, userSearch, userNotifications, userMessages } = state;
    return {
        loggedUserData: user.get('loggedUserData'),
        socket: user.get('socket'),
        userSearchLoading: userSearch.get('loading'),
        searchValue: userSearch.get('searchValue'),
        searchSuggestions: userSearch.get('users'),
        notificationCount: userNotifications.get('count'),
        messagesCount: userMessages.get('unreadMessagesCount'),
    }
}

export default connect(mapStateToProps)(withRouter(FitnessHeader));