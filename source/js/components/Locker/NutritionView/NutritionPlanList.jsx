import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import NutritionPlanListItems from "./NutritionPlanListItems";
import { FaCircleONotch } from "react-icons/lib/fa";

class NutritionPlanList extends Component {
  render() {
    const { loading = false, nutritionPrograms, userId } = this.props;
    return (
      <React.Fragment>
        <Scrollbars autoHide>
          <div className="locker-exercise-list">
            {loading && (
              <div className="loader ml-3 mr-3" key={0}>
                <FaCircleONotch className="loader-spinner loader-spinner-icon mr-1" />
                Loading ...
              </div>
            )}
            {!loading && (
              <ul className="locker-exercise-items">
                {nutritionPrograms &&
                  nutritionPrograms.length > 0 &&
                  nutritionPrograms.map((item, i) => (
                    <NutritionPlanListItems
                      nutritionPlan={item}
                      key={i}
                      userId={userId}
                    />
                  ))}
              </ul>
            )}
          </div>
        </Scrollbars>
      </React.Fragment>
    );
  }
}

export default NutritionPlanList;
