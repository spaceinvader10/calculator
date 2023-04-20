
const backspace = document.getElementById('backspace');
const clear = document.getElementById('clear');
const display = document.getElementById('displayScreen');
const sDisplay = document.getElementById('displaySmall');
const decimalP = document.getElementById('decimal');
const wrapper = document.querySelectorAll('.section');

const negative = document.getElementById('negativeSign');
const addition = document.getElementById('add');
const subtraction = document.getElementById('subtract');
const multiplication = document.getElementById('multiply');
const division = document.getElementById('divide');
const equals = document.getElementById('equal');


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

function calculate(operator, a, b) {
  const opFunc = operators[operator];

  result = opFunc(a, b);

  console.log(`${a} ${operator} ${b} = ${result}`);

  if(operator === '%' || operator === '_'){
    sDisplay.innerText =`${a} ${operator} = ${result}`;
  } else {
    sDisplay.innerText = `${a} ${operator} ${b} = ${result}`;
  }

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
  sDisplay.innerText = 'Empty';
}


function stepBack() {
  if(result) {
    storage = [result];
  } else if (aNumber) {
    aNumber = aNumber.toString().slice(0, -1);
    storage = [Number(aNumber)];
    display.innerText = aNumber || 0;
  }
}


function pressedKey(key){
  return function(){
    const event = new KeyboardEvent('keydown', {key});
    document.dispatchEvent(event)
  }
}



clear.addEventListener('click', clearAll);
backspace.addEventListener('click', stepBack);
division.addEventListener('click', pressedKey('/'));
addition.addEventListener('click', pressedKey('+') );
subtraction.addEventListener('click', pressedKey('-'));
multiplication.addEventListener('click', pressedKey('*'));
decimalP.addEventListener('click', pressedKey('.'));
negative.addEventListener('click', pressedKey('_'));
equals.addEventListener('click', pressedKey('='))

const numberButtons = Array.from(document.querySelectorAll('.number'));
//this assigns button 0-9 event listeners
for(let i = 0; i < numberButtons.length; i++){
  const btn = numberButtons[i];
  const key = btn.textContent;
  btn.addEventListener('click', pressedKey(key))
}





document.addEventListener('keydown', function (e) {
  if (isFinite(e.key) || e.key == '.') {
    let number = e.key;
    numberHold += e.key.toString();
    display.innerText = numberHold;

    console.log('the number chosen is: ' + number);
    aNumber = numberHold;
    
    if (e.key == '.' ) {
      chosenOperation = '.';
      opStorage.push(chosenOperation);
      if(aNumber && bNumber){
        console.log('worked ! aNumber ' + aNumber + ' bNumber ' + bNumber)
        result = calculate(chosenOperation, aNumber, bNumber);
        display.innerText = result;
        return result;
      }
      
    bNumber = numberHold;   
    }
   


  } else if (
    e.key == '*' || e.key == '+' || e.key == '-' || e.key == '/' ||
    e.key == '%' || e.key == '_' ) {

    e.preventDefault()
    //this stops the annoying ctrl f when clicking '/' in mozzilla. Praise the lord!
    display.innerText = e.key;
    chosenOperation = e.key;


    if (opStorage.length === 1 && (e.key === '%' || e.key === '_')) {
      opStorage[1] = e.key;
    } else {
      opStorage[0] = chosenOperation;
    }


    if(storage.length === 0){
        storage[0] = Number(numberHold);
        aNumber = Number(numberHold)
        console.log(storage);
        numberHold = '';
    } 

    numberHold = '';
    

  

  } else if (e.key == '=' || e.key == 'Enter') {

      if(storage.length > 2){
        storage[1] = storage[2];
        storage.pop();
      } else {

      // } 
      storage.push(Number(numberHold));
      // bNumber = Number(numberHold) 
       numberHold = '';

      }


    if(storage.length === 2 && opStorage.length === 2 ){
      if(opStorage[1] === '_'){
        sum = calculate(opStorage[1], Number(storage[1]), 0);
        result = calculate(opStorage[0], Number(storage[0]), sum);
      } else if( opStorage[1] === '%'){
        sum = calculate(opStorage[1], Number(storage[1]), 0);
        result = calculate(opStorage[0], Number(storage[0]), sum);
      } else if( opStorage[1] === '.'){
        result = calculate(opStorage[0], Number(storage[0]), Number(storage[1]));
      } 

      storage = [result];
      opStorage = [];
      return (display.innerText = result);



    
    } else if (storage.length === 2 && opStorage.length === 1 && opStorage[0] !== '.') { 
      result = calculate(opStorage[0], Number(storage[0]), Number(storage[1]));
      storage = [result];
      opStorage = [];
      return (display.innerText = result);
    } else if (storage.length === 2 && opStorage[0] == '='){
      result = Number(storage[0])
      storage = [result];
      opStorage = [];
      return (display.innerText = result);
    } else{
      //this was created due to people entering number by itself then clicking equals.
      if(storage.length === 1 && opStorage.length === 0){
        result =  storage[0];
        storage = [result]
      }

    }
  } else if (e.key == 'c'){
    clearAll();
  } else if (e.key == 'Backspace'){
    stepBack();
  }
});



