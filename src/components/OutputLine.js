import { useEffect, useRef, useState } from "react";
import { debug } from "../styles";

const outputLineStyle = {
    ...debug,
    borderColor: "#cccccc",
    textAlign: "left",
    // width: "100%",
    height: 20,
    margin: 2,
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 12,
}

export const OutputLine = ({ contents, needsUserInput, submitHandler }) => {
    return (
        <div style={outputLineStyle}>
            {contents} 
        </div>
    );
}
