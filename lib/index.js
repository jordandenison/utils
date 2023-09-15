export var capitalizeFirstLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export var capitalizeAllFirstLetters = function (str) {
    return str.split(' ').map(capitalizeFirstLetter).join(' ');
};
export var kebabCaseToCamelCase = function (str) {
    return str.replace(/-([a-z])/g, function (_, match) { return match.toUpperCase(); });
};
