var plusOne = function(digits) {
    for(var i = digits.length - 1; i >= 0; i--){
        if(digits[i] + 1 > 9) digits[i] = 0;
        else {
            digits[i]++;
            return digits;
        }
    }
    digits.unshift(1);
    return digits;
};
