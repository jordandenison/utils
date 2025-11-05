export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const capitalizeAllFirstLetters = (str: string): string => {
  return str.split(' ').map(capitalizeFirstLetter).join(' ')
}

const compareTimeWithCurrentInputRegExp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
export const compareTimeWithCurrent = (time: string): 'before' | 'after' | 'invalid input' => {
  try {
    if (!compareTimeWithCurrentInputRegExp.test(time)) {
      return 'invalid input'
    }

    const [hours, minutes] = time.split(':').map(Number)
    const now = new Date()
    const inputTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)

    if (inputTime.getTime() > now.getTime()) {
      return 'after'
    } else {
      return 'before'
    }
  } catch (error) {
    return 'invalid input'
  }
}

export const delay = (timeout: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

// eslint-disable-next-line
export const hasDuplicates = (array: Record<string, any>[], propertyName: string): boolean => {
  const valueMap = new Map()

  for (const item of array) {
    if (valueMap.has(item[propertyName])) {
      return true
    }
    valueMap.set(item[propertyName], true)
  }

  return false
}

export const kebabCaseToCamelCase = (str: string): string => {
  return str.replace(/-([a-z])/g, (_, match) => match.toUpperCase())
}

type Data = {
  id: string | number
  updatedAt?: string
}

export const isDataNewer = <S extends Data>(existingData: S, newData: S): boolean => {
  if (!existingData.updatedAt || !newData.updatedAt) {
    return true
  }

  if (!isDateValid(newData.updatedAt)) {
    throw new Error(`"${newData.updatedAt}" is not a valid date`)
  }

  if (!isDateValid(existingData.updatedAt)) {
    throw new Error(`"${existingData.updatedAt}" is not a valid date`)
  }

  const newDataUpdatedAtDate = new Date(newData.updatedAt)
  const existingDataUpdatedAtDate = new Date(existingData.updatedAt)

  return newDataUpdatedAtDate.getTime() > existingDataUpdatedAtDate.getTime()
}

export const isDateValid = (dateString: string) => !isNaN(Date.parse(dateString))

interface IsValidWebUrlOptions {
  requireProtocol?: boolean
}

export const isValidWebUrl = (urlString: string, options?: IsValidWebUrlOptions) => {
  try {
    if (!urlString.includes('://') && !options?.requireProtocol) {
      urlString = 'http://' + urlString
    }

    const url = new URL(urlString)

    // Check for valid web URL protocol (http or https) and top-level domain
    if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.')) {
      return false
    }

    return true
  } catch (error) {
    return false
  }
}

export const mergeData = <S extends { id: string }>(
  existingData: S[],
  newData: S | S[],
  options?: {
    preserveOld?: boolean
  }
): S[] => {
  const dataMap = Object.fromEntries(existingData.map((item) => [item.id, { ...item }])) as Record<string, S>

  const incoming = Array.isArray(newData) ? newData : [newData]

  for (const newItem of incoming) {
    const oldItem = dataMap[newItem.id]
    if (oldItem) {
      if (isDataNewer(oldItem, newItem)) {
        dataMap[newItem.id] = options?.preserveOld ? { ...oldItem, ...newItem } : { ...newItem }
      }
    } else {
      dataMap[newItem.id] = { ...newItem }
    }
  }

  return Object.values(dataMap)
}

export const removeData = <S extends Data>(existingData: Array<S>, newData: S | Array<S>): Array<S> => {
  const newDataIds: Record<string | number, boolean> = {}

  if (Array.isArray(newData)) {
    for (const item of newData) {
      newDataIds[item.id] = true
    }
  } else {
    newDataIds[newData.id] = true
  }

  return existingData.filter((item) => !newDataIds[item.id])
}
