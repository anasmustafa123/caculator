
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
        default : return null;
    }
}
function isOperator(char){ //check if char is an operator
    switch (char){
        case '+': case '-': case '*': case  '/': return true;
        default : return false;
    }
}
function preToPost(exp){
    let stack  = [];
    let result = [];
    for(let i = 0 ; i < exp.length ;i++){ //loop for all elements (number or operators)
        if( parseInt(exp[i])){ //if number add it to the expression
            result[result.length] = parseInt(exp[i]);
        }
        else if(exp[i] == '('){  //if '(' push to stack wait for ')'
            stack.push(exp[i]);
        }
        else if(exp[i] == ')') {  //if ')'  pop and add to final expression till '('
            while(stack[stack.length-1] != '(' && stack.length != 0){
                result[result.length] = stack.pop();
            }
            if(stack.length == 0){ //that means it traversed the whole expression without finding any '('
                result=  null;
                return result;
            }
            stack.pop(); //removing the '('
        }else if(isOperator(exp[i])){ //if its an operator 
            for(let j = stack.length-1; j >= 0;j--){
                if(priority(exp[i]) <=  priority(stack[j])){
                    result[result.length] = stack.pop();
                }else{
                    stack.push(exp[i]);
                    break;
                }
            }
            if(stack.length == 0){
                stack.push(exp[i]);
            }
        }else {
            result=  null;
            return result;
        }
    }
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
    if(post == null){return null;}
    for(let i = 0; i < post.length; i++){ //loop for all elements (number or operators)
        if(parseInt(post[i])){ //if number push to stack
            stack.push(post[i]);
        }else{ //if its an operator
            let num1,num2;
             if(stack.length != 0){
                 num1 = stack.pop();
                if(!parseInt(num1)){
                    return null;
                }
             }else{return null}
             if(stack.length != 0){
                 num2 = stack.pop();
                if(!parseInt(num2)){
                    return null;
                }
             }else{return null}
             let output = operate(post[i], num2, num1);
             if(output == null){return null;}
            stack.push(output);
        }
    }
    return stack.pop();
}
///////////////////// manipulating the dom


const numsContainer  = document.querySelector('.numbers-container');
const screen =  document.querySelector('.screen-text');
const buttons = document.querySelectorAll('button');
const numbers = document.querySelector('.number');
const operators = document.querySelectorAll('.operator');
const row4   = document.querySelector(".row4");
const outputScreen = document.querySelector('.screen2'); 
const clearButton = createButton('clear','AC');
const equalButton = createButton('equal','=');

let rowNumber = 1; //row number
let count = 0;     //to count only 3 buttons on each row

for (let i = 9; i >= 0; i--){ //creating the number buttons and adding them to dom
    if(count % 3 == 0 && count!= 0 ){
        rowNumber++;
    }
    count++;
    const number  = createButton('number',i);
    number.id = i; 
    number.addEventListener('click',addingToScreen);
    document.querySelector(`.row${rowNumber}`).appendChild(number); //adding each 3 buttons to a sep rowClass 
}
row4.appendChild(clearButton);
row4.appendChild(equalButton);

equalButton.addEventListener('click',enter);

Array.from(operators).forEach( (operator) => { //looping in all operators
    operator.addEventListener('click', addingToScreen);
});
function addingToScreen(e){ //adding the number if exists and adding operator to the screen  
    screen.textContent += e.target.textContent;
    outputScreen.textContent = "";
}

clearButton.addEventListener('click',clear);

function clear(){ //clearing the screen
    screen.textContent = "";
    outputScreen.textContent = "";
}
function enter (){
    output = evaluatePost(preToPost(separateExpression(screen.textContent))) ;
     if(output == null){
        outputScreen.textContent = "SYNTAX ERROR  [AC] : CANCEL";
    }else{
        outputScreen.textContent = output;
    } 
}
function  createButton(className, text){ //crete a button with a classNAme and a textContent
    const button = document.createElement('button');
    button.classList.add(className) ;
    button.textContent = text; 
    return button;
}
function separateExpression(exp){
    let finalExp = [];
    let number = "";
    for (let i = 0; i < exp.length; i++) {
        if(!isNaN(exp[i])){
            number += exp[i];
        }else if(isOperator(exp[i]) || exp[i] == '(' || exp[i] == ')'){
            if(number.length != 0){
                finalExp.push(number);
                number = "";
            }
            finalExp.push(exp[i]);
        }
    }   
    if(number.length != 0){
       finalExp.push(number);
    }
    console.log(finalExp);
    return  finalExp;  
}