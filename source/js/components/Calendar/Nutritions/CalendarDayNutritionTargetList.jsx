import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routeCodes } from '../../../constants/routes';
import { Link } from 'react-router-dom';

class CalendarDayNutritionTargetList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="overview whitebox-body meals-bg border-left border-right">
          <div className="meals-top">
            <Link
              to="#"
              className="btn btn-danger plus-btn"
              onClick={this.props.handleChangeNutritionTarget}
            >
              <FontAwesomeIcon icon="times" />
            </Link>
            <h3 className="title-h3 ml-5">Nutrition Targets</h3>
            <Link
              to={routeCodes.NUTRITION_ADD}
              className="btn btn-success ml-auto"
              style={{ backgroundColor: '#3ED1A9', borderColor: '#3ED1A9' }}
            >
              All Settings
            </Link>
          </div>
          <div className="overview-body">
            <ul className="list-measurement">
              <li className="list-measurement-items">
                <div className="display-serve">
                  <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                    <div className="col-xs-12 col-lg-2">
                      <h3>Calories</h3>
                    </div>
                    <div className="col-xs-12 col-lg-5">
                      <div className="serving-boxs width-100-per m-0">
                        <button className="btn btn-minus">
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue="12"
                        />
                        <button className="btn btn-plus">
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </div>
                    <div className="col-xs-12 col-lg-5 d-flex flex-wrap align-items-center">
                      <h3 className="pl-3">Percent</h3>

                      <span className="btn-trash ml-auto">
                        <FontAwesomeIcon icon="trash-alt" />
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-measurement-items">
                <div className="display-serve">
                  <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                    <div className="col-xs-12 col-lg-2">
                      <h3>Protein</h3>
                    </div>
                    <div className="col-xs-12 col-lg-5">
                      <div className="serving-boxs width-100-per m-0">
                        <button className="btn btn-minus">
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue="12"
                        />
                        <button className="btn btn-plus">
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </div>
                    <div className="col-xs-12 col-lg-5 d-flex flex-wrap align-items-center">
                      <h3 className="pl-3">Percent</h3>

                      <span className="btn-trash ml-auto">
                        <FontAwesomeIcon icon="trash-alt" />
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-measurement-items">
                <div className="display-serve">
                  <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                    <div className="col-xs-12 col-lg-2">
                      <h3>Sugar</h3>
                    </div>
                    <div className="col-xs-12 col-lg-5">
                      <div className="serving-boxs width-100-per m-0">
                        <button className="btn btn-minus">
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue="12"
                        />
                        <button className="btn btn-plus">
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </div>
                    <div className="col-xs-12 col-lg-5 d-flex flex-wrap align-items-center">
                      <h3 className="pl-3">Percent</h3>

                      <span className="btn-trash ml-auto">
                        <FontAwesomeIcon icon="trash-alt" />
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-measurement-items">
                <div className="display-serve">
                  <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                    <div className="col-xs-12 col-lg-2">
                      <h3>Saturates</h3>
                    </div>
                    <div className="col-xs-12 col-lg-5">
                      <div className="serving-boxs width-100-per m-0">
                        <button className="btn btn-minus">
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue="12"
                        />
                        <button className="btn btn-plus">
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </div>
                    <div className="col-xs-12 col-lg-5 d-flex flex-wrap align-items-center">
                      <h3 className="pl-3">Percent</h3>

                      <span className="btn-trash ml-auto">
                        <FontAwesomeIcon icon="trash-alt" />
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarDayNutritionTargetList;
