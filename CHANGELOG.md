# Changelog

## [1.0.0] - 2023-09-16

### Added
- Implemented `capitalizeFirstLetter` method to capitalize the first letter of a string.
- Implemented `capitalizeAllFirstLetters` method to capitalize the first letter of each word in a string.
- Implemented `delay` method to create a promise that resolves after a specified timeout.
- Implemented `kebabCaseToCamelCase` method to convert a kebab-case string to camelCase.
- Defined a `Data` type which includes an 'id' and an optional 'updatedAt' property.
- Implemented `isDataNewer` method to compare the 'updatedAt' properties of two data objects and determine if one is newer.
- Implemented `isDateValid` method to validate whether a given string is a valid date.
- Implemented `mergeData` method to merge new data into an existing data array based on the 'id' property, updating existing items if the new data is newer.
- Implemented `removeData` method to remove specified data items from an existing data array based on the 'id' property.
