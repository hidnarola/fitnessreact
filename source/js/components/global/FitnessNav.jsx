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
                                    <FontAwesomeIcon icon={faThLarge} />
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={routeCodes.STATSPAGE}
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
                                >
                                    <FontAwesomeIcon icon={faTrophy} />
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
