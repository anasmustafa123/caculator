
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
/////////////////////
const numsContainer  = document.querySelector('.numbers-container');

for (let i = 0; i <= 9; i++){
    const number  = document.createElement('btn');
    number.id = i; 
    numsContainer.appendChild(number);  
}
