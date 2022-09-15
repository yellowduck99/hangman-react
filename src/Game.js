import React from "react";
import Button from './Button.js'
import WordList from './wordList.json'
import Hangman from "./Hangman.js";

class Game extends React.Component {


    constructor(props) {
        super(props)
        let word = pickWord()
        let length = word.length
        this.state = {
            wrong:0,
            display:Array(length).fill('_'),
            answer:word, //unchange
        }
    }

    handleClick = (char) => {
        console.log('clicked')
        let arr = []
        let wrong = this.state.wrong
        //console.log(char)
        arr = checkExist(this.state.answer, char)
        //console.log(arr)
        if (arr.length !== 0) {
            let newArr = this.state.display.map((oldChar, index) =>{
                let returnChar = arr.includes(index) ? char : oldChar
                return returnChar
            })
            //console.log(newArr)
            this.setState({
                display: newArr
            })
        }
        else {
            wrong++
            this.setState({
                wrong: wrong
            })
        }
    }

    drawBasic = (ctx) => {
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

    drawHead = (ctx) => {
        ctx.beginPath();
        ctx.arc(75, 95, 30, 0, Math.PI * 2, true)
        ctx.stroke()
    }

    drawBody = (ctx) => {
        ctx.beginPath()
        ctx.moveTo(75,125)
        ctx.lineTo(75,300)
        ctx.stroke()
    }

    drawLeftLeg = (ctx) => {
        ctx.beginPath()
        ctx.moveTo(75,300)
        ctx.lineTo(25,450)
        ctx.stroke()
    }

    drawRightLeg = (ctx) => {
        ctx.beginPath()
        ctx.moveTo(75,300)
        ctx.lineTo(115,450)
        ctx.stroke()
    }

    drawLeftHand = (ctx) => {
        ctx.beginPath()
        ctx.moveTo(75,200)
        ctx.lineTo(20,200)
        ctx.stroke()
    }
    drawRightHand = (ctx) => {
        ctx.beginPath()
        ctx.moveTo(75,200)
        ctx.lineTo(135,200)
        ctx.stroke()
    }
    

    render() {
        const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        const drawing = [this.drawHead, this.drawBody, this.drawLeftLeg,this.drawRightLeg,this.drawLeftHand,this.drawRightHand]
        let buttons = alphabets.map((char, index) => {
            return(<Button value={char} key={index} onClick={() =>this.handleClick(char)} />)
        })
        let display = this.state.display.join(' ')
        let currentDraw = drawing.slice(0,this.state.wrong)
        console.log(this.state.answer)
        return(
        <div className="main"><div className="buttons">{buttons}</div>
            <div>{display}</div>
            <Hangman drawBasic={this.drawBasic} drawMan={currentDraw} />
        </div>
        )
    }
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


export default Game