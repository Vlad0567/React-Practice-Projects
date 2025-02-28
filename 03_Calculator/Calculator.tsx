import { useReducer } from "react";
import "./Calculator.css";


const initialState = {
  input: "0",
};

type CalculatorState = {
  input: string;
};

type CalculatorAction =
  | { type: "CLEAR" }
  | { type: "DELETE" }
  | { type: "ADD_DIGIT"; payload: string }
  | { type: "ADD_OPERATOR"; payload: string }
  | { type: "EVALUATE" };

const calculatorReducer = (state: CalculatorState, action: CalculatorAction) => {
  switch (action.type) {
    case "CLEAR":
      return { input: "0" };

    case "DELETE":
      return { input: state.input.length > 1 ? state.input.slice(0, -1) : "0" };

    case "ADD_DIGIT":
      return {
        input: state.input === "0" ? action.payload : state.input + action.payload,
      };

    case "ADD_OPERATOR":
      return { input: state.input + action.payload };

    case "EVALUATE":
      try {
        return { input: eval(state.input).toString() };
      } catch {
        return { input: "Ошибка" };
      }

    default:
      return state;
  }
};


const Calculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  return (
    <div className="calculator">
      <div className="display">{state.input}</div>

      <div className="buttons">
        <button onClick={() => dispatch({ type: "CLEAR" })}>C</button>
        <button onClick={() => dispatch({ type: "DELETE" })}>⌫</button>
        <button className="equal" onClick={() => dispatch({ type: "EVALUATE" })}>=</button>
        <button onClick={() => dispatch({ type: "ADD_OPERATOR", payload: "*" })}>×</button>

        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "7" })}>7</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "8" })}>8</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "9" })}>9</button>
        <button onClick={() => dispatch({ type: "ADD_OPERATOR", payload: "/" })}>÷</button>
        
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "4" })}>4</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "5" })}>5</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "6" })}>6</button>
        <button onClick={() => dispatch({ type: "ADD_OPERATOR", payload: "-" })}>-</button>
        
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "1" })}>1</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "2" })}>2</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "3" })}>3</button>
        <button onClick={() => dispatch({ type: "ADD_OPERATOR", payload: "+" })}>+</button>

        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "." })}>.</button>
        <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: "0" })}>0</button>
      
      </div>
    </div>
  );
};

export default Calculator;
