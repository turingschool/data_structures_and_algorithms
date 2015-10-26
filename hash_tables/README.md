## Hash Tables (aka Hash Maps)

A Hash Map is one of the most fundamental and commonly-used
collection data structures. An implementation appears in most
modern programming languages, and its versatility and performance
characteristics make it something of a "swiss army knife" of
data structures.

So why is a Hash Map (this, by the way, is where Ruby gets the name for its `Hash` class)
so powerful? As we will see, a Hash Map has 2 essential properties:

1. Ability to associate between arbitrary keys and arbitrary values
2. Ability to insert and retrieve values in constant time

### Associativity

So what do we mean by "associate"? We say a data structure
is associative when it allows us to define a relationship
between 2 values and retrieve one in response to the other.

We've actually already worked frequently with one fundamental
associative data structure: the Array. Arrays define associative
relationships between numeric indices and values contained in
the array.

An array is great if our data is ordered and if we are able to
consistently retrieve it by going directly to its numeric
index.

But what about associating between _arbitrary_ data? I want
to associate the string "pizza" with the value "awesome",
and I don't want to have to define an explicit ordering
in the process.

Additionally, I want to be able to add a whole lot of keys and
values into the map and maintain a speedy lookup time. This is
where a Hash Table comes in.

### Hash Table Structure

To implement this data structure, we'll rely on a few key
tools:

1. A Hashing Algorithm for uniquely differentiating pieces of data.
Many languages already provide this -- in Ruby you can access an
object's hashcode by calling `#hash` on it.
2. An internal array which we'll ultimately use to store data
3. An additional abstraction for handling "collisions" between
hashcodes within the data structure.

To some extent, a Hash Table is a bit of Data Structure "sleight of hand"
-- it allows us to translate arbitrary data (i.e. hash keys) into
numeric array indices, and thus take advantage of the speedy
index lookups we get out of the box with an array.

### Hash Table Algorithm

How does it work? In short, when creating a new Hash Table, we'll
allocate an internal array to actually store our data. Later on
we may introduce an additional abstraction around Nodes or Elements,
but the array is going to be our fundamental storage mechanism
for the data.
