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

class FitnessHeader extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        const { dispatch, history } = this.props;
        dispatch(logout());
        history.push('/');
    }

    render() {
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
                            <input type="search" name="" placeholder="Search" />
                        </form>
                    </div>
                    <div className="header-r d-flex">
                        <div className="header-user">

                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                exact
                                to={routeCodes.PROFILE}
                            >
                                <span></span>Cecilia
                            </NavLink>

                        </div>
                        <div className="header-alert">
                            <a>
                                <FaNoti size={24} />
                            </a>
                        </div>
                        <div className="header-email">
                            <a>
                                <FaMail />
                            </a>
                        </div>
                        <div className="header-logout">
                            <a href="javascript:void(0)" onClick={this.handleLogout}>
                                <FaSignOut size={24} />
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
}

export default connect()(withRouter(FitnessHeader));