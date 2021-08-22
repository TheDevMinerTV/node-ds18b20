# @thedevminertv/ds18b20

Get temperature from DS18B20 sensors connected to a Raspberry PI (GPIO w1 pin).

## Usage

### Install

```sh
yarn install @thedevminertv/ds18b20
```

### Drivers

1-Wire drivers need to be loaded in order to create the connection between the physical sensor and the RPI.
You can load them from the terminal (or from the `bin/prepare.sh` script).

```sh
sudo modprobe wire
sudo modprobe w1-gpio
sudo modprobe w1-therm
```

### Code

```js
const ds18b20 = require('@thedevminertv/ds18b20');

async function main() {
  const ids = await ds18b20.getSensors();

  let temperature = await ds18b20.getTemperature('10-00080283a977');
  console.log('Current temperature is', temperature);

  // You can change the parser using the optional `options` argument
  temperature = await ds18b20.getTemperature('10-00080283a977', { parser: 'hex' });
  console.log('Current temperature is', temperature);
}

main();
```

## Thanks

* [chamerling](https://github.com/chamerling) for making the [original library](https://github.com/chamerling/ds18b20)

## License

(The MIT License)

Copyright (c) 2021 TheDevMinerTV

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
