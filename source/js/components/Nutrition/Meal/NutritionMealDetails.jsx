import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NutritionMealDetails = (props) => {
    return (
        <React.Fragment>
            <div className="details">
                      <div className="description-box">
                        <div className="title">Description</div>
                        <div className="detail-body">
                          <textarea className="form-control" rows="5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </textarea>
                        </div>
                      </div>
                      <div className="row no-gutters mt-1">
                        <div className="col-md-6">
                          <div className="serves-box">
                            <div className="display-serve">
                              <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                                <div className="col-xs-12 col-lg-5">
                                  <span className="serves-title">Serves</span>
                                </div>
                                <div className="col-xs-12 col-lg-7">
                                  <div className="serving-boxs width-100-per m-0">
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
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div
                            className="serves-box"
                            style={{ marginLeft: '2px' }}
                          >
                            <div className="display-serve">
                              <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                                <div className="col-xs-12 col-lg-5">
                                  <span className="serves-title">
                                    Difficulty
                                  </span>
                                </div>
                                <div className="col-xs-12 col-lg-7">
                                  <div className="serving-select">
                                    <select
                                      className="form-control"
                                      defaultValue={'easy'}
                                    >
                                      <option value="easy">Easy</option>
                                      <option value="medium">Medium</option>
                                      <option value="hard">Hard</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="cooking-time-box mt-1">
                        <div className="timebox-header">
                          <h3>Cooking Time</h3>
                        </div>
                        <div className="timebox-body">
                          <div className="display-serve">
                            <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                              <div className="col-xs-12 col-lg-5">
                                <span className="serves-title">Prep Time</span>
                              </div>
                              <div className="col-xs-12 col-md-7">
                                <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                                  <div className="col-xs-12 col-lg-6">
                                    <div className="serving-boxs width-100-per m-0">
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
                                  </div>
                                  <div className="col-xs-12 col-lg-6">
                                    <div className="serving-select">
                                      <select
                                        className="form-control"
                                        defaultValue={'second'}
                                      >
                                        <option value="second">Seconds</option>
                                        <option value="minute">Minutes</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="display-serve">
                            <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                              <div className="col-xs-12 col-lg-5">
                                <span className="serves-title">Cook Time</span>
                              </div>
                              <div className="col-xs-12 col-md-7">
                                <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                                  <div className="col-xs-12 col-lg-6">
                                    <div className="serving-boxs width-100-per m-0">
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
                                  </div>
                                  <div className="col-xs-12 col-lg-6">
                                    <div className="serving-select">
                                      <select
                                        className="form-control"
                                        defaultValue={'second'}
                                      >
                                        <option value="second">Seconds</option>
                                        <option value="minute">Minutes</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <form>
                        <div className="categories-box mt-1">
                          <div className="categories-header">
                            <h3>Categories</h3>
                          </div>
                          <div className="categories-body">
                            <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                              <div className="col-md-6">
                                <div className="categories-content">
                                  <div className="categories-items d-flex flex-wrap width-100-per">
                                    <div className="categories-title">
                                      Vegetarian
                                    </div>
                                    <div className="custom-checkbox ml-auto">
                                      <div className="custom_check mb-0">
                                        <input
                                          type="checkbox"
                                          id={'display_all_exercises'}
                                          name={'display_all_exercises'}
                                          checked={true}
                                          // onChange={() =>
                                          //   this.handleChangeCheckbox(
                                          //     'display_all_exercises',
                                          //   )
                                          // }
                                        />
                                        <label
                                          className="mb-0"
                                          htmlFor="display_all_exercises"
                                        ></label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="categories-content">
                                  <div className="categories-items d-flex flex-wrap width-100-per">
                                    <div className="categories-title">
                                      Kosher
                                    </div>
                                    <div className="custom-checkbox ml-auto">
                                      <div className="custom_check mb-0">
                                        <input
                                          type="checkbox"
                                          id={'display_all_exercises'}
                                          name={'display_all_exercises'}
                                          checked={true}
                                          // onChange={() =>
                                          //   this.handleChangeCheckbox(
                                          //     'display_all_exercises',
                                          //   )
                                          // }
                                        />
                                        <label
                                          className="mb-0"
                                          htmlFor="display_all_exercises"
                                        ></label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="categories-content">
                                  <div className="categories-items d-flex flex-wrap width-100-per">
                                    <div className="categories-title">
                                      Vegan
                                    </div>
                                    <div className="custom-checkbox ml-auto">
                                      <div className="custom_check mb-0">
                                        <input
                                          type="checkbox"
                                          id={'display_all_exercises'}
                                          name={'display_all_exercises'}
                                          checked={false}
                                          // onChange={() =>
                                          //   this.handleChangeCheckbox(
                                          //     'display_all_exercises',
                                          //   )
                                          // }
                                        />
                                        <label
                                          className="mb-0"
                                          htmlFor="display_all_exercises"
                                        ></label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="categories-content">
                                  <div className="categories-items d-flex flex-wrap width-100-per">
                                    <div className="categories-title">
                                      Coelaic
                                    </div>
                                    <div className="custom-checkbox ml-auto">
                                      <div className="custom_check mb-0">
                                        <input
                                          type="checkbox"
                                          id={'display_all_exercises'}
                                          name={'display_all_exercises'}
                                          checked={false}
                                          // onChange={() =>
                                          //   this.handleChangeCheckbox(
                                          //     'display_all_exercises',
                                          //   )
                                          // }
                                        />
                                        <label
                                          className="mb-0"
                                          htmlFor="display_all_exercises"
                                        ></label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="categories-content">
                                  <div className="categories-items d-flex flex-wrap width-100-per">
                                    <div className="categories-title">
                                      Paleo
                                    </div>
                                    <div className="custom-checkbox ml-auto">
                                      <div className="custom_check mb-0">
                                        <input
                                          type="checkbox"
                                          id={'display_all_exercises'}
                                          name={'display_all_exercises'}
                                          checked={true}
                                          // onChange={() =>
                                          //   this.handleChangeCheckbox(
                                          //     'display_all_exercises',
                                          //   )
                                          // }
                                        />
                                        <label
                                          className="mb-0"
                                          htmlFor="display_all_exercises"
                                        ></label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="categories-content">
                                  <div className="categories-items d-flex flex-wrap width-100-per">
                                    <div className="categories-title">Keto</div>
                                    <div className="custom-checkbox ml-auto">
                                      <div className="custom_check mb-0">
                                        <input
                                          type="checkbox"
                                          id={'display_all_exercises'}
                                          name={'display_all_exercises'}
                                          checked={false}
                                          // onChange={() =>
                                          //   this.handleChangeCheckbox(
                                          //     'display_all_exercises',
                                          //   )
                                          // }
                                        />
                                        <label
                                          className="mb-0"
                                          htmlFor="display_all_exercises"
                                        ></label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
        </React.Fragment>
    )
}

export default NutritionMealDetails
