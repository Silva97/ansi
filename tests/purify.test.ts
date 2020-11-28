import { ansi, purify } from '../src/index';

test('validate `purify` function', () => {
    const expected = 'I am a normal text.';
    const coloredText = ansi`I %{31}am %{normal}a %{f.green;bold;b.white}normal %{F.yellow}text.`;

    expect(purify(coloredText)).toBe(expected);
});
