"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeData = exports.mergeData = exports.isValidWebUrl = exports.isDateValid = exports.isDataNewer = exports.kebabCaseToCamelCase = exports.hasDuplicates = exports.delay = exports.compareTimeWithCurrent = exports.capitalizeAllFirstLetters = exports.capitalizeFirstLetter = void 0;
var capitalizeFirstLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
var capitalizeAllFirstLetters = function (str) {
    return str.split(' ').map(exports.capitalizeFirstLetter).join(' ');
};
exports.capitalizeAllFirstLetters = capitalizeAllFirstLetters;
var compareTimeWithCurrentInputRegExp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
var compareTimeWithCurrent = function (time) {
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
exports.compareTimeWithCurrent = compareTimeWithCurrent;
var delay = function (timeout) {
    return new Promise(function (resolve) {
        setTimeout(resolve, timeout);
    });
};
exports.delay = delay;
// eslint-disable-next-line
var hasDuplicates = function (array, propertyName) {
    var valueMap = new Map();
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var item = array_1[_i];
        if (valueMap.has(item[propertyName])) {
            return true;
        }
        valueMap.set(item[propertyName], true);
    }
    return false;
};
exports.hasDuplicates = hasDuplicates;
var kebabCaseToCamelCase = function (str) {
    return str.replace(/-([a-z])/g, function (_, match) { return match.toUpperCase(); });
};
exports.kebabCaseToCamelCase = kebabCaseToCamelCase;
var isDataNewer = function (existingData, newData) {
    if (!existingData.updatedAt || !newData.updatedAt) {
        return true;
    }
    if (!(0, exports.isDateValid)(newData.updatedAt)) {
        throw new Error("\"".concat(newData.updatedAt, "\" is not a valid date"));
    }
    if (!(0, exports.isDateValid)(existingData.updatedAt)) {
        throw new Error("\"".concat(existingData.updatedAt, "\" is not a valid date"));
    }
    var newDataUpdatedAtDate = new Date(newData.updatedAt);
    var existingDataUpdatedAtDate = new Date(existingData.updatedAt);
    return newDataUpdatedAtDate.getTime() > existingDataUpdatedAtDate.getTime();
};
exports.isDataNewer = isDataNewer;
var isDateValid = function (dateString) { return !isNaN(Date.parse(dateString)); };
exports.isDateValid = isDateValid;
var isValidWebUrl = function (urlString, options) {
    try {
        if (!urlString.includes('://') && !(options === null || options === void 0 ? void 0 : options.requireProtocol)) {
            urlString = 'http://' + urlString;
        }
        var url = new URL(urlString);
        // Check for valid web URL protocol (http or https) and top-level domain
        if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.')) {
            return false;
        }
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidWebUrl = isValidWebUrl;
var mergeData = function (existingData, newData) {
    var dataMap = Object.fromEntries(existingData.map(function (item) { return [item.id, item]; }));
    var newDataArray = Array.isArray(newData) ? newData : [newData];
    newDataArray.forEach(function (newItem) {
        var existingItem = dataMap[newItem.id];
        if (existingItem) {
            if ((0, exports.isDataNewer)(existingItem, newItem)) {
                Object.assign(existingItem, newItem);
            }
        }
        else {
            dataMap[newItem.id] = newItem;
        }
    });
    return Object.values(dataMap);
};
exports.mergeData = mergeData;
var removeData = function (existingData, newData) {
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
exports.removeData = removeData;
