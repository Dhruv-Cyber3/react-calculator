import React from "react";

const isOperator = /[x/+-]/,
  endsWithOperator = /[x+-/]$/,
  endsWithNegativeSign = /\d[x/+-]{1}-$/,
  clearStyle = { background: "#ac3939" },
  operatorStyle = { background: "#666666" },
  equalsStyle = {
    background: "#004466",
    position: "absolute",
    height: 130,
    bottom: 5,
  };

const Buttons = (props) => {
  return (
    <div>
      <button
        className="jumbo"
        id="clear"
        onClick={props.initialize}
        style={clearStyle}
        value="AC"
      >
        AC
      </button>
      <button
        id="divide"
        onClick={props.operators}
        style={operatorStyle}
        value="/"
      >
        /
      </button>
      <button
        id="multiply"
        onClick={props.operators}
        style={operatorStyle}
        value="x"
      >
        x
      </button>
      <button id="seven" onClick={props.numbers} value="7">
        7
      </button>
      <button id="eight" onClick={props.numbers} value="8">
        8
      </button>
      <button id="nine" onClick={props.numbers} value="9">
        9
      </button>
      <button
        id="subtract"
        onClick={props.operators}
        style={operatorStyle}
        value="‑"
      >
        ‑
      </button>
      <button id="four" onClick={props.numbers} value="4">
        4
      </button>
      <button id="five" onClick={props.numbers} value="5">
        5
      </button>
      <button id="six" onClick={props.numbers} value="6">
        6
      </button>
      <button
        id="add"
        onClick={props.operators}
        style={operatorStyle}
        value="+"
      >
        +
      </button>
      <button id="one" onClick={props.numbers} value="1">
        1
      </button>
      <button id="two" onClick={props.numbers} value="2">
        2
      </button>
      <button id="three" onClick={props.numbers} value="3">
        3
      </button>
      <button className="jumbo" id="zero" onClick={props.numbers} value="0">
        0
      </button>
      <button id="decimal" onClick={props.decimal} value=".">
        .
      </button>
      <button
        id="equals"
        onClick={props.evaluate}
        style={equalsStyle}
        value="="
      >
        =
      </button>
    </div>
  );
};

export default Buttons;
