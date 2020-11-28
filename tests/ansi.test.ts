import { ansi } from '../src/index';

describe('Testing `ansi` function', () => {
    let result = '';
    let expected = '';

    beforeEach(() => {
        result = '';
        expected = '';
    });

    afterEach(() => {
        expect(result).toBe(expected + '\x1b[0m');
    });


    test('normal template string expects no substitution', () => {
        expected = 'Normal 4 string.';
        result = ansi`Normal ${2 + 2} string.`;
    });

    test('test number values separated by colon', () => {
        expected = 'My \x1b[31;1mtest.';
        result = ansi`My %{31;1}test.`;
    });

    test('test names expected to be substituted by the color number', () => {
        expected = 'My \x1b[31;1mtest.';
        result = ansi`My %{f.red;bold}test.`;
    });

    test('test mode maps', () => {
        expected = 'My \x1b[34;94;47mtest.';
        result = ansi`My %{f.blue;F.blue;b.white}test.`;
    });

    test('test color maps', () => {
        expected = 'My \x1b[30;31;32;33;34;35;36;37mtest.';
        result = ansi`My %{f.black;f.red;f.green;f.yellow;f.blue;f.violet;f.cyan;f.white}test.`;
    });

    test('test effect maps', () => {
        expected = 'My \x1b[0;1;3;4;5;7;9mtest.';
        result = ansi`My %{normal;bold;italic;under;blink;invert;strike}test.`;
    });

    test('test multiple escapes', () => {
        expected = '\x1b[1mbold, \x1b[31mred, \x1b[42mgreen, \x1b[0mnormal, \x1b[94mblue.';
        result = ansi`%{bold}bold, %{f.red}red, %{b.green}green, %{normal}normal, %{94}blue.`;
    });
});

test('validate `enabled` property', () => {
    ansi.enabled = false;
    const expected = 'Normal text';
    const result = ansi`%{f.green}Normal %{f.red;b.white;bold}text`;

    expect(result).toBe(expected);
});
