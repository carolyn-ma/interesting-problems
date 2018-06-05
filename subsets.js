var subsets = function(nums) {
    if (!nums) return [];
    let result = [];
    findAll(result, [], nums, 0);
    return result;
}


function findAll(result, curr, nums, index) {
    // Using .slice() is critical here
    result.push(curr.slice());
    for (let i = index; i < nums.length; i++) {
        curr.push(nums[i]);
        findAll(result, curr, nums, i+1);
        curr.pop();
    }
}
