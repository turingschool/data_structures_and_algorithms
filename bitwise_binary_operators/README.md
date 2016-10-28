- Note: This explanation is currently based in JavaScript

# Color & Bitwise Binary Operators

## What is a Bit

A bit is a basic unit of information. AKA a binary digit. 

It can only have one of two values. These values are most commonly represented as a 1 or a 0.

Remember taking those punch cards style tests when you were little? Where you circled in the little dots? That was where the concept of a bit came in. Paper could be fed into a computer, and depending on whether holes were punched in or not was the data was passed around.

## What is Decimal

Our integer numbering system is base 10. Meaning, we use 10 different symbols to represent numbers.

| Decimal     |
|-------------|
| 0           |
| 1           |
| 2           |
| 3           |
| 4           |
| 5           |
| 6           |
| 7           |
| 8           |
| 9           |

So in order to get a decimal number from, say, a string - we would use the following code.

```javascript
var num = '7';
parseInt(num, 10);
```

[parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) is a function we're going to hear about a lot in this lesson.

It acceptes two parameters:
- string
  - The value to parse. If it's not a string, the function converts it to one using `toString`.
- radix
  - And integer between 2 and 36 that is the base in the mathematical numeral system. 

If you recall, we want to convert this string to a decimal integer - so we pass `10` in as our radix. 

`parseInt` will usually default to base ten if no radix is specified, but it is best practice to **always specify this parameter** to avoid confusion and guarantee predicatable behavior.

## What is Binary

@TODO: Description of Binary

Computers count using binary, which is a number system made up of zeros and ones (bits). 

So if we wanted to convert a Number to binary, we could do so in the following way.

```javascript
var num = 10;
num.toString(2);
```

[toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) is a function we will also be using often in this lesson.

Here you are calling the Number prototype toString method and passing it a radix of 2. 

Note: If you don't specify a radix, toString will default to base 10 (decimal)

Putting things all together, if you wanted to write a decimal to binary converter that could handle string AND integer input - you might write something like:

```javascript
  parseInt(n, 10).toString(2);
  // if string, convert to base ten number type
  // if already number type, convert to string and convert back to Number
  // call Number's prototype function toString() and tell it base 2
```

@TODO: If that JS function isn't enough for you, here's the math that's happening

Note: What if the decimal is a negative number? Try reading through the top answer on this [StackOverflow](http://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript) and using the `>>>` (right logical shift)

## What is Hexadecimal

Hexadecimal is base 16, meaning it uses sixteen characters to display numbers.

| Decimal | Hexadecimal |
|---------|-------------|
| 0 - 10  | 0 - 9       |
| 10 - 15 | A - F       |
| 16 - 25 | 10 - 19     |
| 26      | 1A          |
| 27      | 1B          |
| ... etc | ... etc     |

So if we wanted to convert a decimal to hex

```javascript
  var num = 11;
  num.toString(16); // "b"
  
  var num = '11';
  parseInt(num, 10).toString(16)
```

If you want to see the entire graph, try running the following code in a console

```javascript
  for(var i = 0; i < 100; i++){
    console.log(i, ' - ', i.toString(16));
  }
```
Hexadecimal was widely adopted because it is so easy to convert from hexadecimal to binary (the language of computers). Basically, hexadecimal is used to display binary in a shorter string.

Binary is base 2, hexadecimal is base 16.

2 to the power of 4 is 16

So you need a 4 digit binary to map to a one digit hexadecimal symbol.

| Hexadecimal | Binary |
|-------------|--------|
| 0           | 0000   |
| 1           | 0001   |
| 2           | 0010   |
| 3           | 0011   |
| 4           | 0100   |
| 5           | 0101   |
| 6           | 0110   |
| 7           | 0111   |
| 8           | 1000   |
| 9           | 1001   |
| A           | 1010   |
| B           | 1011   |
| C           | 1100   |
| D           | 1101   |
| E           | 1110   |
| F           | 1111   |

## What is RGB

Color or a TV or computer screen is controlled by adjusting three settings: Red, Green and Blue.

Each color value can range between 0 to 255

If all colors are set to zero (0, 0, 0) - the absense of light sets the screen to black.

If all three colors are set as high as possible (255, 255, 255) - the screen will be white.

The reason for 0 to 255 is because 8 digits in a binary system is the same as 255.

RGB values are encoded as 8-bit integers.

1111 1111 in binary equals 255.

- Blue: Bits from 0-7
- Green: Bits from 8-15 
- Red: Bits from 16-23

## What is a Bitwise Operation

A bitwise operation proccesses bits one at a time.

There is an [MDN article on how to use bitwise operators in JavaScript](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators).

@TODO: Add table of operators

```javascript
var hex = 'FFEBCD'; //blanchedalmond
var rgb = parseInt(hex, 16); // 16772045

// 0xFF is the same as 11111111
var r = (rgb >> 16) & 0xFF; // 255
var g = (rgb >> 8) & 0xFF; // 235
var b = rgb & 0xFF; // 205
```
A bitwise operator enables you to use binary.

@TODO: Add connection

# Next Steps

Open javascript/index.html to view tests

Note: Knowing just a little bit about `.match()`,  `.eval()` and `.test()` in relation to basic regex may save you some time - Learn about [regex in JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

#### hexToDecimalConverter

Start by getting the `javascript/hexToDecimal-test.js` passing

#### rgbToHex

Then get the rgbToHex tests passing

#### Bonus round

Knowing what you now know, can you create any of the following?

- In CodePen: A random rgb color generator that changes the background of a div every few seconds

- In CodePen: A script that changes the color of a div by converting the current time of day to rgb.

- Work backwards from this line of code in jQuery to figure out what the bitwise operators here are doing? [Code](https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/external/sizzle/dist/sizzle.js#L150) and [full cdn](https://code.jquery.com/jquery-3.1.1.js)

- A decimal to hex function and test suite that _handles negative numbers correctly_

- A converter that handles [HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)

# Resources

## Good Resources

- [What is a bit](https://en.wikipedia.org/wiki/Bit)
- [MDN JavaScrpt Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)

## Meh Resources
- http://rainyjune.net/node/341
- [javascript-bit-manipulation](http://www.i-programmer.info/programming/javascript/2550-javascript-bit-manipulation.html)
- [Color, Hexadecimal Numbers & Bitwise Binary Operators](http://www.webwasp.co.uk/tutorials/220/color.php)
- [using-logical-bitshift-for-rgb-values](http://stackoverflow.com/questions/5751689/using-logical-bitshift-for-rgb-values)