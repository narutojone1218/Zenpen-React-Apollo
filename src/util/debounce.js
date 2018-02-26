export default (func, wait, immediate) => {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      if (!immediate) {
        func.apply(this, args)
      }
    }, wait)
    if (immediate && timer !== null) {
      func.apply(this, args)
    }
  }
}