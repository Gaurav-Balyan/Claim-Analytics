// Flatten all the properties in one object and then find if the relevant property exists
export function flattenItems(items, key) {
    return items.reduce((flattenedItems, item) => {
        flattenedItems.push(item);
        if (Array.isArray(item[key])) {
            flattenedItems = flattenedItems.concat(
                flattenItems(item[key], key)
            );
        }
        return flattenedItems;
    }, []);
}