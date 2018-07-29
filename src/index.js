import React, { Component } from "react";

require("./style.css");

class InputExponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };

    this.updateValue = this.updateValue.bind(this);
    this.updateExponent = this.updateExponent.bind(this);
  }

  updateValue(event) {
    this.setState({
      value: event.target.value
    });
  }

  updateExponent() {
    const asFloat = Number.parseFloat(this.state.value);
    const numDigits = asFloat.toString().length;
    if (numDigits >= this.props.convertAt) {
      this.setState({
        value: asFloat.toExponential(this.props.exponentDigits)
      });
    }
  }

  render() {
    const { exponentDigits, convertAt, ...rest } = this.props;

    let title = "";
    let value = this.state.value;

    if (value !== undefined) {
      const ePos = value.toString().indexOf("e");
      if (ePos > -1) {
        const eIsNegative = value.charAt(ePos + 1) === "-";
        const minimumFractionDigits = Math.max(
          0,
          Math.min(eIsNegative ? value.substring(ePos + 2) : 0, 20)
        );
        title = Number.parseFloat(this.state.value).toLocaleString(undefined, {
          minimumFractionDigits
        });
      }
    } else {
      value = "";
    }

    return (
      <input
        {...rest}
        className="react-input-exponent"
        type="number"
        title={title}
        value={value}
        onChange={this.updateValue}
        onBlur={this.updateExponent}
      />
    );
  }
}

InputExponent.defaultProps = {
  exponentDigits: 1,
  convertAt: 10
};

export default InputExponent;
