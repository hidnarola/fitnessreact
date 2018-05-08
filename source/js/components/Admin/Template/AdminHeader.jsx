import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import FaSearch from 'react-icons/lib/fa/search';
import FaNoti from 'react-icons/lib/md/notifications-none';
import FaMenu from 'react-icons/lib/md/menu';
import FaMail from 'react-icons/lib/md/markunread';
import { FaSignOut } from 'react-icons/lib/fa'
import { withRouter } from 'react-router-dom';
import { adminRouteCodes } from 'constants/adminRoutes';
import { adminRootRoute } from 'constants/adminRoutes';
import { logout } from 'actions/login';
import { ts } from '../../../helpers/funs';

class AdminHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutActionInit: false,
        }
    }

    handleLogout = () => {
        const { dispatch } = this.props;
        this.setState({ logoutActionInit: true });
        dispatch(logout());

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
                                to={adminRouteCodes.PROFILE}
                            >
                                <span></span>Admin
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

    componentDidUpdate(prevProps, prevState) {
        const { loading, history } = this.props;
        const { logoutActionInit } = this.state;
        if (logoutActionInit && !loading) {
            ts('Logout success!');
            history.push(adminRootRoute);
        }
    }

}

const mapStateToProps = (state) => {
    const { login } = state;
    return {
        loading: login.get('loading')
    }
}

export default connect(mapStateToProps)(withRouter(AdminHeader));