export var capitalizeFirstLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export var capitalizeAllFirstLetters = function (str) {
    return str.split(' ').map(capitalizeFirstLetter).join(' ');
};
var compareTimeWithCurrentInputRegExp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
export var compareTimeWithCurrent = function (time) {
    try {
        if (!compareTimeWithCurrentInputRegExp.test(time)) {
            return 'invalid input';
        }
        var _a = time.split(':').map(Number), hours = _a[0], minutes = _a[1];
        var now = new Date();
        var inputTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        if (inputTime.getTime() > now.getTime()) {
            return 'after';
        }
        else {
            return 'before';
        }
    }
    catch (error) {
        return 'invalid input';
    }
};
export var delay = function (timeout) {
    return new Promise(function (resolve) {
        setTimeout(resolve, timeout);
    });
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
export var removeData = function (existingData, newData) {
    var newDataIds = {};
    if (Array.isArray(newData)) {
        for (var _i = 0, newData_1 = newData; _i < newData_1.length; _i++) {
            var item = newData_1[_i];
            newDataIds[item.id] = true;
        }
    }
    else {
        newDataIds[newData.id] = true;
    }
    return existingData.filter(function (item) { return !newDataIds[item.id]; });
};
