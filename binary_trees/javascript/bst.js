function TreeNode(data, left, right){
  this.data = data;
  this.left = left || null;
  this.right = right || null;
}

function BST(){
  this.rootNode = null;
}

BST.prototype.push = function(data){
  var currentNode = this.rootNode;
  var node = new TreeNode(data);

  if(!currentNode){
    this.rootNode = node;
    return this;
  }
  while(currentNode){
    if(data <= currentNode.data){
      if(!currentNode.left){
        currentNode.left = node;
        break;
      } else {
        currentNode = currentNode.left;
      }
    } else {
      if(!currentNode.right){
        currentNode.right = node;
        break;
      } else {
        currentNode = currentNode.right;
      }
    }
  }
}

BST.prototype.find = function(data){
  var currentNode = this.rootNode;
  var foundNode = null;
  while(currentNode){
    if(currentNode.data === data){
      foundNode = currentNode;
      break;
    } else {
      if(data < currentNode.data){
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
  }
  return foundNode;
}

BST.prototype.toArray = function(){
  return [];
};

BST.prototype.sort = function(){
  return [];
}

BST.prototype.min = function(){
  return null;
}

BST.prototype.max = function(){
  return null;
}
