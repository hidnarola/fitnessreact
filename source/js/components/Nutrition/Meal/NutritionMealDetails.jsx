import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Field, reduxForm, formValueSelector,initialize  } from 'redux-form';
import {connect} from 'react-redux'

class NutritionMealDetails extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="details">
                      <div className="description-box">
                        <div className="title">Description</div>
                        <div className="detail-body">
                          <Field component="textarea" name="description" className="form-control" rows="5" />
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
                                    <button type="button" className="btn btn-minus" onClick={() => this.handleChnageServe('sub')}>
                                      <FontAwesomeIcon icon="minus" />
                                    </button>
                                    <Field component={renderInputField} type="number" name="serves" className="form-control" />
                                    <button type="button" className="btn btn-plus" onClick={() => this.handleChnageServe('add')} >
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
                                    {/* <select
                                      className="form-control"
                                      defaultValue={'easy'}
                                    >
                                      <option value="easy">Easy</option>
                                      <option value="medium">Medium</option>
                                      <option value="hard">Hard</option>
                                    </select> */}
                                      <Field component={renderSelectField} name="serving_difficulty" className="form-control" list={difficultyList} />
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
                                      <button type="button" className="btn btn-minus" onClick={() => this.handleChnagePrepTime('sub')}>
                                        <FontAwesomeIcon icon="minus" />
                                      </button>
                                      <Field component={renderInputField} type="number" name="prepTime" className="form-control" />
                                      <button type="button" className="btn btn-plus" onClick={() => this.handleChnagePrepTime('add')}>
                                        <FontAwesomeIcon icon="plus" />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-xs-12 col-lg-6">
                                    <div className="serving-select">
                                    <Field component={renderSelectField} name="preptime_unit" className="form-control" list={timeList} />
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
                                      <button type="button" className="btn btn-minus" onClick={() => this.handleChnageCookTime('sub')}>
                                        <FontAwesomeIcon icon="minus" />
                                      </button>
                                      <Field component={renderInputField} type="number" name="cookTime" className="form-control" />
                                      <button type="button" className="btn btn-plus" onClick={() => this.handleChnageCookTime('add')}>
                                        <FontAwesomeIcon icon="plus" />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-xs-12 col-lg-6">
                                    <div className="serving-select">
                                    <Field component={renderSelectField} name="cooktime_unit" className="form-control" list={timeList} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

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
                                      <Field component={renderCheckBoxField} name="vegetarian" id="vegetarian" />
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
                                      <Field component={renderCheckBoxField} name="kosher" id="kosher" />
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
                                      <Field component={renderCheckBoxField} name="vegan" id="vegan" />
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
                                      <Field component={renderCheckBoxField} name="coelaic" id="coelaic" />
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
                                      <Field component={renderCheckBoxField} name="paleo" id="paleo" />
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
                                          <Field component={renderCheckBoxField} name="keto" id="keto" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
      </React.Fragment>
    )
  }
  handleChnageServe = (action) => {
    const {serves} = this.props
    action === 'add' && props.change("serves", parseInt(serves) + 1)
    action === 'sub' && serves > 0 && props.change("serves", parseInt(serves) - 1)
  }
  handleChnagePrepTime = (action) => {
    const {prepTime} = this.props
    action === 'add' && props.change("prepTime", parseInt(prepTime) + 1)
    action === 'sub' && prepTime > 0 && props.change("prepTime", parseInt(prepTime) - 1)
  }
  handleChnageCookTime = (action) => {
    const {cookTime} = this.props
    action === 'add' && props.change("cookTime", parseInt(cookTime) + 1)
    action === 'sub' && cookTime > 0 && props.change("cookTime", parseInt(cookTime) - 1)
  }
}

NutritionMealDetails = reduxForm({
  form: 'nutrition_meal_add_form',
  destroyOnUnmount:false,
  initialValues : {
  serves : 1,
  description:"",
  "serving_difficulty":"easy",
  "prepTime":0,
  "preptime_unit": "minute",
  cookTime:0,
  "cooktime_unit": "minute",
  vegetarian:false,
  kosher:false,
  vegan:false,
  coelaic:false,
  paleo:false,
  keto:false,
}
})(NutritionMealDetails)

const selector = formValueSelector('nutrition_meal_add_form');

const mapStateToProps = (state) => {
  const serves = selector(state,'serves')
  const prepTime = selector(state,'prepTime')
  const cookTime = selector(state,'cookTime')
  return {
    serves : serves,
    prepTime : prepTime,
    cookTime : cookTime,
  }
}

export default connect(mapStateToProps)(NutritionMealDetails)

const difficultyList = [
  {name: "Easy",value: "easy"},
  {name: "Medium",value: "medium"},
  {name: "Hard",value: "hard"},
]
const timeList = [
  {name: "Minutes",value: "minute"},
  {name: "Seconds",value: "second"},
]

const renderInputField = ({input,
  meta,
  className,
  name,
  type,

}) => {
   return (
     <input {...input} type={type} className="form-control" name={name} />
   )
}

const renderSelectField = ({input,
  meta,
  className,
  name,
  list=[]}) => {

   return (
     <select {...input} className="form-control" name={name} >
       {list.map((data,i) => <option key={i} value={data.value}>{data.name}</option>)}
     </select>
   )
}

const renderCheckBoxField = ({input,
  meta,
  className,
  name,
  type,
  id}) =>
  <React.Fragment>
      <input {...input} type="checkbox" id={id} name={name} defaultChecked={false} />
      <label className="mb-0" htmlFor={id} name={name} ></label>
  </React.Fragment>
