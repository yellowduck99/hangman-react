import React, { useEffect, useRef } from "react";

const Hangman = (props) => {
    const { drawBasic, drawMan } = props
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        drawBasic(ctx)
        drawMan.forEach(draw => {
            draw(ctx)
        })
        //drawHead(ctx)
        //drawBody(ctx)
    })

    return(<canvas height={500} width={500} ref={canvasRef} />)
}

export default Hangman