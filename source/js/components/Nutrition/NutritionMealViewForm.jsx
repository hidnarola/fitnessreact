import React, { Component } from 'react';
import userImage from '../../../assets/img/nutrition/img-07.jpg';

class NutritionMealViewForm extends Component {
  state = {
    cuurentTab: '#Ingredients',
  };
  componentDidMount() {
    console.log('VIEW MEAL ID ==>', this.props);
  }
  render() {
    return (
      <React.Fragment>
        <div className="body-content d-flex row justify-content-start nutrition-meal-add-wrapper add-receipy">
          <div className="col-md-3">
            <div className="white-box">
              <div className="whitebox-head d-flex profile-head">
                <h3 className="title-h3"> Details </h3>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a title"
                  value=""
                  disabled
                />
              </div>
              <div className="form-group">
                <select
                  type="text"
                  className="form-control"
                  defaultValue="hello"
                  disabled
                >
                  <option>select meals</option>
                  <option>hello</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  type="text"
                  className="form-control"
                  defaultValue="public"
                  disabled
                >
                  <option>Meal Visibility</option>
                  <option>public</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="tabs">
              <div
                className={
                  this.state.cuurentTab === '#Ingredients'
                    ? 'tab active'
                    : 'tab '
                }
                id="Ingredients"
              >
                <a
                  onClick={e => {
                    this.setState({ cuurentTab: '#Ingredients' });
                  }}
                  href="#Ingredients"
                >
                  Ingredients
                </a>
              </div>

              <div
                className={
                  this.state.cuurentTab === '#Photos' ? 'tab active' : 'tab'
                }
                id="Photos"
              >
                <a
                  onClick={e => {
                    this.setState({ cuurentTab: '#Photos' });
                  }}
                  href="#Photos"
                >
                  Photos
                </a>
              </div>

              <div
                className={
                  this.state.cuurentTab === '#Instruction'
                    ? 'tab active'
                    : 'tab'
                }
                id="Instruction"
              >
                <a
                  onClick={e => {
                    this.setState({ cuurentTab: '#Instruction' });
                  }}
                  href="#Instruction"
                >
                  Instruction
                </a>
              </div>

              <div
                className={
                  this.state.cuurentTab === '#Notes' ? 'tab  active' : 'tab'
                }
                id="Notes"
              >
                <a
                  onClick={e => {
                    this.setState({ cuurentTab: '#Notes' });
                  }}
                  href="#Notes"
                >
                  Notes
                </a>
              </div>

              <div className={'tab-content'}>
                {this.state.cuurentTab === '#Ingredients' && (
                  <div
                    className={
                      this.state.cuurentTab === '#Ingredients'
                        ? 'content active'
                        : 'content'
                    }
                    id="Ingredients"
                  >
                    Content of Ingredients
                  </div>
                )}

                {this.state.cuurentTab === '#Photos' && (
                  <div
                    className={
                      this.state.cuurentTab === '#Photos'
                        ? 'content active'
                        : 'content'
                    }
                    id="Photos"
                  >
                    <div className="upload-gallery">
                      <div className="form-group">
                        <div className="image-preview-wrapper">
                          <img src={userImage} alt="Image" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {this.state.cuurentTab === '#Instruction' && (
                  <div
                    className={
                      this.state.cuurentTab === '#Instruction'
                        ? 'content active'
                        : 'content'
                    }
                    id="Instruction"
                  >
                    <div className="form-group">
                      <label>Content of Instruction</label>
                      <textarea className="form-control" disabled>
                        Apple Meal with juice Instruction
                      </textarea>
                    </div>
                  </div>
                )}

                {this.state.cuurentTab === '#Notes' && (
                  <div
                    className={
                      this.state.cuurentTab === '#Notes'
                        ? 'content active'
                        : 'content'
                    }
                    id="Notes"
                  >
                    <div className="form-group">
                      <label>Content of Notes</label>
                      <textarea className="form-control" disabled>
                        Apple Meal with juice
                      </textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NutritionMealViewForm;
