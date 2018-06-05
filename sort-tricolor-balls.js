var sortColors = function(nums) {
    let zeroEnd = 0;
    let twoStart = nums.length - 1;
    let i = 0;
    while (i <= twoStart) {
        if (nums[i] == 1) {
            i++;
        }
        else if (nums[i] == 0) {
            swap(nums, i, zeroEnd);
            i++;
            zeroEnd++;
        }
        else if (nums[i] == 2) {
            swap(nums, i, twoStart);
            twoStart--;
        }
    }
};

function swap(nums, a, b) {
    // Very important condition! Don't operate swap trick meant for two elements on the same element.
    if (a != b) {
        nums[a] = nums[a] + nums[b];
        nums[b] = nums[a] - nums[b];
        nums[a] = nums[a] - nums[b];
    }
}
