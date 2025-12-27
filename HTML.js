const questions = [
    {
        question: "What does HTML stand for?",
        answer:[
            {text:"Hyper Trainer Marking Language", correct:false},
            {text:"Hyper Text Markup Language" ,correct:true},
            {text:"High Text Markup Language" , correct:false},
            {text:"Hyper Text Marketing Language" ,correct:false}

        ]
    },
    {
        question:"Which tag is used to create a paragraph in HTML?",
        answer:[
            {text:"<h1>", correct:false},
            {text:"<p>", correct:true},
            {text:"<div>", correct:false},
            {text:"<span>", correct:false}    
        ]
    },
    {
        question:"Which HTML tag is used to insert an image?",
        answer:[
            {text:"<image>",correct:false},
            {text:"<pic>",correct:false},
            {text:"<img>",correct:true},
            {text:"<src>",correct:false}
        ]
    },
    {
        question:"Which tag is used to create a hyperlink?",
        answer:[
            {text:"<a>",correct:true},
            {text:"<link>",correct:false},
            {text:"<href>",correct:false},
            {text:"<url>",correct:false}
        ]

    },
    {
        question:"Which HTML tag is used for the largest heading?",
        answer:[
            {text:"<h6>", correct:false},
            {text:"<head>", correct:false},
            {text:"<heading>", correct:false},
            {text:"<h1>", correct:true},
        ]

    }
];

const quizNoElement=document.getElementById("quizno");
const QuestionsElement= document.getElementById("Questions");
const answerbuttonsEle = document.getElementById("answer-buttons");
const nextbuttonEle = document.getElementById("nextbtn");
const gradeElement =document.getElementById("grade");
const emojiElement=document.getElementById("emoji");
const scoreDisplay=document.getElementById("scoredis");
let currentQuizIndex=0;
let score=0;

function startQuiz(){
    quizNoElement.classList.remove("hide");
    answerbuttonsEle.classList.remove("hide");
    QuestionsElement.classList.remove("hide");
    currentQuizIndex=0;
    score=0;
    nextbuttonEle.innerHTML="Next";
    showQuiz();
}


function showQuiz(){
    resetState();
    scoreDisplay.classList.add("hide");
    emojiElement.classList.add("hide");
    gradeElement.classList.add("hide");
    let currentQuestion = questions[currentQuizIndex];
    QuestionsElement.innerHTML = currentQuestion.question;

    currentQuestion.answer.forEach(ans => {
        const button=document.createElement("button");
        button.textContent=ans.text;
        button.classList.add("Answerbtn");
        answerbuttonsEle.appendChild(button);
        if(ans.correct){
            button.dataset.correct= ans.correct;
        }
        button.addEventListener("click", selectbtn);
    });
    
}

function resetState(){
    
    let currentQuizNo = currentQuizIndex + 1;
    quizNoElement.innerHTML="Question "+ currentQuizNo +" of 5";
    nextbuttonEle.classList.remove("scorebtn");
    nextbuttonEle.classList.add("resettedbtn");
    nextbuttonEle.style.display="none";
    while(answerbuttonsEle.firstChild){
        answerbuttonsEle.removeChild(answerbuttonsEle.firstChild);
    }
}

function selectbtn(e){
    const selectedBtn=e.target;
    const isCorrect= selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("Correct");
        score++;
    }
    else{
        selectedBtn.classList.add("inCorrect");
    }

   Array.from(answerbuttonsEle.children).forEach(button => {
    if(button.dataset.correct === "true"){
        button.classList.add("Correct");
    }
    button.disabled=true;
    
   });
   nextbuttonEle.style.display="block";
}

function getResultEmoji(){
    if(score === questions.length){
        return "\u{1F3C6}";
    }
    else if( score >=(questions.length)/2){
        return "\u{1F44D}";
    }
    else{
        return "\u{1F4A1}";
    }
}

function getResultMessage(){
    if(score === questions.length){
        return "Excellent! Perfect score!\n\n Your Grade: A";
    }
    else if( score >=(questions.length)/2){
        return "Good Job! Keep Practicing!\n\n Your Grade:B";
    }
    else{
        return "Dont Worry! Try Again!\n\n Your Grade:C";
    }
}


function showScore(){
    emojiElement.classList.remove("hide");
    gradeElement.classList.remove("hide");
    scoreDisplay.classList.remove("hide");
    quizNoElement.classList.add("hide");
    answerbuttonsEle.classList.add("hide");
    QuestionsElement.classList.add("hide");
    scoreDisplay.innerHTML=`<br><p>\u{1F389}\nYou scored <strong>${score}</strong> out of <strong>${questions.length}</strong></p>`; 
    emojiElement.innerHTML=`${getResultEmoji()}`;
    gradeElement.innerHTML= `${getResultMessage()}<br>`;
    nextbuttonEle.innerHTML="Play Again";
    nextbuttonEle.classList.remove("resettedbtn");
    nextbuttonEle.classList.add("scorebtn");
}

function handleNextPage(){
    currentQuizIndex++;
    if(currentQuizIndex < questions.length){
        showQuiz();
    }
    else{
        showScore();
    }
}

nextbuttonEle.addEventListener("click",() =>{
    if(currentQuizIndex < questions.length){
        handleNextPage();
    }
    else{
        startQuiz();
    }
})
startQuiz();


function goToPage(page)
        {
            window.location.href=page;
        }