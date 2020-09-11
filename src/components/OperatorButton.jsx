import React from "react";
import "./OperatorButton.css";

export const OperatorButton = (props) => (
    <div 
        className="operator" 
        onClick={() => props.handleClick(props.children)}
    >
        {props.children}
    </div>
)