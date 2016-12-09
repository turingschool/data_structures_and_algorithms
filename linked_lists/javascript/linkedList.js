function List(){
  this._length = 0;
  this.head = null;
}

List.prototype.push = function(data){
  var newNode = new ListNode(data);
  this.head ? addToEnd(this, newNode) : this.head = newNode;
  adjustLength(this, 1);
}

List.prototype.pop = function(){
  var lastNode = this.lastNode();
  if(!lastNode){ return null };
  if(lastNode === this.head){
    this.head = null;
  } else {
    var secondToLastNode = returnSecondToLastNode(this);
    secondToLastNode.nextNode = null;
  }
  adjustLength(this, -1);
  return lastNode;
}

List.prototype.delete = function(data){
  if (!this.head){ return null };
  if (this.head.data === data){ reassignHead(this) }
  loopAndRemoveMatchingNodes(this, data)
}

List.prototype.toArray = function(){
  var a = [];
  var activeNode = this.head;
  while(activeNode){
    a.push(activeNode.data);
    activeNode = activeNode.nextNode;
  }
  return a;
}

List.prototype.lastNode = function(){
  return returnNodeAtIndex(this, this._length)
}

List.prototype.include = function(data){
  var i = this.toArray().indexOf(data);
  return i != -1 ? true : false;
}

List.prototype.find = function(data){
  var activeNode = this.head;
  while(activeNode){
    if (activeNode.data === data) { return activeNode }
    activeNode = activeNode.nextNode
  }
  return null
}

List.prototype.index = function(data){
  var i = this.toArray().indexOf(data);
  return i != -1 ? i : null;
}

List.prototype.insert = function(index, data){
  var foundNode = returnNodeAtIndex(this, index);
  if(foundNode){ prependNode(foundNode, data, this) };
}

List.prototype.insertAfter = function(nodeData, newData){
  var foundNode = this.find(nodeData);
  if (foundNode){ prependNode(foundNode, newData, this) };
}

List.prototype.distance = function(nodeData1, nodeData2){
  var a = this.toArray();
  return a.indexOf(nodeData2) - a.indexOf(nodeData1)
}

// 'private' functions

function prependNode(node, data, list){
  var newNode = new ListNode(data);
  newNode.nextNode = node.nextNode;
  node.nextNode = newNode;
  adjustLength(list, 1);
}

function returnNodeAtIndex(list, index){
  var activeNode = list.head;
  for(var i = 1; i < index; i++){
    activeNode = activeNode.nextNode || activeNode;
  }
  return activeNode;
}


function reassignHead(list){
  list.head = list.head.nextNode;
  adjustLength(list, -1);
}

function loopAndRemoveMatchingNodes(list, data){
  var activeNode = list.head;
  while(activeNode && activeNode.nextNode){
    if (activeNode.nextNode.data === data){
      activeNode.nextNode = activeNode.nextNode.nextNode
      adjustLength(list, -1);
    }
    activeNode = activeNode.nextNode;
  }
}

function adjustLength(list, amount){
  list._length += amount;
}

function returnSecondToLastNode(list){
  var activeNode = list.head;
  while(activeNode && activeNode.nextNode && activeNode.nextNode.nextNode){
    activeNode = activeNode.nextNode;
  }
  return activeNode;
}

function addToEnd(list, newNode){
  var activeNode = list.lastNode();
  activeNode.nextNode = newNode;
}