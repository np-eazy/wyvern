import { useState } from "react";
import { InputLine } from "./InputLine";
import { debug } from "../styles";
import { OutputLine } from "./OutputLine";
import axios from "axios";
import { parseResponse } from "../utils/parsing";
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
        return parsedResponse;
    } catch (error) {
        console.error('Error making Axios call:', error);
    }
}

export const Display = (props) => {
    const [lines, setLines] = useState([]);
    const [ outputMappings, setOutputMappings ] = useState(new Map());

    const submitHandler = async (inputValue) => {
        setLines(lines.concat([inputValue]));
        const evaluations = await evaluate(inputValue, "public");
        console.log(evaluations);
        const newOutputMappings = new Map(outputMappings);
        newOutputMappings.set(inputValue, evaluations);

        setOutputMappings(newOutputMappings);
    };

    // TEST
    return (<div style={displayStyle}>
        {lines && lines.map((line) => {
            return (<div>
                <div>
                    <InputLine contents={line} needsUserInput={false} submitHandler={() => {}} />
                </div>
                {(outputMappings && outputMappings.get(line) && outputMappings.get(line).length > 0) ? <div>
                    {outputMappings.get(line).map((element) => {
                        console.log(element);
                        return (<OutputLine element={element} />);
                    })}
                </div> : <div></div>}
            </div>)
        })}
        <InputLine contents={""} needsUserInput={true} submitHandler={submitHandler}/>
    </div>);
}
