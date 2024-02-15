import { useState } from "react";
import { InputLine } from "./InputLine";
import { debug } from "../styles";

const displayStyle = {
    ...debug,
    width: 640,
}

export const Display = (props) => {
    const [lines, setLines] = useState([
        "lorem", "ipsum", "dolor"
    ]);

    // TEST
    return (<div style={displayStyle}>
        {lines && lines.map((line) => {
            return (<div>
                <InputLine contents={line}/>
            </div>)
        })}
    </div>);
}
