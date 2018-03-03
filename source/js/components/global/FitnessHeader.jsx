import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';

import FaSearch from 'react-icons/lib/fa/search';
import FaNoti from 'react-icons/lib/md/notifications-none';
import FaMenu from 'react-icons/lib/md/menu';
import FaMail from 'react-icons/lib/md/markunread';

export default class FitnessHeader extends Component {
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
                                <FaSearch size={24}/>
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
                                to={ routeCodes.PROFILE }
                            >
                                <span></span>Cecilia
                            </NavLink>

                        </div>
                        <div className="header-alert">
                            <a >
                                <FaNoti size={24}/>
                            </a>
                        </div>
                        <div className="header-email">
                            <a >
                                <FaMail/>
                            </a>
                        </div>
                        <div className="header-nav">
                            <a >
                                <FaMenu size={24}/>
                            </a>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

