const MAX_DEPTH = 10;

export const parseResponse = (serialized, root, environment, depth=0) => {
    const items = [];
    const element = {key: root, type: serialized[root]["type"], value: serialized[root]["value"]}; 
    if (depth > MAX_DEPTH) {
        console.log("MAX DEPTH OF " + MAX_DEPTH.toString() + " REACHED");
        return;
    } else if (element.type == "array") { // Recursive casees
        element.value.forEach((value) => parseResponse(serialized, value, environment, depth + 1));
        
    } else if (element.type == "object") {
        const refMap = new Map();
        element.value.forEach((entry) => { 
            console.log(entry, entry.key, entry.value)
            if (!environment.get(entry.key)) {
                parseResponse(serialized, entry.key, environment, depth + 1);
            }
            if (!environment.get(entry.value)) {
                parseResponse(serialized, entry.value, environment, depth + 1);
            }
            refMap.set(entry.key, entry.value);
        });
        element.value = refMap;
        
    } // Base case: primitives
    console.log(serialized, environment);
    items.push(element); // We don't need to aggregate; only the root case has to return for the whole structure to be accessible.
    environment.set(element.key, element); // The recursions happen first so that the values are already there by the time we wire up this array.
    return items;
}
