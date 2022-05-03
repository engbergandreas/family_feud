import React from "react";
import styled from "styled-components";

const StyledEntry = styled.div `
    // display: flex;
    // background: red;
    // justify-content: center;
    // border: 1px solid black;
    // margin: 0 auto;
    // width: 50%;
    // height: 50px;
    // align-items: center;

    border: 1px solid black;
    width: 400px;
    display: flex;
    justify-content: space-between;
    margin: 5px auto;
    background-color: ${props => props.show ? "green" : "red"};
    cursor: pointer;

    & div {
        min-width: 40px;
    }
`

function Questions({questions, result, onClickFunction}) {
    let qs;
    if(result) {
        qs = questions.map( (question, index) =>
            // question.show ? <Entry q={question.q} p={question.points} obj={question}> </Entry> : ""
            <Entry key={index} q={question.q} p={question.points} obj={question}></Entry>
        );
    }
    
    return(
        <div>
            {qs}
        </div>
    );
    
    function Entry({q, p, obj}) {
        return (
            <StyledEntry show={obj.show} onClick={() => onClickFunction(obj)}>
                <div> {q} </div>
                <div> {p}</div>
            </StyledEntry>
        );
    }
}

export default Questions;