var postorderTraversal = function(root) {
    let result = [];
    let level = [];
    let prev = null;
    let curr = root;
    if (!root) return result;
    level.push(curr);
    while (level.length > 0) {
        curr = level[level.length-1];
        if (prev == null || prev.left == curr || prev.right == curr) {
            if (curr.left) {
                level.push(curr.left);
            } else if (curr.right) {
                level.push(curr.right);
            } 
        }
        else if (curr.left == prev) {
            if (curr.right) {
                level.push(curr.right);
            }
        } else {
            result.push(curr.val);
            level.pop();
        }
        prev = curr;
    }
    return result;
};
