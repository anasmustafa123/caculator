
//making each operation function
function add(a,b){
    return a + b;
}
function sub(a,b){
    return a - b;
}
function mul(a,b){
    return a * b;
}
function div(a,b){
    return a / b;
}

// operator function returns the result of the operation between a,b
function operate(operator, a, b){
    switch (operator){
        case '+' : return add(a,b); 
        case '-' : return sub(a,b); 
        case '*' : return mul(a,b); 
        case '/' : return div(a,b); 
        default : throw new ArgumentException
    }
}

function preToPost(exp){
    let stack  = [];
    let result = [];
    exp.forEach(element => { //loop for all elements (number or operators)
        if( parseInt(element)){ //if number add it to the expression
            result[result.length] = parseInt(element);
        }
        else if(element == '('){  //if '(' push to stack wait for ')'
            stack.push(element);
        }
        else if(element == ')') {  //if ')'  pop and add to final expression till '('
            while(stack[stack.length-1] != '('){
                result[result.length] = stack.pop();
            }
            stack.pop(); //removing the '('
        }else{ //if its an operator 
            for(let i = stack.length-1; i >= 0;i--){
                if(priority(element) <=  priority(stack[i])){
                    result[result.length] = stack.pop();
                }else{
                    stack.push(element);
                    break;
                }
            }
            if(stack.length == 0){
                stack.push(element);
            }
        }
    });
    while(stack.length != 0){
        result[result.length] = stack.pop(); 
    }
    return result;
}

function priority(operator){
    switch(operator){
        case '/' :   case '*' : return 3;
        case '-' :   case '+' : return 2;
        case '(' : return 1;
    }
}
function evaluatePost(post){
    let stack  = [];
    post.forEach(element => { //loop for all elements (number or operators)
        if(parseInt(element)){ //if number push to stack
            stack.push(element);
        }else{ //if its an operator 
            let num1 = stack.pop();
            let num2 = stack.pop();
            stack.push(operate(element, num2, num1));
        }
    });
    return stack.pop();
}
///////////////////// manipulating the dom


const numsContainer  = document.querySelector('.numbers-container');
const screen =  document.querySelector('.screen-text');
const buttons = document.querySelectorAll('button');
const numbers = document.querySelector('.number');
const operators = document.querySelectorAll('.operator');
const row4   = document.querySelector(".row4");

let totalExpression = []; //total expression showed on the screen
let numberDigits = "";    /*current number.  will be added to totalexpression when
                                                            a operator is selected                 */

let rowNumber = 1; //row number
let count = 0;     //to count only 3 buttons on each row

for (let i = 9; i >= 0; i--){ //creating the number buttons and adding them to dom
    if(count % 3 == 0 && count!= 0 ){
        rowNumber++;
    }
    count++;
    const number  = createButton('number',i);
    number.id = i; 
    number.addEventListener('click',addDigitToScreen);
    document.querySelector(`.row${rowNumber}`).appendChild(number); //adding each 3 buttons to a sep rowClass 
}
const clearButton = createButton('clear','AC');
row4.appendChild(clearButton);
const equalButton = createButton('equal','=');
row4.appendChild(equalButton);

function  createButton(className, text){ //crete a button with a classNAme and a textContent
    const button = document.createElement('button');
    button.classList.add(className) ;
    button.textContent = text; 
    return button;
}
function addDigitToScreen(e){ //addingthe digit to the screen + adding to numberDigit 
    screen.textContent += e.target.textContent;
    addingDigit(e); 
}
function addingDigit(e){//adding to numberDigits
    numberDigits += e.target.textContent;
}

Array.from(operators).forEach( (operator) => { //looping in all operators
    operator.addEventListener('click', addingOperator);
});
function addingOperator(e){ //adding the number if exists and adding operator to the screen  
    if(parseInt(numberDigits)){
        addTotalNumber(e);
    }
    totalExpression[totalExpression.length] = e.target.textContent;
    screen.textContent += e.target.textContent;
}

function addTotalNumber(e){//adding the number to the expression 
    totalExpression[totalExpression.length] = numberDigits;
    numberDigits = "";  
}
clearButton.addEventListener('click',clear);

function clear(){ //clearing the screen
    totalExpression.length = "";
    screen.textContent = "";
}

console.log(totalExpression);