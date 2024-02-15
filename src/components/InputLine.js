import { useEffect, useRef, useState } from "react";
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

export const InputLine = ({ contents, needsUserInput, submitHandler }) => {
    const [pendingUserInput, setpendingUserInput] = useState(needsUserInput);
    const [inputValue, setInputValue] = useState(contents || "");
    const inputRef = useRef(null);

    useEffect(() => {
        if (pendingUserInput) {
            inputRef.current.focus(); // Automatically focus on the input when component mounts if pendingUserInput is true
        }
    }, [pendingUserInput]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitHandler(inputValue); // Call the submitHandler function with the current input value
            setInputValue(''); // Optionally clear the input after submission
        }
    };

    const handleClick = () => {
        if (pendingUserInput) {
            inputRef.current.focus(); // Focus on the input when the div is clicked and pendingUserInput is true
        }
    };

    return (
        <div style={inputLineStyle} onMouseDown={handleClick} onKeyDown={handleKeyPress}>
            {pendingUserInput ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    style={{  }}
                />
            ) : (
                <span>{contents}</span> // Display the contents as text if not pending user input
            )}
        </div>
    );
}
