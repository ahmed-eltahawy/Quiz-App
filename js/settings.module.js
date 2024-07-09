import { Quiz } from "./quiz.module.js";

export class Setting{
  constructor(){
    // console.log("aaaa");
    $('#quiz-page').slideUp(0);
    $('#quiz-finish').slideUp(0);
    $('#alert1').hide(0);
    $('#alert2').hide(0);
    $('#inCorrect').hide(0);
    $('#Correct').hide(0);
    this.category = document.getElementById('category');
    // console.log(this.category);
    this.difficulty = document.getElementsByName('difficulty');
    // console.log(this.difficulty);
    this.numberOfQuestions = document.getElementById('numberOfQuestions');
    // console.log(this.numberOfQuestions);
    document.getElementById('startBtn').addEventListener("click",this.start.bind(this))
    
  }


  async start(){
    // console.log('aaaa');
    let category = this.category.value;
    // console.log(category);
    let difficulty = Array.from(this.difficulty).find((e)=>{return e.checked}).value;
    // console.log(difficulty);
    let numberOfQuestions = this.numberOfQuestions.value;
    // console.log(numberOfQuestions);
    if(category&&difficulty&&numberOfQuestions){
      $('#alert1').hide(0);


      if(numberOfQuestions <= 45){
        $('#alert1').hide(0);
        $('#alert2').hide(0);
        let api = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`
        let data = await this.FetchData(api);
        $('#quiz-page').slideDown(500);
        $('#quiz-app').slideUp(0);
        // console.log(data);
        let quiz = new Quiz(data);

      }else{
        $('#alert2').show(300);
        
      }
      
    }
    else{
      $('#alert1').show(300);
     
    }
    


  }



  async FetchData(api){
   let data = await fetch(api);
   let jsonData = await data.json();
  //  console.log(jsonData.results);
   return jsonData.results
  }






}
