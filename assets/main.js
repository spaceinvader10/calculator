
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
const sDisplay = document.getElementById('displaySmall');
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
  '%': (a, b = undefined) => {
    if(b !== undefined && b !== 0){
      return b / 100;
    } else if(b === 0){
      return a /100;
    } else {
      return a / 100;
    }
  }, 
  '_': (a, b = undefined) => {
    if(b !== undefined && b !== 0){
      return b * -1;
    } else if (b === 0){
      //for some reason B is getting replaced by zero when undefined
      return -a;
    } else { 
      return a * -1;
    }
    }
};

//negative and percentage resolved, now need to focus on why the decimals are not working.
//after setting decimals we can move onto enabling clicks
//optional but a display of the equations and storage constantly would be useful.


function calculate(operator, a, b) {
  const opFunc = operators[operator];

  result = opFunc(a, b);

  console.log(`${a} ${operator} ${b} = ${result}`);
  sDisplay.innerText = `${a} ${operator} ${b} = ${result}`;


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
  sDisplay.innerText = 0;
}

clear.addEventListener('click', clearAll);
backspace.addEventListener('click', function() {
  // Remove the latest character from the string, issue with deleting only the first character also not permanant
  if (result) {
    let txt = result.toString();
    txt = txt.includes('.') ? Math.floor(parseFloat(txt)).toString() : txt.substring(0, txt.length-1);
    console.log(txt);

    display.innerText = txt;
  }
});


document.addEventListener('keydown', function (e) {
  if (isFinite(e.key)) {
    let number = e.key;
    numberHold += e.key.toString();
    display.innerText = numberHold;

    console.log('the number chosen is: ' + number);

  } else if (
    e.key == '*' || e.key == '+' || e.key == '-' || e.key == '/' ||
    e.key == '.' || e.key == '%' || e.key == '_' ) {

    display.innerText = e.key;
    chosenOperation = e.key;

//maybe create a own function for decimals themeselves?    

    if(opStorage.length === 1 && e.key === '_' && opStorage[1] !== '_'){
      opStorage[1] = '_';
    } else if(opStorage.length === 1 && e.key === '%' && opStorage[1] !== '%'){
      opStorage[1] = '%';
    } else {
      opStorage[0] = chosenOperation;
    }




    if(storage.length === 0){
        storage[0] = Number(numberHold);
        aNumber = Number(numberHold)
        console.log(storage);
        numberHold = '';
    }// 
    
    
  } else if (e.key == '=') {
    // if(storage.length === 1 && storage[0] < -1){

    // }

    if (storage.length === 0) {
      storage[0] = 0;
      // storage[0] = Number(numberHold);
      // aNumber = Number(numberHold);
    }

      storage[1] = Number(numberHold);
      bNumber = Number(numberHold) 
      numberHold = '';

      //somewhere have the decimal and percentage here
    if(storage.length === 2 && opStorage.length === 2 ){
      if(opStorage[1] === '_'){
        sum = calculate(opStorage[1], Number(storage[1]), 0)
      } else if( opStorage[1] === '%'){
        sum = calculate(opStorage[1], Number(storage[1]), 0)
      }

      
      result = calculate(opStorage[0], Number(storage[0]), sum)
      storage = [result];
      opStorage = [];
      return (display.innerText = result);



    
    } else if (storage.length === 2 && opStorage.length === 1) { 
      result = calculate(opStorage[0], Number(storage[0]), Number(storage[1]));
      storage = [result];
      opStorage = [];
      return (display.innerText = result);
    } else if (storage.length === 2){
      result = Number(storage[0])
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








