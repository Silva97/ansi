const colorMap = {
    'black': '0',
    'red': '1',
    'green': '2',
    'yellow': '3',
    'blue': '4',
    'violet': '5',
    'purple': '5',
    'cyan': '6',
    'white': '7',
};

const modeMap = {
    'f': '3',  // Foreground, normal color
    'F': '9',  // Foreground, light color
    'b': '4',  // Background
};

const effectMap = {
    'normal': '0',
    'bold': '1',
    'under': '4',
    'blink': '5',
    'invert': '7',
    'strike': '9',
};

export function ansi(strings: TemplateStringsArray, ...values: any) {
    const regex = /%{([0-9a-z.;]+)}/gi;
    let text = '';

    for (const string of strings) {
        text += string;
        if (values instanceof Array && values.length > 0) {
            text += String(values.shift());
        }
    }

    text = text.replace(regex, (match, value: string) => {
        const effectRegex = new RegExp(Object.keys(effectMap).join('|'), 'g');

        value = value
            .replace(/([fFb])\.(\w+)/g, (match, mode, color) => {
                if (typeof colorMap[color] == 'undefined') {
                    return '';
                }

                return modeMap[mode] + colorMap[color];
            })
            .replace(effectRegex, (m) => effectMap[m]);

        return `\x1b[${value}m`;
    });

    return text + '\x1b[0m';
}
