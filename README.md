# @silva97/ansi

This package implements a *tag* function to parse template strings and add ANSI escape sequences
to use colors and text styles on terminal. (read about [template strings])

```JavaScript
// Example
const { ansi } = require('@silva97/ansi');

console.log(ansi`%{f.green}Hello %{f.red;bold;under}World!`);
```

Output:  
![terminal-output](https://i.imgur.com/OxW7scK.png)

## Installation
```bash
npm install @silva97/ansi
# Or using yarn:
yarn add @silva97/ansi
```

## ansi tags
The `ansi` tags follows the format `%{...}`, it's similar to notation `${...}` of template strings
to expands the content of an expression on the string. But ansi tags is used to output [ANSI escapes].

The color name is specified using the format `mode.color`. Example `f.blue` will be set the foreground
color to blue.

| Mode | ANSI code | Description            |
| :--: | :-------: | :--------------------- |
| `f`  |    `3`    | Foreground color       |
| `F`  |    `9`    | Light foreground color |
| `b`  |    `4`    | Background color       |

---------------------------------

|   Color  | ANSI code |
| :------: | :-------: |
| `black`  |    `0`    |
| `red`    |    `1`    |
| `green`  |    `2`    |
| `yellow` |    `3`    |
| `blue`   |    `4`    |
| `violet` |    `5`    |
| `purple` |    `5`    |
| `cyan`   |    `6`    |
| `white`  |    `7`    |

You can also specify styles to text. Example: `%{bold;strike}Hello!`.

|   Style  | ANSI code | Description                              |
| :------: | :-------: | :--------------------------------------- |
| `normal` |    `0`    | Resets to normal style                   |
|  `bold`  |    `1`    | **Bold** text                            |
| `under`  |    `4`    | <u>underline</u> text                    |
| `blink`  |    `5`    | Blinks the text                          |
| `invert` |    `7`    | Inverts background and foreground colors |
| `strike` |    `9`    | ~~strike~~ text                          |

**Warning:** Some styles, like `blink` and `strike`, will not work on all terminals. (i.e. VS code integrated terminal)

**Note:** You can also specify the style numbers instead of the names. Example: `%{31;1}` will be
translated to `\x1b[31;1m` (same as `%{f.red;bold}`).

## It's yet template strings!
Using `ansi` tag function you can yet use `${}` expressions inside yours strings. Example:
```JavaScript
const { ansi } = require('@silva97/ansi');

const name = 'Luiz Felipe';

console.log(ansi`Your name is %{f.green;bold}${name}%{normal}!`);
```


<!-- Links -->
[template strings]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[ANSI escapes]: https://en.wikipedia.org/wiki/ANSI_escape_code
