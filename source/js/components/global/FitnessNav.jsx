import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';

import FaDashboard from 'react-icons/lib/md/dashboard';
import FaPie from 'react-icons/lib/fa/pie-chart';
import FaUser from 'react-icons/lib/fa/user';
import FaFitness from 'react-icons/lib/md/fitness-center';
import FaNutrition from 'react-icons/lib/md/local-restaurant';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaGoal from 'react-icons/lib/fa/bullseye';

export default class FitnessNav extends Component {
 
    render() {
        return (
            <div className='Menu'>
                <nav className="navigation" id="navigation">
                    <ul>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                exact
                                to={ routeCodes.DASHBOARD }
                            >
                                <FaDashboard size={24}/>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                exact
                                to={ routeCodes.STATSPAGE }
                            >
                                <FaPie size={24} />
                                 <span>Stats</span> 
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                exact
                                to={ routeCodes.FITNESSBODY }
                            >
                                <FaUser size={24} />
                                 <span>Body</span> 
                            </NavLink>
                        </li>


                        <li>
                           <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                exact
                                to={ routeCodes.EXERCISE }
                            >
                                <FaFitness size={24} />
                                <span>Exercise</span>
                            </NavLink>
                        </li>

                        <li>
                           <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                exact
                                to={ routeCodes.NUTRITION }
                            >
                                <FaNutrition size={24} />
                                <span>Nutrition</span>
                            </NavLink>
                        </li>
                        <li>
                            <a >
                                <FaCalendar size={24} />
                                <span>Calendar</span>
                            </a>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                exact
                                to={ routeCodes.GOALS }
                            >
                                <FaGoal size={24} />
                                <span>Goals</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                exact
                                to={ routeCodes.HOME }
                            >
                                <i className="icon-dashboard"></i>
                                Home
                            </NavLink>
                        </li>

                         <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                exact
                                to={ routeCodes.PEOPLE }
                            >
                                <i className="icon-person"></i>
                                People
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </div>
        );
    }
}
