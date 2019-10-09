import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FileField_Dropzone_Single } from '../../../helpers/FormControlHelper';
import { connect } from 'react-redux';

class NutritionMealPhotoes extends Component {
  state = {
    images: [],
  };
  render() {
    const { images } = this.state;
    return (
      <React.Fragment>
        <div className="upload-gallery width-100-per">
          <Field
            name="images"
            labelClass="control-label display_block"
            mainWrapperClass="image-form-main-wrapper ingredient-image"
            wrapperClass="form-group width-100-per"
            placeholder="Images"
            component={FileField_Dropzone_Single}
            existingImages={images}
            showExistingImageDeleteModel={path =>
              this.handleDeleteImageModel(true, path)
            }
          />
        </div>
      </React.Fragment>
    );
  }
}
NutritionMealPhotoes = reduxForm({
  form: 'nutrition_meal_add_form',
  destroyOnUnmount: false,
})(NutritionMealPhotoes);

export default connect()(NutritionMealPhotoes);
