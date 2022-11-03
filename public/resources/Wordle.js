class wordleGameController{
    constructor(){
        this.console=new Array(6);
        for(let i=0;i<6;i++){
            this.console[i]=new Array(5);
            for(let j=0;j<5;j++){
                this.console[i][j]=document.getElementById("row"+i+""+j);
            }
        }
        this.wordIndex=0;
        this.guessCount=0;
        //fetch a random word from Wordle.json in current directory and store in this.word
        this.word="";
        fetch("/resources/Wordle.json")
        .then(response=>{return response.json();})
        .then(data=>{
            this.word=data["words"][Math.floor(Math.random()*data["words"].length)];
            console.log(this.word);
        })

    }
    insertCharacter(c){
        if(this.guessCount<6){
            if(this.wordIndex==5){
                this.wordIndex=0;
                this.guessCount++;
            }
            if(this.wordIndex<5){
                this.console[this.guessCount][this.wordIndex].textContent=c;
                this.wordIndex++;
            }
            return;
        }
    }
    checkWord(){
        let word="";
        for(let i=0;i<5;i++){
            word+=this.console[this.guessCount][i].textContent;
        }
        if(word==this.word){
            alert("You won!");
            return true;
        }
        alert("incorrect word!");
        return false;
    }
}

let wordleGame=new wordleGameController();

function input(key){
    if(key=="Enter"){
        if(wordleGame.guessCount<6 && wordleGame.wordIndex==5) wordleGame.checkWord();
        return;
    }
    if(key=="⌫"){
        wordleGame.console[wordleGame.guessCount][wordleGame.wordIndex].textContent="";
        if(wordleGame.guessCount>0) wordleGame.wordIndex--;
        else wordleGame.wordIndex=0;
        return;
    }
    wordleGame.insertCharacter(key);
}