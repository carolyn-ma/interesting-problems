var rightSideView = function(root) {
    var rightNodes = [];
    rightView(root, rightNodes, 0);
    return rightNodes;
};

function rightView(root, rightNodes, depth){
    if (!root) return;
    // Store one rightest node at each level.
    if (!rightNodes[depth]){
        rightNodes.push(root.val);
    }
    // This order matters. A lot. 
    rightView(root.right, rightNodes, depth+1);
    rightView(root.left, rightNodes, depth+1);
}
