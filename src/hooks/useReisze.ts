import { reactive } from 'vue'
import { debounce } from '@/utils'

export function useResize(fn?: Function) {
  const size = reactive({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const handleResize = debounce(() => {
    size.width = window.innerWidth
    size.height = window.innerHeight
    fn && fn()
  }, 100)
  window.addEventListener('resize', handleResize,
  )
  function clear() {
    window.removeEventListener('resize', handleResize)
  }
  return {
    size,
    clear,
  }
}
