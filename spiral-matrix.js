// Solution 1: Iterate through every element

var spiralOrder = function(matrix) {
    if (matrix.length == 0) return matrix;
    
    let result = [];
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;
    
    let k = 0;
    let m = matrix.length * matrix[0].length;
    
    while (k < m) {
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
            k++;
        }
        top++;
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
            k++;
        }
        right--;
        for (let i = right; i >= left; i--) {
            if (top <= bottom) {
                result.push(matrix[bottom][i]);
                k++;
            }
        }
        bottom--;
        for (let i = bottom; i >= top; i--) {
            if (left <= right) {
                result.push(matrix[i][left]);
                k++;
            }
        } 
        left++;
    }
    return result;
};



// Solution 2: Iterate through every outer cycle

var spiralOrder = function(matrix) {
    if (matrix.length == 0) return matrix;
    let result = [];
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;
    
    while (top < bottom && left < right) {
        for (let i = left; i < right; i++) {
            result.push(matrix[top][i]);
        }
        for (let i = top; i < bottom; i++) {
            result.push(matrix[i][right]);
        }
        for (let i = right; i > left; i--) {
            result.push(matrix[bottom][i]);
        }
        for (let i = bottom; i > top; i--) {
            result.push(matrix[i][left]);
        } 
        top++;
        bottom--;
        left++;
        right--;
   }
    
    if (top == bottom) {
        while (left <= right) {
            result.push(matrix[top][left]);
            left++;
        }
    }
    if (left == right) {
        while (top <= bottom) {
            result.push(matrix[top][left]);
            top++;
        }
    }

    return result;
};
