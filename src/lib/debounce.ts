export const debounce = <T extends (...args: Parameters<T>) => void>(
  func: T,
  delay: number,
) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<typeof func>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}
