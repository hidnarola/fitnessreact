import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import workAndCoLogoImg from 'img/workco-logo.svg';
import { adminRouteCodes } from 'constants/adminRoutes';

export default class AdminMenu extends Component {
    render() {
        return (
            <div className='Menu'>
                <div className='Menu-logo'>
                    <a href='https://work.co' target='_blank' rel='noreferrer noopener' aria-label='Work & Co website'>
                        <img
                            src={workAndCoLogoImg}
                            alt='Work & Co logo'
                        />
                    </a>
                </div>
                <div className='Menu-links'>
                    <NavLink
                        activeClassName='Menu-link--active'
                        className='Menu-link'
                        exact
                        to={adminRouteCodes.DASHBOARD}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        activeClassName='Menu-link--active'
                        className='Menu-link'
                        to={adminRouteCodes.USERS}
                    >
                        Users
                    </NavLink>
                </div>
            </div>
        );
    }
}
