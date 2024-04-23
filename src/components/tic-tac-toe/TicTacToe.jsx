import React, {useRef, useState } from 'react'
import './TicTacToe.css'
import circle from '../assets/circle.png'
import cross from '../assets/cross.png'

let data=["","","","","","","","",""];


const BoardRow = ({ rowClass, rowIndex, toggle, boxArry }) => {
    // Calculate the starting index based on the row index
    const startingIndex = rowIndex * 3;
  
    return (
      <div className={rowClass}>
        <div className="boxes" ref={boxArry[startingIndex]} onClick={(e) => toggle(e, startingIndex)}></div>
        <div className="boxes" ref={boxArry[startingIndex+1]} onClick={(e) => toggle(e, startingIndex + 1)}></div>
        <div className="boxes" ref={boxArry[startingIndex+2]} onClick={(e) => toggle(e, startingIndex + 2)}></div>
      </div>
    );
  };
  

const TicTacToe = () => {
    let [count,setCount]=useState(0);
    let [lock,setLock]=useState(false);

    let titleRef=useRef(null);
    let box1=useRef(null);
    let box2=useRef(null);
    let box3=useRef(null);
    let box4=useRef(null);
    let box5=useRef(null);
    let box6=useRef(null);
    let box7=useRef(null);
    let box8=useRef(null);
    let box9=useRef(null);

    const box_arry=[box1,box2,box3,box4,box5,box6,box7,box8,box9];

    const toggle =(ele,num)=>{
        if(lock){
            return 0;
        }
        if(count%2===0){
            ele.target.innerHTML=`<img src='${cross}'>`;
            data[num]="x";
            setCount(++count);
        }
        else{
            ele.target.innerHTML=`<img src='${circle}'>`;
            data[num]="o";
            setCount(++count);
        }
        checkWin();
    }

    const checkWin = () => {
        // Check rows
        for (let i = 0; i < 9; i += 3) {
            if (data[i] !== "" && data[i] === data[i + 1] && data[i + 1] === data[i + 2]) {
                won(data[i]);
                return;
            }
        }
    
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (data[i] !== "" && data[i] === data[i + 3] && data[i + 3] === data[i + 6]) {
                won(data[i]);
                return;
            }
        }
    
        // Check diagonals
        if (data[0] !== "" && data[0] === data[4] && data[4] === data[8]) {
            won(data[0]);
            return;
        }
        if (data[2] !== "" && data[2] === data[4] && data[4] === data[6]) {
            won(data[2]);
            return;
        }
        
        // Check for tie (if the board is filled)
        if (!data.includes("")) {
            // No one wins, it's a tie
            won("tie");
        }
    }
    

    const won=(winner)=>{
        setLock(true);
        if(winner==="tie"){
            titleRef.current.innerHTML=`It's a Tie! Play Again`;
        }
        else if(winner==="x"){
            titleRef.current.innerHTML=`Congratulations:<img src=${cross}>`;
        }
        else{
            titleRef.current.innerHTML=`Congratulations:<img src=${circle}>`;
        }
    }

    const reset=()=>{
        setLock(false);
        data=["","","","","","","","",""];
        titleRef.current.innerHTML=`Tic Tac Toe in <span>React</span>`;
        box_arry.forEach((e)=>{
            e.current.innerHTML="";
        })
    }

    return (
    <div className='container'>
        <h1 className='title' ref={titleRef}>Tic Tac Toe Game <span>React</span></h1>
        <div className="board">
        <BoardRow rowClass="row1" rowIndex={0} toggle={toggle} boxArry={box_arry}/>
        <BoardRow rowClass="row2" rowIndex={1} toggle={toggle} boxArry={box_arry}/>
        <BoardRow rowClass="row3" rowIndex={2} toggle={toggle} boxArry={box_arry}/>
        </div>
        <div className='buttondiv'>
        <button className="reset" onClick={()=>{reset()}}>Reset</button>
        </div>
    </div>
  )
}

export default TicTacToe