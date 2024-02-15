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
        return response;
    } catch (error) {
        console.error('Error making Axios call:', error);
    }
}

export const Display = (props) => {
    const [lines, setLines] = useState([]);
    const [ outputMappings, setOutputMappings ] = useState(new Map()); // Only the roots, which are what are rendered
    const [ environment, setEnvironment ] = useState(new Map()); // 


    const submitHandler = async (inputValue) => {
        const response = await evaluate(inputValue, props.sessionId); // API call
        if (response) {
            const newEnvironment = new Map(environment); 
            // Add all seria
                
            // Add root to outputMappings for rendering later
            const newOutputMappings = new Map(outputMappings);
            newOutputMappings.set(environment.get(response["data"]["root"]), parseResponse(response["data"]["serialized"], response["data"]["root"], newEnvironment)); 
    
            lines.push([inputValue, response["data"]["root"]])
    
            setLines(lines);
            setOutputMappings(newOutputMappings);
            setEnvironment(newEnvironment);
        }
    };

    // TEST
    return (<div style={displayStyle}>
        {lines && lines.map((line) => {
            return (<div>
                <div>
                    <InputLine contents={line[0]} needsUserInput={false} submitHandler={() => {}} />
                    <OutputLine envKey={line[1]} environment={environment} />
                </div>
            </div>)
        })}
        <InputLine contents={""} needsUserInput={true} submitHandler={submitHandler}/>
    </div>);
}
