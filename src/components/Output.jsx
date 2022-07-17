import React from "react";

const Output = (props) => {
  return (
    <div className="outputScreen" id="display">
      {props.currentValue}
    </div>
  );
};

export default Output;
