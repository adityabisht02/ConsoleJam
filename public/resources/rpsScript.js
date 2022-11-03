let svg="<svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect x='13.8413' width='31.1042' height='27.6243' fill='url(#pattern0)'/><rect x='68.896' y='43.9227' width='31.1042' height='27.6243' fill='url(#pattern1)'/><rect y='72.3757' width='31.1042' height='27.6243' fill='url(#pattern2)'/><path d='M84.5296 41.9225C85.3941 41.7942 86.0022 41.0646 85.8877 40.2929L84.0223 27.7161C83.9078 26.9444 83.1142 26.4227 82.2497 26.5509C81.3851 26.6791 80.7771 27.4087 80.8916 28.1805L82.5497 39.3598L70.0268 41.2172C69.1623 41.3454 68.5542 42.075 68.6687 42.8468C68.7832 43.6186 69.5768 44.1403 70.4413 44.0121L84.5296 41.9225ZM43.9855 15.7932L83.362 41.6773L85.2827 39.3727L45.9061 13.4886L43.9855 15.7932Z' fill='black'/><path d='M35.5503 85.3967C35.1339 86.0861 35.3867 87.0015 36.115 87.4415L47.9835 94.6111C48.7118 95.0511 49.6398 94.8489 50.0562 94.1596C50.4726 93.4703 50.2198 92.5548 49.4915 92.1148L38.9417 85.7418L44.9736 75.7567C45.3901 75.0673 45.1372 74.1519 44.4089 73.7119C43.6806 73.2719 42.7526 73.4741 42.3362 74.1634L35.5503 85.3967ZM84.0484 74.3829L36.4697 84.7475L37.2683 87.6392L84.8471 77.2746L84.0484 74.3829Z' fill='black'/><path d='M16.6498 28.2551C16.1475 27.6114 15.2034 27.5086 14.5409 28.0254L3.74527 36.448C3.0828 36.9649 2.95288 37.9057 3.45509 38.5494C3.9573 39.1931 4.90146 39.2959 5.56394 38.7791L15.1601 31.2923L22.4347 40.6167C22.9369 41.2604 23.8811 41.3632 24.5436 40.8463C25.206 40.3295 25.336 39.3887 24.8337 38.745L16.6498 28.2551ZM10.978 72.5381L16.9414 29.3534L13.9591 29.0285L7.99564 72.2133L10.978 72.5381Z' fill='black'/><defs><pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'><use xlink:href='#image0_22_51' transform='translate(0 -0.062986) scale(0.0104167 0.0117289)'/></pattern><pattern id='pattern1' patternContentUnits='objectBoundingBox' width='1' height='1'><use xlink:href='#image1_22_51' transform='translate(0 -0.062986) scale(0.0104167 0.0117289)'/></pattern><pattern id='pattern2' patternContentUnits='objectBoundingBox' width='1' height='1'><use xlink:href='#image2_22_51' transform='translate(0 -0.062986) scale(0.0104167 0.0117289)'/></pattern><image id='image0_22_51' width='96' height='96' xlink:href='/images/Paper.png'/><image id='image1_22_51' width='96' height='96' xlink:href='/images/Rock.png'/><image id='image2_22_51' width='96' height='96' xlink:href='/images/Scissors.png'/></defs></svg>"
let svgDesign=document.getElementById("ruleSvg");
for(i=0;i<11;i++){
    let svgContainer=document.createElement("div");
    svgContainer.innerHTML=svg;
    svgContainer.id="svg"+i;
    svgContainer.className="svgElement";
    svgContainer.style.top=(Math.random()*74+2)+"%";
    svgContainer.style.left=i*8.5+"%";
    svgContainer.style.zIndex=0;
    if(Math.floor(Math.random()*2)==1){
        svgContainer.style.animation="spin "+(Math.random()*10+2)+"s infinite";
    }else{
        svgContainer.style.animation="spinBack "+(Math.random()*10+2)+"s infinite";
    }
    svgDesign.appendChild(svgContainer);
}

let result=document.getElementById("result");
let output;
let img1=document.getElementById("img1");
let img2=document.getElementById("img2");
let img3=document.getElementById("img3");
fetch("/resources/RockPaperScissors.json").then(response=>{
    return response.json();
}).then((jsonData)=>{
    img1.innerHTML=jsonData["rockImage"];
    console.log(jsonData["rockImage"]);
    img2.innerHTML=jsonData["paperImage"];
    console.log(jsonData["paperImage"]);
    img3.innerHTML=jsonData["scissorsImage"];
    console.log(jsonData["scissorsImage"]);
    output=jsonData["outcome"];
    console.log(result);
});

let playerChoiceRock=document.getElementById("playerChoiceRock");
let playerChoicePaper=document.getElementById("playerChoicePaper");
let playerChoiceScissors=document.getElementById("playerChoiceScissors");

playerChoiceRock.addEventListener("mouseenter",()=>{playerChoiceRock.style.border="2px #66D0E8 solid"});
playerChoiceRock.addEventListener("mouseleave",()=>{playerChoiceRock.style.border="none"});
playerChoiceRock.addEventListener("click",()=>{playerChoiceRock.style.border="2px grey solid";setTimeout(()=>{playerChoiceRock.style.border="none";},200);new outcome(0).startMatch()});

playerChoicePaper.addEventListener("mouseenter",()=>{playerChoicePaper.style.border="2px #66D0E8 solid"});
playerChoicePaper.addEventListener("mouseleave",()=>{playerChoicePaper.style.border="none"});
playerChoicePaper.addEventListener("click",()=>{playerChoicePaper.style.border="2px grey solid";setTimeout(()=>{playerChoicePaper.style.border="none";},200);new outcome(1).startMatch()});

playerChoiceScissors.addEventListener("mouseenter",()=>{playerChoiceScissors.style.border="2px #66D0E8 solid"});
playerChoiceScissors.addEventListener("mouseleave",()=>{playerChoiceScissors.style.border="none"});
playerChoiceScissors.addEventListener("click",()=>{playerChoiceScissors.style.border="2px grey solid";setTimeout(()=>{playerChoiceScissors.style.border="none";},200);new outcome(2).startMatch()});

class outcome{
    constructor(playerChoice){
        this.playerChoice=playerChoice;
        this.computerChoice=Math.floor(Math.random()*3);
    }

    startMatch(){
        console.log(output[this.playerChoice][this.computerChoice][1]);
        result.textContent=output[this.playerChoice][this.computerChoice][0];
        this.updateScore(output[this.playerChoice][this.computerChoice][1]);
    }

    updateScore(n){
        let aiBoard=document.getElementById("aiBoard");
        let aiScore=parseInt(aiBoard.textContent);
        let playerBoard=document.getElementById("playerBoard");
        let playerScore=parseInt(playerBoard.textContent);
        switch(parseInt(n)){
            case 0:
                break;
            case 1:
                playerScore+=1;
                playerBoard.textContent=playerScore;
                break;
            case -1: 
                aiScore+=1;
                aiBoard.textContent=aiScore;
                break;
            default:
                alert("Oops! ^_^! Something went wrong!");
                break;
        }
    }
}

//Testing for 1000 matches
// let counter=0;
// let interval=setInterval(()=>{
//     new outcome(Math.floor(Math.random()*3)).startMatch();
//     counter++;
//     if(counter==1000){
//         clearInterval(interval);
//     }
// },10)