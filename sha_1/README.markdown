# SHA-1

## Hash Function Intro

## SHA-1 Resources

A great writeup of the SHA-1 process with fairly detailed
examples can be found [here](http://m.metamorphosite.com/one-way-hash-encryption-sha1-data-software).

## SHA-1 Process

### 1. Prep the message

Before we start on the core of the algorithm, we need
to run through a few preparatory steps. The main body of the
function will be operating on the underlying bits that make up
our (originally textual) message.

In order to smooth things out, we need to pre-process the message
a bit in order to get it into a compatible format. A rough
outline of the steps looks like this:

1. Convert the message into its bit-array (or byte-array) representation
2. "Pad" the message bits to be congruent with 448 modulo 512
3. Separate the message from the appended padding by a "1" bit
4. Append 64 bits representing the original length of the message
in characters (or bytes)

__Converting the message to bytes__

For the remainder of the algorithm, we'll be working with the
underlying bits (or bytes) that make up the text of the message.
To get started, we need to first convert the message into
a sequence of bits.

There are various ways to handle this, and they will likely vary
depending on how "low level" your language is, and what facilities
it exposes to you for doing low-level bit manipulation.

For example in C, we might simply allocate a large block of memory
equivalent to the bit-length we'll ultimately need to work with
and start going to town.

In Java or other JVM languages, we might work with a byte array --
a sequential data structure for working with a series of bytes,
or 8-bit units.

Yet another option which, while probably not the fastest, might
make things easier to inspect and reason about, would be to
use your language's built-in String facilities to model the problem
around a series of literal "0" and "1" characters.

In any case, you'll want to start out by converting your message
character by character into a sequence of bytes. This is pretty
easy for simple Latin text, since the ASCII character encoding is
built around a byte-per-character model.

Each character in ASCII maps to a predefined byte value, which
we can ultimately encode in our string as a sequence of 8 bits.
See [this table](http://www.asciitable.com/) for a list of the various
encodings.

In Ruby, for example, we can convert a character to its ASCII value
like so:

```ruby
>"pizza".each_byte.to_a
=> [112, 105, 122, 122, 97]
```

The `String#ord` method is useful for this as well:

```ruby
>"p".ord
=> 112
> "pizza".chars.map(&:ord)
=> [112, 105, 122, 122, 97]
```

Next we would want to convert these each to an 8-bit binary
number, and combine them all together:

```ruby
> "pizza".chars.map(&:ord).map { |i| i.to_s(2) }
["1110000", "1101001", "1111010", "1111010", "1100001"]
```

And then join them together:

```ruby
> "pizza".chars.map(&:ord).map { |i| i.to_s(2) }.join
"pizza".chars.map(&:ord).map { |i| i.to_s(2) }.join
"11100001101001111101011110101100001"
```

Getting close, but if we look closely, we'll see that we
ended up with a 35-bit binary string, as opposed to the expected
40 bits.

One tricky issue when working with binary numbers is to make sure
we aren't losing or unintentionally colliding our numbers.
In this case, Ruby omits leading `0`'s when converting a number
to a binary string.

This is one area where working with something like a byte
array would help us (since a literal byte will preserve the appropriate
8 bits), but if you want to go down the string route you'll need
to "pad" your bits to preserve leading 0's.

For now, we can imagine doing something like this:

```ruby
>"pizza".chars.map(&:ord).map do |i|
    i.to_s(2)
  end.map do |i|
    "0" + i
  end.join.length
=> "0111000001101001011110100111101001100001"
```

__Padding the Message__

Now that we have some binary representation of our incoming message,
we need to "pad" it. The reason for padding the message is that the
SHA-1 algorithm is designed to work on blocks of 512 bits at a time.

To facilitate this, we need to massage the message to give it a bit-length
that fits neatly into our block size.

* Modulo Congruence
* Target 448 congruence
* Leaving room for 64-bit message length

__Appending Binary Message-Length__

Now that we've padded out the message, we're going to finish
out the last block by adding a series of bits representing
the length of the original message.

The length we're interested in is the original length of the
message in bytes (or characters, in ASCII), and we'll be
expressing it as a 64-bit integer. Hence why it was so important
to pad the message out to congruence with 448 mod 512 -- to leave
room for these 64 message-length bits at the end.

For this step, take the length of the message, turn it to binary, and
left-pad it to make sure the overall length works out to 64 bits.

(Alternatively, you can simply make sure your value is cast to a
64-bit int, for example Java's `long` type)

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
