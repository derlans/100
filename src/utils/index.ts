
export const r1 = Math.PI / 360
export const r15 = r1 * 15
export const r30 = r1 * 30

export function polar2cart(x: number, y: number, rad: number, length: number) {
  const nx = x + Math.cos(rad) * length
  const ny = y + Math.sin(rad) * length
  return {
    nx,
    ny,
  }
}
export function createNaiveMeta(): void {
  const meta: HTMLMetaElement = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
}

export function debounce(fn: Function, delay: number, immediate = false) {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: any[]) => {
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-expect-error this
      fn.apply(this, args)
    }, delay)
    if (immediate)
      // @ts-expect-error this
      fn.apply(this, args)
  }
}

export function createPromise(time: number, value?: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, time)
  })
}
