export class Quiz{
  constructor(data){
    this.data = data
    this.current = 0;
    this.numberOfQuestions = data.length;
    this.score = 0;
    // console.log(this.data);
    document.getElementById('next').addEventListener('click',()=>{
        this.Next()
    })
    document.getElementById('tryBtn').addEventListener('click',this.tryAgain)

    this.ShowQuiz();

  }


  Randomizer(arr){
    let current = arr.length;
    let randomer;
    while(current!=0){
        randomer = Math.floor(Math.random()*arr.length);

        current--;

        [arr[current],arr[randomer]]=[arr[randomer] , arr[current]]

        
    }
  }


  ShowQuiz(){
    document.getElementById("currentQuestion").innerHTML = this.current+1;
    document.getElementById("totalNumberOfQuestions").innerHTML =this.numberOfQuestions;
    document.getElementById("question").innerHTML =this.data[this.current].question;
    let answers = [this.data[this.current].correct_answer,...this.data[this.current].incorrect_answers]
    // console.log(answers);
    this.Randomizer(answers)
    // console.log(answers);
    let box = ``;
    for (let i = 0 ; i<answers.length ; i++){
     box += `
       <label for="">
       <input type="radio" class="form-check-input" name="answer" value="${answers[i]}">
       ${answers[i]}</label>
       
     `
  }


 document.getElementById("rowAnswer").innerHTML = box;
  }


  Next(){
    let userAnswer = Array.from( document.getElementsByName('answer') ).find((item)=>{return item.checked});
    if(userAnswer){
        $('#alert').hide(0);
        userAnswer = userAnswer.value;
        let correctAnswer = this.data[this.current].correct_answer
        this.ChekAnswer(userAnswer,correctAnswer)
        this.current ++;
        if(this.current < this.numberOfQuestions){
            this.ShowQuiz();
        }else{
            $('#quiz-page').fadeOut(500);
            $('#quiz-finish').fadeIn(500);
            document.getElementById('score').innerHTML = this.score;
        }
    }else{
        $('#alert').show(100);
    }
    
  }

  ChekAnswer(userAnswer,correctAnswer){
    if(userAnswer == correctAnswer){
      this.score ++;

     $('#Correct').fadeIn(100).fadeOut(800)
    }else{
     $('#inCorrect').fadeIn(100).fadeOut(800)
    }


  }
tryAgain(){
    $('#quiz-finish').fadeOut(0);
    $('#quiz-app').fadeIn(500);
}

  
}