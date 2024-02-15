export const topLevelSplit = (line, character) => {

}

export const parseResponse = (response) => {
    const items = [];
    const serialized = response["data"]["serialized"];
    for (let key in serialized) {
        items.push({key: key, type: serialized[key]["type"], value: serialized[key]["value"]});
    }
    console.log(items, items.length);
    return items;
}
