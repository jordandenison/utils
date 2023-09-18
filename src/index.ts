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

export const mergeData = <S extends Data>(existingData: Array<S>, newData: S | Array<S>): Array<S> => {
  const dataMap: Record<string | number, S> = Object.fromEntries(existingData.map((item) => [item.id, item]))

  const newDataArray = Array.isArray(newData) ? newData : [newData]

  newDataArray.forEach((newItem: S) => {
    const existingItem = dataMap[newItem.id]
    if (existingItem) {
      if (isDataNewer(existingItem, newItem)) {
        Object.assign(existingItem, newItem)
      }
    } else {
      dataMap[newItem.id] = newItem
    }
  })

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
