const hasNumeric = function(value){
    let isNumeric = false;
    for(let i = 0; i < value.length; i++){
        if(!isNaN(value[i])){
            isNumeric = true;
        }
    }
    return isNumeric;
};

const hasUppercase = function(value){
    let isUppercase = false;
    for (let i = 0; i < value.length; i++){
        if(value[i].match(/[a-z]/i) && value[i] == value[i].toUpperCase()){
            isUppercase = true;
        }
    }
    return isUppercase;
};

const hasOnlyNumbers = function(value){
    for (let i = value.length - 1; i >= 0; i--) {
        const codeValue = value.charCodeAt(i);
        if (codeValue < 48 || codeValue > 57) 
        return false;
    }
    return true;
};

const isValidMonth = function(value){
    let isValidMonth = true;
    if(value > 12 || value < 1){
        isValidMonth = false;
    }
    return isValidMonth;
}

const greaterThanZero = function(value){
    let greaterThanZero = false;
    if(value > 0){
        greaterThanZero = true;
    }
    return greaterThanZero;
}

export { hasNumeric, hasUppercase, isValidMonth, greaterThanZero, hasOnlyNumbers };