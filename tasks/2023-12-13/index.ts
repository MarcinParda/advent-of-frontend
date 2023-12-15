// index.ts

export function decodeMessage(
  template: string,
  values: { [key: string]: string }
): string {
  return template.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_, key) => {
    const value = values[key];
    if (value === undefined) {
      return '';
    }

    const [encoding, encodedValue] = value.split(':');

    switch (encoding) {
      case 'b64':
        return Buffer.from(encodedValue, 'base64').toString('utf-8');
      case 'c13':
        return decodeCaesar13(encodedValue);
      case 'uri':
        return decodeURIComponent(encodedValue.replace(/\+/g, ' '));
      default:
        return '';
    }
  });
}

function decodeCaesar13(encodedValue: string): string {
  return encodedValue
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + 13) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + 13) % 26) + 97);
      } else {
        return char;
      }
    })
    .join('');
}
