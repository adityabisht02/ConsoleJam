var i;
var count=10;
var score=0;
var time=document.querySelector(".time");
var scoreboard=document.querySelector(".score");
function generaterandom(){
    var one=Math.floor(Math.random()*35+1);
    return one;
}


function countdown(){
    if(count>0)
    { time.innerHTML=count;
        count--;
        setTimeout(countdown,1000);
    }
    else{
        document.querySelector(".timeword").innerHTML=" ";
        time.innerHTML="Congrats! U hit "+score+" targets in 10 seconds";
      
    }
    

}

for(i=0;i<=34;i++)
{

  let ball=  document.querySelectorAll(".ball")[i];
  ball.addEventListener("click",function(){
 
    ball.classList.add("invisible");
    score++;
    scoreboard.innerHTML=score;   
    var audio=new Audio("../sounds/red.mp3");
    audio.play();

 let newball=  document.querySelectorAll(".ball")[generaterandom()];
 newball.classList.remove("invisible");
  });
}
