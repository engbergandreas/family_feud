import Questions from './Questions';
import {useEffect, useState} from 'react';
import styled from 'styled-components'
import * as FireStoreService from '../services/firebase'
import { Firestore } from 'firebase/firestore';

const Categories = [
  {
    "category": "Rött", 
    "questions": [ 
      {"q": "#a32a28", "points": 100, "show": false},
      {"q": "Jultomten", "points": 55, "show": false},
      {"q": "lärsex", "points": 32, "show": false},
      {"q": "Tosh i NAFFI-stass", "points": 20, "show": false},
      {"q": "stop share knappeni zoom", "points": 15, "show": false},
      {"q": "Ingvars gitarr som är hemma och är röd", "points": 8, "show": false},
      {"q": "netflixloggan", "points": 15, "show": false},
      {"q": "Komplementfärgen till grön", "points": 1, "show": false},
      ]
  }, 
  {
    "category": "Nolle-p",
    "questions": [
      {"q": "CIDERSEJDELCIDER", "points": 76, "show": false},
      {"q": "Städschemat i grottan", "points": 25, "show": false},
      {"q": "Morgongympa", "points": 11, "show": false},
      {"q": "Oscar - MAike", "points": 10, "show": false},
      {"q": "Mottagningspolicyn", "points": 4, "show": false},
      {"q": "Morötterna på hoben", "points": 3, "show": false},
    ]
  },
  {
    "category": "På Ica",
    "questions": [
      {"q": "Ananas", "points": 69, "show": false},
      {"q": "Papperskorg att slänga snabbkassakvittot i", "points": 43, "show": false},
      {"q": "Obligatoriska Ica-gycklet", "points": 22, "show": false},
      {"q": "A-matlåda", "points": 21, "show": false},
      {"q": "Christian som jobbar där", "points": 14, "show": false},
      {"q": "C-matlåda", "points": 9, "show": false},
      {"q": "Kassakö", "points": 3, "show": false},
      {"q": "Vattenfall", "points": 0, "show": false},
    ]
  },
  {
    "category": "Något varmt",
    "questions": [
      {"q": "Inte microvågsugnarna på tp5", "points": 76, "show": false},
      {"q": "Grottan i augusti", "points": 35, "show": false},
      {"q": "En karm", "points": 29, "show": false},
      {"q": "engis_raggare.jpg", "points": 28, "show": false},
      {"q": "Lava", "points": 6, "show": false},
      {"q": "Manteln", "points": 4, "show": false},

    ]
  }
];

const StyledButton = styled.button `
  width: 200px;
  height: 50px;
  cursor: pointer;
`


function AdminPage({activeCategory, setActiveCategory, setNrCorrectAnswers}) {
  const [qs, setQuestions] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [forceRender, setForceRender] = useState(false);

  async function onCategoryChosen(newCategory) {
    const category = Categories.find(cat => cat.category.includes(newCategory));
    const questions = category.questions;
    setActiveCategory(category.category);
    setNrCorrectAnswers(questions.length)
    setQuestions(questions);
    await FireStoreService.clearDocument();
    FireStoreService.createCategoryDocument(category.category, questions.length);
  }

  function onAnswerClicked(answer) {
    //Find the index of this answers 
    const answerIndex = Categories.find(cat => cat.category == activeCategory).questions.findIndex(question => question.q == answer.q)  ;
    FireStoreService.createAnswer(activeCategory, answer.q, answer.points, answerIndex).then(docref => {
          console.log(docref.id)
        }).catch(reason => console.log(reason));
    answer.show = !answer.show;
    setForceRender(!forceRender);
  }

  function showCorrectResult(questions) {
    questions.map(question => question.show = false);
    setForceRender(!forceRender);
  }

  const CategoriesToShow = Categories.map((category, index) => <CreateCategoryButton  key={index} title={category.category}></CreateCategoryButton>);
  return (
    <div className="App">
        <StyledButton onClick={() => setShowResult(!showResult)}>Show result</StyledButton>
        {CategoriesToShow}
        <StyledButton onClick={() => showCorrectResult(qs)}>Show correct result</StyledButton>
        <StyledButton onClick={OnWrongAnswer}>Wrong Answer</StyledButton>
        <Questions questions={qs} result={showResult} onClickFunction={onAnswerClicked}></Questions>
    </div>

);





  function CreateCategoryButton({title}) {
    return (
      <StyledButton onClick={() => onCategoryChosen(title)}>
        {title}
      </StyledButton>
    );
  }
}

function OnWrongAnswer() {
  console.log("calleD")
  FireStoreService.WrongAnswer(true);
  setTimeout(() => {
    FireStoreService.WrongAnswer(false);
  }, 3000);
}



export default AdminPage;
