
//operate function, takes an operator and 2 numbers then calls one of the 4 functions
//4 functions, add, subtract, multiply, and divide
// const btn0 = document.getElementById('0');
// const btn1 = document.getElementById('one');
// const btn2 = document.getElementById('two');                        
// const btn3 = document.getElementById('three');
// const btn4 = document.getElementById('four');
// const btn5 = document.getElementById('five');
// const btn6 = document.getElementById('six');
// const btn7 = document.getElementById('seven');
// const btn8 = document.getElementById('eight');
// const btn9 = document.getElementById('nine');

const backspace = document.getElementById('backspace');
const clear = document.getElementById('clear');
const display = document.getElementById('displayScreen');
const decimalP = document.getElementById('decimal');
const wrapper = document.querySelectorAll('.section');

const numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let storage = [];
let opStorage = [];
let result = '';
let numberHold = '';
let sum = 0;
let aNumber = 0;
let bNumber = 0;
let chosenOperation;

const operators = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '.': (a, b) => parseFloat(`${a}.${b}`),
  // '%': (a, b = undefined) => {
  //   if(b !== undefined){
  //     return b / 100;
  //   } else {
  //     return a / 100;
  //   }
  // }, 
  // '_': (a, b = undefined) => {
  //   if(b !== undefined){
  //     return b * -1;
  //   } else { 
  //     return a * -1;
  //   }
  //   }
};

//issues with percentage sign and negiatve sign when dealing with the 2nd character not the first. Behavior for first digit is working as intended

function calculate(operator, a, b) {
  const opFunc = operators[operator];

  result = opFunc(a, b);
  console.log(`${a} ${operator} ${b} = ${result}`);
  display.innerText = result;
  return result;
}

function clearAll() {
  console.log('all clear!');
  storage = [];
  opStorage = [];
  result = '';
  numberHold = '';
  aNumber = '';
  bNumber = '';
  sum = 0;
  chosenOperation = '';
  display.innerText = 0;
}

clear.addEventListener('click', clearAll);
backspace.addEventListener('click', function() {
  //take off the latest letter on the string
})


document.addEventListener('keydown', function (e) {
  if (isFinite(e.key)) {
    let number = e.key;
    numberHold += e.key.toString();
    display.innerText = numberHold;

    console.log('the number chosen is: ' + number);

  } else if (
    e.key == '*' || e.key == '+' || e.key == '-' || e.key == '/' ||
    e.key == '.' || e.key == '%' || e.key == '_') {

    display.innerText = e.key;
    chosenOperation = e.key;
    opStorage[0] = chosenOperation;

    if(storage.length === 0 && e.key == '_'){
      storage[0] = Number(numberHold) * -1;
      aNumber = Number(numberHold) * -1;
      console.log(storage);
      numberHold = '';
    }// 

    if(storage.length === 0 && e.key == '%'){
      storage[0] = Number(numberHold) / 100;
      aNumber = Number(numberHold) /100;
      console.log(storage);
      numberHold = '';
    }// 

    if(storage.length === 0){
        storage[0] = Number(numberHold);
        aNumber = Number(numberHold)
        console.log(storage);
        numberHold = '';
    }// 
    
    
  } else if (e.key == '=') {
      storage[1] = Number(numberHold);
      bNumber = Number(numberHold) 
      numberHold = '';

      //somewhere have the decimal and percentage here
    if (storage.length === 2) {
      result = calculate(opStorage[0], Number(storage[0]), Number(storage[1]));
      storage = [result];
      opStorage = [];
      return (display.innerText = result);

    } else {
      console.log('please enter Number + operator + number before entering');
    }
  } 
    //   else {
    //   storage[1] = Number(numberHold);
    //   numberHold = '';
    //   console.log(storage);
    // }


});

  

    // for(i = 0; i < wrapper.length; i++){
    //     //this is the querySelectAll sections nodelist
    //     wrapper[i].addEventListener('click', (event)=> {
            
    //     let number1;
        

    //     const isButton = event.target.nodeName === 'BUTTON';
    //     if(!isButton){
    //         return;
    //     }

    //     if (event.target.id === 'decimal'){
    //         opStorage[0] = '.';      

    //     } else if(!isNaN(event.target.innerText)) {
    //         //if the innerText is not not a number
    //         sum = event.target.innerText;
    //         currentNumber += sum;
    //         //display.innerText = currentNumber;
    //         // console.log(currentNumber)

    //         if(!storage[0] && currentNumber){
    //             storage[0] = Number(currentNumber);
    //         // console.log(storage)
    //         } else if (ans && !storage[0]){
    //             storage[0] = ans;
    //         } else if(storage[0] && !storage[1]){
    //             storage[1] = Number(currentNumber);
    //         } else {
    //             storage.length = 0;
    //         // storage[0] = Number(currentNumber);
    //         }
    //     }   else if (event.target.id === 'equal'){  
    //             if(opStorage.length === 0 && storage.length ===1){
    //                 // console.log(storage[0])
    //                 //this is if they press equal after having a single digit
    //                 return; 
    //             }

    //             if (opStorage.length === 1 && storage.length === 1){ 
    //                 if(ans){      
    //                     storage[1] = storage[0];
    //                     storage[0] = ans;
    //                     result = calculate(opStorage[0], storage[0], storage[1])
    //                     console.log('running')
    //                 } else {
    //                     result = calculate(opStorage[0], storage[0], storage[1])
    //                     console.log('running 2')
    //                 }   
    //                 return display.innerText = result
    //             }
    //             else if (opStorage.length === 1 && storage.length > 1){
    //                 if(!ans){
    //                     ans = calculate(opStorage[0], storage[0],storage[1]);
    //                     return display.innerText = ans;
    //                 } else {
    //                     result = calculate(opStorage[0], ans, storage[1]);
    //                     return display.innerText = result;
    //                 }
                    
    //             }  else if(opStorage[0] === '.' && storage.length === 1){
    //                 result = calculate(opStorage[0], 0, storage[0])
    //                 return display.innerText = result;
    //             }            
    //         }
    //         else if (!event.target.innerText){
            
    //         if(event.target.id === 'add'){
    //             opStorage[0] = '+';
    //             storage[0] = currentNumber;
    //             currentNumber = '';
    //         } else if (event.target.id === 'subtract'){
    //             opStorage[0] = '-';
    //         } else if (event.target.id === 'multiply'){
    //             opStorage[0] = '*';
    //         } else if (event.target.id === 'divide'){
    //             opStorage[0] = '/';
    //         } else if (event.target.id === 'percent'){
    //             opStorage[0] = '%';
    //         } else if (event.target.id === 'negativeSign'){
    //             opStorage[0] = '_';
    //         } 
    //         //display the operator
           
    //         return display.innerText = opStorage[0];

    //     } 
            
    //        // return display.innerText = currentNumber;
    //     if(number1 == 'add' || number1 == 'subtract' || number1 == 'multiply' || 
    //     number1 == 'divide' || number1  == 'percent' || number1 == 'decimal' || number1 == 'negativeSign'){
    //         number1 = opStorage[0];
    //     }
    //     // display.innerText = currentNumber;
    //     display.innerText = currentNumber;
    //     // console.log(chosenOperation)
    //     })
    // }








