
export class W3Buffer {

    public _offset = 0;
    public _buffer: Buffer;

    constructor(buffer: Buffer) {
        this._buffer = buffer;
    }

    public readInt(): number {
        const int: number = this._buffer.readInt32LE(this._offset);
        this._offset += 4;
        return int;
    }

    public readShort(): number {
        const int: number = this._buffer.readInt16LE(this._offset);
        this._offset += 2;
        return int;
    }

    public readFloat(): number {
        const float: number = this._buffer.readFloatLE(this._offset);
        this._offset += 4;
        return Math.round(float * 10**3)/10**3;
    }

    public readString(): string {
        const string: number[] = [];

        while (this._buffer[this._offset] !== 0x00) {
            string.push(this._buffer[this._offset]);
            this._offset += 1;
        }
        this._offset += 1; // consume the \0 end-of-string delimiter

        return string.map((ch) => {
            return String.fromCharCode(ch);
        }).join('');
    }

    public readChars(len: number = 1): string {
        const string: number[] = [];
        const numCharsToRead = len || 1;

        for (let i = 0; i < numCharsToRead; i++) {
            string.push(this._buffer[this._offset]);
            this._offset += 1;
        }

        return string.map((ch) => {
            if (ch === 0x0) return '0';
            return String.fromCharCode(ch);
        }).join('');
    }

    public readByte() {
        // TODO what kind of binary? Do we use a BigInt or a node provided type from Buffer?
        const byte = this._buffer[this._offset];
        this._offset += 1;
        return byte;
    }
}
