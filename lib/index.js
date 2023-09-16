export var capitalizeFirstLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export var capitalizeAllFirstLetters = function (str) {
    return str.split(' ').map(capitalizeFirstLetter).join(' ');
};
export var kebabCaseToCamelCase = function (str) {
    return str.replace(/-([a-z])/g, function (_, match) { return match.toUpperCase(); });
};
export var isDataNewer = function (existingData, newData) {
    if (!existingData.updatedAt || !newData.updatedAt) {
        return true;
    }
    if (!isDateValid(newData.updatedAt)) {
        throw new Error("\"".concat(newData.updatedAt, "\" is not a valid date"));
    }
    if (!isDateValid(existingData.updatedAt)) {
        throw new Error("\"".concat(existingData.updatedAt, "\" is not a valid date"));
    }
    var newDataUpdatedAtDate = new Date(newData.updatedAt);
    var existingDataUpdatedAtDate = new Date(existingData.updatedAt);
    return newDataUpdatedAtDate.getTime() > existingDataUpdatedAtDate.getTime();
};
export var isDateValid = function (dateString) { return !isNaN(Date.parse(dateString)); };
export var mergeData = function (existingData, newData) {
    var dataMap = Object.fromEntries(existingData.map(function (item) { return [item.id, item]; }));
    var newDataArray = Array.isArray(newData) ? newData : [newData];
    newDataArray.forEach(function (newItem) {
        var existingItem = dataMap[newItem.id];
        if (existingItem) {
            if (isDataNewer(existingItem, newItem)) {
                Object.assign(existingItem, newItem);
            }
        }
        else {
            dataMap[newItem.id] = newItem;
        }
    });
    return Object.values(dataMap);
};
