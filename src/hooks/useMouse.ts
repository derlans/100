import { reactive, ref } from 'vue'
export function useMouse() {
  const position = reactive({
    x: 0,
    y: 0,
  })
  const isDown = ref(false)
  const handleMouseMove = (e: MouseEvent) => {
    position.x = e.clientX
    position.y = e.clientY
  }
  const handleMouseDown = () => {
    isDown.value = true
  }
  const handleMouseUp = () => {
    isDown.value = false
  }
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
  function clear() {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mousedown', handleMouseDown)
    window.removeEventListener('mouseup', handleMouseUp)
  }
  return {
    position,
    clear,
    isDown,
  }
}
