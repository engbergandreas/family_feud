// import { useCollection } from 'react-firebase-hooks/firestore'
import * as FireStoreService from '../services/firebase'
import { useState } from 'react';
import { collection, getFirestore } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getApp } from 'firebase/app';
import styled from 'styled-components'
import Popup from 'react-animated-popup';
import useSound from 'use-sound';
import strikeSound  from './strike.mp4'
import correctSound from './correct.mp3'
// import audio from '../family_feud_strike.mp4'
import raggare from './engisraggare.jpeg';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'


            {/* <FontAwesomeIcon icon="fa-solid fa-x" /> */}


const StyledGameWrapper = styled.div `
    --border-offset: -28px;
    width: 80%;
    margin: 0 auto;
    border: 35px solid #8d827f;
    border-radius: 50px;
    position: relative;
    z-index: -2;
    background: #222220;
    padding: 10px;
    border-style: ridge;

    &:before {
        content: " ";
        z-index: -1;
        left: var(--border-offset);
        right: var(--border-offset);
        top: var(--border-offset);
        bottom: var(--border-offset);
        position: absolute;
        border: 20px solid #fd8d32;
        border-radius: 50px;
        border-style: ridge;
    }
`

const StyledAnswerWrapper = styled.div `
    background: linear-gradient(180deg, rgba(54,53,165,1) 0%, rgba(93,161,207,1) 50%, rgba(54,53,165,1) 100%);
    border: 6px solid #d5efed;
    border-style: ridge;
    height: 75px;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // padding: 0 20px;
    padding-left: 20px;
    font-size: 1.2em;
    color: white;
    font-weight: bolder;
`

const StyledAnswer = styled.div `
    flex-basis: 80%;
`

const StyledPoints = styled.div `
    background: linear-gradient(180deg, rgba(114,198,254,1) 9%, rgba(54,53,165,1) 74%);
    flex-basis: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 2px solid #d5efed;
`

const StyledHiddenAnswer = styled.div `
    background: linear-gradient(180deg, rgba(114,198,254,1) 9%, rgba(54,53,165,1) 74%);
    border: 6px solid #d5efed;
    border-style: ridge;
    height: 75px;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    z-index: 0;
    color: white;
    font-weight: bolder;
    position: relative;

    &:before {
        content: " ";
        border: 1px solid #d5efed;
        width: 70px;
        height: 50px;
        background-color: rgb(38, 36, 142);
        position: absolute;
        border-radius: 50%;
        z-index: -1;
        box-shadow: 0 13px 20px 3px #332f2f;
    }

`
const StyledAnswersWrapper = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr

`

const StyledH1 = styled.h1 `
    background: linear-gradient(180deg, rgba(114,198,254,1) 9%, rgba(54,53,165,1) 74%);
    border: 6px solid #d5efed;
    border-style: ridge;
    height: 75px;
    display:flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin: 0;
    margin-top: 10px;
`

// const StyledWrongAnswer = styled.div `
//     position: absolute;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     top: 0;
//     z-index: 100;

//     &:after {
//         content: "X";
//         position: absolute;
//         left: 0;
//         right: 0;
//         top: 0;
//         bottom: 0;
//         background: transparent;
//         font-size: 500px;
//         font-weight: bolder;
//         color: #ca2c2c;
//     }
// `

const Styling = {
    // fontSize: '500px',
    fontWeight: 'bolder',
    background: 'transparent',
    color: '#ca2c2c',
    boxShadow: 'unset',
    border: "15px solid #ca2c2c",
    borderStyle: "ridge",
    padding: 0,
    transform: "scale(2.0)",
    padding: "10px"

}

const StyledImage = styled.img `
    max-height: 500px;
    margin: 10px auto;
    display: block;
`

function GamePage({category, nrAnswers}) {
    const [wrongAnswerCollection] = useCollection(collection(getFirestore(getApp()),"WrongAnswer"))
    const wrongAnswer = wrongAnswerCollection?.docs[0].data();
    //Get answers from firebase db
    const [value, loading, error] = useCollection(collection(getFirestore(getApp()), "Answers"));
    const answers = value?.docs.map(doc => doc.data());
    //Get the info object in the db
    const info = answers?.find(a => a.answer == "info");
    //Create an empty array of answers
    const answerLen = info ? info.nrAnswers : 0;
    console.log(answers)
    let answersToShow = Array.apply(null, Array(answerLen)).map(function () {});
    // const filteredAnswers = answers?.filter(a => (a.answer != "info"));  

    
    const [playSound] = useSound(strikeSound);
    const [playCorrectEffect] = useSound(correctSound);
    
    // const sortedAnswers = filteredAnswers?.sort((a,b) => b.points - a.points);

    //Fill the array of answers from DB in the positions where index matches
    answersToShow = answersToShow.map((obj, index) => obj = answers?.find(answer => index == answer.index));

    const showCategories = !answersToShow.length > 0;
    // console.log(showCategories)

    const showEngisRaggare = answers?.find(a => a.answer == "engis_raggare.jpg");
    return (
        <StyledGameWrapper>
            {/* {wrongAnswer.value ? <StyledWrongAnswer>X</StyledWrongAnswer> : ""} */}
            {/* <StyledWrongAnswer></StyledWrongAnswer> */}
            {wrongAnswer ? 
            <Popup visible={wrongAnswer?.value} onClose={()=>{}} style={Styling}>
                <FontAwesomeIcon icon={faX} size={"10x"} />
                {wrongAnswer.value ? playSound() : answers.length > 1 ? playCorrectEffect() : ""}
            </Popup>
            : ""
            }
            {showCategories ? <Categories></Categories> : 
            <div>
                <StyledAnswersWrapper>
                {answersToShow.map((answer, index) => answer ? <Answer key={index} obj={answer}></Answer> :
                <HiddenAnswers key={index} content={index + 1}></HiddenAnswers>)}
                {loading? "LOADING ANSWERS" : ""}
                </StyledAnswersWrapper>
                <StyledH1>{info?.category}</StyledH1>
                {showEngisRaggare ? <StyledImage src={raggare}></StyledImage> : ""}
            </div>
            }
        </StyledGameWrapper>
    );
}

const StyledCategoryWrapper = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
`

function Categories() {
    return (
        <StyledCategoryWrapper>
            <StyledH1 style={{marginTop: '0'}}>Rött</StyledH1>
            <StyledH1 style={{marginTop: '0'}}>Nolle-P</StyledH1>
            <StyledH1 style={{marginTop: '0'}}>På Ica</StyledH1>
            <StyledH1 style={{marginTop: '0'}}>Något varmt</StyledH1>
        </StyledCategoryWrapper>
    );
}

function HiddenAnswers({content}) {
    return <StyledHiddenAnswer>{content}</StyledHiddenAnswer>
}

function Answer({obj}) {
    return (
        <StyledAnswerWrapper>
            <StyledAnswer>{obj.answer}</StyledAnswer>
            <StyledPoints>{obj.points}</StyledPoints>
        </StyledAnswerWrapper>
    );
}

export default GamePage;