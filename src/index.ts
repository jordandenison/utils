export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const capitalizeAllFirstLetters = (str: string): string => {
  return str.split(' ').map(capitalizeFirstLetter).join(' ')
}

export const kebabCaseToCamelCase = (str: string): string => {
  return str.replace(/-([a-z])/g, (_, match) => match.toUpperCase())
}

export const isDateValid = (date: Date) => {
  return date instanceof Date && !isNaN(date.getTime())
}
