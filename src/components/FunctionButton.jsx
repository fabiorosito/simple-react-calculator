import React from "react";
import "./FunctionButton.css";

export const FunctionButton = (props) => (
    <div 
        className="function" 
        onClick={() => props.handleClick(props.children)}
    >
        {props.children}
    </div>
)