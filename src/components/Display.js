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
        const response = await axios.get(process.env.OPENAPI_URL + "/eval", requestBody);
        return response;
    } catch (error) {
        console.error('Error making Axios call:', error);
    }
}

export const Display = (props) => {
    const [lines, setLines] = useState([
        "lorem", "ipsum", "dolor"
    ]);
    const [ outputMappings, setOutputMappings ] = useState(new Map());

    const submitHandler = async (inputValue) => {
        setLines(lines.concat([inputValue]));
        outputMappings.set(inputValue, await evaluate(inputValue));
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
