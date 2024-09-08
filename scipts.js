console.log("helllo");

const sliderValue = document.querySelector("[data-sliderval]") ; 
const slider = document.querySelector(".slider") ; 
const passDisplay = document.querySelector("[data-displayPassword]");
const genbttn = document.querySelector("[data-genPassBttn]") ; 
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const clipbttn = document.querySelector("#clipboardbttn") ; 
const colorDiv  = document.querySelector(".color") ; 

// sliderValue.textContent = sliderDisplay.Value  ; 

//  variables 
let passLength = slider.value ; 
let passWord = "" ; 
passDisplay.value=""; 

function f(){
    console.log(lowercaseCheck.checked);
}



slider.oninput = function() {
    sliderValue.textContent = this.value;
    passLength=this.value ; 
}

function displayPass(passWord){
    passDisplay.value = `${passWord}`  ;
}


function genRandomNoinRange(min,max){
    let randIndx  =  Math.random() * (max - min)  + min ;
    return Math.round( randIndx )  ; 

}

const UPPer = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER="abcdefghijklmnopqrstuvwxyz";
const NO = "1234567890";
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';




function getRandomUpper(){
    let randIndex = genRandomNoinRange(0,25) ; 
    return UPPer.charAt(randIndex) ; 

}

function getRandomLower(){
    let randIndex = genRandomNoinRange(0,25) ; 
    return LOWER.charAt(randIndex) ; 

}

function getRandomNO(){
    let randIndex = genRandomNoinRange(0,9) ; 
    return NO.charAt(randIndex) ; 

}

function getRandomSymbols(){
    let randIndex = genRandomNoinRange(0,symbols.length-1) ; 
    return symbols.charAt(randIndex) ; 

}



genbttn.addEventListener('click',()=>{

    let func = []

    let length = passLength ; 
    if(uppercaseCheck.checked)
        func.push(getRandomUpper) ; 
    if(lowercaseCheck.checked)
            func.push(getRandomLower) ; 
    if(numbersCheck.checked)
            func.push(getRandomNO) ; 
    if(symbolsCheck.checked)
            func.push(getRandomSymbols) ; 
    
    let includedLength  = func.length ; 

    for(let i =  0 ;i<includedLength ; i++  )
        passWord+=func[i]() ; 

    let restLength = length - includedLength ; 

    for(let i=includedLength;i<length ; i++){
        let randomIndex = genRandomNoinRange(0,func.length-1);
        passWord+=func[randomIndex]() ; 
    }




    console.log(passWord);

    passWord = shufflePassword(Array.from(passWord)) ; 
    calcStrength() ; 

    displayPass(passWord) ; 
    passWord="" ; 
}) ; 


clipbttn.addEventListener('click',()=>{

    if(passDisplay.value==="")
        alert("nothhing to copy ");

    copyToClipBoard() ; 

    console.log("copied");  
})


async function copyToClipBoard(){
    try{
        await navigator.clipboard.writeText(passDisplay.value) ; 

    }catch(err){
        console.log("error occured while copying ");
    }


}


function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));


    return str;
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passLength >= 6
    ) {
      setIndicator(" #8a886c");  // #ff0 
    } else {
      setIndicator("#f00");
    }
}

function setIndicator(color){
    colorDiv.style.backgroundColor = `${color}` ; 
    colorDiv.style.boxShadow = `0px 0px 12px 1px ${color}`;

}
