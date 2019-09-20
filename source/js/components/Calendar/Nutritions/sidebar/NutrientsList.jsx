import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Scrollbars } from 'react-custom-scrollbars';

class NutrientsList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="blue_right_sidebar measurement-sidebar">
          <h2 className="h2_head_one">Nutrients</h2>
          <div className={'tab-content'}>
            <div className="recent-ingredient">
              <Scrollbars autoHide>
                <ul>
                  <li>
                    <h3>Vitamin A</h3>
                    <div className="add_drag">
                      <FontAwesomeIcon icon="plus-circle" />
                    </div>
                  </li>
                  <li>
                    <h3>Vitamin B</h3>
                    <div className="add_drag">
                      <FontAwesomeIcon icon="plus-circle" />
                    </div>
                  </li>
                  <li>
                    <h3>Vitamin C</h3>
                    <div className="add_drag">
                      <FontAwesomeIcon icon="plus-circle" />
                    </div>
                  </li>
                  <li>
                    <h3>Vitamin D</h3>
                    <div className="add_drag">
                      <FontAwesomeIcon icon="plus-circle" />
                    </div>
                  </li>
                  <li>
                    <h3>Vitamin E</h3>
                    <div className="add_drag">
                      <FontAwesomeIcon icon="plus-circle" />
                    </div>
                  </li>
                </ul>
              </Scrollbars>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NutrientsList;
