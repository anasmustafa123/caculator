
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

for (let i = 0; i <= 9; i++){
    const number  = document.createElement('button');
    number.id = i; 
    numsContainer.appendChild(number); 
}
