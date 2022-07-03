function throttle<P extends any[]>(
  fn: (...args: P) => any,
  timeout: number
): (...args: P) => void {
  let timer: NodeJS.Timeout

  return (...args) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn(...args)
    }, timeout)
  }
}
export default throttle
