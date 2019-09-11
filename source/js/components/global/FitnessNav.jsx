import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { routeCodes } from '../../constants/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from 'img/common/logo.png';
import ReactTooltip from 'react-tooltip';
import { publicPath } from '../../constants/routes';

export default class FitnessNav extends Component {
  render() {
    return (
      <div id="manu-navigation" className="Menu">
        <nav className="navigation" id="navigation">
          <div className="logo">
            <NavLink to={publicPath}>
              <img src={logo} />
            </NavLink>
          </div>
          <Scrollbars autoHide>
            <ul>
              <li>
                <NavLink
                  activeClassName="active"
                  className="Menu-link"
                  to={routeCodes.DASHBOARD}
                  data-tip="Dashboard"
                  data-for="menu-title-tooltip"
                >
                  <FontAwesomeIcon icon="th-large" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  activeClassName="active"
                  className="Menu-link"
                  to={routeCodes.STATSPAGE}
                  data-tip="Stats"
                  data-for="menu-title-tooltip"
                >
                  <FontAwesomeIcon icon="chart-pie" />
                  <span>Stats</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  activeClassName="active"
                  className="Menu-link"
                  to={routeCodes.BODY}
                  data-tip="Body"
                  data-for="menu-title-tooltip"
                >
                  <FontAwesomeIcon icon="user" />
                  <span>Body</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  activeClassName="active"
                  className="Menu-link"
                  to={routeCodes.EXERCISE}
                  data-tip="Exercise"
                  data-for="menu-title-tooltip"
                >
                  <FontAwesomeIcon icon="dumbbell" />
                  <span>Exercise</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  className="Menu-link"
                  to={routeCodes.NUTRITION}
                  data-tip="Nutrition"
                  data-for="menu-title-tooltip"
                >
                  <FontAwesomeIcon icon="utensils" />
                  <span>Nutrition</span>
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  activeClassName="active"
                  className="Menu-link"
                  to={routeCodes.CALENDAR}
                  data-tip="Calendar"
                  data-for="menu-title-tooltip"
                >
                  <FontAwesomeIcon icon="calendar" />
                  <span>Calendar</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  className="Menu-link"
                  to={routeCodes.PROGRESS}
                  data-tip="Progress"
                  data-for="menu-title-tooltip"
                >
                  <FontAwesomeIcon icon="chart-line" />
                  <span>Progress</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  className="Menu-link"
                  to={routeCodes.BADGES}
                  data-tip="Badges"
                  data-for="menu-title-tooltip"
                >
                  <FontAwesomeIcon icon="trophy" />
                  <span>Badges</span>
                </NavLink>
              </li>
            </ul>
          </Scrollbars>

          <div className="settingnav">
            <NavLink to={publicPath}>
              <FontAwesomeIcon icon="cog" />
            </NavLink>
          </div>
        </nav>
        <ReactTooltip
          id="menu-title-tooltip"
          place="right"
          type="light"
          effect="solid"
        />
      </div>
    );
  }
}
