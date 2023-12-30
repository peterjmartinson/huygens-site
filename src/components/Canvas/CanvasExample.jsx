import { useRef, useEffect } from 'react'

// JSDoc: https://jsdoc.app/

export const CanvasExample = () => {
  const canvasRef = useRef(null)
  const canvasCtxRef = useRef(null)

  useEffect(() => {
    // execute only after React links the DOM node to our `canvasRef`
    if (canvasRef.current != null) {
      // set our canvas Ctx ref equal to the '2d' canvas context
      canvasCtxRef.current = canvasRef.current.getContext('2d')
      // init local `ctx` variable
      const ctx = canvasCtxRef.current

      // draw
      ctx.fillStyle = "green"
      ctx.fillRect(10, 10, 150, 100)
    }
  }, [])

  return (
    <div>
      <h3>HELLO FROM CANVAS EXAMPLE</h3>

      <canvas ref={canvasRef} id='asdasd'>
      </canvas>
    </div>
  )
}

export default CanvasExample
