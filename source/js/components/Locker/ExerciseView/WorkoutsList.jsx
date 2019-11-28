import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonToolbar, DropdownButton, MenuItem } from "react-bootstrap";

class WorkoutsList extends Component {
  render() {
    return (
      <React.Fragment>
        <li>
          <div className="exercise-box-header">
            <div className="exercise-title">Chest 1</div>
            <ButtonToolbar className="progress-toolbar ml-auto">
              <DropdownButton
                className="progress-btn d-flex align-items-center"
                title={<i className="fa fa-globe-europe mr-2" />}
                id="dropdown-size-medium"
                pullRight
              >
                <MenuItem eventKey="1">Only me</MenuItem>
                <MenuItem eventKey="2">Public</MenuItem>
                <MenuItem eventKey="3">Friends</MenuItem>
                <MenuItem eventKey="4">Friends Of Friends</MenuItem>
              </DropdownButton>
            </ButtonToolbar>
          </div>
          <div className="exercise-box-body">
          <div className="exercise-content">
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              consectetur nibh nec nunc suscipit, ut lobortis dui gravida. Cras
              tincidunt elit in libero pretium, sed efficitur ipsum rutrum.
              Vestibulum eget nulla nisl. Proin volutpat volutpat ultrices.
              Proin id ligula porta, bibendum orci laoreet, iaculis velit. Fusce
              elementum lorem urna, sit amet porta eros euismod a. Quisque
              tincidunt nulla at orci tristique, et ultrices urna aliquet.
              Phasellus sagittis viverra odio. Phasellus fringilla neque sit
              amet ligula auctor, vitae ultricies nunc fermentum. Nulla laoreet
              est dapibus purus consectetur, vel elementum massa dignissim.
              Proin eu neque id arcu mattis hendrerit eget at turpis.
            </p>
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  }
}

export default WorkoutsList;
