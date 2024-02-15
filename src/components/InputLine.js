import { useState } from "react";
import { debug } from "../styles";

const inputLineStyle = {
    ...debug,
    textAlign: "left",
    // width: "100%",
    height: 20,
    margin: 2,
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 12,
}

export const InputLine = (props) => {
    return (<div style={inputLineStyle}>
        {props.contents}
    </div>);
}
