import React, { Component } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { ClearButton } from "./components/ClearButton";
import { OperatorButton} from "./components/OperatorButton";
import { FunctionButton } from "./components/FunctionButton";
import * as math from "mathjs";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",            //Number displayed on UI input
      previousNumber: "",   //Used to save first input of operation
      currentNumber: "",    //Copy of input to be manipulated by operator
      operator: ""          //Two-parameter operation being used
    };
  }

  /*-------------------------------Input----------------------------*/
  addToInput = val => {
    this.setState({ input: this.state.input + val });
  };

  addDecimalToInput = val => {
    //Prevent more than one decimal being added to input
    if (this.state.input.indexOf(".") === -1) {
      this.setState({ input: this.state.input + val });
    }
  };

  addPiToInput = () => {

    if (this.state.input === "") {
      this.setState({ input: math.pi });
    }
  };

  addZeroToInput = val => {
    //Prevent leading zeroes from being added
    if (this.state.input !== "") {
      this.setState({ input: this.state.input + val });
    }
  };

/*----------------------------------Functions-----------------------------*/
  handleFunction = val => {
    this.state.currentNumber = this.state.input;

    if (val === "sin") {
      this.setState({
        input:
          Math.sin(this.state.currentNumber)
      });
    } else if (val === "cos") {
      this.setState({
        input:
        Math.cos(this.state.currentNumber)
      });
    } else if (val === "tan") {
      this.setState({
        input:
        Math.tan(this.state.currentNumber)
      });
    } else if (val === "x!") {
      this.setState({
        input:
          math.factorial(this.state.currentNumber)
      });
    } else if (val === "x^2") {
      this.setState({
        input:
        math.square(this.state.currentNumber)
      });
    } else if (val === "(2)sqrt(x)") {
      this.setState({
        input:
        math.sqrt(this.state.currentNumber)
      });
    } else if (val === "log10") {
      this.setState({
        input:
          math.log10(this.state.currentNumber)
      });
    } else if (val === "+/-") {
      this.setState({
        input:
          (this.state.currentNumber * -1)
      });
    }
  };

/*---------------------------------Operators----------------------------------*/

//These operators require two inputs to be accurately evluated by "handleEqual"

  add = () => {
    this.setState({ previousNumber: this.state.input});
    this.setState({ input: "" });
    this.setState({ operator: "plus"});
  };
  
  subtract = () => {
    this.setState({ previousNumber: this.state.input});
    this.setState({ input: "" });
    this.setState({ operator: "subtract"});
  };

  divide = () => {
    this.setState({ previousNumber: this.state.input});
    this.setState({ input: "" });
    this.setState({ operator: "divide"});
  };

  multiply = () => {
    this.setState({ previousNumber: this.state.input});
    this.setState({ input: "" });
    this.setState({ operator: "multiply"});
  };

  power = () => {
    this.setState({ previousNumber: this.state.input});
    this.setState({ input: "" });
    this.setState({ operator: "power"});
  };

  nthRoot = () => {
    this.setState({ previousNumber: this.state.input});
    this.setState({ input: "" });
    this.setState({ operator: "root"});
  };

  logarithm = () => {
    this.setState({ previousNumber: this.state.input});
    this.setState({ input: "" });
    this.setState({ operator: "logarithm"});
  };

  clear = () => {
    this.setState({ input: ""});
    this.setState({ previousNumber: ""});
    this.setState({ currentNumber: ""});
    this.setState({ operator: ""});
  };

//Behavior of handleEqual is determined by the operator queued into state.operator
  handleEqual = () => {
    this.state.currentNumber = this.state.input;

    if (this.state.operator === "plus") {
      this.setState({
        input:
          parseFloat(this.state.previousNumber) +
          parseFloat(this.state.currentNumber)
      });
    } else if (this.state.operator === "subtract") {
      this.setState({
        input:
          parseFloat(this.state.previousNumber) -
          parseFloat(this.state.currentNumber)
      });
    } else if (this.state.operator === "multiply") {
      this.setState({
        input:
          parseFloat(this.state.previousNumber) *
          parseFloat(this.state.currentNumber)
      });
    } else if (this.state.operator === "divide") {
      this.setState({
        input:
          parseFloat(this.state.previousNumber) /
          parseFloat(this.state.currentNumber)
      });
    } else if (this.state.operator === "power") {
      this.setState( 
        {input: math.pow(this.state.previousNumber,this.state.currentNumber)} 
      );
    } else if (this.state.operator === "root") {
      this.setState( 
        {input: math.nthRoot(this.state.previousNumber,this.state.currentNumber)}
      );
    } else if (this.state.operator === "logarithm") {
      this.setState( 
        {input: math.log(this.state.previousNumber,this.state.currentNumber)}
      );
    }

    this.setState({operator: ""});
  };

  /*----------------------------------------App---------------------------------------*/
  render() {
    return (
      <div className="App">
        <div className="calc-wrapper">
          <Input input={this.state.input}/>
          <div className="row">
            <ClearButton handleClick={() => this.clear()}>Clear</ClearButton>
          </div>
          <div className="row">
            <Button handleClick ={this.addToInput}>7</Button>
            <Button handleClick ={this.addToInput}>8</Button>
            <Button handleClick ={this.addToInput}>9</Button>
            <OperatorButton handleClick ={() => this.divide()}>/</OperatorButton>
          </div>
          <div className="row">
            <Button handleClick ={this.addToInput}>4</Button>
            <Button handleClick ={this.addToInput}>5</Button>
            <Button handleClick ={this.addToInput}>6</Button>
            <OperatorButton handleClick ={() => this.multiply()}>*</OperatorButton>
          </div>
          <div className="row">
            <Button handleClick ={this.addToInput}>1</Button>
            <Button handleClick ={this.addToInput}>2</Button>
            <Button handleClick ={this.addToInput}>3</Button>
            <OperatorButton handleClick ={() => this.add()}>+</OperatorButton>
          </div>
          <div className="row">
            <Button handleClick ={this.addZeroToInput}>0</Button>
            <Button handleClick ={this.addDecimalToInput}>.</Button>
            <OperatorButton handleClick ={() => this.handleEqual()}>=</OperatorButton>
            <OperatorButton handleClick ={() => this.subtract()}>-</OperatorButton>
          </div>
          <div className="row">
            <FunctionButton handleClick ={this.handleFunction}>sin</FunctionButton>
            <FunctionButton handleClick ={this.handleFunction}>cos</FunctionButton>
            <FunctionButton handleClick ={this.handleFunction}>tan</FunctionButton>
            <Button handleClick ={this.addPiToInput}>π</Button>
          </div>
          <div className="row">
            <FunctionButton handleClick ={this.handleFunction}>x^2</FunctionButton>
            <FunctionButton handleClick ={this.handleFunction}>(2)sqrt(x)</FunctionButton>
            <FunctionButton handleClick ={this.handleFunction}>log10</FunctionButton>
            <FunctionButton handleClick ={this.handleFunction}>+/-</FunctionButton>
          </div>
          <div className="row">
            <FunctionButton handleClick ={() => this.power()}>x^y</FunctionButton>
            <FunctionButton handleClick ={() => this.nthRoot()}>(y)sqrt(x)</FunctionButton>
            <FunctionButton handleClick ={() => this.logarithm()}>logx</FunctionButton>
            <FunctionButton handleClick ={this.handleFunction}>x!</FunctionButton>
          </div>
        </div>
      </div>
    );
    }
  }
  
  export default App;