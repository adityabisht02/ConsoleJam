let user = document.getElementById("name");
let pass = document.getElementById("pass");
let email = document.getElementById("email");
let nameInputErrorMsg=document.getElementById("nameInputErrorMsg");
let passInputErrorMsg=document.getElementById("passInputErrorMsg");
let emailInputErrorMsg=document.getElementById("emailInputErrorMsg");

let lEye = document.getElementById("lEye");
let rEye = document.getElementById("rEye");

let lHand = document.getElementById("lHand");
let rHand = document.getElementById("rHand");

let userLen=0;
let passLen=0;

let userName = "";
let password = "";

let blinkerFlag=1;

pass.addEventListener("input",passCount);

user.addEventListener("input",followAlong);
user.addEventListener("pointerenter",followAlong);
pass.addEventListener("pointerenter",passCount);
pass.addEventListener("pointerenter",hide);

user.addEventListener("pointerleave",eyeReset);
pass.addEventListener("pointerleave",unhide);
email.addEventListener("input",verifyEmail);

function verifyEmail(){
    var re = /\S+@\S+\.\S+/;
    emailInputErrorMsg.style.visibility=(re.test(email.value))?"hidden":"visible";
}

function userCount(){
    userName = user.value;
    userLen = user.value.length;
}

function passCount(){
    password = pass.value;
    passLen = pass.value.length;
    if(passLen<6){
        passInputErrorMsg.style.visibility="visible";
    }else{
        passInputErrorMsg.style.visibility="hidden";
    }
    if(passLen>32){
        var temp="";
        for(k=0; k<32; k++){
            temp += password[k];
        }
        password=temp;
        pass.value = password;
        passLen=32;
    }
}

function eyeMotion(value){
    var e = 2.7182818;
    return (Math.floor((Math.pow(e,(value)/50)*15)-20));
}

function followAlong(){
    blinkerFlag=0;
    userCount();
    if(userLen<6){
        nameInputErrorMsg.style.visibility="visible";
    }else{
        nameInputErrorMsg.style.visibility="hidden";
    }
    if(userLen>32){
        var temp="";
        for(k=0; k<32; k++){
            temp += userName[k];
        }
        userName=temp;
        user.value = userName;
        userLen=32;
    }
    rEye.style.transform = "translateX(" +eyeMotion(userLen)+"px)";
    lEye.style.transform = "translateX(" +(eyeMotion(userLen)-4)+"px)";
}

function eyeReset(){
    blinkerFlag=1;
    setTimeout(blinker,Math.random()*2000+1000);
    rEye.style.transform = "translateX("+eyeMotion(16)+"px)";
    rEye.style.transform = "translateX(0px)";
    lEye.style.transform = "translateX(" +(eyeMotion(16)-4)+"px)";
    lEye.style.transform = "translateX(0px)";
}

function hide(){
    lHand.style.transformOrigin = "220px 60px";
    lHand.style.transform = "rotateZ(90deg)";

    rHand.style.transformOrigin = "76px 64px";
    rHand.style.transform = "rotateZ(-90deg)";

    lHand.style.animation = "hideL 0.5s ease-out 1";
    rHand.style.animation = "hideR 0.5s ease-out 1";
}

function unhide(){
    lHand.style.transformOrigin = "220px 60px";
    lHand.style.transform = "rotateZ(0deg)";
    rHand.style.transformOrigin = "76px 64px";
    rHand.style.transform = "rotateZ(0deg)";
    lHand.style.animation = "unhideL 0.5s ease-out 1";
    rHand.style.animation = "unhideR 0.5s ease-out 1";
}

function blinker(){
    if(blinkerFlag==1){
        lEye.style.height = (Math.floor(Math.random()+1)) + "px";
        rEye.style.height = (Math.floor(Math.random()+1)) + "px";
        lEye.style.transform="translateY(2px)";
        rEye.style.transform="translateY(2px)";
        setTimeout(unblinker,500);
        setTimeout(blinker,Math.random()*2000+1000);
    }
}

function unblinker(){
    lEye.style.height = "8px";
    rEye.style.height = "8px";
    lEye.style.transform="translateY(0px)";
    rEye.style.transform="translateY(0px)";
}

blinker();