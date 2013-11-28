## Linked Lists

Linked Lists are one of the most fundamental Computer Science data structures.

### Singly-Linked List

In a singly-linked list you have a *head*, the start of the list, and *nodes* which hold the data. Each *node* holds a single element of data and a link to the *next* node in the list.

Using sweet ASCII art, it might look like this:

```
HEAD ---> ["hello" | -]--> ["world" | -]--> ["!" | ]
```

The three nodes here hold the data `"hello"`, `"world"`, and `"!"`. The first two node have links which point to other nodes. The last node, holding the data `"!"`, has no reference in the link spot. This signifies that it is the end of the list.

#### Functionality

A fully functional singly linked list can:

* Insert elements
* Pop an element from the end
* Push an element onto the beginning
* Remove the (first occurance | all occurances) of an element by data content
* Remove an element by position
* Add an element at an arbitrary position
* Add an element after a known node
* Find whether a data element is or is not in the list
* Find the distance between two nodes

#### Implementation

Implement a singly-linked list using:

* A) Iteration/looping
* B) Recursion

### Doubly-Linked List

In a doubly-linked list, each node has a link to both the previous and next nodes in the list.

#### Functionality

A doubly-linked list implements all the functionality of a singly-linked list and also:

* Insert a node immediately before a known node
* Find the shortest distance between two nodes

### Ring List

In a circular or ring list, the "last" node links back to the first. How does this structure affect searching?