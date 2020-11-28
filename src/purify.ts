/**
 * Purifies text removing all ANSI escape sequences.
 * 
 * @return Pure text
 */
export function purify(text: string) {
    const regex = new RegExp('\x1b\[[0-9;]+m', 'g');
    return text.replace(regex, '');
}
