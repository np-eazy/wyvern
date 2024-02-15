import { debug } from "../styles";

const outputLineStyle = {
    ...debug,
    borderColor: "#aaaaaa",
    color:  "#555555",
    textAlign: "left",
    // width: "100%",
    margin: 2,
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 12,
}

export const OutputLine = ({ envKey, environment }) => {
    if (environment && environment.get(envKey)) {
        const element = environment.get(envKey);
        if (element.type == "object") {
            return (
                <div style={outputLineStyle}>
                    {Array.from(element.value.entries()).map(([objKey, value]) => {
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ flex: 1 }}><OutputLine envKey={objKey} environment={environment} /></div>
        <div>:</div>
        <div style={{ flex: 1 }}><OutputLine envKey={value} environment={environment} /></div>
    </div>
                        );
                    })}
                </div>
            );
        } else if (element.type == "array") {
            return (
                <div style={outputLineStyle}>
                    {element.value.map((value) => {
                        return <OutputLine envKey={value} environment={environment} />;
                    })}
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
    } else {
        return (
            <div style={outputLineStyle}>
                {"Error: reference not found"} 
            </div>
        );
    }
}
