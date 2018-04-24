import React, { Component } from "react";
import noImg from "img/common/no-img.png";
import { SERVER_BASE_URL } from "../../constants/consts";
import { Field, reduxForm } from "redux-form";

class EquipmentsContentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipmentCheck: props.data.isAvailable ? true : false
    };
    props.change(props.data._id, props.data.isAvailable ? true : false);
  }

  render() {
    const { data } = this.props;
    const { equipmentCheck } = this.state;
    if (data) {
      return (
        <div
          className={
            "machine-box " + (data.isAvailable === true ? "active" : "")
          }
        >
          <span>
            <img
              src={SERVER_BASE_URL + data.image}
              alt="Avatar"
              className="avatar"
              onError={e => {
                e.target.src = noImg;
              }}
            />
          </span>
          <h4>{data.name}</h4>
          <h6>
            <Field
              id={data._id}
              name={data._id}
              className="styled-checkbox"
              wrapperClass="form-group"
              component={EquipmentsCheckboxField}
              checked={equipmentCheck}
              handleClick={this.handleCheckboxCheck}
            />
            <i className="icon-check" />
          </h6>
        </div>
      );
    }
    return null;
  }

  handleCheckboxCheck = (field, value) => {
    this.props.change(field, value);
    this.setState({
      equipmentCheck: value
    });
  };
}

export default reduxForm({
  form: "userEquipmentsForm"
})(EquipmentsContentItem);

const EquipmentsCheckboxField = props => {
  const {
    input,
    wrapperClass,
    className,
    errorClass,
    checked,
    handleClick,
    id
  } = props;
  return (
    <div className={wrapperClass}>
      <input
        {...input}
        id={id}
        type="checkbox"
        className={className}
        checked={checked}
        onClick={e => handleClick(e.target.name, e.target.checked)}
      />
      <label for={id}></label>
    </div>
  );
};
