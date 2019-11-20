import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NutritionMealIngredientItems from "./NutritionMealIngredientItems";
import { Scrollbars } from "react-custom-scrollbars";
import SweetAlert from "react-bootstrap-sweetalert";
import NoRecordFound from "../../Common/NoRecordFound";

class NutritionMealIngredientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeMealIndex: null,
      showDeleteAlert: false
    };
  }
  render() {
    const { storeMealIndex, showDeleteAlert } = this.state;
    const { handleChangeIngredientTab, ingredient_list } = this.props;
    return (
      <React.Fragment>
        <div className="ingredient-sidebar">
          <div className="ingredient-header d-flex flex-wrap align-items-center">
            <h3>Ingredient</h3>
            <button
              className="ml-auto"
              onClick={() => handleChangeIngredientTab(false)}
            >
              <FontAwesomeIcon icon="chevron-circle-left" />
            </button>
          </div>
          <div className="ingredient-list">
            <Scrollbars autoHide>
              {ingredient_list.map((ingredient, index) => (
                <NutritionMealIngredientItems
                  key={index}
                  id={index}
                  ingredient={ingredient}
                  changeServing={this.props.changeServing}
                  ingredientUnit={this.props.ingredientUnit}
                  meal_proximates={this.props.meal_proximates[index]}
                  handleChangeDelete={this.handleChangeDelete}
                />
              ))}
              {/* {ingredient_list.length === 0 && (
                <div className="nutrition-box">
                  <div className="nutrition-header align-items-center">
                    <div className="title ml-auto mr-auto">No Record Found</div>
                  </div>
                </div>
              )} */}
              {ingredient_list.length === 0 && (
                <NoRecordFound title="No ingredients found." />
              )}
            </Scrollbars>
          </div>
          <SweetAlert
            customClass="sweetalert-responsive"
            type="default"
            title={`Are sure want to delete it ?`}
            onCancel={() => {
              this.setState({
                storeMealIndex: null,
                showDeleteAlert: false
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
        </div>
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

export default NutritionMealIngredientList;
