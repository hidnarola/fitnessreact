import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { routeCodes } from '../../constants/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from "react-tooltip";

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
                                    data-tip="Dashboard"
                                    data-for="menu-title-tooltip"
                                >
                                    <FontAwesomeIcon icon={faThLarge} />
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.STATSPAGE}
                                    data-tip="Stats"
                                    data-for="menu-title-tooltip"
                                >
                                    <FontAwesomeIcon icon={faChartPie} />
                                    <span>Stats</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.BODY}
                                    data-tip="Body"
                                    data-for="menu-title-tooltip"
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>Body</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.EXERCISE}
                                    data-tip="Exercise"
                                    data-for="menu-title-tooltip"
                                >
                                    <FontAwesomeIcon icon={faDumbbell} />
                                    <span>Exercise</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.NUTRITION}
                                    data-tip="Nutrition"
                                    data-for="menu-title-tooltip"
                                >
                                    <FontAwesomeIcon icon={faUtensils} />
                                    <span>Nutrition</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.CALENDAR}
                                    data-tip="Calendar"
                                    data-for="menu-title-tooltip"
                                >
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <span>Calendar</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.PROGRESS}
                                    data-tip="Progress"
                                    data-for="menu-title-tooltip"
                                >
                                    <FontAwesomeIcon icon={faChartLine} />
                                    <span>Progress</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.BADGES}
                                    data-tip="Badges"
                                    data-for="menu-title-tooltip"
                                >
                                    <FontAwesomeIcon icon={faTrophy} />
                                    <span>Badges</span>
                                </NavLink>
                            </li>
                        </ul>
                    </Scrollbars>
                </nav>
                <ReactTooltip id="menu-title-tooltip" place="right" type="light" effect="solid" />
            </div>
        );
    }
}
