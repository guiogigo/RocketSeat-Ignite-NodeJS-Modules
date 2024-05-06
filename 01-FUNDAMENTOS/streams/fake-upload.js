import { Readable } from 'node:stream';

class OneHundredStream extends Readable {
    index = 1;

    _read() {
        const i  = this.index++

        setTimeout(()=> {
            if(i>5) {
                this.push(null);
            }
            else {
                const buf = Buffer.from(String(i));

                this.push(buf);
            }

        }, 1000);
    }
}

//Fetch API: Serve para fazer requisições do front para o back
fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneHundredStream(),
    duplex: 'half',
}).then(response => {
    return response.text()
}).then(data => {
    console.log(data)
})