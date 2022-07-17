import "./App.css";
import Buttons from "./components/Buttons";
import Output from "./components/Output";
import Formula from "./components/Formula";
import { useState } from "react";

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

function App() {
  const [currentVal, setCurrentVal] = useState("0");
  const [prevVal, setPrevVal] = useState("0");
  const [formula, setFormula] = useState("");
  const [currentSign, setCurrentSign] = useState("pos");
  const [lastClicked, setLastClicked] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const maxDigitWarning = () => {
    setCurrentVal("Digit Limit Met");
    setPrevVal(currentVal);
  };

  const handleEvaluate = () => {
    if (!currentVal.includes("Limit")) {
      let expression = formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression
        .replace(/x/g, "*")
        .replace(/-/g, "-")
        .replace("--", "+0+0+0+0+0+0+");
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      setCurrentVal(answer.toString());
      setFormula(
        expression
          .replace(/\*/g, "⋅")
          .replace(/-/g, "-")
          .replace("+0+0+0+0+0+0+", "--")
          .replace(/(x|\/|\+)-/, "$1-")
          .replace(/^-/, "-") +
          "=" +
          answer
      );
      setPrevVal(answer);
      setEvaluated(true);
    }
  };

  const handleOperators = (e) => {
    if (!currentVal.includes("Limit")) {
      const value = e.target.value;
      setCurrentVal(value);
      setEvaluated(false);
      if (evaluated) {
        setFormula(prevVal + value);
      } else if (!endsWithOperator.test(formula)) {
        setPrevVal(formula);
        setFormula(formula + value);
      } else if (!endsWithNegativeSign.test(formula)) {
        setFormula(
          (endsWithNegativeSign.test(formula + value) ? formula : prevVal) +
            value
        );
      } else if (value !== "-") {
        setFormula(prevVal + value);
      }
    }
  };

  const handleNumbers = (e) => {
    if (!currentVal.includes("Limit")) {
      const value = e.target.value;
      setEvaluated(false);
      if (currentVal.length > 21) {
        maxDigitWarning();
      } else if (evaluated) {
        setCurrentVal(value);
        setFormula(value !== "0" ? value : "");
      } else {
        setCurrentVal(
          currentVal === "0" || isOperator.test(currentVal)
            ? value
            : currentVal + value
        );
        setFormula(
          currentVal === "0" && value === "0"
            ? formula === ""
              ? value
              : formula
            : /([^.0-9]0|^0)$/.test(formula)
            ? formula.slice(0, -1) + value
            : formula + value
        );
      }
    }
  };

  const handleDecimal = () => {
    if (evaluated === true) {
      setCurrentVal("0");
      setFormula("0");
      setEvaluated(false);
    } else if (!currentVal.includes(".") && !currentVal.includes("Limit")) {
      setEvaluated(false);
      if (currentVal.length > 21) {
        maxDigitWarning();
      } else if (
        endsWithOperator.test(formula) ||
        (currentVal === "0" && formula === "")
      ) {
        setCurrentVal("0.");
        setFormula(formula + "0.");
      }
    } else {
      setCurrentVal("0.");
      setFormula(formula + "0.");
    }
  };

  const initialize = () => {
    setCurrentVal("0");
    setPrevVal("0");
    setFormula("");
    setCurrentSign("pos");
    setLastClicked("");
    setEvaluated(false);
  };

  return (
    <div className="App">
      <div className="calculator">
        <Formula formula={formula.replace(/x/g, "⋅")} />
        <Output currentValue={currentVal} />
        <Buttons
          decimal={handleDecimal}
          evaluate={handleEvaluate}
          initialize={initialize}
          numbers={handleNumbers}
          operators={handleOperators}
        />
      </div>
    </div>
  );
}

export default App;
