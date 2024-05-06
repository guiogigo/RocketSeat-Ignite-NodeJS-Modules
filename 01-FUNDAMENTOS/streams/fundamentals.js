// Ex: Netflix & Spotify

//Readable Streams / Writable Streams
//É enviar e receber arquivos de maneira particionada aproveitando o tempo e os recursos do sistema

//stdin / stdoutt (input e output do terminal)

// o req e o res são streams

//Streams de transformação transformam um dado em outro

import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;
        setTimeout(() => {
            if(i>100) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));
                

                this.push(buf);
            }
        }, 1000);
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
    //chunk: informação, encoding: ???, callback: função que chama quando ela stream termina
    console.log(Number(chunk.toString()) * 10);
    callback();
    };
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;

        callback(null, Buffer.from(String(transformed)));//Primeiro parametro é um erro, o segundo é o proprio dado que vai ser passado
    }
    
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream());
