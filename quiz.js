const URL = 'https://opentdb.com/api.php?amount=30&category=18&difficulty=easy&type=multiple';
const questionheader = document.getElementById('question');
const a=document.getElementById('a');
const b=document.getElementById('b');
const c=document.getElementById('c');
const d=document.getElementById('d');
const submit = document.getElementById('submit');
const answers= document.getElementsByClassName('answer');
const quizcontainer = document.getElementById('quiz')
let correct='Worm'
getquizlist(URL);
let array = [];

const start = document.getElementById("start")
start.addEventListener("click", appear);

function appear() {
    start.style.opacity="0";
    quizcontainer.style.opacity="1";
    submit.style.opacity="1";
    start.style.height="0";
    start.style.marginTop="0";

}

async function getquizlist(url)
{
    const res = await fetch(url)
    const data = await res.json()
   
    array=(data.results);
    pushcorrect();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function pushcorrect()
{
    for(let i=0;i<30;i++)
    {
    let random = getRandomInt(3)
    array[i].incorrect_answers.push(array[i].incorrect_answers[random])
    array[i].incorrect_answers[random]=array[i].correct_answer;
    console.log(array[i]);
    console.log(random);
    }
}

let current = 0;
let score = 0 ;
submit.addEventListener("click", displayquiz);

function displayquiz() {

    let answer = getselected()
    let labelid= answer+'_text'

   let selected = document.getElementById(labelid).innerText;
   console.log(selected);
   if(selected==correct)
   score++;
   console.log(score)
   document.getElementById("num").innerHTML=score+" / 31"
    deselect()
    questionheader.innerHTML=array[current].question;

    a_text.innerHTML=array[current].incorrect_answers[0];
    b_text.innerHTML=array[current].incorrect_answers[1];
    c_text.innerHTML=array[current].incorrect_answers[2];
    d_text.innerHTML=array[current].incorrect_answers[3];

    correct= array[current].correct_answer
    

    console.log(current);
    current++;

    if(current === 30)
    {
        questionheader.innerHTML= 'Reload the quiz'
        a_text.innerHTML="";
        b_text.innerHTML="";
        c_text.innerHTML="";
        d_text.innerHTML="";
        reload.style.opacity="1";

    }
}

function deselect() {
    for(let i=0;i<answers.length;i++)
    {
        answers[i].checked=false
    }
}
 
function getselected() {
    let answer;
    for(let i=0;i<answers.length;i++)
    {
       console.log(answers[i]);
       if(answers[i].checked)
       {
           answer=answers[i].id
       }
    }
    return answer;
}


