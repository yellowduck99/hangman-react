import React, { useCallback, useState } from "react";
import Button from './Button.js'
import WordList from './wordList.json'
import Hangman from "./Hangman.js";


const Game = () => {
    const word = pickWord()
    const length = word.length
    let [wrong, setWrong] = useState(0)
    let [display,setDisplay] = useState(Array(length).fill('_'))
    const [answer] = useState(word)
    let [end,setEnd] = useState(false)
    const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    const drawBasic = (ctx) => {
        ctx.beginPath()
        ctx.moveTo(300,500)
        ctx.lineTo(50, 500)
        ctx.moveTo(250,500)
        ctx.lineTo(250,30)
        ctx.moveTo(250,30)
        ctx.lineTo(75,30)
        ctx.moveTo(75,30)
        ctx.lineTo(75,65)
        ctx.stroke()
    }

    const drawHead = (ctx) => {
        ctx.beginPath();
        ctx.arc(75, 95, 30, 0, Math.PI * 2, true)
        ctx.stroke()
    }

    const drawBody = (ctx) => {
        ctx.beginPath()
        ctx.moveTo(75,125)
        ctx.lineTo(75,300)
        ctx.stroke()
    }

    const drawLeftLeg = (ctx) => {
        ctx.beginPath()
        ctx.moveTo(75,300)
        ctx.lineTo(25,450)
        ctx.stroke()
    }

    const drawRightLeg = (ctx) => {
        ctx.beginPath()
        ctx.moveTo(75,300)
        ctx.lineTo(115,450)
        ctx.stroke()
    }

    const drawLeftHand = (ctx) => {
        ctx.beginPath()
        ctx.moveTo(75,200)
        ctx.lineTo(20,200)
        ctx.stroke()
    }
    const drawRightHand = (ctx) => {
        ctx.beginPath()
        ctx.moveTo(75,200)
        ctx.lineTo(135,200)
        ctx.stroke()
    }
    const drawing = [drawHead, drawBody, drawLeftLeg,drawRightLeg
        ,drawLeftHand,drawRightHand]

    const handleClick = useCallback((char,event) => {

        if (checkEnd(wrong, display)) {
            setWrong(wrong + 1)
            setEnd(true)
            return
        }
        let arr = []
        arr = checkExist(answer, char)
        if (arr.length !== 0) {
            let newArr = display.map((oldChar, index) =>{
                let returnChar = arr.includes(index) ? char : oldChar
                return returnChar
            })
            setDisplay(newArr)
        }
        else {
            setWrong(wrong+ 1)
        }
        event.currentTarget.disabled = true;

    },[wrong,display,answer])

    let buttons = alphabets.map((char, index) =>{
        return(<Button value={char} key={index} 
            onClick={(event)=> handleClick(char, event)} 
            disabled={end}
        />)
    })

    let print = display.join(' ')
    let currentDraw = drawing.slice(0,wrong)
    return(
        <div className="main" >
            <div>{print}</div>
            <div>{end? 'end, the answer is '+answer : ''}</div>
            <Hangman drawBasic={drawBasic} drawMan={currentDraw} />
            <div className="buttons" >{buttons}</div>

        </div>
    )

}

const pickWord = () => {
    let max = WordList.words.length
    let pick = Math.floor(Math.random() * max)
    return WordList.words[pick]
}

const checkExist = (word, char) => {
    let indices = []
    let idx = word.indexOf(char);
    while (idx !== -1) {
        indices.push(idx);
        idx = word.indexOf(char,idx + 1);
    }

    return indices
}

const checkEnd = (wrong, word) => {
    let result = (wrong >= 5 || (!word.includes('_'))) ? true : false
    //console.log('end: '+result)
    return result

}

export default Game