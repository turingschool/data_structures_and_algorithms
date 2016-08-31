Computers use one byte to store each character in a file. A byte is made up of 8 bits. There are 2^8 = 256 possible states of one byte. There are only 26 letters in the alphabet! Even when you include capital letters, numbers and special characters, you can only type 95 characters on a standard keyboard. We're wasting the rest of the space in those bytes. Maybe we should only use 7 bytes per character.

The most common character in english is the letter 'E'. It appears over 100x more often than a 'Z'. And spaces occur twice as often as 'E's. Should all of these characters take up the same number of bits? Why are we wasting all this space!?

# Huffman Coding

Huffman coding is one of the oldest compression algorithms, and forms of it are still used in MP3 and JPEG files today. It uses frequency of different characters in a text file to recode the bits used for each character.

## The Tree

![The Tree](https://i.stack.imgur.com/9T1Am.png)

### Encoding

A Huffman coding tree determines how you will code each character. To determine the code for a character, work your way from the top (root) to the "leaf" that contains your character. Each time you go left, add a `0`. Each time you go right, add a `1`. Once you get to the leaf, you have your code.

In the above image, each `c` in your text gets replaced by `1011`, and each `a` is simply `0`. In ASCII, the 'bitstring' for `'abcd'` would be `01100001011000100110001101100100`. 4 characters = 4 bytes = 32 bits. After we encode it with our Huffman tree, our bitstring is `01111011100`. 11 bits = 1 3/8ths bytes. Only 34% of the original length.

### Building the tree

Building a tree isn't too difficult. The basics are in this [6 minute youtube video](https://www.youtube.com/watch?v=ZdooBTdW5bM).

### Decoding

So how do we get from `01111011100` to `'abcd'`?

It's your job to write a decoder function, or rather functions.

First, decode as part of the `Encoder` class itself. You'll have access to a list of `leaves`, the `encoderObject` function, and other things that may be helpful.

Then create a `Decoder` class. It will be initialized by a compressed bitstring, and a huffman coding tree in the form of the root node. You no longer have access to the `encoderObject` or the `leaves` array. Try to solve this one without recreating those things.

The last challenge is the Batman challenge. You're still working with the Decoder class, but now the nodes of your tree have lost their parents. Each node only has a `left` and a `right`
