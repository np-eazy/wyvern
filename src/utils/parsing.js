const MAX_DEPTH = 10;

export const parseResponse = (serialized, root, environment, depth=0) => {
    const items = [];
    const element = {key: root, type: serialized[root]["type"], value: serialized[root]["value"]}; 
    if (depth > MAX_DEPTH) {
        console.log("MAX DEPTH OF " + MAX_DEPTH.toString() + " REACHED");
    } else if (element.type == "array") { // Recursive casees
        element.value.forEach((value) => parseResponse(serialized, value, environment, depth + 1));

    } else if (element.type == "object") {

    } // Base case: primitives
    
    items.push(element); // We don't need to aggregate; only the root case has to return for the whole structure to be accessible.
    environment.set(element.key, element); // The recursions happen first so that the values are already there by the time we wire up this array.
    return items;
}
