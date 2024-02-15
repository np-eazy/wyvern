import { useState } from "react";
import { InputLine } from "./InputLine";
import { debug } from "../styles";
import { OutputLine } from "./OutputLine";
import axios from "axios";
const displayStyle = {
    ...debug,
    width: 640,
}

export const evaluate = async (line, sessionId) => {
    try {
        const requestBody = {
            "code": line,
            "sessionId": sessionId,
        }
        const response = await axios.post("https://42252c32-b614-4726-adbc-c12798ee0cf6-00-keyi8mxeqtv7.riker.replit.dev/eval", requestBody);
        const parsedResponse = parseResponse(response);
        console.log(JSON.stringify(parsedResponse));
        return JSON.stringify(parsedResponse);
    } catch (error) {
        console.error('Error making Axios call:', error);
    }
}

export const parseResponse = (response) => {
    const items = [];
    const serialized = response["data"]["serialized"];
    for (let key in serialized) {
        items.push(key + ": " + JSON.stringify(serialized[key]) + ", ");
    }
    return items;
}

export const Display = (props) => {
    const [lines, setLines] = useState([
        "lorem", "ipsum", "dolor"
    ]);
    const [ outputMappings, setOutputMappings ] = useState(new Map());

    const submitHandler = async (inputValue) => {
        setLines(lines.concat([inputValue]));
        const evaluation = await evaluate(inputValue, "abcde");

        const newOutputMappings = new Map(outputMappings);
        newOutputMappings.set(inputValue, evaluation);

        setOutputMappings(newOutputMappings);
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
