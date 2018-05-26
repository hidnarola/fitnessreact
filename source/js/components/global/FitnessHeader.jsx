import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';

import FaSearch from 'react-icons/lib/fa/search';
import FaNoti from 'react-icons/lib/md/notifications-none';
import FaMenu from 'react-icons/lib/md/menu';
import FaMail from 'react-icons/lib/md/markunread';
import { FaSignOut } from 'react-icons/lib/fa'
import { logout } from '../../actions/login';
import { withRouter } from 'react-router-dom';
import Auth from '../../auth/Auth';
import { setLoggedUserFromLocalStorage } from '../../actions/user';
import noProfileImg from 'img/common/no-profile-img.png';
import ReactTooltip from "react-tooltip";
import Autosuggest from "react-autosuggest";
import _ from "lodash";
import { getUserSearchRequest } from '../../actions/userSearch';

const auth = new Auth();

class FitnessHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            searchSuggestions: [],
            searchIsLoading: false,
        }
        this.searchDebounce = _.debounce(this.searchUsers, 1000);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(setLoggedUserFromLocalStorage());
    }

    render() {
        const { loggedUserData } = this.props;
        const {
            searchValue,
            searchSuggestions,
        } = this.state;
        return (
            <div className="header">
                <header className="header d-flex justify-content-start">
                    <div className="logo">
                        <a href="index.html">
                        </a>
                    </div>
                    <div className="search">
                        <form>
                            <button type="submit">
                                <FaSearch size={24} />
                            </button>
                            <input
                                type="text"
                                id="header_search_users"
                                name="header_search_users"
                                placeholder="Search"
                            />
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

                        </form>
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
                                            src={loggedUserData.avatar}
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
                            <a>
                                <FaNoti />
                            </a>
                        </div>
                        <div className="header-email">
                            <a>
                                <FaMail />
                            </a>
                        </div>
                        <div className="header-logout header-icons">
                            <a href="javascript:void(0)" onClick={this.handleLogout} data-tip data-for='logout'>
                                <FaSignOut />
                                <ReactTooltip id='logout' place="bottom" type="dark" effect="solid">
                                    <span>Logout</span>
                                </ReactTooltip>
                            </a>
                        </div>
                        <div className="header-nav">
                            <a>
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
            suggestedUsers.push({
                _id: 'view_all',
                text: 'View All',
            });
            this.setState({
                searchIsLoading: true,
                searchSuggestions,
            });
        }
    }

    handleLogout = () => {
        auth.logout();
    }

    handleSearchChange = (e) => {
        var value = e.target.value;
        this.setState({ searchValue: value });
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
        console.log('getSuggestionValue => ', suggestion);
        return "Suggestion Value";
    }

    renderSearchSuggestion = (suggestion) => {
        console.log('renderSearchSuggestion => ', suggestion);
        if (suggestion._id !== 'view_all') {
            var fullName = suggestion.firstName;
            if (suggestion.lastName) {
                fullName += ' ' + suggestion.lastName;
            }
            return (
                <span>{fullName}</span>
            );
        } else {
            return (
                <span>{suggestion.text}</span>
            );
        }

    }
}

const mapStateToProps = (state) => {
    const { user, userSearch } = state;
    return {
        loggedUserData: user.get('loggedUserData'),
        userSearchLoading: userSearch.get('loading'),
        searchSuggestions: userSearch.get('users'),
    }
}

export default connect(mapStateToProps)(withRouter(FitnessHeader));