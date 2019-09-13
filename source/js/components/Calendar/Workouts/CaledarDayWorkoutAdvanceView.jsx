import React from 'react';
import { ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CaledarDayWorkoutAdvanceView = props => {
  return (
    <React.Fragment>
      <div className="excercise-content animated fadeIn">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th width="70" className="text-center">
                  Set
                </th>
                <th>
                  <div className="serving-select">
                    <label>Rest</label>
                    <select className="form-control">
                      <option>Seconds</option>
                      <option>Minutes</option>
                    </select>
                  </div>
                </th>
                <th>
                  <div className="serving-select">
                    <label>Time</label>
                    <select className="form-control">
                      <option>Seconds</option>
                      <option>Minutes</option>
                      <option>Hours</option>
                    </select>
                  </div>
                </th>
                <th>
                  <div className="serving-select">
                    <label>Speed</label>
                    <select className="form-control">
                      <option>Effort</option>
                      <option>KMPH</option>
                      <option>MPH</option>
                    </select>
                  </div>
                </th>
                <th width="50">&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="text-center">1</td>
                <td>
                  <div className="serving-boxs">
                    <button className="btn btn-minus">
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="86"
                    />
                    <button className="btn btn-plus">
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="serving-boxs">
                    <button className="btn btn-minus">
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="86"
                    />
                    <button className="btn btn-plus">
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="serving-boxs">
                    <button className="btn btn-minus">
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="86"
                    />
                    <button className="btn btn-plus">
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </td>
                <td className="text-center red">
                  <FontAwesomeIcon icon="trash-alt" />
                </td>
              </tr>
              <tr>
                <td className="text-center">2</td>
                <td>
                  <div className="serving-boxs">
                    <button className="btn btn-minus">
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="86"
                    />
                    <button className="btn btn-plus">
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="serving-boxs">
                    <button className="btn btn-minus">
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="86"
                    />
                    <button className="btn btn-plus">
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="serving-boxs">
                    <button className="btn btn-minus">
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="86"
                    />
                    <button className="btn btn-plus">
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </td>
                <td className="text-center red">
                  <FontAwesomeIcon icon="trash-alt" />
                </td>
              </tr>
              <tr>
                <td className="text-center">3</td>
                <td>
                  <div className="serving-boxs">
                    <button className="btn btn-minus">
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="86"
                    />
                    <button className="btn btn-plus">
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="serving-boxs">
                    <button className="btn btn-minus">
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="86"
                    />
                    <button className="btn btn-plus">
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="serving-boxs">
                    <button className="btn btn-minus">
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="86"
                    />
                    <button className="btn btn-plus">
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </td>
                <td className="text-center red">
                  <FontAwesomeIcon icon="trash-alt" />
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <td colspan="5">
                  <button className="btn-addset">
                    <FontAwesomeIcon icon="plus" />
                    <span>Add Set</span>
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CaledarDayWorkoutAdvanceView;
