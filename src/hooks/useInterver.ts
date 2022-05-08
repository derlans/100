import { ref } from 'vue'

export interface useInterverOptions {
  immediate?: boolean
  isActive?: boolean
}
export function useInterver(func: Function, _interver: number, options?: useInterverOptions) {
  let timer: any
  const { immediate = false, isActive: _isActive = true } = options ?? {}
  const interver = ref(_interver)
  const isActive = ref(_isActive)
  function loop() {
    if (isActive.value) {
      timer = setTimeout(() => {
        func()
        loop()
      }, interver.value)
    }
  }
  const pause = () => {
    clearTimeout(timer)
    isActive.value = false
  }
  const resume = () => {
    isActive.value = true
    loop()
  }
  loop()
  if (immediate)
    func()
  return {
    interver,
    pause,
    resume,
    isActive,
  }
}
