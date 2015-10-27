# SHA-1

## Hash Function Intro

## SHA-1 Resources

## SHA-1 Process

### 1. Prep the message

Before we start on the core of the algorithm, we need
to run through a few preparatory steps. The main body of the
function will be operating on the underlying bits that make up
our (originally textual) message.

In order to smooth things out, we need to pre-process the message
a bit in order to get it into a compatible format. A rough
outline of the steps looks like this:

1. "Pad" the message bits to be congruent with 448 modulo 512
2. Separate the message from the appended padding by a "1" bit
3. Append 64 bits representing the original length of the message
in characters (or bytes)

#### random notes


"Add appropriate number of 0 bytes to bring message into congruence with 448
mod 512 (56 mod 64 bytes). Additionally, the first bit of this padding sequence
should be set 1 to separate original message from padding."

"takes incoming string message through various steps needed to
convert it to a mod-512 byte array with appropriate padding and
meessage length appended"

```clojure
;; extending block
;; iterate i = 16 - 79
;; each iteration, take diffs:
;; i - 3
;; i - 8
;; i - 14
;; i - 16
;; as we go, we will be adding new words to the end of our
;; sequence, so e.g. i=17 doesn't exist at the start, but it
;; will get added adter the first iteration


;; within each loop, take the 4 selected words,
;; and reduce them via XOR
;; so first, (XOR (i-3) (i-8)) (i.e. word 13 and word 8)
;; then (XOR _result (i-14))
;; then (XOR _result (i-16))
;; something like this:
#(-> (aget block (- i 3))
(bit-xor (aget block (- i 8)))
(bit-xor (aget block (- i 14)))
(bit-xor (aget block (- i 16))))

;; next, "carry through left bit rotation by a factor of 1" ?!?!?
;; i.e. remove first digit of left-most word and append it to the end
;; of the word -- probably some right-shifts and left shifts?

;; Finally, after this rotation
;; this word gets appended to the end of our existing 16 words,
;; becoming word 17
;; this sequence repeats until 80 words are generated
;; from the original 17
```










;; string "ab" should give
;; 97,98 binary
;; + "1"
;; + diff to make congruent mod 512
;; + message length in characters padded to 64 bits
;; or:
;; "11000011" + "100010" + "1" + ("0" * 443) + (64-bit padded 2)


"pads short message to 56 total bytes, leaving 8 bytes in
same 512-bit block for message length. Additionally, leading
padding bit should be 1 to distinguish padding from message"


"pads message longer than 512 bits to be congruent with 448
mod 512, leaving 8 bytes for message length in next block"

"message longer that is greater than 448 mod 512 bits still has to
pad to 448 congruence in next block since there aren't enough bits
left in current block for 64-bit message-length encoding"


"generates byte-array for encoding message length as 64-bit long"

"preps message by converting to bytes, adding padding separator bit,
adding congruence padding, and adding message length bits"

"take a 64-byte chunk consisting of 16 4-byte words
and 'extend' it to generate 80 words from the original
16"
