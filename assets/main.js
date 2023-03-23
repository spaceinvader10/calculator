
//operate function, takes an operator and 2 numbers then calls one of the 4 functions
//4 functions, add, subtract, multiply, and divide
const btn0 = document.getElementById('0');
const btn1 = document.getElementById('one');
const btn2 = document.getElementById('two');
const btn3 = document.getElementById('three');
const btn4 = document.getElementById('four');
const btn5 = document.getElementById('five');
const btn6 = document.getElementById('six');
const btn7 = document.getElementById('seven');
const btn8 = document.getElementById('eight');
const btn9 = document.getElementById('nine');
const clear = document.getElementById('clear');
const display = document.getElementById('displayScreen');
const wrapper = document.querySelectorAll('.section');

const numberArr = [1,2,3,4,5,6,7,8,9,0];
let storage = [];
let opStorage = [];
let ans;
let sum = 0;
let chosenOperation;

const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a,b) => a / b,
    '.': (a, b=0) => 0.10 * a + b
};

function calculate (operator, a, b){
    const opFunc = operators[operator];
    console.log(opFunc(a,b));
    return opFunc(a,b);
}
// based on the operator, takes it from the object and returns a,b


clear.addEventListener('click', function(e){
    console.log('all clear!');
    storage = [];
    
})

document.addEventListener('keydown',function(e){
    for(let number of numberArr){
        //use for...of because it iterates over values vs for in where it iterates over key names
        if(e.key == number || e.key =='.' ){
            //probably want to break out the operations and numbers
            display.innerText = e.key;
            number  = e.key;
        
            if(storage.length === 0){
                storage[0] = Number(number);
            } else if (storage.length === 1){
                storage[1] = Number(number);
            } else if(storage.length === 2) {
                storage[0] = storage[1]
                storage.splice(1,1,Number(number))
            }
            //maybe splice with odd mod number so you can alternate

            console.log('it is here!' + number)
        } else if(e.key == '*' || e.key == '+' || e.key == '-' || e.key == '/') {
            console.log('operation was chosen ' + chosenOperation);
            display.innerText = e.key;
            chosenOperation = e.key;
            opStorage[0] = chosenOperation;
        }
            //we have the operation chosen, but need to link it to the function

        if(e.key == '='){
            if(storage.length === 2){
                console.log('operation was run')
                calculate(opStorage[0], storage[0],storage[1])
            } else {
                console.log('please enter Number + operator + number before entering')
            }
            //how do we overwrite? Clear if we enter different numbers?
        } 

    }


    //console.log(e)
} )

    for(i = 0; i < wrapper.length; i++){
        wrapper[i].addEventListener('click', (event)=> {
        let number1;
        const isButton = event.target.nodeName === 'BUTTON';
        if(!isButton){
            return;
        }

        if (event.target.id === 'equal'){
                if(opStorage.length === 1 && storage.length === 2){
                    calculate(opStorage, storage[0],storage[1]); 
                }
            }

        if (!event.target.innerText){
            number1 = event.target.id;
            
            if(event.target.id === 'add'){
                opStorage[0] = '+';
            } else if (event.target.id === 'subtract'){
                opStorage[0] = '-';
            } else if (event.target.id === 'multiply'){
                opStorage[0] = '*';
            } else if (event.target.id === 'divide'){
                opStorage[0] = '/';
            } 

        } else {
            number1 = event.target.innerText;
        
            if(!storage[0]){
                storage[0] = Number(number1);
            } else if(storage[0] && !storage[1]){
                storage[1] = Number(number1);
            } else {
                storage.length = 0;
                storage[0] = Number(number1);
            }
                
        }
        
        display.innerText = number1;
        // console.log(chosenOperation)

        })
    }








