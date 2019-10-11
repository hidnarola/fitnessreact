import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SweetAlert from 'react-bootstrap-sweetalert';

class NutritionMealCreateLeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeMealIndex: null,
      showDeleteAlert: false,
    };
  }

  render() {
    const {
      handleChangeIngredientTab,
      ingredient_list,
      meal_proximates,
      changeServing,
      ingredientUnit,
      handleRemoveIngredient,
    } = this.props;
    let { storeMealIndex, showDeleteAlert } = this.state;
    let ingredientList = [];
    ingredientList = ingredientUnit(meal_proximates);

    return (
      <React.Fragment>
        <div className="ingredient-sidebar">
          <div className="ingredient-header d-flex flex-wrap align-items-center">
            <h3>Ingredient</h3>
            <button
              className="ml-auto"
              onClick={() => handleChangeIngredientTab(true)}
            >
              <FontAwesomeIcon icon="chevron-circle-right" />
            </button>
          </div>
          <div className="ingredient-body">
            <ul>
              {ingredient_list.map((ingredient, index) => (
                <li key={index}>
                  <div className="ingredient-items">
                    <div className="box-header d-flex flex-wrap align-items-center">
                      <h3>{meal_proximates[index].foodName}</h3>
                      <div
                        className="btn-delete"
                        onClick={() => this.handleChangeDelete(index)}
                      >
                        <FontAwesomeIcon icon="trash-alt" />
                      </div>
                    </div>
                    <div className="row box-inputs no-gutters width-100-per">
                      <div className="col-xs-12 col-lg-5">
                        <div className="serving-boxs">
                          <button
                            className="btn btn-minus"
                            onClick={e =>
                              changeServing(
                                index,
                                ingredient,
                                ingredient.serving_input === 0
                                  ? parseInt(ingredient.serving_input)
                                  : parseInt(ingredient.serving_input) - 1,
                                null,
                                null,
                              )
                            }
                          >
                            <FontAwesomeIcon icon="minus" />
                          </button>
                          <input
                            type="number"
                            className="form-control"
                            value={ingredient.serving_input}
                            onChange={e =>
                              changeServing(
                                index,
                                ingredient,
                                parseInt(e.target.value),
                                null,
                                null,
                              )
                            }
                          />
                          <button
                            className="btn btn-plus"
                            onClick={e =>
                              changeServing(
                                index,
                                ingredient,
                                parseInt(ingredient.serving_input) + 1,
                                null,
                                null,
                              )
                            }
                          >
                            <FontAwesomeIcon icon="plus" />
                          </button>
                        </div>
                      </div>
                      <div className="col-xs-12 col-lg-7">
                        <div className="serving-select">
                          <select
                            className="form-control"
                            value={ingredient.ingredient_unit}
                            onChange={e =>
                              this.props.changeServing(
                                index,
                                ingredient,
                                null,
                                e.target.value,
                                null,
                              )
                            }
                          >
                            {this.props
                              .ingredientUnit(meal_proximates)
                              .map((item, i) => (
                                <option key={i} value={item.value}>
                                  {item.label}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              {ingredient_list.length === 0 && (
                <li>
                  <div className="ingredient-items">
                    <div className="box-header d-flex flex-wrap align-items-center">
                      <h3>No Record Found</h3>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
        <SweetAlert
          customClass="sweetalert-responsive"
          type="default"
          title={`Are sure want to delete it ?`}
          onCancel={() => {
            this.setState({
              storeMealIndex: null,
              showDeleteAlert: false,
            });
          }}
          onConfirm={() => this.handleConfirmDelete()}
          btnSize="sm"
          cancelBtnBsStyle="danger"
          show={showDeleteAlert}
          showConfirm={true}
          showCancel={true}
          closeOnClickOutside={false}
        />
      </React.Fragment>
    );
  }
  handleChangeDelete = index => {
    this.setState({ storeMealIndex: index, showDeleteAlert: true });
  };
  handleConfirmDelete = () => {
    const { storeMealIndex } = this.state;
    if (storeMealIndex !== null) {
      this.props.handleRemoveIngredient(storeMealIndex);
    }
    this.setState({ showDeleteAlert: false });
  };
}

export default NutritionMealCreateLeftSidebar;
