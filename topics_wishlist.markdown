Unsorted list of various technical interview questions/topics culled from the internet.

### General

* Find the most frequent integer in an array
* Find pairs in an integer array whose sum is equal to 10 (bonus: do it in linear time)
* Given 2 integer arrays, determine of the 2nd array is a rotated version of the 1st array. Ex. Original Array A={1,2,3,5,6,7,8} Rotated Array B={5,6,7,8,1,2,3}
* Write fibbonaci iteratively and recursively (bonus: use dynamic programming)
* Find the only element in an array that only occurs once.
* Find the common elements of 2 int arrays
* Implement binary search of a sorted array of integers
* Implement binary search in a rotated array (ex. {5,6,7,8,1,2,3})
* Use dynamic programming to find the first X prime numbers
* Write a function that prints out the binary form of an int
* Implement parseInt
* Implement squareroot function
* Implement an exponent function (bonus: now try in log(n) time)
* Write a multiply function that multiples 2 integers without using *
* HARD: Given a function rand5() that returns a random int between 0 and 5, implement rand7()
* HARD: Given a 2D array of 1s and 0s, count the number of "islands of 1s" (e.g. groups of connecting 1s)
* Count the number of set bits in a byte/int32 (7 different solutions)
* Implement a function to return a ratio from a double (ie 0.25 -> 1/4). The function will also take a tolerance so if toleran ce is .01 then FindRatio(.24, .01) -> 1/4

### Strings

* Find the first non-repeated character in a String
* Reverse a String iteratively and recursively
* Determine if 2 Strings are anagrams
* Check if String is a palindrome
* Check if a String is composed of all unique characters
* Determine if a String is an int or a double
* HARD: Find the shortest palindrome in a String
* HARD: Print all permutations of a String
* HARD: Given a single-line text String and a maximum width value, write the function 'String justify(String text, int maxWidth)' that formats the input text using full-justification, i.e., extra spaces on each line are equally distributed between the words; the first word on each line is flushed left and the last word on each line is flushed right
* Reverse words in a string (words are separated by one or more spaces). Now do it in-place. By far the most popular string question!
* Remove duplicate chars from a string ("AAA BBB" -> "A B")
* Find the first non-repeating character in a string:("ABCA" -> B )

### Trees

* Implement a BST with insert and delete functions
* Print a tree using BFS and DFS
* Write a function that determines if a tree is a BST
* Find the smallest element in a BST
* Find the 2nd largest number in a BST
* Given a binary tree which is a sum tree (child nodes add to parent), write an algorithm to determine whether the tree is a valid sum tree
* Find the distance between 2 nodes in a BST and a normal binary tree
* Print the coordinates of every node in a binary tree, where root is 0,0
* Print a tree by levels
* Given a binary tree which is a sum tree, write an algorithm to determine whether the tree is a valid sum tree
* Given a tree, verify that it contains a subtree.
* HARD: Find the max distance between 2 nodes in a BST.
* HARD: Construct a BST given the pre-order and in-order traversal Strings
* Insert
* PrintInOrder
* PrintPreOrder
* PrintPostOrder
* Implement a non-recursive PrintInOrder

### Linked Lists

This is an extremely popular topic. I've had linked lists on every interview.
You must be able to produce simple clean linked list implementations quickly.

* Implement a linked list (with insert and delete functions)
  * singly-linked linked list
  * sorted linked list
  * circular linked list
* Find the Nth element in a linked list
* Remove the Nth element of a linked list
* Check if a linked list has cycles
* Given a circular linked list, find the node at the beginning of the loop. Example: A-->B-->C --> D-->E -->C, C is the node that begins the loop
* Check whether a link list is a palindrome
* Reverse a linked list iteratively and recursively
* Split a linked list given a pivot value
* Find the middle of a linked list. Now do it while only going through the list once. (same solution as finding cycles)

### Sorting

* Implement bubble sort
* Implement selection sort
* Implement insertion sort
* Implement merge sort
* Implement quick sort

### Arrays

* You are given an array with integers between 1 and 1,000,000. One integer is in the array twice. How can you determine which one? Can you think of a way to do it using little extra memory.
* You are given an array with integers between 1 and 1,000,000. One integer is missing. How can you determine which one? Can you think of a way to do it while iterating through the array only once. Is overflow a problem in the solution? Why not?
* Returns the largest sum of contiguous integers in the array -- Example: if the input is (-10, 2, 3, -2, 0, 5, -15), the largest sum is 8
* Implement Shuffle given an array containing a deck of cards and the number of cards. Now make it O(n).
* Return the sum two largest integers in an array
* Sum n largest integers in an array of integers where every integer is between 0 and 9

### Heaps / Stacks / Queues

* Difference between heap and stack? Write a function to figure out if stack grows up or down.
* Implement a stack with push and pop functions
* Implement a queue with queue and dequeue functions
* Find the minimum element in a stack in O(1) time
* Write a function that sorts a stack (bonus: sort the stack in place without extra memory)
* Implement a binary min heap. Turn it into a binary max heap
* HARD: Implement a queue using 2 stacks

### SQL

TK
