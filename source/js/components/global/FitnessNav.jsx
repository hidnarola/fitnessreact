import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FaNutrition from 'react-icons/lib/md/local-restaurant';
import FaGoal from 'react-icons/lib/fa/bullseye';
import { Scrollbars } from 'react-custom-scrollbars';
import BadgeIcon from "svg/badge-icon.svg";
import { routeCodes } from '../../constants/routes';

export default class FitnessNav extends Component {

    render() {
        return (
            <div className='Menu'>
                <nav className="navigation" id="navigation">
                    <Scrollbars autoHide>
                        <ul>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.DASHBOARD}
                                >
                                    <i className="icon-dashboard"></i>
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.STATSPAGE}
                                >
                                    <i className="icon-pie_chart"></i>
                                    <span>Stats</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.BODY}
                                >
                                    <i className="icon-person"></i>
                                    <span>Body</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.EXERCISE}
                                >
                                    <i className="icon-fitness_center"></i>
                                    <span>Exercise</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.NUTRITION}
                                >
                                    <FaNutrition size={24} />
                                    <span>Nutrition</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.CALENDAR}
                                >
                                    <i className="icon-insert_invitation"></i>
                                    <span>Calendar</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.PROGRESS}
                                >
                                    <i className="icon-trending_up"></i>
                                    <span>Progress</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.BADGESTRACKING}
                                >
                                    <BadgeIcon className="menu-link-badge-icon" />
                                    <span>Badges</span>
                                </NavLink>
                            </li>
                        </ul>
                    </Scrollbars>
                </nav>
            </div>
        );
    }
}
