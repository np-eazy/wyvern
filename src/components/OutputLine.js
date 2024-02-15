import { useEffect, useRef, useState } from "react";
import { debug } from "../styles";

const outputLineStyle = {
    ...debug,
    borderColor: "#cccccc",
    textAlign: "left",
    // width: "100%",
    margin: 2,
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 12,
}

export const OutputLine = ({ element }) => {
    if (element.type == "array") {
        return (
            <div style={outputLineStyle}>
                {element.value} 
            </div>
        );
    } else if (element.type == "boolean") { // Primitive
        return (
            <div style={outputLineStyle}>
                {element.value ? "true" : "false"} 
            </div>
        );
    } else if (element.type == "number") { // Primitive
        return (
            <div style={outputLineStyle}>
                {element.value} 
            </div>
        );
    } else if (element.type == "undefined") { // Primitive
        return (
            <div style={outputLineStyle}>
                {"undefined"} 
            </div>
        );
    } else if (element.type == "error") { // Primitive
        return (
            <div style={outputLineStyle}>
                {"Error: " + element.value["message"]} 
            </div>
        );
    } else {
        return (
            <div style={outputLineStyle}>
                {element.value} 
            </div>
        );
    }
}
