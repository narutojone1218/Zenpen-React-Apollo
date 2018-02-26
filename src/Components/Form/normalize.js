export const phone = (value) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  }
  return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
}

export const name = (value) => {
  if (!value) {
    return value
  }
  return value.replace(/[^a-z\s\.\-\,]+/gi, '')
}

export const postalCode = (value) => {
  if (!value) {
    return value
  }
  return value.replace(/[^a-z0-9\s\-]+/gi, '')
}

export const expiry = (value) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 2) {
    return onlyNums
  }
  return `${onlyNums.slice(0, 2)} / ${onlyNums.slice(2)}`
}

export const number = (value) => {
  if (!value) {
    return value
  }
  return value.replace(/[^\d]/g, '')
}

export const cardNumber = (value) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 4) {
    return onlyNums
  }
  if (onlyNums.length <= 8) {
    return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4)}`
  }
  if (onlyNums.length <= 12) {
    return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)} ${onlyNums.slice(8)}`
  }
  if (onlyNums.length <= 16) {
    return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)} ${onlyNums.slice(8, 12)} ${onlyNums.slice(12)}`
  }
  return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)} ${onlyNums.slice(8, 12)} ${onlyNums.slice(12, 16)} ${onlyNums.slice(16)}`
}