import React, { Component } from 'react';
import noImage from '../../../assets/img/common/no-img.png';
import { SERVER_BASE_URL } from '../../constants/consts';
import NutritionMealViewItems from './NutritionMealViewItems';

class NutritionMealViewForm extends Component {
  state = {
    cuurentTab: '#Ingredients',
    meal_ingredient: [],
  };

  render() {
    const { mealDetails } = this.props;
    let meal_details = mealDetails;

    const changeServing = (id, _vobj, serving_size, unit, count) => {
      // console.log("value =>", id, vobj, serving_size, unit, typeof count);
      try {
        const meal_ingredient = meal_details.ingredient_detail;
        let _array = meal_ingredient;
        let vobj = _vobj;
        console.log('vobj => ', vobj);
        if (serving_size) {
          vobj.serving_input = serving_size;
        }
        if (unit) {
          vobj.ingredient_unit = unit;
        }
        if (count) {
          vobj.count = count;
        }
        if (vobj._id) {
          vobj.ingredient_id = vobj._id;
        }
        if (vobj.serving_input && vobj.ingredient_unit && vobj.count) {
          if (vobj.ingredient_unit !== 'g') {
            console.log(vobj.serving_input, vobj.ingredient_unit, vobj.count);
            // gram_total
            var _serving_size = vobj.serving_input * vobj[vobj.ingredient_unit];

            if (Number(vobj.energyKcal) !== NaN) {
              vobj.totalKcl = (
                ((_serving_size * Number(vobj.energyKcal)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            if (Number(vobj.fat) !== NaN) {
              vobj.totalfat = (
                ((_serving_size * Number(vobj.fat)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            if (Number(vobj.protein) !== NaN) {
              vobj.totalProtein = (
                ((_serving_size * Number(vobj.protein)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            if (Number(vobj.carbohydrate) !== NaN) {
              vobj.totalCarbs = (
                ((_serving_size * Number(vobj.carbohydrate)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            console.log(
              'Number(vobj.totalSugars) => ',
              Number(vobj.totalSugars),
              NaN,
            );
            if (Number(vobj.totalSugars) !== NaN) {
              vobj.totalSugar = (
                ((_serving_size * Number(vobj.totalSugars)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            if (Number(vobj.water) !== NaN) {
              vobj.totalWater = (
                ((_serving_size * Number(vobj.water)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            if (Number(vobj.starch) !== NaN) {
              vobj.totalStarch = (
                ((_serving_size * Number(vobj.starch)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            if (Number(vobj.cholesterol) !== NaN) {
              vobj.totalCholesterol = (
                ((_serving_size * Number(vobj.cholesterol)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
          } else {
            if (Number(vobj.energyKcal) !== NaN) {
              vobj.totalKcl = (
                ((vobj.serving_input * Number(vobj.energyKcal)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            if (Number(vobj.fat) !== NaN) {
              vobj.totalfat = (
                ((vobj.serving_input * Number(vobj.fat)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            if (Number(vobj.protein) !== NaN) {
              vobj.totalProtein = (
                ((vobj.serving_input * Number(vobj.protein)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            if (Number(vobj.carbohydrate) !== NaN) {
              vobj.totalCarbs = (
                ((vobj.serving_input * Number(vobj.carbohydrate)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            // console.log('Number(vobj.totalSugars) => ', Number(vobj.totalSugars), NaN, Number(vobj.totalSugars) !== NaN, vobj.totalSugars);
            if (Number(vobj.totalSugars) !== NaN) {
              vobj.totalSugar = (
                ((vobj.serving_input * Number(vobj.totalSugars)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            if (Number(vobj.water) !== NaN) {
              vobj.totalWater = (
                ((vobj.serving_input * Number(vobj.water)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            if (Number(vobj.starch) !== NaN) {
              vobj.totalStarch = (
                ((vobj.serving_input * Number(vobj.starch)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
            if (Number(vobj.cholesterol) !== NaN) {
              vobj.totalCholesterol = (
                ((vobj.serving_input * Number(vobj.cholesterol)) / 100) *
                Number(vobj.count)
              ).toFixed(2);
            }
          }
        }
        delete vobj._id;
        _array[id] = vobj;
        meal_details.ingredient_detail = _array;
        console.log('meal_details====>', meal_details);
      } catch (error) {
        console.log('error => ', error);
      }
    };

    console.log('this.props.mealDetails', this.props.mealDetails);
    meal_details &&
      meal_details.ingredientsIncluded.forEach((item, index) => {
        changeServing(
          index,
          meal_details.ingredient_detail[index],
          item.serving_input,
          item.ingredient_unit,
          item.count,
        );
      });
    return (
      <React.Fragment>
        {meal_details && (
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
                    value={meal_details.title}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <select
                    type="text"
                    className="form-control"
                    defaultValue={meal_details.meals_type}
                    disabled
                  >
                    <option>select meals</option>
                    <option>{meal_details.meals_type}</option>
                  </select>
                </div>
                <div className="form-group">
                  <select
                    type="text"
                    className="form-control"
                    defaultValue={meal_details.meals_visibility}
                    disabled
                  >
                    <option>Meal Visibility</option>
                    <option>{meal_details.meals_visibility}</option>
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
                      {meal_details.ingredient_detail.map((item, index) => {
                        return (
                          <NutritionMealViewItems
                            meal={item}
                            ingredient={meal_details.ingredientsIncluded[index]}
                            key={index}
                          />
                        );
                      })}
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
                            <img
                              src={
                                meal_details.image
                                  ? SERVER_BASE_URL + mealDetails.image
                                  : noImage
                              }
                              alt="Image"
                            />
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
                        <textarea
                          className="form-control"
                          value={meal_details.instructions}
                          disabled
                        >
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
                        <textarea
                          className="form-control"
                          value={meal_details.notes}
                          disabled
                        >
                          Apple Meal with juice
                        </textarea>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default NutritionMealViewForm;
