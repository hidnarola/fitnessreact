import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import FaMenu from 'react-icons/lib/md/menu';
import { withRouter } from 'react-router-dom';
import { adminRouteCodes } from 'constants/adminRoutes';
import { adminRootRoute } from 'constants/adminRoutes';
import { toggleSideMenu } from '../../../helpers/funs';
import noProfileImg from 'img/common/no-profile-img.png';
import { setLoggedAdminFromLocalStorage } from '../../../actions/admin/admin';
import logo from 'img/common/logo.png';

class AdminHeader extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(setLoggedAdminFromLocalStorage());
    }

    render() {
        const { loggedUserData } = this.props;
        return (
            <div className="header">
                <header className="header d-flex justify-content-start">
                    <div className="logo">
                        <Link to={adminRootRoute}>
                            <img src={logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="header-r d-flex">
                        <div className="header-user">
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                exact
                                to={adminRouteCodes.PROFILE}
                            >
                                <span>
                                    <img
                                        src={noProfileImg}
                                        className="avatar"
                                        onError={(e) => {
                                            e.target.src = noProfileImg
                                        }}
                                    />
                                </span>
                                {(loggedUserData && loggedUserData.name) ? loggedUserData.name : 'Admin'}
                            </NavLink>
                        </div>
                        <div className="header-nav">
                            <a href="javascript:void(0)" onClick={() => toggleSideMenu('admin-right-menu', true)}>
                                <FaMenu size={24} />
                            </a>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { admin } = state;
    return {
        loggedUserData: admin.get('loggedUserData')
    }
}

export default connect(mapStateToProps)(withRouter(AdminHeader));