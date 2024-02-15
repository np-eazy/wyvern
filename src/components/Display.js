import { useState } from "react";
import { InputLine } from "./InputLine";
import { debug } from "../styles";
import { evaluate } from "../api/api";
import { OutputLine } from "./OutputLine";

const displayStyle = {
    ...debug,
    width: 640,
}

export const Display = (props) => {
    const [lines, setLines] = useState([
        "lorem", "ipsum", "dolor"
    ]);
    const [ outputMappings, setOutputMappings ] = useState(new Map());

    const submitHandler = (inputValue) => {
        setLines(lines.concat([inputValue]));
        outputMappings.set(inputValue, evaluate(inputValue));
        setOutputMappings(outputMappings);
    };

    // TEST
    return (<div style={displayStyle}>
        {lines && lines.map((line) => {
            return (<div>
                <div>
                    <InputLine contents={line} needsUserInput={false} submitHandler={() => {}} />
                </div>
                {(outputMappings && outputMappings.get(line)) ? <div>
                    <OutputLine contents={outputMappings.get(line)} needsUserInput={false} submitHandler={() => {}} />
                </div> : <></>}
            </div>)
        })}
        <InputLine contents={""} needsUserInput={true} submitHandler={submitHandler}/>
    </div>);
}
